"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl">🐾</div>
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Oops! Có lỗi xảy ra
        </h2>
        <p className="text-[var(--muted-strong)] max-w-md">
          {error.message || "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại."}
        </p>
        <button
          onClick={reset}
          className="rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-white transition-all hover:bg-[var(--accent-hover)]"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
