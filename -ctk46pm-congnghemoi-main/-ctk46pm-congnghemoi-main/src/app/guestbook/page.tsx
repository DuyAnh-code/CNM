import DeleteButton from "@/components/delete-button";
import GuestbookForm from "@/components/guestbook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { guestbookEntries } from "@/data/guestbook";

export default function GuestbookPage() {
  const entries = guestbookEntries;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-[#143A52] dark:text-white">So luu but</h1>
      <p className="mb-8 text-[#6E828A] dark:text-gray-400">Hay de lai loi nhan cho toi nhe!</p>
      <GuestbookForm />
      <Separator className="my-8" />
      <div className="space-y-4">
        <p className="text-sm text-[#6E828A] dark:text-gray-400">{entries.length} loi nhan</p>
        {entries.map((entry) => (
          <Card key={entry.id} className="border-[#CDE3EB] dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-[#143A52] dark:text-white">{entry.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#6E828A] dark:text-gray-400">
                    {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <DeleteButton id={entry.id} />
                </div>
              </div>
              <p className="text-[#6E828A] dark:text-gray-300">{entry.message}</p>
            </CardContent>
          </Card>
        ))}
        {entries.length === 0 ? (
          <p className="py-8 text-center text-[#6E828A] dark:text-gray-400">Chua co loi nhan nao. Hay la nguoi dau tien!</p>
        ) : null}
      </div>
    </div>
  );
}
