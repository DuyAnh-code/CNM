"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      if (resetErr) {
        setError(resetErr.message);
        return;
      }
      setMessage("Đã gửi email khôi phục. Kiểm tra hộp thư và làm theo hướng dẫn.");
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-[#CDE3EB] bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#143A52] dark:text-white">Quên mật khẩu</h2>
          <p className="mt-2 text-sm text-[#6E828A] dark:text-gray-300">
            Nhập email để nhận liên kết đặt lại mật khẩu.
          </p>
        </div>

        {message ? (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/40 dark:text-green-200">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#143A52] dark:text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 shadow-sm focus:border-[#143A52] focus:outline-none focus:ring-1 focus:ring-[#143A52] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#143A52] px-4 py-2 text-white hover:bg-[#0f2f43] disabled:opacity-50"
          >
            {loading ? "Đang gửi..." : "Gửi email"}
          </button>
        </form>

        <p className="text-center text-sm">
          <Link href="/login" className="text-[#143A52] hover:underline dark:text-[#CDE3EB]">
            ← Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
