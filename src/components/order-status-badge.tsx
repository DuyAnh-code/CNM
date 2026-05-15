import type { OrderStatus } from "@/types/database";

const STATUS_MAP: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Chờ xác nhận", className: "badge-pending" },
  confirmed: { label: "Đã xác nhận", className: "badge-confirmed" },
  shipping: { label: "Đang giao", className: "badge-shipping" },
  delivered: { label: "Đã giao", className: "badge-delivered" },
  cancelled: { label: "Đã hủy", className: "badge-cancelled" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const info = STATUS_MAP[status] ?? STATUS_MAP.pending;
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${info.className}`}>
      {info.label}
    </span>
  );
}
