import DeleteButton from "@/components/delete-button";
import GuestbookForm from "@/components/guestbook-form";
import { Separator } from "@/components/ui/separator";
import { guestbookEntries } from "@/data/guestbook";

export default function GuestbookPage() {
  const entries = guestbookEntries;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 animate-fade-in-up">
      <h1 className="mb-2 text-3xl font-bold">
        <span className="gradient-text">Sổ lưu bút</span>
      </h1>
      <p className="mb-8 text-[var(--muted-strong)]">Hãy để lại lời nhắn cho tôi nhé!</p>

      <GuestbookForm />
      <Separator className="my-8" />

      <div className="space-y-4">
        <p className="text-sm text-[var(--muted-strong)]">{entries.length} lời nhắn</p>
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl glass p-5 transition-all hover:glow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-[var(--foreground)]">{entry.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--muted-strong)]">
                  {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
                </span>
                <DeleteButton id={entry.id} />
              </div>
            </div>
            <p className="text-[var(--muted-strong)]">{entry.message}</p>
          </div>
        ))}
        {entries.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-3 text-3xl">📝</div>
            <p className="text-[var(--muted-strong)]">Chưa có lời nhắn nào. Hãy là người đầu tiên!</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
