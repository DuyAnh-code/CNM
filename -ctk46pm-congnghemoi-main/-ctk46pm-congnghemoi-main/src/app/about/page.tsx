export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl py-12">
      <h1 className="mb-6 text-3xl font-bold text-[#143A52] dark:text-white">Gioi thieu</h1>

      <div className="space-y-4 rounded-2xl border border-[#CDE3EB] bg-white p-8 text-[#6E828A] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <p>
          Xin chao! Toi la <strong>Nguyễn Thị Hoàng Phúc</strong>, sinh vien nam 4 nganh Cong nghe
          Thong tin tai Dai hoc Da Lat.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">Ky nang</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>JavaScript / TypeScript</li>
          <li>React va Next.js</li>
          <li>Tailwind CSS</li>
          <li>Git va GitHub</li>
          <li>SQL va PostgreSQL</li>
        </ul>

        <p>
          Co the xem cac du an va bai tap cua toi tai GitHub:{" "}
          <a
            href="https://github.com/phucyeudoi1905"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#143A52] hover:underline dark:text-white"
          >
            github.com/phucyeudoi1905
          </a>
          .
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">Hoc van</h2>
        <div className="rounded-lg bg-[#E3EFF3] p-4 dark:bg-gray-700">
          <p className="font-medium dark:text-white">Dai hoc Da Lat</p>
          <p className="text-[#6E828A] dark:text-gray-300">Cu nhan Cong nghe Thong tin (2021 - 2025)</p>
        </div>
      </div>
    </div>
  );
}
