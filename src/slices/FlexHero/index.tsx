import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

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
      Placeholder component for flex_hero (variation: {slice.variation}) Slices
    </section>
  )
}

export default FlexHero
