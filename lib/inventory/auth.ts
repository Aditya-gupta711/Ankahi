import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireMember() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/enter/others");

  const { data: profile } = await supabase
    .from("member_profiles")
    .select("id, user_id, name, email, account_type, hostel_id, is_active, hostel:hostels(id, name)")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!profile) redirect("/enter/others");
  return { supabase, user, profile: { ...profile, hostel: Array.isArray(profile.hostel) ? profile.hostel[0] ?? null : profile.hostel } };
}
