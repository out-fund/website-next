import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("font-light tracking-tight text-heading ", {
  variants: {
    size: {
      // h1: "text-5xl",
      h1: "text-[56px] leading-[1] font-light",
      h2: "text-3xl font-light",
      h3: "text-[24px] leading-[32px] font-medium",
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
  as: any
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
