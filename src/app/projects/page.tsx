import Link from "next/link";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl py-12 animate-fade-in-up">
      <h1 className="mb-2 text-3xl font-bold">
        <span className="gradient-text">Dự án</span>
      </h1>
      <p className="mb-8 text-[var(--muted-strong)]">
        Các dự án đã và đang thực hiện trong quá trình học tập.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`group rounded-2xl glass p-6 transition-all hover:glow-sm ${
              index === 0 ? "animate-fade-in-up" : ""
            } ${index === 1 ? "animate-fade-in-up-delay-1" : ""} ${
              index === 2 ? "animate-fade-in-up-delay-2" : ""
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                {project.title}
              </h2>
              <Badge variant={project.status === "Hoàn thành" ? "default" : "secondary"}>
                {project.status}
              </Badge>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-[var(--muted-strong)]">
              {project.description}
            </p>

            <div className="mb-4 flex items-center gap-3 text-xs text-[var(--muted-strong)]">
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                {project.commits} commits
              </span>
            </div>

            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-[var(--accent-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/projects/${project.id}`}
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20"
              >
                Chi tiết
              </Link>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-strong)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
