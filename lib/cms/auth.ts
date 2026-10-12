import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("admin_users").select("id, name, email, role, is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active) redirect("/admin/login");
  return { supabase, user, profile };
}
