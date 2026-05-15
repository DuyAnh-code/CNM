"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const note = formData.get("note") as string;

  if (!fullName || !phone || !address) {
    return { error: "Vui lòng điền đầy đủ thông tin" };
  }

  // Get cart items with product info
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("user_id", user.id);

  if (cartError || !cartItems || cartItems.length === 0) {
    return { error: "Giỏ hàng trống" };
  }

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    const product = item.products as { price: number } | null;
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total,
      full_name: fullName,
      phone,
      address,
      note: note || null,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { error: "Không thể tạo đơn hàng: " + orderError?.message };
  }

  // Create order items
  const orderItems = cartItems.map((item) => {
    const product = item.products as { name: string; image_url: string | null; price: number } | null;
    return {
      order_id: order.id,
      product_id: item.product_id,
      product_name: product?.name ?? "Sản phẩm",
      product_image: product?.image_url ?? null,
      quantity: item.quantity,
      price: product?.price ?? 0,
    };
  });

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

  if (itemsError) {
    // Rollback order
    await supabase.from("orders").delete().eq("id", order.id);
    return { error: "Không thể tạo chi tiết đơn hàng" };
  }

  // Clear cart
  await supabase.from("cart_items").delete().eq("user_id", user.id);

  revalidatePath("/orders");
  revalidatePath("/cart");
  redirect("/orders?success=true");
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Chưa đăng nhập" };

  // Check admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Bạn không có quyền thực hiện" };
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) return { error: "Không thể cập nhật trạng thái" };

  revalidatePath("/dashboard/orders");
  return { success: true };
}
