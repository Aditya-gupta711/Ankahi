import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries((await fs.readFile(".env.local", "utf8")).split(/\r?\n/).filter(Boolean).map((line) => { const index = line.indexOf("="); return [line.slice(0, index), line.slice(index + 1).trim()]; }));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const files = [
  ["Shashank.jpg", "Shashank", "Hostel to be added"], ["Punita_Nalanda.jpg", "Punita", "Nalanda"], ["Prince_karakoram.jpg", "Prince", "Karakoram"], ["Prashuk_Aravali.jpg", "Prashuk", "Aravali"], ["PranjalVindhyachal.jpg", "Pranjal", "Vindhyachal"], ["Mahi_Kailash.webp", "Mahi", "Kailash"], ["c6df9e47-8b1a-4504-8e91-af3235614667.png", "Name to be added", "Hostel to be added"], ["Aryan_Shivalik.jpg", "Aryan", "Shivalik"], ["Aryan_kumaon.jpg", "Aryan", "Kumaon"]
];
const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

const paths = files.map(([filename]) => `members/representatives/${filename}`);
const { data: existingMedia } = await supabase.from("media").select("id, storage_path").in("storage_path", paths);
const existingMediaIds = (existingMedia ?? []).map((item) => item.id);
if (existingMediaIds.length) await supabase.from("team_members").delete().in("photo_media_id", existingMediaIds);

for (let index = 0; index < files.length; index += 1) {
  const [filename, name, hostel] = files[index];
  const extension = filename.split(".").pop()?.toLowerCase() ?? "jpg";
  const storagePath = `members/representatives/${filename}`;
  const bytes = await fs.readFile(path.join("C:/Users/LENOVO/Downloads", filename));
  const uploadResponse = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/site-images/${storagePath}`, { method: "POST", headers: { Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, apikey: env.SUPABASE_SERVICE_ROLE_KEY, "Content-Type": mime[extension] ?? "image/jpeg", "x-upsert": "true" }, body: bytes });
  if (!uploadResponse.ok) throw new Error(`Storage upload failed for ${filename}: ${uploadResponse.status} ${await uploadResponse.text()}`);
  const publicUrl = supabase.storage.from("site-images").getPublicUrl(storagePath).data.publicUrl;
  const { data: media, error: mediaError } = await supabase.from("media").upsert({ filename, storage_path: storagePath, public_url: publicUrl, mime_type: mime[extension] ?? "image/jpeg", file_size: bytes.length, alt_text: `${name}, ${hostel}` }, { onConflict: "storage_path" }).select("id").single();
  if (mediaError) throw mediaError;
  const { error: memberError } = await supabase.from("team_members").insert({ name, role: "Representatives", bio: `Hostel: ${hostel}`, category: "Representatives", photo_media_id: media.id, display_order: index + 1, status: "published", published_at: new Date().toISOString() });
  if (memberError) throw memberError;
}
console.log(`Imported ${files.length} representatives.`);
