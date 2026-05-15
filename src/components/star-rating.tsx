export function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "md" ? "text-xl" : "text-sm";
  return (
    <span className={`inline-flex gap-0.5 ${sizeClass}`} aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </span>
  );
}
