import Link from "next/link";

interface CategoryCardProps {
  category: {
    slug: string;
    name: string;
    icon: string | null;
    description: string | null;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="category-card group flex flex-col items-center gap-3 rounded-xl glass p-6 text-center transition-all hover:glow-sm"
    >
      <span className="text-4xl transition-transform group-hover:scale-110 animate-paw">
        {category.icon || "📦"}
      </span>
      <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-xs text-[var(--muted-strong)] line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  );
}
