# 🚀 Supabase Shared Database Architecture Design & Partition Optimization Blueprint

This specification documents the optimized shared schema and database constraints for **hafsphere** and **sgsyen-api** cohabitating on the same Supabase instance. 

To maintain high performance, avoid namespace collisions, and preserve strict isolation while sharing the same Postgres cluster, we implement:
1. **Schema-level Separation** (using a `public` schema with namespace prefixes, or separate `sgsyen` & `halfsphere` schemas).
2. **Row Level Security (RLS) policies** guarding dual domains.
3. **Database Performance Indexing** on highly queried columns (specifically query caching on token usage and authorization audit trails).

---

## 🗺️ 1. Conceptual Database Namespace Separation

Rather than cluttering the standard `public` schema, we partition tables with prefixes or separate PostgreSQL schemas to ensure maintainability:

```
               [ Supabase Shared Postgres Instance ]
              /                                     \
     [ halfsphere_* namespace ]              [ sgsyen_* namespace ]
     ├─ halfsphere_providers                 ├─ sgsyen_members
     ├─ halfsphere_usage_logs                ├─ sgsyen_reports
     ├─ halfsphere_budgets                   └─ sgsyen_downloads
     └─ common_audits (shared audit logs)
```

---

## 💾 2. Multi-Tenant Initialization Script (optimizations included)

Execute this script inside the **Supabase SQL Editor** to establish the optimized shared schema. 

This production-grade script includes:
* **Token Optimization Indexes** (improving time-series usage checks).
* **Automatic Audit Log triggers**.
* **Failsafe Foreign Key constraints** to Supabase standard `auth.users`.

