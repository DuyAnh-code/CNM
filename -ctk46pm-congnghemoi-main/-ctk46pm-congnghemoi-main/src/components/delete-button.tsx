"use client";

import { deleteGuestbookEntry } from "@/app/guestbook/actions";

export default function DeleteButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Ban co chac muon xoa loi nhan nay?")) return;
    await deleteGuestbookEntry(id);
  }

  return (
    <button onClick={handleDelete} className="text-xs text-red-400 transition-colors hover:text-red-600">
      Xoa
    </button>
  );
}
