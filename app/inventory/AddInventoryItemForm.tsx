"use client";
import { useRef, useState } from "react";
import { addInventoryItem } from "./actions";

export function AddInventoryItemForm() {
  const formRef = useRef<HTMLFormElement>(null); const [busy, setBusy] = useState(false); const [message, setMessage] = useState("");
  async function submit(formData: FormData) { setBusy(true); setMessage(""); const result = await addInventoryItem(formData); setBusy(false); setMessage(result.error || "Item added to your hostel inventory."); if (!result.error) formRef.current?.reset(); }
  return <form ref={formRef} action={submit} className="mt-6 grid gap-4 border border-ink/15 bg-white p-5 sm:grid-cols-2">
    <label className="text-xs uppercase tracking-[0.14em] text-ink/60">Item name<input name="name" required className="mt-2 w-full border-b border-ink/25 bg-transparent px-0 py-2 text-base outline-none focus:border-theatre-red" placeholder="e.g. DSLR camera" /></label>
    <label className="text-xs uppercase tracking-[0.14em] text-ink/60">Image<input name="image" type="file" accept="image/*" required className="mt-2 block w-full text-sm" /></label>
    <label className="text-xs uppercase tracking-[0.14em] text-ink/60 sm:col-span-2">Description<textarea name="description" rows={2} className="mt-2 w-full border border-ink/20 bg-transparent p-2 text-sm outline-none focus:border-theatre-red" /></label>
    <div className="flex items-end"><button disabled={busy} className="border border-theatre-red bg-theatre-red px-4 py-2 text-xs uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-50">{busy ? "Adding…" : "Add item"}</button></div>
    {message && <p role="status" className="text-sm text-ink/60 sm:col-span-2">{message}</p>}
  </form>;
}
