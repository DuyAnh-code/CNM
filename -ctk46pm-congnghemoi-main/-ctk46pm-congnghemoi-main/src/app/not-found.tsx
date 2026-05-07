import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl py-24 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#CDE3EB] text-5xl animate-bounce">
        🚀
      </div>
      <h1 className="mb-4 text-6xl font-bold text-[#CDE3EB]">404</h1>
      <h2 className="mb-4 text-2xl font-bold text-[#143A52]">Trang khong ton tai</h2>
      <p className="mb-8 text-[#6E828A]">Xin loi, trang ban dang tim kiem khong co tren website nay.</p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-[#143A52] px-6 py-2 text-white transition-colors hover:bg-[#6E828A]"
      >
        Ve trang chu
      </Link>
    </div>
  );
}
