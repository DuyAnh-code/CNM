export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl py-12 animate-fade-in-up">
      <h1 className="mb-8 text-3xl font-bold">
        <span className="gradient-text">Giới thiệu</span>
      </h1>

      <div className="space-y-6">
        {/* Bio card */}
        <div className="rounded-2xl glass p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-400 text-2xl font-bold text-white glow-sm">
              DA
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)]">Lê Bình Duy Anh</h2>
              <p className="text-sm text-[var(--muted-strong)]">Full-stack Developer · Sinh viên CNTT</p>
            </div>
          </div>

          <p className="leading-relaxed text-[var(--muted-strong)]">
            Xin chào! Tôi là <strong className="text-[var(--foreground)]">Lê Bình Duy Anh</strong>, sinh viên 
            ngành Công nghệ Thông tin tại Đại học Đà Lạt, lớp CTK46A. Tôi đam mê phát triển web, 
            từ thiết kế giao diện cho đến xây dựng hệ thống backend. Mỗi dự án là một cơ hội 
            để tôi học hỏi và phát triển thêm.
          </p>
        </div>

        {/* Skills */}
        <div className="rounded-2xl glass p-8">
          <h2 className="mb-5 text-xl font-bold text-[var(--foreground)]">🛠️ Kỹ năng</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { skill: "JavaScript / TypeScript", level: "Thành thạo" },
              { skill: "React & Next.js", level: "Thành thạo" },
              { skill: "Tailwind CSS", level: "Thành thạo" },
              { skill: "Git & GitHub", level: "Thành thạo" },
              { skill: "SQL & PostgreSQL", level: "Tốt" },
              { skill: "Python & Data Analysis", level: "Tốt" },
              { skill: "Node.js & Express", level: "Tốt" },
            ].map((item) => (
              <div
                key={item.skill}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-all hover:border-[var(--accent)]/40"
              >
                <span className="text-sm text-[var(--foreground)]">{item.skill}</span>
                <span className="rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub link */}
        <div className="rounded-2xl glass p-8">
          <p className="text-[var(--muted-strong)]">
            Xem tất cả dự án và bài tập của tôi tại GitHub:{" "}
            <a
              href="https://github.com/duyanh-le"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              github.com/duyanh-le →
            </a>
          </p>
        </div>

        {/* Education */}
        <div className="rounded-2xl glass p-8">
          <h2 className="mb-5 text-xl font-bold text-[var(--foreground)]">🎓 Học vấn</h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[var(--foreground)]">Đại học Đà Lạt</p>
                <p className="mt-1 text-sm text-[var(--muted-strong)]">
                  Cử nhân Công nghệ Thông tin — Lớp CTK46A
                </p>
              </div>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                2022 – 2026
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-md bg-[var(--accent-subtle)] px-2 py-0.5 text-xs font-mono text-[var(--accent)]">
                MSSV: 2212338
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
