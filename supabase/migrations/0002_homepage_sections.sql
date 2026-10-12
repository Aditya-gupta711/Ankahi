create table if not exists public.homepage_act_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  media_id uuid references public.media(id) on delete set null,
  display_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.homepage_act_categories enable row level security;
create policy "public read homepage acts" on public.homepage_act_categories for select using (true);
create policy "admins manage homepage acts" on public.homepage_act_categories for all using (public.is_admin()) with check (public.is_admin());
