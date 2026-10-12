import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { MemberLoginForm } from "./MemberLoginForm";

export default function OthersEntryPage() {
  return <div className="min-h-screen bg-ink text-paper"><Navbar /><main className="mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-xl items-center px-6 py-20"><div className="w-full"><Link href="/enter" className="text-xs uppercase tracking-[0.2em] text-paper-muted hover:text-paper">← Back to entry</Link><p className="mt-12 text-xs uppercase tracking-[0.3em] text-theatre-red-bright">Community space</p><h1 className="mt-4 font-display text-7xl leading-none">Enter as other</h1><p className="mt-6 text-sm leading-6 text-paper-muted">Sign in to browse the club inventory and request an item from another hostel.</p><MemberLoginForm /></div></main></div>;
}
