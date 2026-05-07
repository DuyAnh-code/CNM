import Link from "next/link";
import Counter from "@/components/counter";

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 rounded-2xl border border-[#CDE3EB] bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#CDE3EB] text-3xl text-[#143A52] dark:bg-gray-700 dark:text-white">
          P
        </div>
        <h1 className="mb-4 text-4xl font-bold text-[#143A52] md:text-5xl dark:text-white">
          Xin chào! Tôi là Nguyễn Thị Hoàng Phúc
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6E828A] dark:text-gray-300">
          Sinh viên Công nghệ Thông tin tại Đại học Đà Lạt, đam mê phát triển web và các công nghệ mới.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="rounded-lg bg-[#143A52] px-6 py-3 text-white transition-colors hover:bg-[#6E828A] dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Xem dự án
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-[#CDE3EB] px-6 py-3 text-[#143A52] transition-colors hover:bg-[#E3EFF3] dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            Liên hệ
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-[#CDE3EB] px-6 py-3 text-[#143A52] transition-colors hover:bg-[#E3EFF3] dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            Blog Supabase
          </Link>
        </div>
        <div className="mt-8">
          <Counter />
        </div>
      </div>

      <div className="mb-12 rounded-2xl border border-[#CDE3EB] bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#143A52] dark:text-white">Kỹ năng</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            "JavaScript",
            "TypeScript",
            "Next.js",
            "React",
            "Tailwind CSS",
            "Node.js",
            "Dart/Flutter",
            "C#/.NET",
            "Python",
            "SQL",
          ].map((skill) => (
            <div
              key={skill}
              className="rounded-lg border border-[#CDE3EB] bg-[#E3EFF3] p-3 text-center text-[#143A52] dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#CDE3EB] bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-3 text-2xl font-bold text-[#143A52] dark:text-white">Đọc blog của tôi</h2>
        <p className="mb-4 text-[#6E828A] dark:text-gray-300">Chia sẻ kiến thức và kinh nghiệm học lập trình thực tế.</p>
        <Link href="/" className="font-semibold text-[#143A52] hover:underline dark:text-white">
          Blog (Supabase) →
        </Link>
      </div>
    </div>
  );
}
