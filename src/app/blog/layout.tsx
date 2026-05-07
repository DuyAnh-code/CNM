export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex gap-8">
        <div className="flex-1">{children}</div>

        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20 rounded-xl glass p-5">
            <h3 className="mb-3 font-semibold text-[var(--foreground)]">Danh mục</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-strong)]">
              <li className="cursor-pointer rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]">Công nghệ</li>
              <li className="cursor-pointer rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]">Học tập</li>
              <li className="cursor-pointer rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]">Dự án cá nhân</li>
              <li className="cursor-pointer rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]">Cuộc sống</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
