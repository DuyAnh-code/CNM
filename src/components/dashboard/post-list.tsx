import Link from "next/link";
import { Post } from "@/types/database";
import { DeletePostButton } from "./delete-post-button";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="group rounded-xl glass p-5 transition-all hover:glow-sm"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">{post.title}</h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.status === "published"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </span>
              </div>
              {post.excerpt ? (
                <p className="mb-2 text-sm text-[var(--muted-strong)]">{post.excerpt}</p>
              ) : null}
              <p className="text-xs text-[var(--muted)]">
                Tạo ngày: {new Date(post.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-1">
              <Link
                href={`/posts/${post.slug}`}
                className="rounded-lg px-3 py-1.5 text-sm text-[var(--muted-strong)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
              >
                Xem
              </Link>
              <Link
                href={`/dashboard/edit/${post.id}`}
                className="rounded-lg px-3 py-1.5 text-sm text-[var(--accent)] transition-colors hover:bg-[var(--accent-subtle)]"
              >
                Sửa
              </Link>
              <DeletePostButton postId={post.id} postTitle={post.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
