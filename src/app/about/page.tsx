export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl py-8 animate-fade-in-up">
      <h1 className="mb-8 text-3xl font-bold">
        <span className="gradient-text">Về PetPals Shop</span>
      </h1>

      <div className="space-y-6">
        {/* Intro */}
        <div className="rounded-2xl glass p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-3xl shadow-lg glow-sm">
              🐾
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)]">PetPals Shop</h2>
              <p className="text-sm text-[var(--muted-strong)]">Cửa hàng phụ kiện thú cưng uy tín</p>
            </div>
          </div>

          <p className="leading-relaxed text-[var(--muted-strong)]">
            <strong className="text-[var(--foreground)]">PetPals Shop</strong> ra đời với sứ mệnh mang đến
            những sản phẩm phụ kiện chất lượng cao, an toàn và phù hợp nhất cho thú cưng của bạn.
            Chúng tôi tin rằng thú cưng xứng đáng được chăm sóc tốt nhất — từ thức ăn dinh dưỡng,
            đồ chơi giải trí đến quần áo thời trang và dụng cụ chăm sóc.
          </p>
        </div>

        {/* Values */}
        <div className="rounded-2xl glass p-8">
          <h2 className="mb-5 text-xl font-bold text-[var(--foreground)]">🌟 Cam kết của chúng tôi</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: "✅", title: "Sản phẩm chính hãng", desc: "100% sản phẩm chính hãng, nguồn gốc rõ ràng" },
              { icon: "🚚", title: "Giao hàng nhanh", desc: "Giao hàng toàn quốc, miễn phí vận chuyển" },
              { icon: "💰", title: "Giá cả hợp lý", desc: "Cam kết giá tốt nhất, nhiều ưu đãi hấp dẫn" },
              { icon: "🔄", title: "Đổi trả dễ dàng", desc: "Đổi trả trong 7 ngày nếu sản phẩm lỗi" },
              { icon: "💬", title: "Tư vấn tận tâm", desc: "Đội ngũ tư vấn am hiểu về thú cưng" },
              { icon: "🛡️", title: "An toàn sức khỏe", desc: "Sản phẩm đạt tiêu chuẩn an toàn cho thú cưng" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)]/40"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-1 text-xs text-[var(--muted-strong)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product categories */}
        <div className="rounded-2xl glass p-8">
          <h2 className="mb-5 text-xl font-bold text-[var(--foreground)]">🛍️ Sản phẩm kinh doanh</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { icon: "🎀", name: "Vòng cổ & Dây dắt" },
              { icon: "🦴", name: "Thức ăn & Hạt" },
              { icon: "🧸", name: "Đồ chơi" },
              { icon: "👗", name: "Quần áo" },
              { icon: "🧴", name: "Chăm sóc" },
              { icon: "🏠", name: "Nhà & Nệm" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="group flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent-subtle)]"
              >
                <span className="text-xl transition-transform group-hover:scale-110">{cat.icon}</span>
                <span className="text-sm font-medium text-[var(--foreground)]">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="rounded-2xl glass p-8">
          <h2 className="mb-5 text-xl font-bold text-[var(--foreground)]">📍 Thông tin liên hệ</h2>
          <div className="space-y-3 text-[var(--muted-strong)]">
            <p>📧 Email: <span className="text-[var(--foreground)]">petpals@shop.vn</span></p>
            <p>📞 Hotline: <span className="text-[var(--foreground)]">0123 456 789</span></p>
            <p>📍 Địa chỉ: <span className="text-[var(--foreground)]">01 Phù Đổng Thiên Vương, Đà Lạt</span></p>
            <p>🕐 Giờ mở cửa: <span className="text-[var(--foreground)]">8:00 - 21:00 hàng ngày</span></p>
          </div>
        </div>

        {/* Student info */}
        <div className="rounded-2xl glass p-8 text-center">
          <p className="text-sm text-[var(--muted-strong)]">
            Dự án được xây dựng bởi <strong className="text-[var(--foreground)]">Lê Bình Duy Anh</strong> (MSSV: 2212338)
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            CTK46A · ĐH Đà Lạt · Môn Công nghệ Mới
          </p>
        </div>
      </div>
    </div>
  );
}
