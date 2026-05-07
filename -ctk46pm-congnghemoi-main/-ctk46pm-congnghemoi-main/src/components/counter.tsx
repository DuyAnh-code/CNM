"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="inline-flex items-center gap-4 rounded-xl border border-[#CDE3EB] bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => setCount(count - 1)}
        className="h-10 w-10 rounded-lg bg-[#E3EFF3] text-xl font-bold text-[#143A52] transition-colors hover:bg-[#CDE3EB] dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        -
      </button>
      <span className="w-12 text-center text-2xl font-bold text-[#143A52] dark:text-white">{count}</span>
      <button
        onClick={() => setCount(count + 1)}
        className="h-10 w-10 rounded-lg bg-[#143A52] text-xl font-bold text-white transition-colors hover:bg-[#6E828A] dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        +
      </button>
    </div>
  );
}
