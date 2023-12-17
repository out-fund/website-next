import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `FeaturedIn`.
 */
export type FeaturedInProps = SliceComponentProps<Content.FeaturedInSlice>

/**
 * Component for "FeaturedIn" Slices.
 */
const FeaturedIn = ({ slice }: FeaturedInProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for featured_in (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FeaturedIn
