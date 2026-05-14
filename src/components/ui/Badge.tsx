import { cn } from "@/lib/cn";

export type BadgeVariant = "default" | "success" | "warning" | "danger";

const styles: Record<BadgeVariant, string> = {
  default: "bg-primary/30 text-foreground border border-border",
  success: "bg-accent/15 text-accent border border-accent/30",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  danger: "bg-red-500/10 text-red-400 border border-red-500/30",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
