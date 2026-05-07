import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, User } from "@/types/post";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!res.ok) {
    throw new Error("Không thể tải thông tin tác giả");
  }
  return res.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getPost(id);
  const author = await getUser(post.userId);

  return (
    <div className="animate-fade-in-up">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
      >
        ← Quay lại danh sách
      </Link>

      <article className="rounded-2xl glass p-8">
        <h1 className="mb-4 text-3xl font-bold capitalize text-[var(--foreground)]">{post.title}</h1>

        <div className="mb-6 flex items-center gap-3 text-sm text-[var(--muted-strong)]">
          <span>
            Tác giả: <strong className="text-[var(--foreground)]">{author.name}</strong>
          </span>
          <span className="text-[var(--muted)]">·</span>
          <span>{author.email}</span>
        </div>

        <div className="mb-8 whitespace-pre-line leading-relaxed text-[var(--muted-strong)]">
          {post.body}
        </div>

        <div className="border-t border-[var(--border)] pt-6">
          <h3 className="mb-2 font-semibold text-[var(--foreground)]">Về tác giả</h3>
          <p className="text-sm text-[var(--muted-strong)]">
            <strong className="text-[var(--foreground)]">{author.name}</strong> (@{author.username}) — {author.company.name}
          </p>
          <p className="mt-1 text-sm italic text-[var(--muted)]">{author.company.catchPhrase}</p>
        </div>
      </article>
    </div>
  );
}
