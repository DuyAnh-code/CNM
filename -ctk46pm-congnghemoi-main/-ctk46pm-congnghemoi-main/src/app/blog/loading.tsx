export default function BlogLoading() {
  return (
    <div>
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-[#CDE3EB]" />
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-[#CDE3EB] bg-white p-6">
            <div className="mb-3 flex gap-3">
              <div className="h-5 w-20 animate-pulse rounded bg-[#CDE3EB]" />
              <div className="h-5 w-24 animate-pulse rounded bg-[#E3EFF3]" />
            </div>
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-[#CDE3EB]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#E3EFF3]" />
            <div className="mt-1 h-4 w-2/3 animate-pulse rounded bg-[#E3EFF3]" />
          </div>
        ))}
      </div>
    </div>
  );
}
