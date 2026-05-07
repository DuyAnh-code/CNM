"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl py-16 text-center animate-fade-in-up">
      <div className="rounded-2xl glass p-10">
        <div className="mb-4 text-4xl">⚠️</div>
        <h1 className="mb-4 text-3xl font-bold text-[var(--foreground)]">
          Đã xảy ra lỗi hệ thống
        </h1>
        <p className="mb-2 text-[var(--muted-strong)]">
          {error.message || "Ứng dụng đang gặp sự cố. Vui lòng thử lại."}
        </p>
        {error.digest ? (
          <p className="mb-6 font-mono text-sm text-[var(--muted)]">
            Mã lỗi: {error.digest}
          </p>
        ) : null}

        <button
          onClick={() => reset()}
          className="rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-purple-500/20"
        >
          Thử tải trang
        </button>
      </div>
    </div>
  );
}
