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
        // "inline-block text-base font-[500] text-cobalt underline-offset-2  hover:underline focus:underline focus:outline-none",
        "PageLink font-normal text-[17px] hover:underline underline-offset-2 focus:underline focus:outline-none",
        className,
      )}
      {...restProps}
    />
  )
}
