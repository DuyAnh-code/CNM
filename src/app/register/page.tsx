import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center animate-fade-in-up">
      <div className="w-full max-w-md space-y-8 rounded-2xl glass p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-2xl shadow-lg glow-sm">
            🐾
          </div>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Đăng ký tài khoản</h2>
          <p className="mt-2 text-[var(--muted-strong)]">Tạo tài khoản để mua sắm tại PetPals</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
