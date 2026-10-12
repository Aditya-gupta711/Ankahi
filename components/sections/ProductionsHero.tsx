import Image from "next/image";
type ProductionPoster = { id: string; src: string; alt: string };

export function ProductionsHero({ posters }: { posters: ProductionPoster[] }) {
  return <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-paper text-ink">
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-7 gap-1 bg-ink/5 sm:grid-cols-5 sm:grid-rows-5 md:grid-cols-7 md:grid-rows-3">
      {posters.map((poster, index) => <div key={poster.id} className="group relative flex min-h-0 items-center justify-center overflow-hidden bg-white" style={{ transform: `rotate(${index % 3 === 0 ? -0.35 : index % 3 === 1 ? 0.2 : 0}deg)` }}><Image src={poster.src} alt={poster.alt} fill sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw" className="scale-[1.06] object-cover transition duration-700 group-hover:scale-[1.12] group-hover:saturate-[1.08]" priority={index < 7} /><span aria-hidden="true" className={`pointer-events-none absolute inset-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0 ${index % 4 === 0 ? "bg-theatre-red/10" : index % 4 === 1 ? "bg-ink/5" : "bg-white/5"}`} /></div>)}
    </div>
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-gradient-to-b from-white/5 via-transparent to-ink/10"><div className="relative bg-white/90 px-5 py-4 text-center shadow-[0_10px_40px_rgba(14,13,12,.12)] backdrop-blur-[2px] sm:px-10 sm:py-7"><span className="absolute inset-x-1/2 -top-2 h-1 w-12 -translate-x-1/2 bg-theatre-red" /><h1 className="font-display text-[clamp(3rem,10vw,10rem)] leading-[.78] tracking-[-0.06em] text-black">OUR<br className="sm:hidden" /> PRODUCTIONS</h1></div></div>
  </section>;
}
