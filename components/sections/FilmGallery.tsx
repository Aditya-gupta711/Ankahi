"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FisheyeInfiniteGrid, type FisheyeGridItem } from "@/components/ui/fisheye-infinite-grid";
export type FilmAsset = { id: string; src: string; alt: string };

export function FilmGallery({ assets }: { assets: FilmAsset[] }) {
  const [selected, setSelected] = useState<FilmAsset | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);
  useEffect(() => { if (!selected) lastTriggerRef.current?.focus(); }, [selected]);
  const items: FisheyeGridItem[] = assets.map((asset, index) => ({ image: asset.src, alt: asset.alt, title: `Frame ${String(index + 1).padStart(2, "0")}`, meta: String(index + 1).padStart(2, "0") }));
  return <div className="bg-ink text-paper"><section className="relative h-[calc(100svh-5.5rem)] min-h-[40rem] border-b border-white/10"><div className="absolute left-6 top-8 z-10 sm:left-10"><p className="text-xs uppercase tracking-[0.3em] text-theatre-red-bright">The archive</p><h1 className="mt-4 font-display text-7xl leading-none sm:text-9xl">Film</h1></div><FisheyeInfiniteGrid items={items} tileWidth={220} tileHeight={270} gap={14} lensStrength={0.28} ambientDrift={0.025} theme="dark" aria-label="Ankahi film archive fisheye grid" /></section><section className="bg-white px-6 py-20 text-ink sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between border-b border-ink/15 pb-6"><div><p className="text-xs uppercase tracking-[0.25em] text-theatre-red">Open frames</p><h2 className="mt-3 font-display text-5xl sm:text-7xl">The collection</h2></div><p className="hidden text-xs uppercase tracking-[0.15em] text-ink/50 sm:block">{assets.length} images · click to expand</p></div>{assets.length === 0 ? <p className="mt-10 border border-dashed border-ink/20 px-5 py-8 text-sm text-ink/60">The film archive is being assembled. Check back soon.</p> : <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{assets.map((asset) => <button key={asset.id} type="button" onClick={(event) => { lastTriggerRef.current = event.currentTarget; setSelected(asset); }} className="group relative aspect-[4/5] overflow-hidden bg-[#f1f1f1] text-left focus-visible:ring-2 focus-visible:ring-theatre-red"><Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-x-3 bottom-3 translate-y-2 text-[10px] uppercase tracking-[0.16em] text-white opacity-0 drop-shadow transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">Expand ↗</span></button>)}</div>}</div></section>{selected && <div role="dialog" aria-modal="true" aria-label="Expanded film image" className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-6" onClick={() => setSelected(null)}><div className="relative h-[85svh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}><Image src={selected.src} alt={selected.alt} fill sizes="90vw" className="object-contain" /><button ref={closeButtonRef} type="button" aria-label="Close expanded image" onClick={() => setSelected(null)} className="absolute right-0 top-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">Close</button></div></div>}</div>;
}
