import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostList } from "@/components/dashboard/post-list";
import { Post } from "@/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  const list = (posts ?? []) as Post[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 animate-fade-in-up">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Bài viết của tôi</span>
        </h1>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20"
        >
          <span>✍️</span> Viết bài mới
        </Link>
      </div>

      {list.length > 0 ? (
        <PostList posts={list} />
      ) : (
        <div className="rounded-xl glass py-16 text-center">
          <div className="mb-4 text-4xl">📄</div>
          <p className="mb-4 text-[var(--muted-strong)]">Bạn chưa có bài viết nào.</p>
          <Link
            href="/dashboard/new"
            className="font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            Viết bài đầu tiên →
          </Link>
        </div>
      )}
    </div>
  );
}
