"use client";

import { useActionState } from "react";
import { createGuestbookEntry, ActionState } from "@/app/guestbook/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ActionState = {
  success: false,
};

export default function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(createGuestbookEntry, initialState);

  return (
    <div className="mb-8 rounded-xl glass p-6">
      <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">✍️ Viết lời nhắn</h3>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên của bạn</Label>
          <Input id="name" name="name" placeholder="Nhập tên của bạn" required />
          {state.errors?.name && <p className="text-sm text-red-400">{state.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Lời nhắn</Label>
          <Textarea id="message" name="message" placeholder="Viết lời nhắn của bạn..." required rows={3} />
          {state.errors?.message && <p className="text-sm text-red-400">{state.errors.message[0]}</p>}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Đang gửi..." : "Gửi lời nhắn"}
        </Button>
        {state.success ? <p className="text-sm text-green-400">Gửi lời nhắn thành công!</p> : null}
      </form>
    </div>
  );
}
