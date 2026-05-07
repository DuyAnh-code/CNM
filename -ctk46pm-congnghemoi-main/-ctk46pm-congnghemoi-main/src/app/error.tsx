"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl py-16 text-center">
      <div className="rounded-2xl border border-[#CDE3EB] bg-white p-8">
        <h1 className="mb-4 text-3xl font-bold text-[#143A52]">Da xay ra loi he thong</h1>
        <p className="mb-2 text-[#6E828A]">
          {error.message || "Ung dung dang gap su co. Vui long thu lai."}
        </p>
        {error.digest ? <p className="mb-6 text-sm text-[#6E828A]">Ma loi: {error.digest}</p> : null}

        <button
          onClick={() => reset()}
          className="rounded-lg bg-[#143A52] px-6 py-2 text-white transition-colors hover:bg-[#6E828A]"
        >
          Thu tai trang
        </button>
      </div>
    </div>
  );
}
