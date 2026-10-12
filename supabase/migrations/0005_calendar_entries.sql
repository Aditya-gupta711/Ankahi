create table if not exists public.calendar_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  description text not null default '',
  status public.content_status not null default 'draft',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.calendar_entries enable row level security;
drop policy if exists "public read calendar entries" on public.calendar_entries;
create policy "public read calendar entries" on public.calendar_entries for select using (status = 'published' or public.is_admin());
drop policy if exists "admins manage calendar entries" on public.calendar_entries;
create policy "admins manage calendar entries" on public.calendar_entries for all using (public.is_admin()) with check (public.is_admin());
