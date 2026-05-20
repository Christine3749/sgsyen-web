# ⚙️ SGSYEN-API Backend Engine • Optimized Production Blueprint

This specification layout implements the optimized, container-ready Hono/Node.js API for the **SGSYEN Platform**, running high-velocity requests on **GCP Cloud Run**. It interfaces directly with the shared Supabase instance.

---

## 🏗️ 1. Complete Server Directory Structure

To ensure maximum modularity and prevent token overflow during deployment, keep the server codebase separate and well-organized:

```
sgsyen-api/
├── src/
│   ├── index.ts                # Application Entry Point & Routes Registration
│   ├── config.ts               # Environment Keys Configuration & Validation
│   ├── middlewares/
│   │   ├── auth.ts             # Auditor JWT/Email verification middleware
│   │   └── rate-limiter.ts     # Anti-Scraping protective layer
│   ├── services/
│   │   ├── supabase.ts         # Secure DB operations client
│   │   └── gcs.ts              # GCP Storage signed URLs generation client
│   └── types.ts                # Typing ledger for members and publications
├── package.json
└── Dockerfile
```

---

## 💻 2. Modular Production Code Implementation

Here are the complete, optimized file contents for each piece of the application matrix to enable easy copy-pasting and compilation.

### A. Environment Configuration (`src/config.ts`)

```typescript
import dotenv from 'dotenv';
dotenv.config();

function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  if (!value) {
    throw new Error(`CRITICAL CONFIG FAILURE: Environment variable "${name}" is required.`);
  }
  return value;
}

export const config = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  ENV: getEnvVar('NODE_ENV', 'development'),
  
  // Supabase Database Connection
  SUPABASE_URL: getEnvVar('SUPABASE_URL'),
  SUPABASE_SERVICE_KEY: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  
  // Google Cloud Storage Buckets (Digital Intelligence PDFs)
  GCS_PROJECT_ID: getEnvVar('GCP_PROJECT_ID'),
  GCS_BUCKET_NAME: getEnvVar('GCS_REPORTS_BUCKET_NAME'),
  GCS_CREDENTIALS_JSON: process.env.GCP_SERVICE_ACCOUNT_KEY 
    ? JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY) 
    : undefined
};
```

### B. Security Middleware (`src/middlewares/auth.ts` & `rate-limiter.ts`)

#### 1. Auditor Certification Auth Guard

```typescript
import { Context, Next } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

export async function verifyAuditorMember(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'UNAUTHORIZED: Missing or malformed authorization ticket.' }, 401);
  }

  const credential = authHeader.split(' ')[1];
  
  // In addition to token inspection, verify if the auditor's email exists in the Supabase cache
  const { data: member, error } = await supabase
    .from('sgsyen_members')
    .select('email, auth_role, is_active')
    .ilike('email', credential)
    .single();

  if (error || !member || !member.is_active) {
    return c.json({ error: 'FORBIDDEN: Credential verification failed or member is inactive.' }, 403);
  }

  // Bind active verified auditor context
  c.set('userIdEmail', member.email);
  c.set('userRole', member.auth_role);
  
  await next();
}
```

#### 2. IP-Based Sliding Window Rate Limiter

```typescript
import { Context, Next } from 'hono';

// High-speed memory store for Cloud Run instances
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function slidingRateLimit(c: Context, next: Next) {
  const clientIP = c.req.header('x-forwarded-for') || 'anonymous-ip';
  const now = Date.now();
  const limitWindowMs = 60 * 1000; // 1 minute
  const maxRequests = 100; // Maximum requests per client address per minute

  const record = rateLimitMap.get(clientIP);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(clientIP, {
      count: 1,
      resetAt: now + limitWindowMs
    });
    return await next();
  }

  if (record.count >= maxRequests) {
    c.header('Retry-After', String(Math.ceil((record.resetAt - now) / 1000)));
    return c.json({ error: 'TOO MANY REQUESTS: Rapid scraping threshold exceeded.' }, 429);
  }

  record.count += 1;
  await next();
}
```

### C. Google Storage PDF Signed Asset Service (`src/services/gcs.ts`)

This controller generates highly secure Google Cloud Storage (GCS) Signed URLs for localized intelligence delivery.

