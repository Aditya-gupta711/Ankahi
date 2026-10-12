# Ankahi project structure

```text
app/                         Next.js App Router routes and server actions
  admin/                     Protected CMS interface
  enter/                     Public entry and access routes
  cast/                      Public team route
  film/                      Public film route
  productions/               Public productions, events, and calendar route
  page.tsx                   Public homepage
  layout.tsx                 Root metadata, fonts, and global shell

components/
  layout/                    Navbar, footer, container, and site chrome
  sections/                  Page-level visual sections
  ui/                        Small reusable UI and interaction primitives

data/
  content/                   Local development/sample data and formatters

lib/
  cms/                       Public CMS queries and admin authorization
  supabase/                  Browser, server, and service-role clients
  utils.ts                   Shared utilities

types/                       Shared TypeScript content models
public/images/               Browser-safe local assets and branding
Images/                      Original source archive; do not modify or delete
scripts/                     One-off media/content migration utilities
supabase/migrations/         Database schema and RLS migrations
```

## Content source policy

Published website content should come from Supabase through `lib/cms/public.ts`.
Files under `data/content/` are development data and presentation fallbacks only;
they are not the production CMS source of truth.
