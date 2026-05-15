import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/components/product-card";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { UpdateOrderStatusForm } from "./update-status-form";
import type { OrderStatus } from "@/types/database";

export default async function DashboardOrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*), profiles(display_name)")
    .order("created_at", { ascending: false });

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">📋 Quản lý đơn hàng</span>
        </h1>
      </div>

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
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[var(--muted-strong)]">Mã đơn:</span>
                      <span className="text-xs font-mono font-bold text-[var(--foreground)]">{order.id.slice(0, 8).toUpperCase()}</span>
                      <OrderStatusBadge status={order.status as OrderStatus} />
                    </div>
                    <p className="text-sm text-[var(--foreground)]">
                      <strong>{order.full_name}</strong> · {order.phone}
                    </p>
                    <p className="text-xs text-[var(--muted-strong)]">{order.address}</p>
                    {order.note && (
                      <p className="mt-1 text-xs text-amber-400">📝 {order.note}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[var(--accent)]">{formatPrice(order.total)}</div>
                    <div className="text-xs text-[var(--muted-strong)]">
                      {new Date(order.created_at).toLocaleDateString("vi-VN", {
                        year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4 space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product_name} className="h-8 w-8 rounded object-cover" />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--surface-elevated)] text-xs">🐾</span>
                      )}
                      <span className="flex-1 text-[var(--foreground)] line-clamp-1">{item.product_name}</span>
                      <span className="text-[var(--muted-strong)]">x{item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Update status */}
                <UpdateOrderStatusForm orderId={order.id} currentStatus={order.status} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl glass py-16 text-center">
          <div className="mb-4 text-5xl">📋</div>
          <p className="text-[var(--muted-strong)]">Chưa có đơn hàng nào.</p>
        </div>
      )}

      <div className="mt-4">
        <Link href="/dashboard" className="text-sm text-[var(--muted-strong)] hover:text-[var(--accent)] transition-colors">
          ← Quay lại Dashboard
        </Link>
      </div>
    </div>
  );
}
