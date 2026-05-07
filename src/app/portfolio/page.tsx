import Link from "next/link";
import Counter from "@/components/counter";

const SKILLS = [
  { name: "JavaScript", icon: "⚡" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Next.js", icon: "▲" },
  { name: "React", icon: "⚛️" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "C/C++", icon: "⚙️" },
  { name: "Java", icon: "☕" },
  { name: "SQL", icon: "🗃️" },
];

const STATS = [
  { label: "Dự án", value: "3+", icon: "📦" },
  { label: "Kỹ năng", value: "10+", icon: "🛠️" },
  { label: "Commit", value: "75+", icon: "📝" },
  { label: "Năm học", value: "4", icon: "🎓" },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl py-8">
      {/* ─── Hero Section ─── */}
      <section className="relative mb-16 overflow-hidden rounded-2xl glass p-10 md:p-16 text-center animate-fade-in-up">
        {/* Decorative ring */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[var(--accent)]/20 opacity-30" />
        <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full border border-purple-400/10 opacity-20" />

        <div className="animate-float mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-400 text-4xl font-bold text-white shadow-lg glow-md">
          DA
        </div>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
          Xin chào! Tôi là{" "}
          <span className="gradient-text">Lê Bình Duy Anh</span>
        </h1>

        <p className="mx-auto mb-3 max-w-2xl text-lg text-[var(--muted-strong)]">
          Sinh viên <span className="text-[var(--accent)] font-medium">Công nghệ Thông tin</span> tại
          Đại học Đà Lạt (CTK46A).
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-[var(--muted-strong)]">
          Đam mê phát triển web full-stack, khám phá công nghệ mới và xây dựng sản phẩm số có giá trị.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-purple-500/20"
          >
            <span>🚀</span> Xem dự án
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-7 py-3.5 font-medium text-[var(--foreground)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>💬</span> Liên hệ
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-7 py-3.5 font-medium text-[var(--foreground)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>📰</span> Blog
          </Link>
        </div>

        <div className="mt-10">
          <Counter />
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 animate-fade-in-up-delay-1">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl glass p-5 text-center transition-all hover:glow-sm"
          >
            <div className="mb-2 text-2xl">{stat.icon}</div>
            <div className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</div>
            <div className="mt-1 text-sm text-[var(--muted-strong)]">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ─── Skills Grid ─── */}
      <section className="mb-16 rounded-2xl glass p-8 animate-fade-in-up-delay-2">
        <h2 className="mb-6 text-center text-2xl font-bold text-[var(--foreground)]">
          Kỹ năng công nghệ
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent-subtle)]"
            >
              <span className="text-lg transition-transform group-hover:scale-110">
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-[var(--foreground)]">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="rounded-2xl glass p-8 text-center animate-fade-in-up-delay-3">
        <h2 className="mb-3 text-2xl font-bold text-[var(--foreground)]">
          Đọc blog của tôi
        </h2>
        <p className="mb-5 text-[var(--muted-strong)]">
          Chia sẻ kiến thức, kinh nghiệm và hành trình học lập trình thực tế.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
        >
          Blog (Supabase) <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </div>
  );
}
