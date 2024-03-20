import { Logo } from "@/components/atoms"
import { Content, isFilled } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import { SliceComponentProps } from "@prismicio/react"
import Link from "next/link"

/**
 * Props for `FlexHeader`.
 */
export type FlexHeaderProps = SliceComponentProps<Content.FlexHeaderSlice>

/**
 * Component for "FlexHeader" Slices.
 */
const FlexHeader = ({ slice }: FlexHeaderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="navbar">
        <Link href="/" className="logo">
          <span className="sr-only">{slice.primary.home_page_text}</span>
          <Logo />
        </Link>
        {isFilled.keyText(slice.primary.button_text) && (
          <PrismicNextLink field={slice.primary.button_link}>
            {slice.primary.button_text}
          </PrismicNextLink>
        )}
      </div>

      <ul>
        {slice.items.map((item, index) => (
          <li key={index}>
            <PrismicNextLink field={item.navlink_link}>
              {item.navlink_text}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FlexHeader
