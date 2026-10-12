import Link from "next/link";

const links = [["Dashboard", "/admin"], ["Events / productions", "/admin/events"], ["Calendar", "/admin/calendar"]];

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-[#f7f7f5] text-ink"><aside className="border-b border-ink/10 bg-ink text-paper lg:fixed lg:inset-y-0 lg:w-64 lg:border-b-0"><div className="flex items-center justify-between px-6 py-5 lg:block"><Link href="/admin" className="font-display text-4xl leading-none">Ankahi</Link><span className="text-[10px] uppercase tracking-[0.2em] text-theatre-red-bright">Studio</span></div><nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto px-5 pb-4 lg:block lg:space-y-1 lg:px-4 lg:py-10">{links.map(([label, href]) => <Link key={href} href={href} className="block shrink-0 px-3 py-2 text-xs uppercase tracking-[0.16em] text-paper-muted transition-colors hover:bg-white/10 hover:text-paper">{label}</Link>)}</nav></aside><div className="lg:ml-64">{children}</div></div>;
}
