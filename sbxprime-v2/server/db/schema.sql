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
