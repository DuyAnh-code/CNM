"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signErr } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });

      if (signErr) {
        setError(signErr.message);
        return;
      }

      if (data.user) {
        router.push(
          "/login?message=" +
            encodeURIComponent(
              "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận (nếu bật xác nhận email).",
            ),
        );
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="mt-8 space-y-6">
      {error ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <div className="space-y-4">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-[#143A52] dark:text-gray-200">
            Tên hiển thị
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 shadow-sm focus:border-[#143A52] focus:outline-none focus:ring-1 focus:ring-[#143A52] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Nguyễn Văn A"
          />
        </div>

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
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#143A52] dark:text-gray-200">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 shadow-sm focus:border-[#143A52] focus:outline-none focus:ring-1 focus:ring-[#143A52] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-[#6E828A]">Tối thiểu 6 ký tự</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full justify-center rounded-md border border-transparent bg-[#143A52] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0f2f43] focus:outline-none focus:ring-2 focus:ring-[#143A52] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-600"
      >
        {loading ? "Đang xử lý..." : "Đăng ký"}
      </button>

      <p className="text-center text-sm text-[#6E828A]">
        Đã có tài khoản?{" "}
        <Link href="/login" className="font-medium text-[#143A52] hover:underline dark:text-[#CDE3EB]">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
