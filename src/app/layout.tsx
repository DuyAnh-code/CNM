import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetPals — Shop Phụ Kiện Thú Cưng",
  description:
    "PetPals Shop — Cửa hàng phụ kiện thú cưng uy tín. Vòng cổ, thức ăn, đồ chơi, quần áo và các sản phẩm chăm sóc cho chó mèo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-[var(--background)] text-[var(--foreground)] flex flex-col overflow-x-hidden">
        {/* Ambient background blobs */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-600/8 blur-[120px]" />
          <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-500/6 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-green-500/5 blur-[100px]" />
        </div>

        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
