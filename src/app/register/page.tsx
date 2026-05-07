import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center animate-fade-in-up">
      <div className="w-full max-w-md space-y-8 rounded-2xl glass p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-400 text-xl font-bold text-white glow-sm">
            DA
          </div>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Đăng ký tài khoản</h2>
          <p className="mt-2 text-[var(--muted-strong)]">Tạo tài khoản để bắt đầu viết blog</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
