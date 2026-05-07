import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CommentForm } from "@/components/posts/comment-form";
import { RealtimeComments } from "@/components/posts/realtime-comments";
import { Comment } from "@/types/database";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return {
    title: post?.title ?? "Bài viết",
    description: post?.excerpt ?? "",
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        display_name,
        avatar_url
      )
    `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  const { data: commentsRaw } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles (
        display_name,
        avatar_url
      )
    `,
    )
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  const comments = (commentsRaw ?? []) as Comment[];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-[#143A52] dark:text-white">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-[#6E828A] dark:text-gray-400">
            <span>Bởi {post.profiles?.display_name ?? "Ẩn danh"}</span>
            <span aria-hidden>•</span>
            <time>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </time>
          </div>
        </header>

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-[#143A52] dark:prose-headings:text-white">
          <ReactMarkdown>{post.content ?? ""}</ReactMarkdown>
        </div>
      </article>

      <section className="border-t border-[#CDE3EB] pt-8 dark:border-gray-700">
        <h2 className="mb-6 text-2xl font-bold text-[#143A52] dark:text-white">
          Bình luận ({comments.length})
        </h2>

        {user ? (
          <div className="mb-8">
            <CommentForm postId={post.id} />
          </div>
        ) : (
          <p className="mb-8 text-[#6E828A] dark:text-gray-400">
            <Link href="/login" className="font-medium text-[#143A52] hover:underline dark:text-[#CDE3EB]">
              Đăng nhập
            </Link>{" "}
            để bình luận.
          </p>
        )}

        <RealtimeComments postId={post.id} initialComments={comments} />
      </section>
    </div>
  );
}
