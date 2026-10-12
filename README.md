# Ankahi

Website for Ankahi, the Dramatics Society of IIT Delhi.

## Local development

```bash
npm install
copy .env.example .env.local
npm run dev
```

Set the Supabase values in `.env.local` before using admin authentication, events, or the calendar.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

## Content folders

- `public/images/collections/` — images shown on the Film page
- `public/images/team/president/`
- `public/images/team/secretary/`
- `public/images/team/panel-members/`
- `public/images/team/directors/`
- `public/images/team/representatives/`

Team filenames use `Name_Hostel.ext` or `Name.ext`.

The original `Images/` archive is retained locally. RAW files are intentionally excluded from Git and the browser bundle.

## Supabase

Database migrations are stored in `supabase/migrations/`. The public site uses Supabase for published events and calendar entries. Admin authentication and event/calendar management also require the configured Supabase project.

Never commit `.env.local` or the Supabase service-role key.
