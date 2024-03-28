import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import c from "./Heading.module.scss"

const variants = cva(c.heading, {
  variants: {
    size: {
      h1: c.heading__h1,
      h2: c.heading__h2,
      h3: c.heading__h3,
      h4: c.heading__h4,
      h5: c.heading__h5,
      h6: c.heading__h6,
    },
  },
})

interface HeadingProps extends VariantProps<typeof variants> {
  as: any
  className?: string
  children: React.ReactNode
}

export default function Heading({
  as: Comp,
  className,
  children,
  size,
}: HeadingProps) {
  return <Comp className={cn(variants({ size }), className)}>{children}</Comp>
}
