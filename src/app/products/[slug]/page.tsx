import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { StarRating } from "@/components/star-rating";
import { AddToCartButton } from "./add-to-cart-button";
import { formatPrice } from "@/components/product-card";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, profiles(display_name, avatar_url)")
    .eq("product_id", product.id)
    .order("created_at", { ascending: false });

  const avgRating = reviews && reviews.length > 0
    ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
    : 0;

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const category = product.categories as { name: string; slug: string } | null;

  return (
    <div className="animate-fade-in-up">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[var(--muted-strong)]">
        <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
        <span className="mx-2">›</span>
        <Link href="/products" className="hover:text-[var(--accent)] transition-colors">Sản phẩm</Link>
        {category && (
          <>
            <span className="mx-2">›</span>
            <Link href={`/products?category=${category.slug}`} className="hover:text-[var(--accent)] transition-colors">
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2">›</span>
        <span className="text-[var(--foreground)]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl glass">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover aspect-square"
            />
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center text-8xl bg-[var(--surface)]">
              🐾
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            {category && (
              <Link
                href={`/products?category=${category.slug}`}
                className="mb-2 inline-block rounded-full bg-[var(--accent-subtle)] px-3 py-1 text-xs font-medium text-[var(--accent)]"
              >
                {category.name}
              </Link>
            )}
            <h1 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          {reviews && reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={avgRating} size="md" />
              <span className="text-sm text-[var(--muted-strong)]">
                ({reviews.length} đánh giá)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[var(--accent)]">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <>
                  <span className="price-original text-lg">
                    {formatPrice(product.original_price)}
                  </span>
                  <span className="rounded-lg bg-red-500/15 px-2 py-1 text-sm font-bold text-red-400">
                    -{discount}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">Mô tả</h3>
              <p className="text-[var(--muted-strong)] leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[var(--muted-strong)]">Kho:</span>
            {product.stock > 0 ? (
              <span className="text-green-400 font-medium">Còn {product.stock} sản phẩm</span>
            ) : (
              <span className="text-red-400 font-medium">Hết hàng</span>
            )}
            <span className="text-[var(--muted-strong)]">·</span>
            <span className="text-[var(--muted-strong)]">Đã bán {product.sold}</span>
          </div>

          {/* Add to cart */}
          <AddToCartButton productId={product.id} stock={product.stock} />
        </div>
      </div>

      {/* Detail */}
      {product.detail && (
        <section className="mt-12 rounded-2xl glass p-8">
          <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">📋 Chi tiết sản phẩm</h2>
          <div className="text-[var(--muted-strong)] leading-relaxed whitespace-pre-line">
            {product.detail}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="mt-8 rounded-2xl glass p-8">
        <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">
          ⭐ Đánh giá ({reviews?.length ?? 0})
        </h2>
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => {
              const profile = review.profiles as { display_name: string | null } | null;
              return (
                <div key={review.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {profile?.display_name ?? "Ẩn danh"}
                      </span>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-xs text-[var(--muted-strong)]">
                      {new Date(review.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-[var(--muted-strong)]">{review.comment}</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-[var(--muted-strong)]">Chưa có đánh giá nào.</p>
        )}
      </section>
    </div>
  );
}
