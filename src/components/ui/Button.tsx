import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-primary-dark font-semibold hover:bg-accent-muted shadow-lg shadow-accent/20",
  secondary:
    "glass border border-border text-foreground hover:bg-primary/20",
  ghost: "text-muted hover:text-foreground hover:bg-primary/10",
  danger:
    "border border-red-500/40 text-red-400 hover:bg-red-500/10",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: "sm" | "md" | "lg";
  }
>(function Button(
  { className, variant = "primary", size = "md", disabled, ...props },
  ref
) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-full",
    lg: "px-6 py-3 text-base rounded-full",
  };
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
