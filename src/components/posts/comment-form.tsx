"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Bạn cần đăng nhập để bình luận");
        return;
      }

      const { error: insErr } = await supabase.from("comments").insert({
        post_id: postId,
        author_id: user.id,
        content,
      });

      if (insErr) throw insErr;

      setContent("");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
          placeholder="Viết bình luận của bạn..."
        />
      </div>

      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Đang gửi..." : "Gửi bình luận"}
      </button>
    </form>
  );
}
