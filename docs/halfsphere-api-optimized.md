# 📊 halfsphere Backend Engine • Next.js 15 App Router Optimizations

This specification houses the complete architectural layout, database models, and optimized Node.js handlers for **halfsphere** running in a Next.js 15 context. It interfaces directly with the shared Supabase instance.

---

## 🏗️ 1. Complete Server Directory Structure

To maintain a clean modular boundary inside the Next.js App Router workspace, follow this setup:

```
halfsphere/
├── app/
│   ├── api/
│   │   ├── cron/
│   │   │   └── hourly/
│   │   │       └── route.ts     # Automated Cron synchronizer
│   │   ├── keys/
│   │   │   └── route.ts         # Secure provider credentials storage
│   │   └── usage/
│   │       └── route.ts         # Visual analytical aggregations endpoint
├── lib/
│   ├── crypto.ts                # Cryptographic AES-256-GCM envelope
│   └── supabase-admin.ts        # Privileged admin client
```

---

## 🔐 2. Cryptographic Envelope (`lib/crypto.ts`)

API keys must **never be stored in plaintext**. This module uses standard Node.js `crypto` to encrypt key records securely with AES-256-GCM before database insertion.

```typescript
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_HEX = process.env.HALFSPHERE_ENCRYPTION_KEY;

if (!KEY_HEX || KEY_HEX.length !== 64) {
  throw new Error('CRITICAL CONFIG FAILURE: HALFSPHERE_ENCRYPTION_KEY must be a valid 32-byte (64 character) hex string.');
}

const ENCRYPTION_KEY = Buffer.from(KEY_HEX, 'hex');

export interface EncryptedData {
  encryptedText: string;
  iv: string;
}

/**
 * Encrypt arbitrary sensitive parameters using AES-256-GCM
 */
export function encryptKey(text: string): EncryptedData {
  const iv = crypto.randomBytes(12); // GCS standard IV length
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');

  return {
    // Envelope format: encrypted_payload:auth_tag
    encryptedText: `${encrypted}:${authTag}`,
    iv: iv.toString('hex')
  };
}

/**
 * Decrypt API Keys dynamically on runtime evaluation
 */
export function decryptKey(encryptedText: string, ivHex: string): string {
  const parts = encryptedText.split(':');
  const payloadHex = parts[0];
  const authTagHex = parts[1];

  if (!authTagHex) {
    throw new Error('CORRUPTION DETECTED: Authentication tag is missing from crypto envelope.');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(payloadHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

---

## 🔄 3. Multi-Provider Token Billing Sync (`app/api/cron/hourly/route.ts`)

This automated background worker is executed via hourly scheduler jobs (e.g., Vercel Cron). It decrypts provider API keys, queries official API logs (AI providers), and aggregates usage tables inside Supabase.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { decryptKey } from '@/lib/crypto';

// Setup Supabase Client with service key to write across RLS borders safely
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  // Validate caller identity using bearer tokens to avoid script execution misuse
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'UNAUTHORIZED: Cron verification signature is invalid.' }, 401);
  }

  try {
    // 1. Fetch all active provider bindings
    const { data: providers, error: provError } = await supabaseAdmin
      .from('halfsphere_providers')
      .select('*')
      .eq('is_active', true);

    if (provError || !providers) {
      return NextResponse.json({ status: 'completed', message: 'No active provider channels recorded.' });
    }

    const reportSummary = [];

    // 2. Query each provider dynamically
    for (const provider of providers) {
      try {
        const apiKey = decryptKey(provider.encrypted_api_key, provider.iv);

        let usageDeltaCost = 0.0;
        let promptTokens = 0;
        let completionTokens = 0;

        // --- SECTION A: OpenAI Core Handler ---
        if (provider.provider_name === 'openai') {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const dateString = yesterday.toISOString().split('T')[0];

          // Call official openai usage query loop endpoint
          const openAiRes = await fetch(`https://api.openai.com/v1/dashboard/billing/usage?date=${dateString}`, {
            headers: { 'Authorization': `Bearer ${apiKey}` },
          });

          if (openAiRes.ok) {
            const data = await openAiRes.json();
            // Aggregate daily delta expenditures
            usageDeltaCost = (data.total_usage || 0) / 100.0; // Converts cents to USD
          }
        } 
        
        // --- SECTION B: Anthropic Billing Handler ---
        else if (provider.provider_name === 'anthropic') {
          // Anthropic provides usage estimates via API
          const anthropicRes = await fetch('https://api.anthropic.com/v1/cost/report', {
            headers: {
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json'
            }
          });
          if (anthropicRes.ok) {
            const data = await anthropicRes.json();
            usageDeltaCost = data.cost_usd || 0.0;
          }
        }

        // 3. Write aggregated hourly updates into the shared Supabase instance
        if (usageDeltaCost > 0) {
          await supabaseAdmin.from('halfsphere_usage_logs').insert({
            user_id: provider.user_id,
            provider_name: provider.provider_name,
            prompt_tokens: promptTokens,
            completion_tokens: completionTokens,
            total_tokens: promptTokens + completionTokens,
            cost_usd: usageDeltaCost,
            logged_at: new Date().toISOString()
          });

          reportSummary.push({ provider: provider.provider_name, synced: true, cost: usageDeltaCost });
        }

      } catch (innerErr: any) {
        console.error(`METRIC RETRIEVAL FAILED for provider: ${provider.id}`, innerErr);
        reportSummary.push({ provider: provider.provider_name, error: innerErr.message });
      }
    }

    return NextResponse.json({ status: 'completed', results: reportSummary });

  } catch (err: any) {
    return NextResponse.json({ error: 'PANIC: Internal sync loop failure.', details: err.message }, 500);
  }
}
```

---

## 📈 4. Time-Series Aggregations Endpoint (`app/api/usage/route.ts`)

Provides low-latency aggregates for frontend charts (e.g., Recharts), avoiding intensive CPU recalculations on the client.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const currentPeriodDays = parseInt(searchParams.get('days') || '30', 10);

  if (!userId) {
    return NextResponse.json({ error: 'BAD_REQUEST: Missing auditor parameter "userId"' }, 400);
  }

  try {
    const historicalThreshold = new Date();
    historicalThreshold.setDate(historicalThreshold.getDate() - currentPeriodDays);

    // Dynamic database scan utilizing optimized composite index
    const { data: logs, error } = await supabaseAdmin
      .from('halfsphere_usage_logs')
      .select('provider_name, cost_usd, prompt_tokens, logged_at')
      .eq('user_id', userId)
      .gte('logged_at', historicalThreshold.toISOString())
      .order('logged_at', { ascending: true });

    if (error) throw error;

    // Group billing metrics by day
    const aggregatedDailyData: Record<string, { date: string; openai: number; anthropic: number; total: number }> = {};

    logs.forEach(log => {
      const dateKey = new Date(log.logged_at).toISOString().split('T')[0];
      if (!aggregatedDailyData[dateKey]) {
        aggregatedDailyData[dateKey] = { date: dateKey, openai: 0, anthropic: 0, total: 0 };
      }

      const cost = parseFloat(String(log.cost_usd || 0.0));
      if (log.provider_name === 'openai') {
        aggregatedDailyData[dateKey].openai += cost;
      } else if (log.provider_name === 'anthropic') {
        aggregatedDailyData[dateKey].anthropic += cost;
      }
      aggregatedDailyData[dateKey].total += cost;
    });

    return NextResponse.json({
      metrics: Object.values(aggregatedDailyData),
      totalCostRaw: logs.reduce((acc, current) => acc + parseFloat(String(current.cost_usd || 0)), 0)
    });

  } catch (err: any) {
    return NextResponse.json({ error: 'ANALYTICS_AGGREGATION_FAILED', message: err.message }, 500);
  }
}
```
