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
    <div className="mx-auto max-w-lg py-8 animate-fade-in-up">
      <h1 className="mb-2 text-3xl font-bold">
        <span className="gradient-text">Hồ sơ</span>
      </h1>
      <p className="mb-6 text-sm text-[var(--muted-strong)]">
        Cập nhật tên hiển thị và ảnh đại diện (URL).{" "}
        <Link href="/dashboard" className="text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
          Dashboard →
        </Link>
      </p>

      <form action={updateProfile} className="space-y-5 rounded-2xl glass p-6">
        <div>
          <label htmlFor="display_name" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
            Tên hiển thị
          </label>
          <input
            id="display_name"
            name="display_name"
            type="text"
            defaultValue={profile?.display_name ?? ""}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="avatar_url" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
            URL ảnh đại diện
          </label>
          <input
            id="avatar_url"
            name="avatar_url"
            type="url"
            defaultValue={profile?.avatar_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
