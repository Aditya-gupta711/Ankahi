# Supabase setup

1. Run `migrations/0001_cms_schema.sql` in the Supabase SQL editor.
2. Create a Storage bucket named `site-images` and keep it private until upload policies are added.
3. Create administrator accounts through Supabase Auth, then insert matching rows into `public.admin_users`.
4. Keep `.env.local` out of version control. `.env.example` documents the required public variables.
