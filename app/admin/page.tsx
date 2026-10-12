import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const sections = [
  ["Homepage", "Edit the public stage and featured content.", "/admin/homepage"],
  ["Events", "Create, review, and publish upcoming events.", "/admin/events"],
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("admin_users").select("name, role, is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active) redirect("/admin/login");

  return <main className="min-h-screen bg-[#f7f7f5] text-ink"><header className="border-b border-ink/10 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8"><div><Link href="/" className="font-display text-4xl leading-none">Ankahi</Link><p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-theatre-red">Admin studio</p></div><div className="text-right"><p className="text-sm font-medium">{profile.name}</p><p className="text-xs uppercase tracking-[0.15em] text-ink/50">{profile.role.replace("_", " ")}</p></div></div></header><div className="mx-auto max-w-7xl px-6 py-16 sm:px-8"><p className="text-xs uppercase tracking-[0.3em] text-theatre-red">Control room</p><h1 className="mt-4 font-display text-7xl leading-none sm:text-8xl">Good to see you.</h1><p className="mt-6 max-w-lg text-sm leading-7 text-ink/60">Manage the content that powers Ankahi’s public stage. Changes live in Supabase and never alter the frontend structure.</p><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{sections.map(([title, description, href]) => <Link key={href} href={href} className="group min-h-52 border border-ink/15 bg-white p-6 transition-colors hover:border-theatre-red hover:bg-theatre-red hover:text-white"><span className="text-xs uppercase tracking-[0.2em] text-ink/45 transition-colors group-hover:text-white/70">Open section</span><h2 className="mt-12 font-display text-4xl leading-none">{title}</h2><p className="mt-3 max-w-xs text-sm leading-6 text-ink/60 transition-colors group-hover:text-white/80">{description}</p></Link>)}</div></div></main>;
}
