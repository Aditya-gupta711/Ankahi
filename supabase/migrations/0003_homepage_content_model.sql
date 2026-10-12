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
do $$ begin
  create policy "public read homepage acts" on public.homepage_act_categories for select using (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "admins manage homepage acts" on public.homepage_act_categories for all using (public.is_admin()) with check (public.is_admin());
exception when duplicate_object then null;
end $$;

create table if not exists public.homepage_slides (
  id uuid primary key default gen_random_uuid(),
  media_id uuid references public.media(id) on delete set null,
  eyebrow text,
  title text not null,
  description text,
  cta_text text,
  cta_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.homepage_slides enable row level security;
do $$ begin
  create policy "public read active homepage slides" on public.homepage_slides for select using (is_active = true or public.is_admin());
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "admins manage homepage slides" on public.homepage_slides for all using (public.is_admin()) with check (public.is_admin());
exception when duplicate_object then null;
end $$;

insert into public.homepage_slides (title, eyebrow, description, display_order)
select 'Ankahi', 'IIT Delhi · Dramatics Club', 'A stage for the stories that refuse to stay unspoken.', 0
where not exists (select 1 from public.homepage_slides);

insert into public.homepage_act_categories (slug, name, description, display_order)
select * from (values
  ('street', 'Street', 'PLACEHOLDER — Replace with Ankahi’s confirmed description of street theatre.', 0),
  ('monoact', 'Monoact', 'PLACEHOLDER — Replace with Ankahi’s confirmed description of monoact performances.', 1),
  ('stage', 'Stage', 'PLACEHOLDER — Replace with Ankahi’s confirmed description of stage productions.', 2),
  ('mime', 'Mime', 'PLACEHOLDER — Replace with Ankahi’s confirmed description of mime performances.', 3)
) as defaults(slug, name, description, display_order)
where not exists (select 1 from public.homepage_act_categories);
