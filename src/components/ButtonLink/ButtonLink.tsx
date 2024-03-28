import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next"
import { cn } from "@/lib/utils"
import classes from "./ButtonLink.module.scss"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva(classes.buttonlink, {
  variants: {
    variant: {
      primary: classes.buttonlink__primary,
      secondary: classes.buttonlink__secondary,
      line: classes.buttonlink__line,
    },
    size: {
      small: classes.buttonlink__small,
      medium: classes.buttonlink__medium,
      large: classes.buttonlink__large,
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
  size,
  ...restProps
}: ButtonLinkProps) {
  return (
    <PrismicNextLink
      className={cn(variants({ variant, size }), className)}
      {...restProps}
    />
  )
}
