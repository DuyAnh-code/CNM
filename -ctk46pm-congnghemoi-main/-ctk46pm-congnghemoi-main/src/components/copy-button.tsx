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
      className="rounded-lg border border-[#CDE3EB] bg-[#E3EFF3] px-3 py-2 text-sm font-medium text-[#143A52] transition-colors hover:bg-[#CDE3EB] dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      {copied ? "Đã copy!" : "Copy"}
    </button>
  );
}
