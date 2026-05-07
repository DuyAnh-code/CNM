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
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl glass p-6">
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Tiêu đề <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
          placeholder="Nhập tiêu đề bài viết"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Tóm tắt
        </label>
        <input
          id="excerpt"
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
          placeholder="Mô tả ngắn (hiển thị trong danh sách)"
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Nội dung (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 font-mono text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
          placeholder="Viết nội dung..."
        />
      </div>

      <div>
        <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Trạng thái
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as PostStatus)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
        >
          <option value="draft">Bản nháp</option>
          <option value="published">Xuất bản</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--muted-strong)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20 disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : isEditing ? "Cập nhật" : "Tạo bài viết"}
        </button>
      </div>
    </form>
  );
}
