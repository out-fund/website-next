import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("font-extrabold tracking-tight text-heading ", {
  variants: {
    size: {
      h1: "text-6xl",
      h2: "text-3xl ",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-base",
    },
  },
})

// type HeadingProps = {
//   as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
//   className?: string
//   children: React.ReactNode
//   // size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
// }

interface HeadingProps extends VariantProps<typeof variants> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
  children: React.ReactNode
  // size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export default function Heading({
  as: Comp,
  className,
  children,
  size,
}: HeadingProps) {
  // const calculatedSize = size || Comp
  return <Comp className={cn(variants({ size }), className)}>{children}</Comp>
}
