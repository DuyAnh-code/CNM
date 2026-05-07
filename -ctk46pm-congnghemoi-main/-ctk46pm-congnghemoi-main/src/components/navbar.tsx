import { createClient } from "@/lib/supabase/server";
import { NavbarClient, type NavLink } from "@/components/navbar-client";

const LINKS: NavLink[] = [
  { href: "/", label: "Blog" },
  { href: "/portfolio", label: "Trang chủ (portfolio)" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/blog", label: "Blog (tĩnh)" },
  { href: "/projects", label: "Dự án" },
  { href: "/guestbook", label: "Lưu bút" },
  { href: "/skills", label: "Kỹ năng" },
  { href: "/contact", label: "Liên hệ" },
];

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavbarClient links={LINKS} isAuthenticated={!!user} />;
}
