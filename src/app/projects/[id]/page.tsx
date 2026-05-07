import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl py-8 animate-fade-in-up">
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
      >
        ← Quay lại danh sách dự án
      </Link>

      <article className="rounded-2xl glass p-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">{project.title}</h1>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              project.status === "Hoàn thành"
                ? "bg-green-500/10 text-green-400"
                : "bg-amber-500/10 text-amber-400"
            }`}
          >
            {project.status}
          </span>
        </div>

        <p className="mb-4 text-lg text-[var(--muted-strong)]">{project.description}</p>
        <p className="mb-6 whitespace-pre-line leading-relaxed text-[var(--muted-strong)]">{project.detail}</p>

        <div className="mb-6 flex items-center gap-3 text-sm text-[var(--muted-strong)]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            {project.commits} commits ước tính
          </span>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-lg bg-[var(--accent-subtle)] px-3 py-1.5 text-sm font-medium text-[var(--accent)]"
            >
              {item}
            </span>
          ))}
        </div>

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-purple-500/20"
        >
          🐙 Mở repository trên GitHub
        </a>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}
