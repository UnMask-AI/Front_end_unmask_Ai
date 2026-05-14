import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-xl bg-primary/20 border border-border px-4 py-3 text-sm text-foreground outline-none transition-colors",
          "placeholder:text-muted/70 focus:border-accent focus:ring-1 focus:ring-accent/30",
          className
        )}
        {...props}
      />
    );
  }
);
