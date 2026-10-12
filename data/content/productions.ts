export const productionPosters = Array.from({ length: 21 }, (_, index) => ({
  id: `poster-${index + 1}`,
  src: `/images/productions/poster-${String(index + 1).padStart(2, "0")}.png`,
  alt: `Ankahi production poster ${index + 1}`,
}));

export function formatEventDate(date: string) { return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`)); }
