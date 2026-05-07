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
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 shadow-sm focus:border-[#143A52] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Viết bình luận của bạn..."
        />
      </div>

      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="rounded-md bg-[#143A52] px-4 py-2 text-white hover:bg-[#0f2f43] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Đang gửi..." : "Gửi bình luận"}
      </button>
    </form>
  );
}
