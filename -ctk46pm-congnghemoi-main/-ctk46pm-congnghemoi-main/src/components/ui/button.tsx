import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143A52] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#143A52] text-white hover:bg-[#0f2f43]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-[#CDE3EB] bg-white text-[#143A52] hover:bg-[#E3EFF3]",
        secondary: "bg-[#E3EFF3] text-[#143A52] hover:bg-[#CDE3EB]",
        ghost: "hover:bg-[#E3EFF3] text-[#143A52]",
        link: "text-[#143A52] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
