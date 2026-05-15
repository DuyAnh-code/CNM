"use client";

import { useState } from "react";
import { addToCart } from "@/app/actions/cart";

export function AddToCartButton({ productId, stock }: { productId: string; stock: number }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleAdd() {
    setLoading(true);
    setMessage(null);
    const result = await addToCart(productId, quantity);
    setLoading(false);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Đã thêm vào giỏ hàng! 🎉" });
      // Notify cart icon to update
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
      }
    }

    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--muted-strong)]">Số lượng:</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="qty-btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-10 text-center font-semibold text-[var(--foreground)]">{quantity}</span>
          <button
            type="button"
            className="qty-btn"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={loading || stock === 0}
        className="w-full rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Đang thêm..." : stock === 0 ? "Hết hàng" : "🛒 Thêm vào giỏ hàng"}
      </button>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm text-center ${
            message.type === "success"
              ? "border border-green-500/30 bg-green-500/10 text-green-400"
              : "border border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
