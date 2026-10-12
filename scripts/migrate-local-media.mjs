import { createClient } from "@supabase/supabase-js";
import { statSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const envText = await readFile(path.join(root, ".env.local"), "utf8");
const env = Object.fromEntries(envText.split(/\r?\n/).filter(Boolean).map((line) => line.split(/=(.*)/s, 2)));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const source = path.join(root, "public", "images");
const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" };

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await files(full));
    else if (mime[path.extname(entry.name).toLowerCase()]) result.push(full);
  }
  return result;
}

const localFiles = await files(source);
let migrated = 0;
for (const file of localFiles) {
  const relative = path.relative(source, file).replaceAll("\\", "/");
  const storagePath = relative;
  const contentType = mime[path.extname(file).toLowerCase()];
  const body = await readFile(file);
  const { error: uploadError } = await supabase.storage.from("site-images").upload(storagePath, body, { contentType, upsert: true });
  if (uploadError) throw new Error(`Upload failed for ${relative}: ${uploadError.message}`);
  const { data: publicData } = supabase.storage.from("site-images").getPublicUrl(storagePath);
  const { error: rowError } = await supabase.from("media").upsert({ filename: path.basename(file), storage_path: storagePath, public_url: publicData.publicUrl, mime_type: contentType, file_size: statSync(file).size, alt_text: `Ankahi archive image: ${path.basename(file)}` }, { onConflict: "storage_path" });
  if (rowError) throw new Error(`Media record failed for ${relative}: ${rowError.message}`);
  migrated += 1;
  if (migrated % 25 === 0) console.log(`Migrated ${migrated}/${localFiles.length}`);
}
console.log(`Migrated ${migrated} images into Supabase Storage and public.media.`);
