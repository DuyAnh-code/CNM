"use client";

import { useActionState } from "react";
import { createGuestbookEntry, ActionState } from "@/app/guestbook/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ActionState = {
  success: false,
};

export default function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(createGuestbookEntry, initialState);

  return (
    <Card className="mb-8 border-[#CDE3EB] dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-[#143A52] dark:text-white">Viet loi nhan</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ten cua ban</Label>
            <Input id="name" name="name" placeholder="Nhap ten cua ban" required />
            {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Loi nhan</Label>
            <Textarea id="message" name="message" placeholder="Viet loi nhan cua ban..." required rows={3} />
            {state.errors?.message && <p className="text-sm text-red-500">{state.errors.message[0]}</p>}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Dang gui..." : "Gui loi nhan"}
          </Button>
          {state.success ? <p className="text-sm text-green-600">Gui loi nhan thanh cong!</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
