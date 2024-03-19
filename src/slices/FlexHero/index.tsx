import { Content, isFilled } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import { SliceComponentProps } from "@prismicio/react"

import { PrismicRichText, PrismicText } from "@prismicio/react"

/**
 * Props for `FlexHero`.
 */
export type FlexHeroProps = SliceComponentProps<Content.FlexHeroSlice>

/**
 * Component for "FlexHero" Slices.
 */
const FlexHero = ({ slice }: FlexHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Placeholder component for flex_hero (variation: {slice.variation}) Slices */}
      {/* <PrismicRichText field={slice.primary.heading} /> */}
      {isFilled.richText(slice.primary.heading) && (
        <h1 className="">
          <PrismicText field={slice.primary.heading} />
        </h1>
      )}

      {isFilled.richText(slice.primary.description) && (
        <p className="">
          <PrismicText field={slice.primary.description} />
        </p>
      )}

      {isFilled.keyText(slice.primary.button_text) && (
        <PrismicNextLink field={slice.primary.button_link}>
          {slice.primary.button_text}
        </PrismicNextLink>
      )}
    </section>
  )
}

export default FlexHero
