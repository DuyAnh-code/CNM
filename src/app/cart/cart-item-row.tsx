"use client";

import Link from "next/link";
import { useState } from "react";
import { updateCartItemQuantity, removeCartItem } from "@/app/actions/cart";
import { formatPrice } from "@/components/product-card";

interface CartItemRowProps {
  cartItemId: string;
  productName: string;
  productImage: string | null;
  productSlug: string;
  price: number;
  quantity: number;
  stock: number;
}

export function CartItemRow({
  cartItemId,
  productName,
  productImage,
  productSlug,
  price,
  quantity,
  stock,
}: CartItemRowProps) {
  const [qty, setQty] = useState(quantity);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(newQty: number) {
    if (newQty < 1 || newQty > stock) return;
    setQty(newQty);
    setLoading(true);
    await updateCartItemQuantity(cartItemId, newQty);
    setLoading(false);
    if (typeof window !== "undefined") window.dispatchEvent(new Event("cart-updated"));
  }

  async function handleRemove() {
    setLoading(true);
    await removeCartItem(cartItemId);
    if (typeof window !== "undefined") window.dispatchEvent(new Event("cart-updated"));
  }

  return (
    <div className="flex gap-4 rounded-xl glass p-4">
      <Link href={`/products/${productSlug}`} className="shrink-0">
        {productImage ? (
          <img
            src={productImage}
            alt={productName}
            className="h-20 w-20 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[var(--surface)] text-2xl">🐾</div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${productSlug}`}
          className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors line-clamp-2"
        >
          {productName}
        </Link>
        <div className="mt-1 text-sm font-bold text-[var(--accent)]">{formatPrice(price)}</div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button type="button" className="qty-btn" onClick={() => handleUpdate(qty - 1)} disabled={loading || qty <= 1}>−</button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <button type="button" className="qty-btn" onClick={() => handleUpdate(qty + 1)} disabled={loading || qty >= stock}>+</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[var(--foreground)]">{formatPrice(price * qty)}</span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
