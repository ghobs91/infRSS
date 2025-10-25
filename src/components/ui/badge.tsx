import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 glass-card shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default:
          "text-[var(--primary)]",
        secondary:
          "text-[var(--text-secondary)]",
        destructive:
          "text-red-500",
        outline: "border-2 border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
