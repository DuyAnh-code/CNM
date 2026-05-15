import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product-card";

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const categorySlug = sp.category || "";
  const query = sp.q || "";
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  // Fetch categories for filter
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  // Build product query
  let productQuery = supabase
    .from("products")
    .select("*, categories(name, slug)", { count: "exact" })
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (categorySlug) {
    const cat = categories?.find((c) => c.slug === categorySlug);
    if (cat) {
      productQuery = productQuery.eq("category_id", cat.id);
    }
  }

  if (query) {
    productQuery = productQuery.ilike("name", `%${query}%`);
  }

  const { data: products, count } = await productQuery.range(from, to);

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildUrl(params: Record<string, string>) {
    const p = new URLSearchParams();
    if (params.page && params.page !== "1") p.set("page", params.page);
    if (params.category) p.set("category", params.category);
    if (params.q) p.set("q", params.q);
    const qs = p.toString();
    return qs ? `/products?${qs}` : "/products";
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Sản phẩm</span>
        </h1>
        <p className="mt-2 text-[var(--muted-strong)]">
          {total} sản phẩm {categorySlug ? `trong danh mục` : ""}
        </p>
      </div>

      {/* Search & Category filter */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <form className="flex-1" action="/products" method="GET">
          {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 pl-10 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-strong)]">🔍</span>
          </div>
        </form>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              !categorySlug
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] text-[var(--muted-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            Tất cả
          </Link>
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={buildUrl({ category: cat.slug, q: query })}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                categorySlug === cat.slug
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] text-[var(--muted-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl glass py-16 text-center">
          <div className="mb-4 text-5xl">🐾</div>
          <p className="text-[var(--muted-strong)]">Không tìm thấy sản phẩm nào.</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Xem tất cả sản phẩm →
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-4 text-sm">
          {page > 1 ? (
            <Link
              href={buildUrl({ page: String(page - 1), category: categorySlug, q: query })}
              className="rounded-lg border border-[var(--border)] px-4 py-2.5 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              ← Trước
            </Link>
          ) : (
            <span className="opacity-30">← Trước</span>
          )}
          <span className="text-[var(--muted-strong)]">
            Trang {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={buildUrl({ page: String(page + 1), category: categorySlug, q: query })}
              className="rounded-lg border border-[var(--border)] px-4 py-2.5 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Sau →
            </Link>
          ) : (
            <span className="opacity-30">Sau →</span>
          )}
        </nav>
      )}
    </div>
  );
}
