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
    throw new Error("Khong the tai thong tin tac gia");
  }
  return res.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getPost(id);
  const author = await getUser(post.userId);

  return (
    <div>
      <Link href="/blog" className="mb-6 inline-block text-sm text-[#143A52] hover:underline dark:text-white">
        ← Quay lai danh sach
      </Link>
      <article className="rounded-2xl border border-[#CDE3EB] bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h1 className="mb-4 text-3xl font-bold capitalize text-[#143A52] dark:text-white">{post.title}</h1>
        <div className="mb-6 flex items-center gap-3 text-sm text-[#6E828A] dark:text-gray-400">
          <span>
            Tac gia: <strong className="text-[#143A52] dark:text-white">{author.name}</strong>
          </span>
          <span>•</span>
          <span>{author.email}</span>
        </div>
        <div className="mb-8 whitespace-pre-line leading-relaxed text-[#6E828A] dark:text-gray-300">{post.body}</div>
        <div className="border-t border-[#CDE3EB] pt-6 dark:border-gray-700">
          <h3 className="mb-2 font-semibold text-[#143A52] dark:text-white">Ve tac gia</h3>
          <p className="text-sm text-[#6E828A] dark:text-gray-300">
            <strong>{author.name}</strong> (@{author.username}) — {author.company.name}
          </p>
          <p className="text-sm text-[#6E828A] dark:text-gray-400">{author.company.catchPhrase}</p>
        </div>
      </article>
    </div>
  );
}
