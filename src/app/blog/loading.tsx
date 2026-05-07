export default function BlogLoading() {
  return (
    <div>
      <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-[var(--surface-elevated)]" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl glass p-6">
            <div className="mb-3 flex gap-3">
              <div className="h-5 w-20 animate-pulse rounded-md bg-[var(--surface-elevated)]" />
              <div className="h-5 w-24 animate-pulse rounded-md bg-[var(--muted)]" />
            </div>
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded-md bg-[var(--surface-elevated)]" />
            <div className="h-4 w-full animate-pulse rounded-md bg-[var(--muted)]" />
            <div className="mt-1 h-4 w-2/3 animate-pulse rounded-md bg-[var(--muted)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
