import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-[#143A52] dark:text-white">Bai viet khong ton tai</h2>
      <p className="mb-6 text-[#6E828A] dark:text-gray-400">Bai viet ban tim kiem khong ton tai hoac da bi xoa.</p>
      <Link href="/blog" className="text-[#143A52] hover:underline dark:text-white">
        ← Quay lai danh sach bai viet
      </Link>
    </div>
  );
}
