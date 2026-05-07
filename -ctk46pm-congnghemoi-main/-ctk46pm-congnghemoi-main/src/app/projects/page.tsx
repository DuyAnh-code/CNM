import Link from "next/link";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl py-12">
      <h1 className="mb-6 text-3xl font-bold text-[#143A52] dark:text-white">Du an</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="border-[#CDE3EB] transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg text-[#143A52] dark:text-white">{project.title}</CardTitle>
                <Badge variant={project.status === "Hoan thanh" ? "default" : "secondary"}>{project.status}</Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-[#6E828A] dark:text-gray-400">So commit uoc tinh: {project.commits}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-[#143A52] hover:underline dark:text-white"
              >
                Xem repository
              </a>
              <div>
                <Link
                  href={`/projects/${project.id}`}
                  className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#143A52] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6E828A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E828A] focus-visible:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus-visible:ring-gray-500 dark:focus-visible:ring-offset-gray-800"
                >
                  Chi tiet
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
