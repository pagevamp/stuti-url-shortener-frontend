import { cn } from "@/src/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-undraw-secondary-100 border-2 border-cyan-800 text-white border-l rounded-3xl mx-auto",
        ghost: "bg-transparent text-placeholder-100",
      },
      size: {
        default: "px-10 py-2 w-40 h-14 ",
        icon: "size-12",
        "icon-sm": "size-8",
        "icon-lg": "size-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button = ({
  children,
  variant,
  size,
  className,
  type = "button",
  onClick,
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
    type?: "button" | "submit" | "reset"
    variant?: VariantProps<typeof buttonVariants>
    size?: VariantProps<typeof buttonVariants>
    onClick?: () => void
  }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  )
}
