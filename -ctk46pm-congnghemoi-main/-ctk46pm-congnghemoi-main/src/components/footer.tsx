export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#CDE3EB] bg-[#E3EFF3] dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-[#6E828A] dark:text-gray-400">
        <p className="mb-2">© 2026 - Nguyễn Thị Hoàng Phúc | CTK46 - Portfolio ca nhan</p>
        <p className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/phucyeudoi1905"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#143A52] hover:underline dark:text-white"
          >
            github.com/phucyeudoi1905
          </a>
          <span className="text-[#CDE3EB] dark:text-gray-600">|</span>
          <span className="text-[#143A52] dark:text-white">2213795</span>
        </p>
      </div>
    </footer>
  );
}
  