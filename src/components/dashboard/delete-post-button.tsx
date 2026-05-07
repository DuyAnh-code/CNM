"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface DeletePostButtonProps {
  postId: string;
  postTitle: string;
}

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa bài viết "${postTitle}"? Hành động này không thể hoàn tác.`,
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
      router.refresh();
    } catch (err) {
      alert("Có lỗi xảy ra khi xóa bài viết");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg px-3 py-1.5 text-sm text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-50"
    >
      {loading ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
