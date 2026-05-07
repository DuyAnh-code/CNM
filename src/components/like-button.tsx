"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all ${
        liked
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted-strong)] hover:border-red-500/30 hover:text-red-400"
      }`}
    >
      <span className={liked ? "scale-110" : ""}>{liked ? "❤️" : "🤍"}</span>
      <span>{count} lượt thích</span>
    </button>
  );
}
