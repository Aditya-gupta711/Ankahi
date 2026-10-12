"use server";

import { revalidatePath } from "next/cache";
import { requireMember } from "@/lib/inventory/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function addInventoryItem(formData: FormData) {
  const { profile } = await requireMember();
  if (profile.account_type !== "representative" || !profile.hostel_id) return { error: "Only an assigned representative can add inventory." };
  const name = String(formData.get("name") ?? "").trim();
  const image = formData.get("image");
  if (!name || !(image instanceof File) || image.size === 0) return { error: "Item name and image are required." };
  if (!image.type.startsWith("image/") || image.size > 8 * 1024 * 1024) return { error: "Use an image smaller than 8 MB." };
  const admin = createAdminClient();
  const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const storagePath = `inventory/${crypto.randomUUID()}.${extension}`;
  const upload = await admin.storage.from("site-images").upload(storagePath, new Uint8Array(await image.arrayBuffer()), { contentType: image.type, upsert: false });
  if (upload.error) return { error: upload.error.message };
  const imageUrl = admin.storage.from("site-images").getPublicUrl(storagePath).data.publicUrl;
  const { error } = await admin.from("inventory_items").insert({ name, description: String(formData.get("description") ?? ""), condition: String(formData.get("condition") ?? ""), image_url: imageUrl, current_hostel_id: profile.hostel_id });
  if (error) return { error: error.message };
  revalidatePath("/inventory");
  return { error: "" };
}

export async function requestInventoryItem(formData: FormData) {
  const { supabase, profile } = await requireMember();
  if (profile.account_type !== "representative" || !profile.hostel_id) return;
  const itemId = String(formData.get("item_id"));
  const { data: activeRequest } = await supabase.from("inventory_requests").select("id").eq("item_id", itemId).eq("requester_id", profile.id).in("status", ["pending", "approved"]).maybeSingle();
  if (activeRequest) return;
  const { data: item } = await supabase.from("inventory_items").select("id, current_hostel_id, is_available").eq("id", itemId).maybeSingle();
  if (!item || !item.is_available || !profile.hostel_id || item.current_hostel_id === profile.hostel_id) return;
  const { error } = await supabase.from("inventory_requests").insert({ item_id: item.id, requester_id: profile.id, from_hostel_id: item.current_hostel_id, to_hostel_id: profile.hostel_id });
  if (error) throw new Error(`Could not create request: ${error.message}`);
  revalidatePath("/inventory");
}

export async function deleteInventoryItem(formData: FormData) {
  const { profile } = await requireMember();
  if (profile.account_type !== "representative" || !profile.hostel_id) return;
  const itemId = String(formData.get("item_id") ?? "");
  if (!itemId) return;

  const admin = createAdminClient();
  await admin.from("inventory_items").delete().eq("id", itemId).eq("current_hostel_id", profile.hostel_id);
  revalidatePath("/inventory");
}

export async function decideInventoryRequest(formData: FormData) {
  const { supabase, profile } = await requireMember();
  if (profile.account_type !== "representative") return;
  const { error } = await supabase.rpc("decide_inventory_request", { p_request_id: String(formData.get("request_id")), p_decision: String(formData.get("decision")), p_note: String(formData.get("note") ?? "") });
  if (error) throw new Error(`Could not process request: ${error.message}`);
  revalidatePath("/inventory");
}
