import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductionCalendar } from "@/components/sections/ProductionCalendar";
import { ProductionEvents } from "@/components/sections/ProductionEvents";
import { ProductionsHero } from "@/components/sections/ProductionsHero";
import { getPublishedCalendarEntries, getPublishedEvents } from "@/lib/cms/public";
import { productionPosters } from "@/data/content/productions";

export const metadata = { title: "Productions", description: "Ankahi productions, events, and the calendar of what comes next." };

export const dynamic = "force-dynamic";
export default async function ProductionsPage() {
  const [eventRows, calendarRows] = await Promise.all([getPublishedEvents(), getPublishedCalendarEntries()]);
  const events = eventRows.map((event) => ({ id: event.id, title: event.title, date: event.event_date, time: event.start_time?.slice(0, 5), venue: event.location ?? undefined, description: event.description, poster: event.image?.public_url }));
  const posters = productionPosters;
  const calendarEvents = calendarRows.map((event) => ({ id: event.id, title: event.title, date: event.event_date, time: event.start_time?.slice(0, 5), venue: event.location ?? undefined, description: event.description }));
  return <><Navbar /><main><ProductionsHero posters={posters} /><ProductionEvents events={events} /><ProductionCalendar events={calendarEvents} /></main><Footer /></>;
}
