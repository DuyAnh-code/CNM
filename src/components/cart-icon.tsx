"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function CartIcon() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    async function fetchCount() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setCount(0); return; }

      const { count: c } = await supabase
        .from("cart_items")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setCount(c ?? 0);
    }

    fetchCount();

    // Listen for custom cart update events
    const handler = () => fetchCount();
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40"
      aria-label="Giỏ hàng"
    >
      <span className="text-lg">🛒</span>
      {count > 0 && (
        <span className="cart-badge">{count > 99 ? "99+" : count}</span>
      )}
    </Link>
  );
}
