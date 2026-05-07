"use client";

import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
        copied
          ? "border-green-500/30 bg-green-500/10 text-green-400"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      }`}
    >
      {copied ? "✓ Đã copy!" : "📋 Copy"}
    </button>
  );
}
