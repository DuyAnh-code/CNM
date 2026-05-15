import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 text-lg">
                🐾
              </span>
              <span className="text-lg font-bold text-[var(--foreground)]">
                PetPals Shop
              </span>
            </div>
            <p className="text-sm text-[var(--muted-strong)] leading-relaxed">
              Cửa hàng phụ kiện thú cưng uy tín. Chuyên cung cấp vòng cổ, thức ăn, đồ chơi, quần áo và đồ chăm sóc cho chó mèo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">Liên kết</h3>
            <div className="space-y-2 text-sm text-[var(--muted-strong)]">
              <Link href="/products" className="block transition-colors hover:text-[var(--accent)]">
                Sản phẩm
              </Link>
              <Link href="/about" className="block transition-colors hover:text-[var(--accent)]">
                Giới thiệu
              </Link>
              <Link href="/contact" className="block transition-colors hover:text-[var(--accent)]">
                Liên hệ
              </Link>
              <Link href="/orders" className="block transition-colors hover:text-[var(--accent)]">
                Theo dõi đơn hàng
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">Liên hệ</h3>
            <div className="space-y-2 text-sm text-[var(--muted-strong)]">
              <p>📧 petpals@shop.vn</p>
              <p>📞 0123 456 789</p>
              <p>📍 01 Phù Đổng Thiên Vương, Đà Lạt</p>
              <p>🕐 8:00 - 21:00 hàng ngày</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center">
          <p className="text-xs text-[var(--muted)]">
            © 2026 PetPals Shop · MSSV 2212338 · CTK46A · ĐH Đà Lạt
          </p>
        </div>
      </div>
    </footer>
  );
}
