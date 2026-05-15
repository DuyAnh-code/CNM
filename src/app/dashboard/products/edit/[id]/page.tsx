import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ProductForm } from "../../product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) notFound();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up">
      <div className="mb-8">
        <Link href="/dashboard/products" className="text-sm text-[var(--muted-strong)] hover:text-[var(--accent)] transition-colors">
          ← Quay lại danh sách
        </Link>
        <h1 className="mt-4 text-3xl font-bold">
          <span className="gradient-text">✏️ Sửa sản phẩm</span>
        </h1>
      </div>

      <ProductForm categories={categories ?? []} product={product} />
    </div>
  );
}
