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
    <div className="flex min-h-[70vh] items-center justify-center animate-fade-in-up">
      <div className="w-full max-w-md space-y-6 rounded-2xl glass p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-400 text-xl font-bold text-white glow-sm">
            🔑
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Quên mật khẩu</h2>
          <p className="mt-2 text-sm text-[var(--muted-strong)]">
            Nhập email để nhận liên kết đặt lại mật khẩu.
          </p>
        </div>

        {message ? (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20 disabled:opacity-50"
          >
            {loading ? "Đang gửi..." : "Gửi email"}
          </button>
        </form>

        <p className="text-center text-sm">
          <Link href="/login" className="text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
            ← Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
