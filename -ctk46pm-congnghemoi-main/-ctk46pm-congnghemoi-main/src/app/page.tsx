import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 5;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  const { data: posts, error, count } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        display_name,
        avatar_url
      )
    `,
      { count: "exact" },
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching posts:", error);
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#143A52] dark:text-white">Bài viết mới nhất</h1>
          <p className="mt-1 text-sm text-[#6E828A] dark:text-gray-400">
            Simple Blog — Next.js & Supabase (Bài thực hành 4).{" "}
            <Link href="/portfolio" className="text-[#143A52] underline dark:text-[#CDE3EB]">
              Xem trang portfolio
            </Link>
          </p>
        </div>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: Record<string, unknown>) => (
            <article
              key={post.id as string}
              className="rounded-xl border border-[#CDE3EB] bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <Link href={`/posts/${post.slug as string}`}>
                <h2 className="text-2xl font-semibold text-[#143A52] transition-colors hover:text-[#6E828A] dark:text-white dark:hover:text-[#CDE3EB]">
                  {post.title as string}
                </h2>
              </Link>

              {(post.excerpt as string | null) ? (
                <p className="mt-2 text-[#6E828A] dark:text-gray-300">{post.excerpt as string}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#6E828A] dark:text-gray-400">
                <span>
                  Bởi{" "}
                  {(post.profiles as { display_name?: string } | null)?.display_name ?? "Ẩn danh"}
                </span>
                <span aria-hidden>•</span>
                <span>
                  {post.published_at
                    ? new Date(post.published_at as string).toLocaleDateString("vi-VN")
                    : "Chưa xuất bản"}
                </span>
              </div>

              <Link
                href={`/posts/${post.slug as string}`}
                className="mt-4 inline-block font-medium text-[#143A52] hover:underline dark:text-[#CDE3EB]"
              >
                Đọc tiếp →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-[var(--surface)] py-12 text-center dark:bg-gray-800">
          <p className="text-[#6E828A] dark:text-gray-400">Chưa có bài viết nào.</p>
          <p className="mt-2 text-sm text-[#6E828A]">
            Đăng nhập và tạo bài từ{" "}
            <Link href="/dashboard/new" className="text-[#143A52] underline dark:text-[#CDE3EB]">
              Dashboard
            </Link>
            .
          </p>
        </div>
      )}

      {totalPages > 1 ? (
        <nav className="mt-10 flex items-center justify-center gap-4 text-sm">
          {page > 1 ? (
            <Link
              href={page === 2 ? "/" : `/?page=${page - 1}`}
              className="rounded-md border border-[#CDE3EB] px-4 py-2 hover:bg-[#E3EFF3] dark:border-gray-600 dark:hover:bg-gray-800"
            >
              ← Trước
            </Link>
          ) : (
            <span className="opacity-40">← Trước</span>
          )}
          <span className="text-[#6E828A]">
            Trang {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={`/?page=${page + 1}`}
              className="rounded-md border border-[#CDE3EB] px-4 py-2 hover:bg-[#E3EFF3] dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Sau →
            </Link>
          ) : (
            <span className="opacity-40">Sau →</span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
