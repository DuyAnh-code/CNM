export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex gap-8">
        <div className="flex-1">{children}</div>

        <aside className="w-64 shrink-0">
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold">Danh muc</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="cursor-pointer hover:text-blue-600">Cong nghe</li>
              <li className="cursor-pointer hover:text-blue-600">Hoc tap</li>
              <li className="cursor-pointer hover:text-blue-600">Du an ca nhan</li>
              <li className="cursor-pointer hover:text-blue-600">Cuoc song</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
