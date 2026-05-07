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
          className="rounded-lg border border-[#CDE3EB] bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-[#143A52] dark:text-white">{post.title}</h2>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    post.status === "published"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                  }`}
                >
                  {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </span>
              </div>
              {post.excerpt ? <p className="mb-2 text-sm text-[#6E828A] dark:text-gray-300">{post.excerpt}</p> : null}
              <p className="text-xs text-[#6E828A] dark:text-gray-400">
                Tạo ngày: {new Date(post.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
              <Link
                href={`/posts/${post.slug}`}
                className="rounded-md px-3 py-1 text-sm text-[#6E828A] hover:bg-[#E3EFF3] hover:text-[#143A52] dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Xem
              </Link>
              <Link
                href={`/dashboard/edit/${post.id}`}
                className="rounded-md px-3 py-1 text-sm text-[#143A52] hover:underline dark:text-[#CDE3EB]"
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
