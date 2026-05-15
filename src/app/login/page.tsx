import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center animate-fade-in-up">
      <div className="w-full max-w-md space-y-8 rounded-2xl glass p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-2xl shadow-lg glow-sm">
            🐾
          </div>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Đăng nhập</h2>
          <p className="mt-2 text-[var(--muted-strong)]">Đăng nhập để mua sắm tại PetPals</p>
        </div>

        {params?.message ? (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
            {params.message}
          </div>
        ) : null}

        <LoginForm />
      </div>
    </div>
  );
}
