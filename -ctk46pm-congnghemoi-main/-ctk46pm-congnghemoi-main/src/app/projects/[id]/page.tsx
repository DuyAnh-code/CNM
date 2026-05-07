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
    <div>
      <Link
        href="/projects"
        className="mb-6 inline-block text-sm font-medium text-[#143A52] hover:underline"
      >
        Quay lai danh sach du an
      </Link>

      <article className="rounded-2xl border border-[#CDE3EB] bg-white p-6">
        <h1 className="mb-3 text-3xl font-bold text-[#143A52]">{project.title}</h1>
        <p className="mb-4 text-[#6E828A]">{project.description}</p>
        <p className="mb-4 whitespace-pre-line text-[#6E828A]">{project.detail}</p>
        <p className="mb-4 text-sm text-[#6E828A]">So commit uoc tinh: {project.commits}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="rounded-full bg-[#CDE3EB] px-3 py-1 text-sm text-[#143A52]">
              {item}
            </span>
          ))}
        </div>

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-[#143A52] hover:underline"
        >
          Mo repository tren GitHub
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
