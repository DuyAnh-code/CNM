import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CartItemRow } from "./cart-item-row";
import { formatPrice } from "@/components/product-card";

export default async function CartPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const items = cartItems ?? [];
  const total = items.reduce((sum, item) => {
    const product = item.products as { price: number } | null;
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up">
      <h1 className="mb-8 text-3xl font-bold">
        <span className="gradient-text">🛒 Giỏ hàng</span>
      </h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = item.products as {
                name: string;
                image_url: string | null;
                price: number;
                slug: string;
                stock: number;
              } | null;

              return (
                <CartItemRow
                  key={item.id}
                  cartItemId={item.id}
                  productName={product?.name ?? "Sản phẩm"}
                  productImage={product?.image_url ?? null}
                  productSlug={product?.slug ?? ""}
                  price={product?.price ?? 0}
                  quantity={item.quantity}
                  stock={product?.stock ?? 0}
                />
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl glass p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--foreground)]">Tóm tắt</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[var(--muted-strong)]">
                  <span>{items.length} sản phẩm</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-[var(--muted-strong)]">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-400">Miễn phí</span>
                </div>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-[var(--foreground)]">Tổng cộng</span>
                  <span className="text-xl font-bold text-[var(--accent)]">{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-orange-500/20"
              >
                Tiến hành thanh toán →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl glass py-16 text-center">
          <div className="mb-4 text-5xl">🛒</div>
          <p className="text-[var(--muted-strong)]">Giỏ hàng trống.</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Tiếp tục mua sắm →
          </Link>
        </div>
      )}
    </div>
  );
}
