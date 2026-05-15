"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\sà-ỹ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "san-pham";
}

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, isAdmin: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { supabase, user, isAdmin: profile?.role === "admin" };
}

export async function createProduct(formData: FormData) {
  const { supabase, isAdmin } = await checkAdmin();
  if (!isAdmin) return { error: "Không có quyền" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const detail = formData.get("detail") as string;
  const price = Number(formData.get("price"));
  const originalPrice = formData.get("original_price") ? Number(formData.get("original_price")) : null;
  const categoryId = formData.get("category_id") as string;
  const imageUrl = formData.get("image_url") as string;
  const stock = Number(formData.get("stock") || 0);
  const isFeatured = formData.get("is_featured") === "on";

  if (!name || !price) return { error: "Tên và giá sản phẩm là bắt buộc" };

  const slug = generateSlug(name) + "-" + Date.now().toString(36);

  const { error } = await supabase.from("products").insert({
    name,
    slug,
    description: description || null,
    detail: detail || null,
    price,
    original_price: originalPrice,
    category_id: categoryId || null,
    image_url: imageUrl || null,
    stock,
    is_featured: isFeatured,
    status: "active",
  });

  if (error) return { error: "Không thể tạo sản phẩm: " + error.message };

  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { success: true };
}

export async function updateProduct(productId: string, formData: FormData) {
  const { supabase, isAdmin } = await checkAdmin();
  if (!isAdmin) return { error: "Không có quyền" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const detail = formData.get("detail") as string;
  const price = Number(formData.get("price"));
  const originalPrice = formData.get("original_price") ? Number(formData.get("original_price")) : null;
  const categoryId = formData.get("category_id") as string;
  const imageUrl = formData.get("image_url") as string;
  const stock = Number(formData.get("stock") || 0);
  const isFeatured = formData.get("is_featured") === "on";
  const status = formData.get("status") as string || "active";

  if (!name || !price) return { error: "Tên và giá sản phẩm là bắt buộc" };

  const { error } = await supabase
    .from("products")
    .update({
      name,
      description: description || null,
      detail: detail || null,
      price,
      original_price: originalPrice,
      category_id: categoryId || null,
      image_url: imageUrl || null,
      stock,
      is_featured: isFeatured,
      status,
    })
    .eq("id", productId);

  if (error) return { error: "Không thể cập nhật sản phẩm: " + error.message };

  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProduct(productId: string) {
  const { supabase, isAdmin } = await checkAdmin();
  if (!isAdmin) return { error: "Không có quyền" };

  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) return { error: "Không thể xóa sản phẩm" };

  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { success: true };
}
