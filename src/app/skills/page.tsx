const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express", "Python", "Java", "C#/.NET"],
  },
  {
    title: "Database & Tools",
    icon: "🗃️",
    skills: ["SQL", "MongoDB", "Git/GitHub", "Supabase"],
  },
  {
    title: "Mobile",
    icon: "📱",
    skills: ["Dart", "Flutter"],
  },
];

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl py-12 animate-fade-in-up">
      <h1 className="mb-2 text-3xl font-bold">
        <span className="gradient-text">Kỹ năng lập trình</span>
      </h1>
      <p className="mb-8 text-[var(--muted-strong)]">
        Đây là các kỹ năng chính mình đã học và áp dụng trong các dự án.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl glass p-6 transition-all hover:glow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
              <span className="text-xl">{category.icon}</span>
              {category.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
