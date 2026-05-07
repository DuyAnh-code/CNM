export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
}

export const posts: Post[] = [
  {
    slug: "gioi-thieu-nextjs",
    title: "Gioi thieu Next.js - Framework React pho bien",
    excerpt: "Tong quan ve Next.js va ly do framework nay phu hop cho du an web hien dai.",
    content: `Next.js la mot React framework manh me duoc phat trien boi Vercel.
No cung cap App Router, Server Components, SSR va SSG.

Mot so uu diem noi bat:
- Routing tu dong dua tren cau truc thu muc
- Ho tro Server Components va Client Components
- Toi uu hinh anh, font va scripts
- Tich hop TypeScript tot`,
    date: "2026-04-14",
    category: "Cong nghe",
    author: "Lê Bình Duy Anh",
  },
  {
    slug: "hoc-tailwind-css",
    title: "Hoc Tailwind CSS theo huong utility-first",
    excerpt: "Cach su dung class utility de xay dung giao dien nhanh va nhat quan.",
    content: `Tailwind CSS giup viet UI bang cac class utility nho gon.
Thay vi viet file CSS dai, ban co the mo ta truc tiep bo cuc va style trong JSX.

Loi ich chinh:
- Tang toc do phat trien UI
- Han che xung dot CSS
- De tao responsive voi prefix sm/md/lg`,
    date: "2026-04-13",
    category: "Cong nghe",
    author: "Lê Bình Duy Anh",
  },
  {
    slug: "kinh-nghiem-tu-hoc-lap-trinh",
    title: "Kinh nghiem tu hoc lap trinh hieu qua",
    excerpt: "Mot vai bai hoc thuc te giup duy tri tien do hoc lap trinh ben vung.",
    content: `Tu hoc lap trinh can su ky luat va thuc hanh deu dan.
Nhung dieu minh thay hieu qua:

1. Dat muc tieu nho cho tung tuan
2. Lam du an thuc te thay vi chi doc ly thuyet
3. Ghi chep va tong ket bai hoc sau moi chu de`,
    date: "2026-04-12",
    category: "Hoc tap",
    author: "Lê Bình Duy Anh",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
