"use client";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-12 text-center animate-fade-in-up">
      <div className="mb-4 text-4xl">⚠️</div>
      <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)]">Đã xảy ra lỗi!</h2>
      <p className="mb-6 text-[var(--muted-strong)]">
        {error.message || "Không thể tải nội dung blog. Vui lòng thử lại."}
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-[var(--accent)] px-6 py-2.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20"
      >
        Thử lại
      </button>
    </div>
  );
}
