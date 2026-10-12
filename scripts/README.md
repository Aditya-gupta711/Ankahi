# Content migration

Run from the project root after applying the Supabase schema and creating `site-images`:

```text
node scripts/migrate-local-media.mjs
```

The script reads the local browser-safe assets in `public/images`, uploads them to Supabase Storage, and upserts matching rows into `public.media`. It does not touch the original `Images/` directory or RAW files.

The service-role key is read only from `.env.local` and is never sent to the browser.
