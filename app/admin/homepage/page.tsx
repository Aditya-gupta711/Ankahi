import Link from "next/link";
import { requireAdmin } from "@/lib/cms/auth";

export default async function HomepageAdminPage() {
  await requireAdmin();
  return <main className="max-w-3xl px-6 py-12 sm:px-10 lg:px-14"><p className="text-xs uppercase tracking-[0.28em] text-theatre-red">Content manager</p><h1 className="mt-4 font-display text-7xl leading-none">Homepage</h1><div className="mt-10 border border-ink/15 bg-white p-6"><p className="text-lg">The homepage is presentation-only.</p><p className="mt-3 text-sm leading-6 text-ink/60">“Soon on stage” is automatically driven by the same published events shown on the productions page. Manage event details and images from the events / productions manager.</p><Link href="/admin/events" className="mt-6 inline-block border border-theatre-red bg-theatre-red px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-ink">Manage events / productions</Link></div></main>;
}
