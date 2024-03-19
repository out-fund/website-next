import { Content, isFilled } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import { SliceComponentProps } from "@prismicio/react"

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
      {isFilled.keyText(slice.primary.button_text) && (
        <PrismicNextLink field={slice.primary.button_link}>
          {slice.primary.button_text}
        </PrismicNextLink>
      )}

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