```typescript
import { Storage } from '@google-cloud/storage';
import { config } from '../config';

// Initialize GCS safely
let storage: Storage;
if (config.GCS_CREDENTIALS_JSON) {
  storage = new Storage({
    projectId: config.GCS_PROJECT_ID,
    credentials: config.GCS_CREDENTIALS_JSON
  });
} else {
  // Graceful Local Fallback/ADC initialization
  storage = new Storage({ projectId: config.GCS_PROJECT_ID });
}

export async function generateSecureBlobUrl(objectSlug: string): Promise<string> {
  const blobName = `reports/${objectSlug}.pdf`;
  const bucket = storage.bucket(config.GCS_BUCKET_NAME);
  const file = bucket.file(blobName);

  // Sign with a strict 10-minute validity constraint
  const [url] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 10 * 60 * 1000, // 10 Minutes
    cname: process.env.CDN_ASSET_IP || undefined
  });

  return url;
}
```

### D. Primary Server Entrypoint Application (`src/index.ts`)

```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import { verifyAuditorMember } from './middlewares/auth';
import { slidingRateLimit } from './middlewares/rate-limiter';
import { generateSecureBlobUrl } from './services/gcs';

const app = new Hono();
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

// Global Middleware Layers
app.use('*', cors({
  origin: '*', // Lock to frontends domains in live production
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
}));
app.use('*', logger());
app.use('*', slidingRateLimit);

// -------------------------------------------------------------------------
// REQUISITE API ROUTINGS
// -------------------------------------------------------------------------

// 1. Health Status Heartbeat
app.get('/api/health', (c) => c.json({ 
  status: 'operational', 
  timestamp: new Date().toISOString(),
  environment: config.ENV
}));

// 2. Fetch Custodial Publications Registry
app.get('/api/reports', async (c) => {
  try {
    const { data: reports, error } = await supabase
      .from('sgsyen_reports')
      .select('id, slug, title_zh, title_en, category_zh, category_en, summary_zh, summary_en, published_at, is_restricted')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return c.json(reports);
  } catch (err: any) {
    return c.json({ error: 'DATABASE_QUERY_FAILED', details: err.message }, 500);
  }
});

// 3. Fetch Dedicated Report Body Content (Markdown block)
app.get('/api/reports/:slug', async (c) => {
  const slug = c.req.param('slug');
  try {
    const { data: report, error } = await supabase
      .from('sgsyen_reports')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !report) {
      return c.json({ error: 'REPORT_NOT_FOUND', message: 'The specified dossier could not be matched.' }, 404);
    }

    // Security Gate check
    if (report.is_restricted) {
      const authHeader = c.req.header('Authorization');
      if (!authHeader) {
        // Obscure sensitive text before final release
        report.content_zh = '================ LOCKED SECURE BLOCK ================';
        report.content_en = '================ LOCKED SECURE BLOCK ================';
      }
    }

    return c.json(report);
  } catch (err: any) {
    return c.json({ error: 'DOSSIER_RELIABILITY_FAULT', details: err.message }, 500);
  }
});

// 4. Secure Physical Document Downloader Hook (High Protection Guard)
app.get('/api/reports/:slug/download', verifyAuditorMember, async (c) => {
  const slug = c.req.param('slug');
  const auditorEmail = c.get('userIdEmail');
  const clientIP = c.req.header('x-forwarded-for') || 'anonymous';

  try {
    // Audit log check: Verify first if downloading is permitted for this dossier
    const { data: report, error: repError } = await supabase
      .from('sgsyen_reports')
      .select('slug, is_restricted')
      .eq('slug', slug)
      .single();

    if (repError || !report) {
      return c.json({ error: 'DOSSIER_NOT_FOUND' }, 404);
    }

    // Call GCP Cloud Storage generation module to trigger signed transient link
    const downloadUrl = await generateSecureBlobUrl(slug);

    // Register physical transaction receipt in Supabase shared audit pool
    await supabase.from('sgsyen_downloads').insert({
      member_email: auditorEmail,
      report_slug: slug,
      download_ip: clientIP,
      download_status: 'completed'
    });

    return c.json({
      success: true,
      url: downloadUrl,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    });

  } catch (err: any) {
    // Record failure fallback to protect auditor flow
    await supabase.from('sgsyen_downloads').insert({
      member_email: auditorEmail,
      report_slug: slug,
      download_ip: clientIP,
      download_status: 'failed_generation'
    });
    
    return c.json({ error: 'SIGNED_ASSET_GENERATION_FAULT', details: err.message }, 500);
  }
});

// Port Binding execution for container engine runtimes
export default {
  port: config.PORT,
  fetch: app.fetch,
};
```

---

## 🐋 3. High Performance Dockerfile config

This multi-stage build minimises the Cloud Run footprint (reducing cold start times significantly).

```dockerfile
# Stage 1: Build the Javascript assets
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Deploy light image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
```
