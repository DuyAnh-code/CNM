import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/components/product-card";
import { DeleteProductButton } from "./delete-product-button";

export default async function DashboardProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">📦 Quản lý sản phẩm</span>
        </h1>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-orange-500/20"
        >
          ➕ Thêm sản phẩm
        </Link>
      </div>

      {products && products.length > 0 ? (
        <div className="overflow-x-auto rounded-xl glass">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-4 py-3 text-left text-[var(--muted-strong)] font-medium">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-[var(--muted-strong)] font-medium">Danh mục</th>
                <th className="px-4 py-3 text-left text-[var(--muted-strong)] font-medium">Giá</th>
                <th className="px-4 py-3 text-left text-[var(--muted-strong)] font-medium">Kho</th>
                <th className="px-4 py-3 text-left text-[var(--muted-strong)] font-medium">Đã bán</th>
                <th className="px-4 py-3 text-left text-[var(--muted-strong)] font-medium">TT</th>
                <th className="px-4 py-3 text-right text-[var(--muted-strong)] font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const category = product.categories as { name: string } | null;
                return (
                  <tr key={product.id} className="border-b border-[var(--border)]/50 hover:bg-[var(--surface-elevated)]/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface)] text-lg">🐾</div>
                        )}
                        <span className="font-medium text-[var(--foreground)] line-clamp-1 max-w-[200px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-strong)]">{category?.name ?? "—"}</td>
                    <td className="px-4 py-3 font-medium text-[var(--accent)]">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">{product.sold}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block h-2 w-2 rounded-full ${product.status === "active" ? "bg-green-400" : "bg-red-400"}`} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/products/edit/${product.id}`}
                          className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                        >
                          Sửa
                        </Link>
                        <DeleteProductButton productId={product.id} productName={product.name} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl glass py-16 text-center">
          <div className="mb-4 text-5xl">📦</div>
          <p className="text-[var(--muted-strong)]">Chưa có sản phẩm nào.</p>
          <Link
            href="/dashboard/products/new"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Thêm sản phẩm đầu tiên →
          </Link>
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
