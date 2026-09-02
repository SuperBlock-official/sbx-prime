-- SBX Prime — schema for pledge & lead capture (milestone 1).
-- Idempotent: safe to run repeatedly (used by scripts/migrate.js).

create extension if not exists "pgcrypto";

-- Authoritative investor numbers, assigned server-side.
-- The start value is applied by migrate.js from INVESTOR_NUMBER_START.
create sequence if not exists investor_number_seq;

create table if not exists pledges (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  investor_number bigint not null default nextval('investor_number_seq'),
  name text not null,
  email text not null,
  country text not null,
  asset_slug text,
  usdc_amount numeric(14, 2) not null default 0,
  sqft integer not null default 0,
  eligibility_self_certified boolean not null default false,
  status text not null default 'pending',
  ip text,
  user_agent text
);
create index if not exists pledges_email_idx on pledges (email);
create index if not exists pledges_created_idx on pledges (created_at desc);

-- Base wallet on pledges (added 2026-09).
alter table pledges add column if not exists wallet_address text;
alter table pledges add column if not exists no_wallet boolean not null default false;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  name text,
  source text,
  meta jsonb not null default '{}'::jsonb
);
create index if not exists leads_email_idx on leads (email);
create index if not exists leads_created_idx on leads (created_at desc);

-- Admin users (email + bcrypt hash). 2FA columns are reserved for a later milestone.
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  password_hash text not null,
  name text,
  totp_secret text,
  totp_enabled boolean not null default false
);

-- Assets. The full prospectus object lives in `data` (jsonb) so the model can
-- evolve without migrations; a few fields are promoted to columns for listing,
-- ordering, and search.
create table if not exists assets (
  slug text primary key,
  name text not null,
  published boolean not null default true,
  sort integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists assets_published_idx on assets (published, sort);
