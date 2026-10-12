import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const envText = await readFile(path.join(process.cwd(), ".env.local"), "utf8");
const env = Object.fromEntries(envText.split(/\r?\n/).filter(Boolean).map((line) => line.split(/=(.*)/s, 2)));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

const { data: media } = await supabase.from("media").select("id, storage_path, public_url");
const mediaByPath = new Map((media ?? []).map((item) => [item.storage_path, item]));
const poster = (name) => mediaByPath.get(`productions/${name}`)?.id ?? null;

const events = [
  { title: "Open Rehearsal", slug: "sample-open-rehearsal", description: "SAMPLE EVENT — An evening of works-in-progress and unfinished scenes.", short_description: "SAMPLE EVENT", event_date: "2026-10-03", start_time: "18:30", location: "PLACEHOLDER VENUE", image_media_id: poster("h3.jpg"), status: "published", featured: true, display_order: 1, published_at: new Date().toISOString() },
  { title: "Street Theatre Lab", slug: "sample-street-theatre-lab", description: "SAMPLE EVENT — A workshop in taking a story out into the open.", short_description: "SAMPLE EVENT", event_date: "2026-10-11", start_time: "16:00", location: "PLACEHOLDER VENUE", image_media_id: poster("h7.jpg"), status: "published", featured: true, display_order: 2, published_at: new Date().toISOString() },
  { title: "The Next Act", slug: "sample-the-next-act", description: "SAMPLE EVENT — A placeholder showcase for the season ahead.", short_description: "SAMPLE EVENT", event_date: "2026-10-24", start_time: "19:00", location: "PLACEHOLDER VENUE", image_media_id: poster("h12.jpg"), status: "published", featured: true, display_order: 3, published_at: new Date().toISOString() },
];
const { error: eventError } = await supabase.from("events").upsert(events, { onConflict: "slug" });
if (eventError) throw eventError;

const levels = [["President", 1], ["Secretary", 1], ["Panel Members", 5], ["Directors", 6], ["Representatives", 16]];
const members = levels.flatMap(([category, count]) => Array.from({ length: count }, (_, index) => ({ name: `PLACEHOLDER — ${category} ${index + 1}`, role: category, bio: "PLACEHOLDER — Replace with confirmed member information.", category, display_order: index + 1, status: "published", published_at: new Date().toISOString() })));
await supabase.from("team_members").delete().like("name", "PLACEHOLDER — %");
const { error: memberError } = await supabase.from("team_members").insert(members);
if (memberError) throw memberError;

const { data: homepage } = await supabase.from("homepage_content").select("id").limit(1).maybeSingle();
const homepageContent = { hero_title: "Ankahi", hero_subtitle: "IIT Delhi Dramatics Club", hero_description: "PLACEHOLDER — Replace with confirmed homepage introduction.", featured_productions_enabled: true, featured_events_enabled: true };
const { error: homepageError } = homepage ? await supabase.from("homepage_content").update(homepageContent).eq("id", homepage.id) : await supabase.from("homepage_content").insert(homepageContent);
if (homepageError) throw homepageError;
console.log(`Imported ${events.length} sample events, ${members.length} placeholder team records, and homepage content.`);
