"use client";

import { formatEventDate } from "@/data/content/productions";
import type { Event } from "@/types/content";

function getSeasonMonths() {
  const now = new Date();
  return Array.from({ length: 12 }, (_, index) => {
  const date = new Date(now.getFullYear(), now.getMonth() + index, 1);
  return { year: date.getFullYear(), month: date.getMonth(), label: new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(date) };
  });
}

export function ProductionCalendar({ events }: { events: Event[] }) {
  const months = getSeasonMonths();
  return <section id="calendar" className="bg-paper px-6 py-24 text-ink sm:px-8 lg:px-12" aria-labelledby="calendar-title"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 border-b border-ink/15 pb-7 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.25em] text-theatre-red">Keep the date</p><h2 id="calendar-title" className="mt-4 font-display text-6xl leading-none sm:text-8xl">The calendar</h2></div><p className="max-w-xs text-sm leading-6 text-ink/60">Swipe across the season. Published events appear directly on their date.</p></div>{events.length === 0 ? <p className="mt-10 border border-dashed border-ink/20 px-5 py-8 text-sm text-ink/60">No dates have been announced yet. Check back soon for the next season.</p> : <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 overscroll-x-contain [scrollbar-width:thin]">{months.map(({ year, month, label }) => <Month key={`${year}-${month}`} year={year} month={month} label={label} events={events} />)}</div>}</div></section>;
}

function Month({ year, month, label, events }: { year: number; month: number; label: string; events: Event[] }) {
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const eventByDate = new Map(events.filter((event) => event.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).map((event) => [event.date, event]));
  return <article className="w-[min(88vw,42rem)] shrink-0 snap-start"><h3 className="mb-4 font-display text-4xl leading-none">{label}</h3><div className="grid grid-cols-7 border-l border-t border-ink/15">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day} className="border-b border-r border-ink/15 p-2 text-[10px] uppercase tracking-[0.12em] text-ink/50 sm:p-3">{day}</div>)}{Array.from({ length: firstDay + days }, (_, index) => { const day = index - firstDay + 1; const date = day > 0 ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : ""; const event = date ? eventByDate.get(date) : undefined; return <div key={index} className="relative aspect-square border-b border-r border-ink/15 p-2 sm:p-3">{day > 0 && <>{event ? <div tabIndex={0} aria-label={`${event.title} on ${formatEventDate(event.date)}`} className="group absolute inset-0 [perspective:700px] focus:outline-none focus-visible:ring-2 focus-visible:ring-theatre-red"><div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]"><div className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden bg-theatre-red p-2 text-paper [backface-visibility:hidden] sm:p-3"><span className="text-xs font-semibold">{String(day).padStart(2, "0")}</span><span className="line-clamp-3 break-words text-[clamp(0.55rem,1.3vw,0.8rem)] font-semibold uppercase leading-tight tracking-[0.04em]">{event.title}</span></div><div className="absolute inset-0 flex h-full w-full flex-col justify-end overflow-y-auto bg-ink p-2 text-paper [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-3"><span className="text-[clamp(0.5rem,1.1vw,0.7rem)] uppercase leading-tight tracking-[0.05em] text-paper/65">{formatEventDate(event.date)}</span><span className="mt-1 break-words text-[clamp(0.55rem,1.3vw,0.8rem)] font-semibold uppercase leading-tight">{event.time || "Time TBA"}</span><span className="mt-1 line-clamp-3 break-words text-[clamp(0.5rem,1.1vw,0.7rem)] uppercase leading-tight tracking-[0.04em] text-paper/75">{event.venue || "Venue TBA"}</span></div></div></div> : <span className="relative z-10 text-xs text-ink/50">{String(day).padStart(2, "0")}</span>}</>}</div>; })}</div></article>;
}
