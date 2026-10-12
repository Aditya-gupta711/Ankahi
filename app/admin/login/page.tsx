"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (signInError) {
      setError("We couldn't verify those details.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return <main className="grid min-h-screen place-items-center bg-ink px-6 py-16 text-paper"><div className="w-full max-w-md"><Link href="/enter" className="text-xs uppercase tracking-[0.2em] text-paper-muted hover:text-paper">← Back to entry</Link><p className="mt-16 text-xs uppercase tracking-[0.3em] text-theatre-red-bright">Ankahi administration</p><h1 className="mt-4 font-display text-7xl leading-none">Welcome in.</h1><p className="mt-6 text-sm leading-6 text-paper-muted">Sign in with an authorized administrator account.</p><form onSubmit={handleSubmit} className="mt-10 space-y-6"><label className="block text-xs uppercase tracking-[0.15em] text-paper-muted">Email<input name="email" type="email" autoComplete="email" required className="mt-2 block w-full border-b border-paper/30 bg-transparent px-0 py-3 text-base text-paper outline-none focus:border-theatre-red" /></label><label className="block text-xs uppercase tracking-[0.15em] text-paper-muted">Password<input name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full border-b border-paper/30 bg-transparent px-0 py-3 text-base text-paper outline-none focus:border-theatre-red" /></label>{error && <p role="alert" className="text-sm text-red-300">{error}</p>}<button type="submit" disabled={loading} className="border border-theatre-red px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-theatre-red disabled:opacity-50">{loading ? "Checking…" : "Sign in"}</button></form></div></main>;
}
