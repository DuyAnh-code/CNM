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
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-[#143A52] dark:text-white">Bài viết của tôi</h1>
        <Link
          href="/dashboard/new"
          className="inline-flex justify-center rounded-md bg-[#143A52] px-4 py-2 text-white hover:bg-[#0f2f43]"
        >
          + Viết bài mới
        </Link>
      </div>

      {list.length > 0 ? (
        <PostList posts={list} />
      ) : (
        <div className="rounded-lg bg-[var(--surface)] py-12 text-center dark:bg-gray-800">
          <p className="mb-4 text-[#6E828A] dark:text-gray-300">Bạn chưa có bài viết nào.</p>
          <Link href="/dashboard/new" className="font-medium text-[#143A52] hover:underline dark:text-[#CDE3EB]">
            Viết bài đầu tiên →
          </Link>
        </div>
      )}
    </div>
  );
}
