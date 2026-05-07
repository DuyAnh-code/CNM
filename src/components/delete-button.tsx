"use client";

import { deleteGuestbookEntry } from "@/app/guestbook/actions";

export default function DeleteButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Bạn có chắc muốn xóa lời nhắn này?")) return;
    await deleteGuestbookEntry(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md px-2 py-1 text-xs text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
    >
      Xóa
    </button>
  );
}
