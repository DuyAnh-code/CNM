export interface Project {
  id: string;
  title: string;
  description: string;
  detail: string;
  tech: string[];
  commits: number;
  status: "Hoàn thành" | "Đang phát triển";
  repoUrl: string;
}

export const projects: Project[] = [
  {
    id: "news-crawler",
    title: "News Crawler",
    description: "Hệ thống thu thập tin tức tự động từ nhiều nguồn báo điện tử Việt Nam.",
    detail:
      "Dự án News Crawler sử dụng Python để crawl dữ liệu từ các trang báo, xử lý song song để tăng tốc độ và tích hợp cơ chế chống chặn để đảm bảo hoạt động ổn định.",
    tech: ["Python", "Selenium", "BeautifulSoup"],
    commits: 22,
    status: "Đang phát triển",
    repoUrl: "https://github.com/duyanh-le/news-crawler",
  },
  {
    id: "portfolio-nextjs",
    title: "Portfolio & Blog — Next.js",
    description: "Website cá nhân kết hợp blog sử dụng Next.js 16, Supabase và Tailwind CSS.",
    detail:
      "Dự án portfolio giới thiệu bản thân, kỹ năng và các dự án đã thực hiện. Tích hợp blog động với Supabase, hỗ trợ đăng ký, đăng nhập, viết bài và quản lý nội dung.",
    tech: ["TypeScript", "Next.js", "Supabase", "Tailwind CSS"],
    commits: 35,
    status: "Hoàn thành",
    repoUrl: "https://github.com/duyanh-le/portfolio-nextjs",
  },
  {
    id: "task-manager-app",
    title: "Task Manager App",
    description: "Ứng dụng quản lý công việc cá nhân với giao diện hiện đại và tính năng kéo thả.",
    detail:
      "Ứng dụng giúp người dùng tổ chức công việc theo cột Kanban, hỗ trợ kéo thả để cập nhật trạng thái, lưu trữ dữ liệu với localStorage và có thể xuất báo cáo tiến độ.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    commits: 18,
    status: "Hoàn thành",
    repoUrl: "https://github.com/duyanh-le/task-manager",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
