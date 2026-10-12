"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function MemberLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn(formData: FormData) {
    setBusy(true); setError("");
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")), password: String(formData.get("password")),
    });
    if (signInError) { setError(signInError.message); setBusy(false); return; }
    router.push("/inventory"); router.refresh();
  }

  return <form action={signIn} className="mt-10 space-y-5">
    <label className="block text-xs uppercase tracking-[0.15em] text-paper-muted">Email<input name="email" type="email" required className="mt-2 block w-full border-b border-paper/30 bg-transparent px-0 py-3 text-base outline-none focus:border-theatre-red" /></label>
    <label className="block text-xs uppercase tracking-[0.15em] text-paper-muted">Password<input name="password" type="password" required className="mt-2 block w-full border-b border-paper/30 bg-transparent px-0 py-3 text-base outline-none focus:border-theatre-red" /></label>
    {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
    <button disabled={busy} type="submit" className="mt-5 border border-theatre-red px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-theatre-red disabled:opacity-50">{busy ? "Signing in…" : "Sign in"}</button>
  </form>;
}
