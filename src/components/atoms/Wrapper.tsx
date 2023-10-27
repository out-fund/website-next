import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("mx-auto w-full px-[15px] ", {
  variants: {
    width: {
      wide: "max-w-[1200px]",
      medium: "max-w-[1000px]",
      narrow: "max-w-[800px]",
    },
  },
  defaultVariants: {
    width: "wide",
  },
})

interface WrapperProps extends VariantProps<typeof variants> {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

export default function Wrapper({
  as: Comp = "div",
  width,
  className,
  children,
  ...restProps
}: WrapperProps) {
  return (
    <Comp className={cn(variants({ width }), className)} {...restProps}>
      {children}
    </Comp>
  )
}
