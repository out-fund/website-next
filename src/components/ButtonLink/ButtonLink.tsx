import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next"
import clsx from "clsx"
import classes from "./ButtonLink.module.scss"

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(classes.buttonLink, className)}
      {...restProps}
    />
  )
}
