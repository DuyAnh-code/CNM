import Link from "next/link";
import { Post } from "@/types/post";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Khong the tai danh sach bai viet");
  }
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-[#143A52] dark:text-white">Blog</h1>
      <p className="mb-6 text-[#6E828A] dark:text-gray-400">Tong cong {posts.length} bai viet tu API</p>

      <div className="space-y-4">
        {posts.slice(0, 10).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="cursor-pointer border-[#CDE3EB] transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="secondary">Tac gia #{post.userId}</Badge>
                  <span className="text-sm text-[#6E828A] dark:text-gray-400">Bai #{post.id}</span>
                </div>
                <CardTitle className="capitalize text-[#143A52] dark:text-white">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-[#6E828A] dark:text-gray-300">
                  {post.body}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
