import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { PostForm } from "@/components/dashboard/post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("author_id", user.id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 animate-fade-in-up">
      <h1 className="mb-8 text-3xl font-bold">
        <span className="gradient-text">Chỉnh sửa bài viết</span>
      </h1>
      <PostForm post={post} />
    </div>
  );
}
