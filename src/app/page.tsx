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
    <div className="mx-auto max-w-4xl px-4 py-8 animate-fade-in-up">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Bài viết mới nhất</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-strong)]">
            Blog cá nhân — Next.js & Supabase.{" "}
            <Link href="/portfolio" className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
              Xem trang portfolio →
            </Link>
          </p>
        </div>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-5">
          {posts.map((post: Record<string, unknown>) => (
            <article
              key={post.id as string}
              className="group rounded-xl glass p-6 transition-all hover:glow-sm"
            >
              <Link href={`/posts/${post.slug as string}`}>
                <h2 className="text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                  {post.title as string}
                </h2>
              </Link>

              {(post.excerpt as string | null) ? (
                <p className="mt-2 text-[var(--muted-strong)]">{post.excerpt as string}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--muted-strong)]">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" />
                  {(post.profiles as { display_name?: string } | null)?.display_name ?? "Ẩn danh"}
                </span>
                <span aria-hidden>·</span>
                <span>
                  {post.published_at
                    ? new Date(post.published_at as string).toLocaleDateString("vi-VN")
                    : "Chưa xuất bản"}
                </span>
              </div>

              <Link
                href={`/posts/${post.slug as string}`}
                className="mt-4 inline-block text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                Đọc tiếp →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl glass py-16 text-center">
          <div className="mb-4 text-4xl">📝</div>
          <p className="text-[var(--muted-strong)]">Chưa có bài viết nào.</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Đăng nhập và tạo bài từ{" "}
            <Link href="/dashboard/new" className="text-[var(--accent)] hover:underline">
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
              className="rounded-lg border border-[var(--border)] px-4 py-2.5 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              ← Trước
            </Link>
          ) : (
            <span className="opacity-30">← Trước</span>
          )}
          <span className="text-[var(--muted-strong)]">
            Trang {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={`/?page=${page + 1}`}
              className="rounded-lg border border-[var(--border)] px-4 py-2.5 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Sau →
            </Link>
          ) : (
            <span className="opacity-30">Sau →</span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
