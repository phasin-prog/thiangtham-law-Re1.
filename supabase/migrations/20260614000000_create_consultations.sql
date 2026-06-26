create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 6 and 30),
  message text not null check (char_length(message) between 10 and 5000),
  service text not null check (
    service in (
      'civil',
      'criminal',
      'family',
      'inheritance',
      'contract',
      'land',
      'debt',
      'other'
    )
  ),
  locale text not null default 'th' check (locale in ('th', 'en')),
  source_path text not null default '/',
  status text not null default 'new' check (
    status in ('new', 'contacted', 'qualified', 'closed', 'spam')
  ),
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists consultations_status_created_at_idx
  on public.consultations (status, created_at desc);

alter table public.consultations enable row level security;

revoke all on table public.consultations from anon, authenticated;
grant all on table public.consultations to service_role;

comment on table public.consultations is
  'Initial legal consultation requests submitted through the public website.';
