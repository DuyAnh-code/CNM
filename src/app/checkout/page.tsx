import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/components/product-card";
import { CheckoutForm } from "./checkout-form";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get cart items
  const { data: cartItems } = await supabase
    .from("cart_items")
    .select("*, products(name, image_url, price)")
    .eq("user_id", user.id);

  const items = cartItems ?? [];

  if (items.length === 0) {
    redirect("/cart");
  }

  const total = items.reduce((sum, item) => {
    const product = item.products as { price: number } | null;
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  // Get user profile for pre-fill
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, phone, address")
    .eq("id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up">
      <h1 className="mb-8 text-3xl font-bold">
        <span className="gradient-text">📋 Thanh toán</span>
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <CheckoutForm
            defaultName={profile?.display_name ?? ""}
            defaultPhone={profile?.phone ?? ""}
            defaultAddress={profile?.address ?? ""}
          />
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl glass p-6 space-y-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Đơn hàng</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {items.map((item) => {
                const product = item.products as { name: string; image_url: string | null; price: number } | null;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    {product?.image_url ? (
                      <img src={product.image_url} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--surface)] text-lg">🐾</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] line-clamp-1">
                        {product?.name ?? "Sản phẩm"}
                      </p>
                      <p className="text-xs text-[var(--muted-strong)]">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {formatPrice((product?.price ?? 0) * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[var(--border)] pt-3">
              <div className="flex justify-between text-sm text-[var(--muted-strong)]">
                <span>Phí vận chuyển</span>
                <span className="text-green-400">Miễn phí</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-bold text-[var(--foreground)]">Tổng cộng</span>
                <span className="text-xl font-bold text-[var(--accent)]">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/cart" className="block text-center text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
              ← Quay lại giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
