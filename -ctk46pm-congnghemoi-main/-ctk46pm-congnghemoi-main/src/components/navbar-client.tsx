"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/actions/auth";

export interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  links: NavLink[];
  isAuthenticated: boolean;
}

export function NavbarClient({ links, isAuthenticated }: NavbarClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-[#CDE3EB] bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#143A52] dark:text-white">
            Nguyễn Thị Hoàng Phúc
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#CDE3EB] text-[#143A52] md:hidden dark:border-gray-700 dark:text-white"
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>

          <div className="hidden items-center gap-5 md:flex md:flex-wrap md:justify-end">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#6E828A] transition-colors hover:text-[#143A52] dark:text-gray-300 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[#6E828A] transition-colors hover:text-[#143A52] dark:text-gray-300 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-[#6E828A] transition-colors hover:text-[#143A52] dark:text-gray-300 dark:hover:text-white"
                >
                  Hồ sơ
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="text-[#6E828A] transition-colors hover:text-[#143A52] dark:text-gray-300 dark:hover:text-white"
                  >
                    Đăng xuất
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#6E828A] transition-colors hover:text-[#143A52] dark:text-gray-300 dark:hover:text-white"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-[#143A52] px-3 py-1.5 text-white hover:bg-[#0f2f43]"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>

        {open ? (
          <div className="mt-4 space-y-2 border-t border-[#CDE3EB] pt-3 md:hidden dark:border-gray-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-[#6E828A] transition-colors hover:bg-[#E3EFF3] hover:text-[#143A52] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-[#6E828A] dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-[#6E828A] dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Hồ sơ
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="block w-full rounded-md px-3 py-2 text-left text-[#6E828A] hover:bg-[#E3EFF3] dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Đăng xuất
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-[#6E828A] dark:hover:bg-gray-800"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 font-medium text-[#143A52] dark:text-[#CDE3EB]"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
