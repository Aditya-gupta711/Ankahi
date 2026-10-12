drop policy if exists "members read own requests" on public.inventory_requests;
create policy "members read inventory requests" on public.inventory_requests for select to authenticated using (
  requester_id in (select id from public.member_profiles where user_id = auth.uid())
  or (
    status = 'pending' and exists (
      select 1 from public.inventory_items i
      join public.member_profiles mp on mp.hostel_id = i.current_hostel_id
      where i.id = item_id and mp.user_id = auth.uid() and mp.account_type = 'representative' and mp.is_active = true
    )
  )
);

create or replace function public.decide_inventory_request(p_request_id uuid, p_decision public.inventory_request_status, p_note text default null)
returns void language plpgsql security definer set search_path = public as $$
declare v_rep_hostel uuid; v_item_hostel uuid; v_request public.inventory_requests%rowtype;
begin
  if p_decision not in ('approved', 'rejected') then raise exception 'Invalid request decision'; end if;
  select hostel_id into v_rep_hostel from public.member_profiles where user_id = auth.uid() and account_type = 'representative' and is_active = true;
  select * into v_request from public.inventory_requests where id = p_request_id for update;
  select current_hostel_id into v_item_hostel from public.inventory_items where id = v_request.item_id for update;
  if v_rep_hostel is null or v_item_hostel is null or v_item_hostel <> v_rep_hostel then raise exception 'This item is not held by your hostel'; end if;
  if v_request.status <> 'pending' then raise exception 'Request is unavailable'; end if;
  if p_decision = 'approved' then update public.inventory_items set current_hostel_id = v_request.to_hostel_id, updated_at = now() where id = v_request.item_id; end if;
  update public.inventory_requests set status = p_decision, decision_note = nullif(trim(p_note), ''), decided_at = now(), from_hostel_id = v_item_hostel where id = p_request_id;
end; $$;