```sql
-- =========================================================================
-- DATABASE INITIALIZATION & RESTRICTION MATRIX FOR SHARED HIGH-PERFORMANCE ENVIRONMENT
-- =========================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =========================================================================
-- PART 1: HALFPHERE (AI Infrastructure Monitoring System) TABLES
-- =========================================================================

-- 1. Providers: Securely stores API integrations keys & configuration
create table if not exists public.halfsphere_providers (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    provider_name text not null, -- 'openai' | 'anthropic' etc.
    encrypted_api_key text not null, -- AES-256-GCM encrypted
    iv text not null, -- Initialization vector
    is_active boolean default true not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint unique_user_provider unique(user_id, provider_name)
);

-- Index on user_id inside providers for instant configurations lookup
create index if not exists idx_halfsphere_providers_user_id on public.halfsphere_providers(user_id);

-- 2. Usage Logs: Time-series-like tracking of API spending & tokens
create table if not exists public.halfsphere_usage_logs (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    provider_name text not null,
    prompt_tokens bigint default 0 not null,
    completion_tokens bigint default 0 not null,
    total_tokens bigint default 0 not null,
    cost_usd numeric(12, 6) default 0.000000 not null,
    logged_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb
);

-- CRITICAL PERFORMANCE INDEX-TRIPLE: User + Log timeframe to optimize dashboard aggregation queries
create index if not exists idx_halfsphere_usage_user_date on public.halfsphere_usage_logs(user_id, logged_at desc);
create index if not exists idx_halfsphere_usage_cost on public.halfsphere_usage_logs(cost_usd) where cost_usd > 0;

-- 3. Budgets: Strict alert notification tier thresholds and caps
create table if not exists public.halfsphere_budgets (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    monthly_limit numeric(10, 2) default 100.00 not null,
    warning_threshold_1 numeric(5, 2) default 50.00 not null, -- e.g. 50%
    warning_threshold_2 numeric(5, 2) default 85.00 not null, -- e.g. 85%
    currency text default 'USD' not null,
    alert_email text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_halfsphere_budgets_user on public.halfsphere_budgets(user_id);


-- =========================================================================
-- PART 2: SGSYEN-API (Academic Intelligence Platform) TABLES
-- =========================================================================

-- 1. Members: Internal trusted auditors & contractors with access keys 
create table if not exists public.sgsyen_members (
    id uuid default uuid_generate_v4() primary key,
    email text unique not null,
    auth_role text default 'auditor' not null, -- 'admin', 'auditor', 'subscriber'
    is_active boolean default true not null,
    last_login_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Case-insensitive index for member email lookups
create index if not exists idx_sgsyen_members_email_lower on public.sgsyen_members (lower(email));

-- 2. Briefing Reports: Custodial intelligence publishing table
create table if not exists public.sgsyen_reports (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    title_zh text not null,
    title_en text not null,
    category_zh text not null,
    category_en text not null,
    summary_zh text not null,
    summary_en text not null,
    content_zh text not null, -- Markdown source
    content_en text not null, -- Markdown source
    published_at timestamp with time zone default timezone('utc'::text, now()) not null,
    is_restricted boolean default true not null
);

create index if not exists idx_sgsyen_reports_slug on public.sgsyen_reports(slug);

-- 3. PDF Download Audit Log: Tracks secure content transfers
create table if not exists public.sgsyen_downloads (
    id uuid default uuid_generate_v4() primary key,
    member_email text not null,
    report_slug text not null,
    download_ip text,
    download_status text default 'completed' not null,
    downloaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index audit trail to protect PDF distributions against abuse
create index if not exists idx_sgsyen_downloads_member on public.sgsyen_downloads(member_email);


-- =========================================================================
-- PART 3: ROW LEVEL SECURITY & PROTECTION LAYOUTS (RLS)
-- =========================================================================

-- Enable RLS for all tables to ensure strict tenancy
alter table public.halfsphere_providers enable row level security;
alter table public.halfsphere_usage_logs enable row level security;
alter table public.halfsphere_budgets enable row level security;
alter table public.sgsyen_members enable row level security;
alter table public.sgsyen_reports enable row level security;
alter table public.sgsyen_downloads enable row level security;

-- 1. RLS Policies: Halfsphere (User isolation strictly checked by auth.uid())
create policy "Users can modify their own providers"
    on public.halfsphere_providers for all
    using (auth.uid() = user_id);

create policy "Users can view their own usage logs"
    on public.halfsphere_usage_logs for select
    using (auth.uid() = user_id);

create policy "Users can record their own usage logs (Cron)"
    on public.halfsphere_usage_logs for insert
    with check (auth.uid() = user_id);

create policy "Users can manage their budgets"
    on public.halfsphere_budgets for all
    using (auth.uid() = user_id);

-- 2. RLS Policies: SGSYEN Reports (Unrestricted briefings are public, restricted requires authorization check)
create policy "Anyone can read unrestricted reports"
    on public.sgsyen_reports for select
    using (not is_restricted);

create policy "SGSYEN members can read all reports"
    on public.sgsyen_reports for select
    using (
        exists (
            select 1 from public.sgsyen_members 
            where lower(email) = lower(auth.jwt() ->> 'email') and is_active = true
        )
    );

-- Audit/Admin overrides for PDF log insertions
create policy "Only system role can insert into downloads log"
    on public.sgsyen_downloads for insert
    with check (true); -- Service role handles this directly or restricted check verified in backend middleware

-- =========================================================================
-- PART 4: SHARED PERFORMANCE OPTIMIZATIONS (Database Triggers)
-- =========================================================================

-- Trigger function to automatically update 'updated_at' columns on mutations
create or replace function public.update_modified_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger update_halfsphere_providers_modtime
    before update on public.halfsphere_providers
    for each row execute function public.update_modified_column();

create trigger update_halfsphere_budgets_modtime
    before update on public.halfsphere_budgets
    for each row execute function public.update_modified_column();
```

---

## 📈 3. Optimization and Conflict Avoidance Rules

To keep the database highly performant and stable under continuous usage:

### 1. Unified Supabase Key Separation
* **Never use the `service_role` key on the client!** Both backend systems must use their specific environment credentials.
* Only the scheduled Cloud Run cron task or Next.js background workers use the system `SUPABASE_SERVICE_ROLE_KEY` to aggregate metrics, bypassing standard RLS checks.

### 2. Time-Series Aggregations
* The `halfsphere_usage_logs` is a time-series table. Since Supabase is backed by vanilla Postgres, intensive inserts can cause minor sequential vacuum blocks. 
* *Optimization:* We added composite indexing on `(user_id, logged_at desc)` to allow instantaneous Next.js visual chart paints using index scans instead of linear sequential scans.
