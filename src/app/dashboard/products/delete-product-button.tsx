"use client";

import { deleteProduct } from "@/app/actions/products";
import { useState } from "react";

export function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Bạn có chắc muốn xóa "${productName}"?`)) return;
    setLoading(true);
    await deleteProduct(productId);
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
    >
      {loading ? "..." : "Xóa"}
    </button>
  );
}
