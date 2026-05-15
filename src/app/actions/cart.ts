"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Bạn cần đăng nhập để thêm vào giỏ hàng" };
  }

  // Check if item already in cart
  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);

    if (error) return { error: "Không thể cập nhật giỏ hàng" };
  } else {
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      quantity,
    });

    if (error) return { error: "Không thể thêm vào giỏ hàng" };
  }

  revalidatePath("/cart");
  return { success: true };
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Chưa đăng nhập" };

  if (quantity <= 0) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId)
      .eq("user_id", user.id);

    if (error) return { error: "Không thể xóa sản phẩm" };
  } else {
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId)
      .eq("user_id", user.id);

    if (error) return { error: "Không thể cập nhật số lượng" };
  }

  revalidatePath("/cart");
  return { success: true };
}

export async function removeCartItem(cartItemId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Chưa đăng nhập" };

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  if (error) return { error: "Không thể xóa sản phẩm" };

  revalidatePath("/cart");
  return { success: true };
}

export async function clearCart() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Chưa đăng nhập" };

  await supabase.from("cart_items").delete().eq("user_id", user.id);
  revalidatePath("/cart");
  return { success: true };
}
