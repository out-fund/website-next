import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next"
import { cn } from "@/lib/utils"
import classes from "./ButtonLink.module.scss"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva(classes.buttonLink, {
  variants: {
    variant: {
      primary: classes.buttonLink__primary,
      secondary: classes.buttonLink__secondary,
      line: classes.buttonLink__line,
    },
    size: {
      small: classes.buttonLink__small,
      medium: classes.buttonLink__medium,
      large: classes.buttonLink__large,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
})

interface ButtonLinkProps extends VariantProps<typeof variants> {
  className?: string
  children: React.ReactNode
  field: PrismicNextLinkProps["field"]
}

export default function ButtonLink({
  className,
  variant,
  ...restProps
}: ButtonLinkProps) {
  return (
    <PrismicNextLink
      className={cn(variants({ variant }), className)}
      {...restProps}
    />
  )
}
