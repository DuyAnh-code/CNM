import Link from "next/link";
import { Post } from "@/types/post";
import { Badge } from "@/components/ui/badge";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Không thể tải danh sách bài viết");
  }
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="animate-fade-in-up">
      <h1 className="mb-2 text-3xl font-bold">
        <span className="gradient-text">Blog</span>
      </h1>
      <p className="mb-8 text-[var(--muted-strong)]">
        Tổng cộng {posts.length} bài viết từ API
      </p>

      <div className="space-y-4">
        {posts.slice(0, 10).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <article className="group rounded-xl glass p-5 transition-all hover:glow-sm">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">Tác giả #{post.userId}</Badge>
                <span className="text-xs text-[var(--muted-strong)]">Bài #{post.id}</span>
              </div>
              <h2 className="mb-2 text-lg font-semibold capitalize text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              <p className="line-clamp-2 text-sm text-[var(--muted-strong)]">
                {post.body}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
