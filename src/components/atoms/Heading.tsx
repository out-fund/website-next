import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("font-light tracking-tight text-heading ", {
  variants: {
    size: {
      // h1: "text-5xl",
      h1: "text-heading text-[40px] leading-[48px] font-[350] md:text-[56px] md:leading-[64px] md:font-[350] tracking-[-0.04em]",
      h2: "text-heading text-[32px] leading-[40px] font-[350] md:text-[48px] md:leading-[56px] md:font-[350] tracking-[-0.04em]",
      h3: "text-heading text-[20px] leading-[32px] font-[450] md:text-[24px] md:leading-[32px] md:font-[500] tracking-[-0.02em]",
      h4: "text-heading text-[18px] leading-[24px] font-[350] md:text-[18px] md:leading-[24px] md:font-[500] tracking-[-0.02em]",
      h5: "text-heading text-[16px] leading-[24px] font-[350] md:text-[16px] md:leading-[24px] md:font-[400] tracking-[-0.01em]",
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
