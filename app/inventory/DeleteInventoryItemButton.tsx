"use client";

import { deleteInventoryItem } from "./actions";

export function DeleteInventoryItemButton({ itemId }: { itemId: string }) {
  return (
    <form action={deleteInventoryItem} onSubmit={(event) => { if (!window.confirm("Delete this inventory item permanently?")) event.preventDefault(); }}>
      <input type="hidden" name="item_id" value={itemId} />
      <button type="submit" className="text-xs uppercase tracking-[0.12em] text-ink/50 hover:text-red-700 hover:underline">Delete item</button>
    </form>
  );
}
