-- Public pages use indexed media for the film gallery, production collage,
-- homepage slides, and event imagery. Keep uploads/admin writes protected,
-- while allowing the public read path to resolve those published assets.
drop policy if exists "public read media" on public.media;

create policy "public read media"
on public.media
for select
using (true);
