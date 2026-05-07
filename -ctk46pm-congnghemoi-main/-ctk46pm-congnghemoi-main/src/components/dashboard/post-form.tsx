"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Post, PostStatus } from "@/types/database";

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Bạn cần đăng nhập để thực hiện thao tác này");
        return;
      }

      const postData = {
        title,
        content,
        excerpt,
        status,
        author_id: user.id,
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      if (isEditing) {
        const { error: upErr } = await supabase.from("posts").update(postData).eq("id", post.id);
        if (upErr) throw upErr;
      } else {
        const { error: insErr } = await supabase.from("posts").insert(postData);
        if (insErr) throw insErr;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#143A52] dark:text-gray-200">
          Tiêu đề <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 shadow-sm focus:border-[#143A52] focus:outline-none focus:ring-1 focus:ring-[#143A52] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Nhập tiêu đề bài viết"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-[#143A52] dark:text-gray-200">
          Tóm tắt
        </label>
        <input
          id="excerpt"
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Mô tả ngắn (hiển thị trong danh sách)"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[#143A52] dark:text-gray-200">
          Nội dung (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 font-mono shadow-sm focus:border-[#143A52] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Viết nội dung..."
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-[#143A52] dark:text-gray-200">
          Trạng thái
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as PostStatus)}
          className="mt-1 block w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="draft">Bản nháp</option>
          <option value="published">Xuất bản</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-[#6E828A] hover:text-[#143A52] dark:hover:text-white"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-[#143A52] px-4 py-2 text-white hover:bg-[#0f2f43] disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : isEditing ? "Cập nhật" : "Tạo bài viết"}
        </button>
      </div>
    </form>
  );
}
