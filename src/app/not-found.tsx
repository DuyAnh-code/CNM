import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl py-24 text-center animate-fade-in-up">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-400 text-5xl animate-float glow-md">
        🚀
      </div>
      <h1 className="mb-2 text-7xl font-extrabold gradient-text">404</h1>
      <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)]">Trang không tồn tại</h2>
      <p className="mb-8 text-[var(--muted-strong)]">
        Xin lỗi, trang bạn đang tìm kiếm không có trên website này.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-purple-500/20"
      >
        ← Về trang chủ
      </Link>
    </div>
  );
}
