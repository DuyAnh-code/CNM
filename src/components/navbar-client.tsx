"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/actions/auth";
import { CartIcon } from "@/components/cart-icon";

export interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  links: NavLink[];
  isAuthenticated: boolean;
  isAdmin?: boolean;
}

export function NavbarClient({ links, isAuthenticated, isAdmin }: NavbarClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] glass">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 text-lg transition-transform group-hover:scale-110">
              🐾
            </span>
            <span className="text-lg font-bold text-[var(--foreground)] hidden sm:inline">
              PetPals
            </span>
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)] md:hidden"
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className="rounded-lg px-3 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
                  >
                    🛠️ Quản lý
                  </Link>
                )}
                <Link
                  href="/orders"
                  className="rounded-lg px-3 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
                >
                  Đơn hàng
                </Link>
                <Link
                  href="/profile"
                  className="rounded-lg px-3 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
                >
                  Hồ sơ
                </Link>
                <CartIcon />
                <form action={logout}>
                  <button
                    type="submit"
                    className="ml-1 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:border-red-500/40 hover:text-red-400"
                  >
                    Đăng xuất
                  </button>
                </form>
              </>
            ) : (
              <>
                <CartIcon />
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="ml-1 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="mt-3 space-y-1 border-t border-[var(--border)] pt-3 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-[var(--accent-subtle)]"
                  >
                    🛠️ Quản lý
                  </Link>
                )}
                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-[var(--accent-subtle)]"
                >
                  Đơn hàng
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-[var(--accent-subtle)]"
                >
                  🛒 Giỏ hàng
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-[var(--accent-subtle)]"
                >
                  Hồ sơ
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10"
                  >
                    Đăng xuất
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-[var(--accent-subtle)]"
                >
                  🛒 Giỏ hàng
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-[var(--accent-subtle)]"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-[var(--accent)] px-3 py-2.5 text-center text-sm font-medium text-white"
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
