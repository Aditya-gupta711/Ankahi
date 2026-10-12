create type public.member_account_type as enum ('member', 'representative');
create type public.inventory_request_status as enum ('pending', 'approved', 'rejected', 'cancelled');

create table public.hostels (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.member_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  account_type public.member_account_type not null default 'member',
  hostel_id uuid references public.hostels(id) on delete set null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index member_profiles_one_representative_per_hostel
  on public.member_profiles (hostel_id)
  where account_type = 'representative' and hostel_id is not null;

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  image_url text,
  current_hostel_id uuid not null references public.hostels(id),
  condition text,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inventory_requests (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.inventory_items(id) on delete cascade,
  requester_id uuid not null references public.member_profiles(id) on delete cascade,
  from_hostel_id uuid not null references public.hostels(id),
  to_hostel_id uuid not null references public.hostels(id),
  status public.inventory_request_status not null default 'pending',
  decision_note text,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

insert into public.hostels (name) values
  ('Aravali'), ('Girnar'), ('Himadri'), ('Jwalamukhi'), ('Kailash'),
  ('Karakoram'), ('Kumaon'), ('Nilgiri'), ('Satpura'), ('Shivalik'),
  ('Udaigiri'), ('Vindhyachal'), ('Zanskar')
on conflict (name) do nothing;

alter table public.hostels enable row level security;
alter table public.member_profiles enable row level security;
alter table public.inventory_items enable row level security;
alter table public.inventory_requests enable row level security;

create policy "members read hostels" on public.hostels for select to authenticated using (true);
create policy "members read inventory" on public.inventory_items for select to authenticated using (true);
create policy "representatives add inventory" on public.inventory_items for insert to authenticated with check (current_hostel_id in (select hostel_id from public.member_profiles where user_id = auth.uid() and account_type = 'representative' and is_active = true));
create policy "members read own profile" on public.member_profiles for select to authenticated using (user_id = auth.uid());
create policy "members create requests" on public.inventory_requests for insert to authenticated with check (
  requester_id in (select id from public.member_profiles where user_id = auth.uid() and is_active = true)
  and to_hostel_id = (select hostel_id from public.member_profiles where user_id = auth.uid() and is_active = true)
  and from_hostel_id = (select current_hostel_id from public.inventory_items where id = item_id and is_available = true)
  and from_hostel_id <> to_hostel_id
);
create policy "members read own requests" on public.inventory_requests for select to authenticated using (requester_id in (select id from public.member_profiles where user_id = auth.uid()) or from_hostel_id in (select hostel_id from public.member_profiles where user_id = auth.uid() and account_type = 'representative'));
create policy "representatives decide requests" on public.inventory_requests for update to authenticated using (from_hostel_id in (select hostel_id from public.member_profiles where user_id = auth.uid() and account_type = 'representative')) with check (from_hostel_id in (select hostel_id from public.member_profiles where user_id = auth.uid() and account_type = 'representative'));

create or replace function public.decide_inventory_request(
  p_request_id uuid,
  p_decision public.inventory_request_status,
  p_note text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rep_hostel uuid;
  v_request public.inventory_requests%rowtype;
begin
  if p_decision not in ('approved', 'rejected') then
    raise exception 'Invalid request decision';
  end if;

  select hostel_id into v_rep_hostel
  from public.member_profiles
  where user_id = auth.uid() and account_type = 'representative' and is_active = true;

  if v_rep_hostel is null then
    raise exception 'Only an active representative can decide requests';
  end if;

  select * into v_request from public.inventory_requests where id = p_request_id for update;
  if not found or v_request.status <> 'pending' then raise exception 'Request is unavailable'; end if;
  if v_request.from_hostel_id <> v_rep_hostel then raise exception 'This request is not assigned to your hostel'; end if;

  if p_decision = 'approved' then
    update public.inventory_items
    set current_hostel_id = v_request.to_hostel_id, updated_at = now()
    where id = v_request.item_id and current_hostel_id = v_request.from_hostel_id and is_available = true;
    if not found then raise exception 'Item is no longer available at this hostel'; end if;
  end if;

  update public.inventory_requests
  set status = p_decision, decision_note = nullif(trim(p_note), ''), decided_at = now()
  where id = p_request_id;
end;
$$;

grant execute on function public.decide_inventory_request(uuid, public.inventory_request_status, text) to authenticated;
