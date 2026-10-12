"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MediaItem } from "@/types/content";

export function Hero({ slides, title = "Ankahi", subtitle = "IIT Delhi · Dramatics Club", description = "A stage for the stories that refuse to stay unspoken." }: { slides: MediaItem[]; title?: string; subtitle?: string; description?: string }) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(motionQuery.matches);
    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);
    return () => motionQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-ink text-paper" aria-label="Ankahi Stage">
      {slides.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 -z-10 transition-opacity duration-[1600ms] ease-in-out ${index === active ? "opacity-100" : "opacity-0"}`} aria-hidden={index !== active}>
          <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" className="object-cover object-center" />
        </div>
      ))}
      <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/70 via-black/15 to-black/25" />
      <div className="relative z-10 w-full px-6 pb-10 sm:px-8 sm:pb-14 lg:px-12">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{slides[active]?.eyebrow ?? subtitle}</p>
            <h1 className="font-display text-[clamp(5rem,15vw,13rem)] leading-[0.72] tracking-[-0.06em]">{slides[active]?.title ?? title}</h1>
          </div>
          <div className="mb-1 hidden max-w-xs text-right text-sm leading-6 text-white/75 md:block">{slides[active]?.description ?? description}</div>
        </div>
        <div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Hero slides">
          {slides.map((slide, index) => <button key={slide.id} type="button" role="tab" aria-selected={index === active} aria-label={`Show slide ${index + 1}`} onClick={() => setActive(index)} className={`h-1 transition-all duration-500 ${index === active ? "w-14 bg-theatre-red-bright" : "w-7 bg-white/50 hover:bg-white"}`} />)}
        </div>
      </div>
    </section>
  );
}
