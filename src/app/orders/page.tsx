import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/components/product-card";
import { OrderStatusBadge } from "@/components/order-status-badge";
import type { OrderStatus } from "@/types/database";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up">
      <h1 className="mb-8 text-3xl font-bold">
        <span className="gradient-text">📦 Đơn hàng của tôi</span>
      </h1>

      {sp.success && (
        <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center">
          <div className="mb-2 text-3xl">🎉</div>
          <p className="font-medium text-green-400">Đặt hàng thành công!</p>
          <p className="mt-1 text-sm text-green-300/70">
            Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
          </p>
        </div>
      )}

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const items = (order.order_items ?? []) as {
              id: string;
              product_name: string;
              product_image: string | null;
              quantity: number;
              price: number;
            }[];

            return (
              <div key={order.id} className="rounded-xl glass p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-[var(--muted-strong)]">Mã đơn: </span>
                    <span className="text-xs font-mono text-[var(--foreground)]">
                      {order.id.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                  <OrderStatusBadge status={order.status as OrderStatus} />
                </div>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product_name} className="h-12 w-12 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--surface)] text-lg">🐾</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--foreground)] line-clamp-1">{item.product_name}</p>
                        <p className="text-xs text-[var(--muted-strong)]">x{item.quantity} · {formatPrice(item.price)}</p>
                      </div>
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
                  <span className="text-xs text-[var(--muted-strong)]">
                    {new Date(order.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-[var(--muted-strong)]">Tổng: </span>
                    <span className="text-lg font-bold text-[var(--accent)]">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl glass py-16 text-center">
          <div className="mb-4 text-5xl">📦</div>
          <p className="text-[var(--muted-strong)]">Bạn chưa có đơn hàng nào.</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Bắt đầu mua sắm →
          </Link>
        </div>
      )}
    </div>
  );
}
