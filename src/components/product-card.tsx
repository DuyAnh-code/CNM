import Link from "next/link";

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    price: number;
    original_price: number | null;
    image_url: string | null;
    sold: number;
    stock: number;
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block rounded-xl glass overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">🐾</div>
        )}
        {discount > 0 && (
          <span className="sale-badge">-{discount}%</span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-lg bg-[var(--danger)] px-3 py-1 text-sm font-bold text-white">
              Hết hàng
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[var(--accent)]">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="price-original text-xs">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
        <div className="mt-2 text-xs text-[var(--muted-strong)]">
          Đã bán {product.sold}
        </div>
      </div>
    </Link>
  );
}
