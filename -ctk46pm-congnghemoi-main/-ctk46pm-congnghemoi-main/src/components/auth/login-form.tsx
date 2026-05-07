"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signErr) {
        setError(signErr.message);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setError(null);

    const { error: oauthErr } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (oauthErr) {
      setError(oauthErr.message);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {error ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <div>
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[#CDE3EB] bg-white px-4 py-2 text-sm font-medium text-[#143A52] shadow-sm hover:bg-[#E3EFF3] focus:outline-none focus:ring-2 focus:ring-[#143A52] focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          Đăng nhập với GitHub
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#CDE3EB] dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-[#6E828A] dark:bg-gray-900">Hoặc</span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
            className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 shadow-sm focus:border-[#143A52] focus:outline-none focus:ring-1 focus:ring-[#143A52] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md border border-transparent bg-[#143A52] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0f2f43] focus:outline-none focus:ring-2 focus:ring-[#143A52] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>

      <p className="text-center text-sm text-[#6E828A]">
        <Link href="/forgot-password" className="text-[#143A52] hover:underline dark:text-[#CDE3EB]">
          Quên mật khẩu?
        </Link>
      </p>

      <p className="text-center text-sm text-[#6E828A]">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="font-medium text-[#143A52] hover:underline dark:text-[#CDE3EB]">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
