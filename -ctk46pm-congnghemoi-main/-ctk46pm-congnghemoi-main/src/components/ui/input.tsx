import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#CDE3EB] bg-white px-3 py-2 text-sm text-[#143A52] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6E828A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143A52] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
