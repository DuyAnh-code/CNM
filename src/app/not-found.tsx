import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-float">🐾</div>
        <h2 className="text-3xl font-bold text-[var(--foreground)]">404</h2>
        <p className="text-[var(--muted-strong)]">
          Trang bạn tìm kiếm không tồn tại.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-white transition-all hover:bg-[var(--accent-hover)]"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
