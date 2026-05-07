"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="inline-flex items-center gap-3 rounded-xl glass px-5 py-3">
      <button
        onClick={() => setCount(count - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-xl font-bold text-[var(--foreground)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        −
      </button>
      <span className="w-12 text-center text-2xl font-bold tabular-nums text-[var(--foreground)]">
        {count}
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] text-xl font-bold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20"
      >
        +
      </button>
    </div>
  );
}
