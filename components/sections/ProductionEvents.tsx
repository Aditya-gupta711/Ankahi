import Image from "next/image";
import { HoverTransition } from "@/components/ui/HoverTransition";
import { formatEventDate } from "@/data/content/productions";
import type { Event } from "@/types/content";

const fallbackEventImage = "/images/stage/4.png";

export function ProductionEvents({ events }: { events: Event[] }) {
  return <section className="bg-ink px-6 py-24 text-paper sm:px-8 lg:px-12" aria-labelledby="soon-title"><div className="mx-auto max-w-7xl"><p className="text-xs uppercase tracking-[0.25em] text-theatre-red-bright">What is next</p><h2 id="soon-title" className="mt-4 font-display text-6xl leading-none sm:text-8xl">Soon on stage.</h2>{events.length === 0 ? <p className="mt-12 border border-white/15 px-5 py-8 text-sm text-paper/65">No upcoming performances have been announced yet. The next scene is taking shape.</p> : <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4">{events.map((event) => <HoverTransition key={event.id} className="min-h-[27rem] min-w-[min(84vw,24rem)] shrink-0 snap-start md:min-w-[calc((100%-2rem)/3)]" label={`${event.title} event`} defaultComponent={<article className="relative flex h-full flex-col justify-end overflow-hidden bg-paper p-6 text-ink"><Image src={event.poster ?? fallbackEventImage} alt="" fill sizes="(max-width: 768px) 84vw, 33vw" className="object-cover opacity-100" /><p className="relative text-xs uppercase tracking-[0.15em] text-ink/60">{event.time} · {event.venue}</p></article>} hoverComponent={<article className="flex h-full flex-col justify-between bg-theatre-red p-6 text-paper"><p className="max-w-[19ch] text-xl leading-tight">{event.description}</p><div><p className="font-display text-4xl">{event.title}</p><p className="mt-2 text-xs uppercase tracking-[0.16em] text-paper/70">{formatEventDate(event.date)} · {event.time}</p></div></article>} />)}</div>}</div></section>;
}
