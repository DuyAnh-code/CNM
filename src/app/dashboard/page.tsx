import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/components/product-card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // Stats
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: pendingOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { data: revenueData } = await supabase
    .from("orders")
    .select("total")
    .in("status", ["confirmed", "shipping", "delivered"]);

  const totalRevenue = (revenueData ?? []).reduce((sum, o) => sum + Number(o.total), 0);

  // Recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*, profiles(display_name)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">🛠️ Quản lý Shop</span>
        </h1>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Sản phẩm", value: totalProducts ?? 0, icon: "📦", color: "text-blue-400" },
          { label: "Tổng đơn hàng", value: totalOrders ?? 0, icon: "🛍️", color: "text-green-400" },
          { label: "Chờ xác nhận", value: pendingOrders ?? 0, icon: "⏳", color: "text-amber-400" },
          { label: "Doanh thu", value: formatPrice(totalRevenue), icon: "💰", color: "text-orange-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl glass p-5 transition-all hover:glow-sm">
            <div className="mb-2 text-2xl">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="mt-1 text-sm text-[var(--muted-strong)]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/products"
          className="group flex items-center gap-4 rounded-xl glass p-6 transition-all hover:glow-sm"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-2xl">📦</span>
          <div>
            <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              Quản lý sản phẩm
            </h3>
            <p className="text-sm text-[var(--muted-strong)]">Thêm, sửa, xóa sản phẩm</p>
          </div>
          <span className="ml-auto text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">→</span>
        </Link>

        <Link
          href="/dashboard/orders"
          className="group flex items-center gap-4 rounded-xl glass p-6 transition-all hover:glow-sm"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/15 text-2xl">📋</span>
          <div>
            <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              Quản lý đơn hàng
            </h3>
            <p className="text-sm text-[var(--muted-strong)]">Xem và cập nhật trạng thái</p>
          </div>
          <span className="ml-auto text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">→</span>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl glass p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--foreground)]">Đơn hàng gần đây</h2>
          <Link href="/dashboard/orders" className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
            Xem tất cả →
          </Link>
        </div>

        {recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-3 py-2 text-left text-[var(--muted-strong)] font-medium">Mã đơn</th>
                  <th className="px-3 py-2 text-left text-[var(--muted-strong)] font-medium">Khách hàng</th>
                  <th className="px-3 py-2 text-left text-[var(--muted-strong)] font-medium">Tổng</th>
                  <th className="px-3 py-2 text-left text-[var(--muted-strong)] font-medium">Trạng thái</th>
                  <th className="px-3 py-2 text-left text-[var(--muted-strong)] font-medium">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const orderProfile = order.profiles as { display_name: string | null } | null;
                  return (
                    <tr key={order.id} className="border-b border-[var(--border)]/50">
                      <td className="px-3 py-3 font-mono text-xs">{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="px-3 py-3">{order.full_name}</td>
                      <td className="px-3 py-3 font-medium text-[var(--accent)]">{formatPrice(order.total)}</td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium badge-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[var(--muted-strong)]">
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-8 text-center text-[var(--muted-strong)]">Chưa có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
}
