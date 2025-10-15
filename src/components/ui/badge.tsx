import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 glass-card",
  {
    variants: {
      variant: {
        default:
          "text-[var(--primary)] hover:scale-105",
        secondary:
          "text-[var(--text-secondary)] hover:scale-105",
        destructive:
          "text-red-500 hover:scale-105",
        outline: "border border-[var(--border)] text-[var(--text-primary)] hover:scale-105",
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
