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
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
        liked
          ? "border-red-200 bg-red-50 text-red-600 dark:border-red-300/40 dark:bg-red-900/20 dark:text-red-300"
          : "border-[#CDE3EB] bg-white text-[#6E828A] hover:bg-[#E3EFF3] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      <span>{liked ? "❤" : "🤍"}</span>
      <span>{count} luot thich</span>
    </button>
  );
}
