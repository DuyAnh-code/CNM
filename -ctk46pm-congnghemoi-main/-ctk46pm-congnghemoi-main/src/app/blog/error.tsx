"use client";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-12 text-center">
      <h2 className="mb-4 text-2xl font-bold text-[#143A52]">Da xay ra loi!</h2>
      <p className="mb-6 text-[#6E828A]">
        {error.message || "Khong the tai noi dung blog. Vui long thu lai."}
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-[#143A52] px-6 py-2 text-white transition-colors hover:bg-[#6E828A]"
      >
        Thu lai
      </button>
    </div>
  );
}
