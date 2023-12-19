import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `FeaturedStories`.
 */
export type FeaturedStoriesProps =
  SliceComponentProps<Content.FeaturedStoriesSlice>

/**
 * Component for "FeaturedStories" Slices.
 */
const FeaturedStories = ({ slice }: FeaturedStoriesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for featured_stories (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FeaturedStories
