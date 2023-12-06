//
// PageLayout
//

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next"
import { cn } from "@/lib/utils"

export default function PageLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={cn(
        "PageLink font-normal text-[17px] hover:underline underline-offset-2 focus:underline focus:outline-none",
        className,
      )}
      {...restProps}
    />
  )
}
