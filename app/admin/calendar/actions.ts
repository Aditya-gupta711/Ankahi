"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/cms/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createCalendarEntry(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("event_date") ?? "");
  if (!title || !date) redirect("/admin/calendar/new?error=missing");
  const admin = createAdminClient();
  const { error } = await admin.from("calendar_entries").insert({ title, event_date: date, start_time: String(formData.get("start_time") ?? "") || null, end_time: String(formData.get("end_time") ?? "") || null, location: String(formData.get("location") ?? "") || null, description: String(formData.get("description") ?? ""), display_order: Number(formData.get("display_order") ?? 0) || 0, status: "draft" });
  if (error) redirect(`/admin/calendar/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/productions");
  redirect("/admin/calendar");
}

export async function toggleCalendarEntry(id: string, status: "draft" | "published") {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("calendar_entries").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/productions");
  revalidatePath("/admin/calendar");
}
