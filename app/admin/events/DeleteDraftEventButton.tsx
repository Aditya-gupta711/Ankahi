"use client";

import { deleteDraftEvent } from "./actions";

export function DeleteDraftEventButton({ eventId }: { eventId: string }) {
  return (
    <form action={deleteDraftEvent} onSubmit={(event) => { if (!window.confirm("Delete this draft event permanently?")) event.preventDefault(); }}>
      <input type="hidden" name="event_id" value={eventId} />
      <button type="submit" className="text-xs uppercase tracking-[0.12em] text-ink/50 hover:text-red-700 hover:underline">Delete</button>
    </form>
  );
}
