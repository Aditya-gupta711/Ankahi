"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/cms/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createEvent(formData: FormData) {
  const { supabase } = await requireAdmin();
  const admin = createAdminClient();
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const date = String(formData.get("event_date") ?? "");
  if (!title || !slug || !date) redirect("/admin/events/new?error=missing");
  const image = formData.get("image");
  let imageMediaId: string | null = null;
  if (image instanceof File && image.size > 0) {
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(image.type) || image.size > 50 * 1024 * 1024) redirect("/admin/events/new?error=image");
    const admin = createAdminClient();
    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const storagePath = `events/${crypto.randomUUID()}.${extension}`;
    const upload = await admin.storage.from("site-images").upload(storagePath, new Uint8Array(await image.arrayBuffer()), { contentType: image.type, upsert: false });
    if (upload.error) redirect("/admin/events/new?error=image");
    const publicUrl = admin.storage.from("site-images").getPublicUrl(storagePath).data.publicUrl;
    const media = await admin.from("media").insert({ filename: image.name, storage_path: storagePath, public_url: publicUrl, mime_type: image.type, file_size: image.size, uploaded_by: (await supabase.auth.getUser()).data.user?.id ?? null }).select("id").single();
    if (media.error || !media.data) redirect("/admin/events/new?error=image");
    imageMediaId = media.data.id;
  }
  const { error } = await admin.from("events").insert({ title, slug, event_date: date, start_time: String(formData.get("start_time") ?? "") || null, end_time: String(formData.get("end_time") ?? "") || null, location: String(formData.get("location") ?? "") || null, description: String(formData.get("description") ?? ""), external_url: String(formData.get("external_url") ?? "") || null, image_media_id: imageMediaId, status: "draft" });
  if (error) redirect(`/admin/events/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/");
  revalidatePath("/productions");
  redirect("/admin/events");
}

export async function toggleEventStatus(id: string, status: "draft" | "published") {
  const { supabase } = await requireAdmin();
  await supabase.from("events").update({ status, published_at: status === "published" ? new Date().toISOString() : null, updated_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/");
  revalidatePath("/productions");
}

export async function deleteDraftEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("event_id") ?? "");
  if (!id) return;

  const admin = createAdminClient();
  await admin.from("events").delete().eq("id", id).eq("status", "draft");
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/productions");
}
