import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateProfile } from "./actions";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="mx-auto max-w-lg py-8">
      <h1 className="mb-6 text-3xl font-bold text-[#143A52] dark:text-white">Hồ sơ</h1>
      <p className="mb-6 text-sm text-[#6E828A] dark:text-gray-300">
        Cập nhật tên hiển thị và ảnh đại diện (URL).{" "}
        <Link href="/dashboard" className="text-[#143A52] underline dark:text-[#CDE3EB]">
          Dashboard
        </Link>
      </p>

      <form action={updateProfile} className="space-y-4 rounded-2xl border border-[#CDE3EB] bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div>
          <label htmlFor="display_name" className="mb-1 block text-sm font-medium text-[#143A52] dark:text-white">
            Tên hiển thị
          </label>
          <input
            id="display_name"
            name="display_name"
            type="text"
            defaultValue={profile?.display_name ?? ""}
            className="w-full rounded-md border border-[#CDE3EB] px-3 py-2 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="avatar_url" className="mb-1 block text-sm font-medium text-[#143A52] dark:text-white">
            URL ảnh đại diện
          </label>
          <input
            id="avatar_url"
            name="avatar_url"
            type="url"
            defaultValue={profile?.avatar_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-md border border-[#CDE3EB] px-3 py-2 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#143A52] px-4 py-2 text-white hover:bg-[#0f2f43]"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
