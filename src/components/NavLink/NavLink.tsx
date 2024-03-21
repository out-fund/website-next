import { cn } from "@/lib/utils"
import classes from "./NavLink.module.scss"
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next"

export default function NavLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={cn(classes.navlink, className)}
      {...restProps}
    />
  )
}
