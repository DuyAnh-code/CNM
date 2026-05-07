export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-xs font-bold text-white">
              DA
            </span>
            <span className="text-sm font-medium text-[var(--foreground)]">
              Lê Bình Duy Anh
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-[var(--muted-strong)]">
            <a
              href="https://github.com/duyanh-le"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--accent)]"
            >
              GitHub
            </a>
            <span className="text-[var(--muted)]">·</span>
            <a
              href="mailto:2212338@sv.dlu.edu.vn"
              className="transition-colors hover:text-[var(--accent)]"
            >
              Email
            </a>
            <span className="text-[var(--muted)]">·</span>
            <span>MSSV 2212338</span>
          </div>

          <p className="text-xs text-[var(--muted)]">
            © 2026 · CTK46A · ĐH Đà Lạt
          </p>
        </div>
      </div>
    </footer>
  );
}
