"use client";

import Image from "next/image";
import { useState } from "react";
import { actCategories } from "@/data/content/home";

const actImages = ["/images/home/acts/street.png", "/images/home/acts/monoact.png", "/images/home/acts/mime.JPG", "/images/home/acts/stage.JPG"];

export function ActAccordion() {
  const [active, setActive] = useState<number | null>(null);
  return <section className="bg-ink text-paper" aria-labelledby="acts-title"><div className="sr-only"><h2 id="acts-title">The Four Branches of Drama</h2></div>{actCategories.map((act, index) => { const selected = active === index; return <button key={act.id} type="button" aria-pressed={selected} aria-label={`${selected ? "Hide" : "Show"} information about ${act.name}`} onClick={() => setActive(selected ? null : index)} className={`group relative isolate flex min-h-[100svh] w-full snap-start items-center justify-center overflow-hidden text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-theatre-red focus-visible:ring-inset ${index < actCategories.length - 1 ? "border-b border-paper/25" : ""}`}><Image src={actImages[index]} alt={act.alt} fill sizes="100vw" className={`object-cover brightness-[0.72] transition-[filter] duration-700 ease-out ${selected ? "grayscale" : "grayscale-0"}`} /><span aria-hidden="true" className={`absolute inset-0 -z-0 transition-[background-color,backdrop-filter] duration-700 ${selected ? "bg-black/60 backdrop-blur-sm" : "bg-black/30 backdrop-blur-0"}`} /><div className="relative z-10 max-w-xl px-8"><h3 className="font-display text-7xl leading-[.85] transition-opacity duration-500 sm:text-9xl">{act.name}</h3><p className={`mx-auto mt-6 max-w-md whitespace-pre-line text-sm leading-6 text-paper/85 transition-opacity duration-500 ${selected ? "opacity-100" : "opacity-0"}`}>{act.description}</p></div></button>; })}</section>;
}
