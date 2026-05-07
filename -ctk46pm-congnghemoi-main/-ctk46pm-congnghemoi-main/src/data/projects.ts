export interface Project {
  id: string;
  title: string;
  description: string;
  detail: string;
  tech: string[];
  commits: number;
  status: "Hoan thanh" | "Dang phat trien";
  repoUrl: string;
}

export const projects: Project[] = [
  {
    id: "matcha",
    title: "Matcha",
    description: "Ung dung Flutter/Dart voi khoi luong commit lon, phat trien tinh nang theo giai doan.",
    detail:
      "Du an Matcha tap trung vao trai nghiem di dong voi Flutter. Qua nhieu lan cap nhat, du an da cai thien giao dien, toi uu luong xu ly va bo sung them tinh nang su dung thuc te.",
    tech: ["Dart", "Flutter"],
    commits: 14,
    status: "Dang phat trien",
    repoUrl: "https://github.com/phucyeudoi1905/Matcha",
  },
  {
    id: "watch-party-mtk",
    title: "2212407_HoangLong_WatchParty_MTK",
    description: "Du an JavaScript ve Watch Party, co nhieu lan cap nhat va bo sung chuc nang.",
    detail:
      "Day la du an huong den viec xem va thao luan noi dung cung ban be theo thoi gian thuc. Qua cac commit, du an duoc bo sung luong tuong tac, nang cap UX va don gian hoa cau truc code.",
    tech: ["JavaScript"],
    commits: 14,
    status: "Dang phat trien",
    repoUrl: "https://github.com/phucyeudoi1905/2212407_HoangLong_WatchParty_MTK",
  },
  {
    id: "interior-ecommerce",
    title: "Interior-Furniture-E-commerce-Website",
    description: "Website thuong mai dien tu noi that su dung TypeScript, duoc cap nhat lien tuc.",
    detail:
      "Du an thuong mai dien tu huong den trinh bay san pham noi that va toi uu luong mua hang. Project da duoc nang cap nhieu dot ve giao dien, cau truc module va kha nang mo rong.",
    tech: ["TypeScript"],
    commits: 7,
    status: "Hoan thanh",
    repoUrl: "https://github.com/phucyeudoi1905/Interior-Furniture-E-commerce-Website",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
