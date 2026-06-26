create table if not exists public.analytics_sessions (
  session_id uuid primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  user_agent_hash text check (
    user_agent_hash is null or char_length(user_agent_hash) <= 128
  )
);

create table if not exists public.analytics_page_views (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.analytics_sessions(session_id) on delete cascade,
  path text not null check (
    char_length(path) between 1 and 500 and path like '/%'
  ),
  locale text not null default 'unknown' check (locale in ('th', 'en', 'unknown')),
  viewed_at timestamptz not null default now()
);

create index if not exists analytics_sessions_last_seen_at_idx
  on public.analytics_sessions (last_seen_at desc);

create index if not exists analytics_page_views_viewed_at_idx
  on public.analytics_page_views (viewed_at desc);

create index if not exists analytics_page_views_path_viewed_at_idx
  on public.analytics_page_views (path, viewed_at desc);

create index if not exists analytics_page_views_session_viewed_at_idx
  on public.analytics_page_views (session_id, viewed_at desc);

alter table public.analytics_sessions enable row level security;
alter table public.analytics_page_views enable row level security;

revoke all on table public.analytics_sessions from anon, authenticated;
revoke all on table public.analytics_page_views from anon, authenticated;
grant all on table public.analytics_sessions to service_role;
grant all on table public.analytics_page_views to service_role;

create or replace function public.record_analytics_event(
  input_session_id uuid,
  input_path text,
  input_locale text default 'unknown',
  input_user_agent_hash text default null,
  input_event text default 'pageview'
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if input_path is null
    or char_length(input_path) < 1
    or char_length(input_path) > 500
    or input_path not like '/%' then
    raise exception 'invalid analytics path';
  end if;

  if input_locale not in ('th', 'en', 'unknown') then
    raise exception 'invalid analytics locale';
  end if;

  if input_event not in ('pageview', 'heartbeat') then
    raise exception 'invalid analytics event';
  end if;

  insert into public.analytics_sessions (
    session_id,
    first_seen_at,
    last_seen_at,
    user_agent_hash
  )
  values (
    input_session_id,
    now(),
    now(),
    input_user_agent_hash
  )
  on conflict (session_id) do update
    set last_seen_at = excluded.last_seen_at,
        user_agent_hash = coalesce(
          excluded.user_agent_hash,
          public.analytics_sessions.user_agent_hash
        );

  if input_event = 'pageview' then
    insert into public.analytics_page_views (
      session_id,
      path,
      locale
    )
    values (
      input_session_id,
      input_path,
      input_locale
    );
  end if;
end;
$$;

create or replace function public.analytics_top_pages(row_limit integer default 10)
returns table (
  path text,
  views bigint,
  last_viewed_at timestamptz
)
language sql
stable
set search_path = public
as $$
  select
    page_views.path,
    count(*)::bigint as views,
    max(page_views.viewed_at) as last_viewed_at
  from public.analytics_page_views as page_views
  group by page_views.path
  order by views desc, last_viewed_at desc
  limit greatest(1, least(row_limit, 100));
$$;

revoke all on function public.record_analytics_event(uuid, text, text, text, text) from public;
revoke all on function public.analytics_top_pages(integer) from public;
grant execute on function public.record_analytics_event(uuid, text, text, text, text) to service_role;
grant execute on function public.analytics_top_pages(integer) to service_role;

comment on table public.analytics_sessions is
  'Anonymous analytics sessions. Stores generated UUIDs, timestamps, and optional hashed user agent only. No IP addresses are stored.';

comment on table public.analytics_page_views is
  'Anonymous page-view events for aggregate website analytics. Starts collecting only after deployment.';
