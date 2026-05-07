import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-[#CDE3EB] bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#143A52] dark:text-white">Đăng nhập</h2>
          <p className="mt-2 text-[#6E828A] dark:text-gray-300">Đăng nhập để quản lý blog của bạn</p>
        </div>

        {params?.message ? (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/40 dark:text-green-200">
            {params.message}
          </div>
        ) : null}

        <LoginForm />
      </div>
    </div>
  );
}
