"use client";

import { useActionState } from "react";
import { createOrder } from "@/app/actions/orders";

interface CheckoutFormProps {
  defaultName: string;
  defaultPhone: string;
  defaultAddress: string;
}

export function CheckoutForm({ defaultName, defaultPhone, defaultAddress }: CheckoutFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      const result = await createOrder(formData);
      return result;
    },
    null
  );

  return (
    <form action={formAction} className="space-y-4 rounded-2xl glass p-6">
      <h3 className="text-lg font-bold text-[var(--foreground)]">Thông tin giao hàng</h3>

      {state?.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Họ và tên *
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          defaultValue={defaultName}
          placeholder="Nguyễn Văn A"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Số điện thoại *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          defaultValue={defaultPhone}
          placeholder="0123 456 789"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Địa chỉ giao hàng *
        </label>
        <textarea
          id="address"
          name="address"
          required
          defaultValue={defaultAddress}
          rows={3}
          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
          className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Ghi chú (tùy chọn)
        </label>
        <textarea
          id="note"
          name="note"
          rows={2}
          placeholder="Ghi chú cho đơn hàng..."
          className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
        />
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-400">
        💡 Thanh toán khi nhận hàng (COD). Chúng tôi sẽ liên hệ xác nhận đơn hàng.
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Đang đặt hàng..." : "✅ Xác nhận đặt hàng"}
      </button>
    </form>
  );
}
