"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/app/actions/orders";

const STATUSES = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "delivered", label: "Đã giao" },
  { value: "cancelled", label: "Đã hủy" },
];

export function UpdateOrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleUpdate() {
    if (status === currentStatus) return;
    setLoading(true);
    const result = await updateOrderStatus(orderId, status);
    setLoading(false);
    if (!result.error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className="rounded-lg bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "..." : saved ? "✅" : "Cập nhật"}
      </button>
    </div>
  );
}
