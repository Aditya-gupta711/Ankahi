import { createClient } from "@/lib/supabase/server";

function isTemporaryConnectionFailure(message: string) {
  return message.includes("fetch failed") || message.includes("EACCES") || message.includes("ECONN");
}

export async function getPublishedEvents() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("events").select("*, image:media!image_media_id(public_url, alt_text)").eq("status", "published").order("event_date").order("display_order");
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    if (!isTemporaryConnectionFailure(message)) console.error("Unable to load events from Supabase:", message);
    return [];
  }
}

export async function getPublishedCalendarEntries() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("calendar_entries").select("id, title, event_date, start_time, end_time, location, description").eq("status", "published").order("event_date").order("display_order");
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    if (!message.includes("calendar_entries") && !message.includes("42P01") && !isTemporaryConnectionFailure(message)) console.error("Unable to load calendar entries from Supabase:", message);
    return [];
  }
}
