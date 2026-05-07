import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-[#CDE3EB] bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#143A52] dark:text-white">Đăng ký tài khoản</h2>
          <p className="mt-2 text-[#6E828A] dark:text-gray-300">Tạo tài khoản để bắt đầu viết blog</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
