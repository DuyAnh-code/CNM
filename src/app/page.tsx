import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .eq("is_featured", true)
    .order("sold", { ascending: false })
    .limit(8);

  // Fetch newest products
  const { data: newProducts } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="animate-fade-in-up">
      {/* ─── Hero Section ─── */}
      <section className="relative mb-12 overflow-hidden rounded-2xl glass p-10 md:p-16 text-center">
        {/* Decorative elements */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-orange-500/20 opacity-30" />
        <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full border border-amber-400/10 opacity-20" />

        <div className="animate-float mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-5xl shadow-lg glow-md">
          🐾
        </div>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
          Chào mừng đến{" "}
          <span className="gradient-text">PetPals Shop</span>
        </h1>

        <p className="mx-auto mb-3 max-w-2xl text-lg text-[var(--muted-strong)]">
          Cửa hàng phụ kiện thú cưng <span className="text-[var(--accent)] font-medium">uy tín hàng đầu</span>.
          Đa dạng sản phẩm cho chó, mèo và các loại thú cưng.
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-[var(--muted-strong)]">
          Vòng cổ · Thức ăn · Đồ chơi · Quần áo · Chăm sóc · Nhà & nệm
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-orange-500/20"
          >
            <span>🛍️</span> Mua sắm ngay
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-7 py-3.5 font-medium text-[var(--foreground)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>🐕</span> Về chúng tôi
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Sản phẩm", value: "100+", icon: "📦" },
            { label: "Đã bán", value: "500+", icon: "✅" },
            { label: "Khách hàng", value: "200+", icon: "❤️" },
            { label: "Đánh giá 5⭐", value: "95%", icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 transition-all hover:border-[var(--accent)]/30">
              <div className="mb-1 text-xl">{stat.icon}</div>
              <div className="text-xl font-bold text-[var(--foreground)]">{stat.value}</div>
              <div className="text-xs text-[var(--muted-strong)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ─── */}
      {categories && categories.length > 0 && (
        <section className="mb-12 animate-fade-in-up-delay-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              <span className="gradient-text">Danh mục sản phẩm</span>
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Featured Products ─── */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="mb-12 animate-fade-in-up-delay-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              🔥 <span className="gradient-text">Sản phẩm nổi bật</span>
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              Xem thêm →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ─── New Products ─── */}
      {newProducts && newProducts.length > 0 && (
        <section className="mb-12 animate-fade-in-up-delay-3">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              🆕 <span className="gradient-text">Sản phẩm mới</span>
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              Xem thêm →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="rounded-2xl glass p-8 text-center">
        <h2 className="mb-3 text-2xl font-bold">
          🐶 Bạn cần tư vấn?
        </h2>
        <p className="mb-5 text-[var(--muted-strong)]">
          Liên hệ với chúng tôi để được tư vấn sản phẩm phù hợp nhất cho thú cưng của bạn.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-orange-500/20"
        >
          💬 Liên hệ ngay
        </Link>
      </section>
    </div>
  );
}
