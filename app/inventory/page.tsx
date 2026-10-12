import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { requireMember } from "@/lib/inventory/auth";
import { requestInventoryItem, decideInventoryRequest } from "./actions";
import { AddInventoryItemForm } from "./AddInventoryItemForm";
import { DeleteInventoryItemButton } from "./DeleteInventoryItemButton";

type Item = { id: string; name: string; description: string; image_url: string | null; current_hostel_id: string; hostel: { name: string } | null };
type Request = { id: string; item_id: string; status: string; created_at: string; item: { name: string; current_hostel_id: string; hostel: { name: string } | null } | null; from_hostel: { name: string } | null; to_hostel: { name: string } | null };

export default async function InventoryPage() {
  const { supabase, profile } = await requireMember();
  const { data } = await supabase.from("inventory_items").select("id,name,description,image_url,current_hostel_id,hostel:hostels(name)").eq("is_available", true).order("name");
  const items = (data ?? []) as unknown as Item[];
  const rep = profile.account_type === "representative";
  let requestQuery = supabase.from("inventory_requests").select("id,item_id,status,created_at,item:inventory_items(name,current_hostel_id,hostel:hostels(name)),from_hostel:hostels!inventory_requests_from_hostel_id_fkey(name),to_hostel:hostels!inventory_requests_to_hostel_id_fkey(name)");
  if (rep) requestQuery = requestQuery.eq("status", "pending"); else requestQuery = requestQuery.eq("requester_id", profile.id);
  const { data: incoming } = await requestQuery;
  const { data: ownRequests } = await supabase.from("inventory_requests").select("id,item_id,status,created_at").eq("requester_id", profile.id);
  const requests = ((incoming ?? []) as unknown as Request[]).filter((request) => !rep || request.item?.current_hostel_id === profile.hostel_id);
  const latestRequests = new Map<string, Request>();
  for (const request of [...requests, ...(ownRequests ?? [])] as Request[]) {
    const previous = latestRequests.get(request.item_id);
    if (!previous || new Date(request.created_at).getTime() > new Date(previous.created_at).getTime()) latestRequests.set(request.item_id, request);
  }
  const requestedItemIds = new Set([...latestRequests.values()].filter((request) => request.status === "pending" || request.status === "approved").map((request) => request.item_id));
  return <div className="min-h-screen bg-paper text-ink"><Navbar /><main className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-14"><header className="border-b border-ink/15 pb-10"><p className="text-xs uppercase tracking-[0.28em] text-theatre-red">Community inventory</p><h1 className="mt-4 font-display text-7xl leading-none">The cupboard</h1><p className="mt-5 max-w-xl text-sm leading-7 text-ink/65">Browse what Ankahi has and see where it currently lives.</p><p className="mt-5 text-xs uppercase tracking-[0.14em] text-ink/55">{profile.name} · {profile.hostel?.name ?? "No hostel assigned"}</p></header>
    {rep && <section className="mt-12 border-b border-ink/15 pb-12"><p className="text-xs uppercase tracking-[0.2em] text-theatre-red">Representative desk</p><h2 className="mt-3 font-display text-4xl">Add an item</h2><AddInventoryItemForm /><h2 className="mt-12 font-display text-4xl">Pending handovers</h2>{requests.length === 0 ? <p className="mt-5 text-sm text-ink/60">No requests waiting for your hostel.</p> : <div className="mt-7 grid gap-4 md:grid-cols-2">{requests.map((r) => <div key={r.id} className="border border-ink/15 p-5"><p className="font-display text-2xl">{r.item?.name}</p><p className="mt-2 text-sm text-ink/60">From {r.from_hostel?.name} to {r.to_hostel?.name}</p><div className="mt-5 flex gap-3"><form action={decideInventoryRequest}><input type="hidden" name="request_id" value={r.id} /><input type="hidden" name="decision" value="approved" /><button className="border border-theatre-red bg-theatre-red px-4 py-2 text-xs uppercase tracking-[0.14em] text-white">Approve</button></form><form action={decideInventoryRequest}><input type="hidden" name="request_id" value={r.id} /><input type="hidden" name="decision" value="rejected" /><button className="border border-ink/25 px-4 py-2 text-xs uppercase tracking-[0.14em]">Reject</button></form></div></div>)}</div>}</section>}
    <section className="mt-12"><div className="flex items-end justify-between"><h2 className="font-display text-4xl">Available items</h2><span className="text-xs uppercase tracking-[0.14em] text-ink/50">{items.length} items</span></div>{items.length === 0 ? <p className="mt-7 border border-dashed border-ink/20 px-5 py-8 text-sm text-ink/60">No inventory items are available right now.</p> : <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => { const requested = requestedItemIds.has(item.id); const canRequest = profile.account_type === "representative" && Boolean(profile.hostel_id && profile.hostel_id !== item.current_hostel_id); const canDelete = rep && profile.hostel_id === item.current_hostel_id; return <article key={item.id} className="border border-ink/15 bg-white">{item.image_url ? <div className="relative aspect-[4/3]"><Image src={item.image_url} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></div> : <div className="flex aspect-[4/3] items-center justify-center bg-ink text-xs uppercase tracking-[0.2em] text-paper/60">No image</div>}<div className="p-5"><h3 className="font-display text-3xl">{item.name}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{item.description || "No description yet."}</p><p className="mt-5 text-xs uppercase tracking-[0.14em] text-theatre-red">Currently at {item.hostel?.name ?? "Unknown hostel"}</p>{canRequest && <form action={requestInventoryItem} className="mt-5"><input type="hidden" name="item_id" value={item.id} /><button disabled={requested} className="border border-ink/25 px-4 py-2 text-xs uppercase tracking-[0.14em] transition-all hover:-translate-y-0.5 hover:border-theatre-red hover:text-theatre-red disabled:cursor-not-allowed disabled:border-ink/10 disabled:text-ink/45">{requested ? "Request pending" : "Request item"}</button></form>}{canDelete && <div className="mt-5 border-t border-ink/10 pt-4"><DeleteInventoryItemButton itemId={item.id} /></div>}</div></article>; })}</div>}</section><Link href="/enter" className="mt-16 inline-block text-xs uppercase tracking-[0.18em] text-ink/55">← Exit inventory</Link></main></div>;
}



