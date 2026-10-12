create extension if not exists "pgcrypto";

create type public.admin_role as enum ('super_admin', 'editor');
create type public.content_status as enum ('draft', 'published');

create table public.admin_users (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null, email text not null, role public.admin_role not null default 'editor', is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.site_settings (
  id uuid primary key default gen_random_uuid(), site_name text not null default 'Ankahi', site_description text,
  contact_email text, instagram_url text, facebook_url text, youtube_url text, default_og_image text, favicon text,
  updated_at timestamptz not null default now()
);
create table public.media (
  id uuid primary key default gen_random_uuid(), filename text not null, storage_path text not null unique, public_url text not null,
  mime_type text not null, file_size bigint not null, width integer, height integer, alt_text text, uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.homepage_content (
  id uuid primary key default gen_random_uuid(), hero_title text not null default 'Ankahi', hero_subtitle text, hero_description text,
  hero_image_id uuid references public.media(id) on delete set null, hero_cta_text text, hero_cta_url text,
  about_title text, about_description text, about_image_id uuid references public.media(id) on delete set null,
  featured_productions_enabled boolean not null default true, featured_events_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);
create table public.productions (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, year integer not null,
  description text not null default '', short_description text, poster_media_id uuid references public.media(id) on delete set null,
  status public.content_status not null default 'draft', featured boolean not null default false, display_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), published_at timestamptz
);
create table public.production_images (
  id uuid primary key default gen_random_uuid(), production_id uuid not null references public.productions(id) on delete cascade,
  media_id uuid not null references public.media(id) on delete cascade, caption text, display_order integer not null default 0, created_at timestamptz not null default now(),
  unique (production_id, media_id)
);
create table public.production_people (
  id uuid primary key default gen_random_uuid(), production_id uuid not null references public.productions(id) on delete cascade,
  name text not null, role text not null, category text not null check (category in ('cast', 'crew')), display_order integer not null default 0
);
create table public.events (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, description text not null default '', short_description text,
  event_date date not null, start_time time, end_time time, location text, image_media_id uuid references public.media(id) on delete set null,
  external_url text, status public.content_status not null default 'draft', featured boolean not null default false, display_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), published_at timestamptz
);
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(), media_id uuid not null references public.media(id) on delete cascade, production_id uuid references public.productions(id) on delete set null,
  title text, caption text, alt_text text not null default '', category text, display_order integer not null default 0, status public.content_status not null default 'draft',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), published_at timestamptz
);
create table public.team_members (
  id uuid primary key default gen_random_uuid(), name text not null, role text not null, bio text, photo_media_id uuid references public.media(id) on delete set null,
  category text, display_order integer not null default 0, status public.content_status not null default 'draft', created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(), published_at timestamptz
);

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid() and is_active = true);
$$;
create or replace function public.is_super_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid() and role = 'super_admin' and is_active = true);
$$;

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.media enable row level security;
alter table public.homepage_content enable row level security;
alter table public.productions enable row level security;
alter table public.production_images enable row level security;
alter table public.production_people enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.team_members enable row level security;

create policy "public read published productions" on public.productions for select using (status = 'published' or public.is_admin());
create policy "public read published events" on public.events for select using (status = 'published' or public.is_admin());
create policy "public read published gallery" on public.gallery_items for select using (status = 'published' or public.is_admin());
create policy "public read published team" on public.team_members for select using (status = 'published' or public.is_admin());
create policy "public read production images" on public.production_images for select using (exists (select 1 from public.productions p where p.id = production_id and (p.status = 'published' or public.is_admin())));
create policy "public read production people" on public.production_people for select using (exists (select 1 from public.productions p where p.id = production_id and (p.status = 'published' or public.is_admin())));
create policy "public read media" on public.media for select using (public.is_admin() or exists (select 1 from public.productions p where p.poster_media_id = media.id and p.status = 'published') or exists (select 1 from public.gallery_items g where g.media_id = media.id and g.status = 'published'));
create policy "public read settings" on public.site_settings for select using (true);
create policy "public read homepage" on public.homepage_content for select using (true);

create policy "admins manage content" on public.productions for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage production images" on public.production_images for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage production people" on public.production_people for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage events" on public.events for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage gallery" on public.gallery_items for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage team" on public.team_members for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage media" on public.media for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage homepage" on public.homepage_content for all using (public.is_admin()) with check (public.is_admin());
create policy "super admins manage settings" on public.site_settings for all using (public.is_super_admin()) with check (public.is_super_admin());
create policy "super admins manage admins" on public.admin_users for all using (public.is_super_admin()) with check (public.is_super_admin());
create policy "admins read own admin profile" on public.admin_users for select using (user_id = auth.uid() or public.is_super_admin());

insert into public.site_settings (site_name, site_description) values ('Ankahi', 'IIT Delhi Dramatics Club') on conflict do nothing;
insert into public.homepage_content (hero_title, hero_subtitle) values ('Ankahi', 'IIT Delhi Dramatics Club') on conflict do nothing;
