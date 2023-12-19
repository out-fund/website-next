import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `FeaturedBrands`.
 */
export type FeaturedBrandsProps =
  SliceComponentProps<Content.FeaturedBrandsSlice>

/**
 * Component for "FeaturedBrands" Slices.
 */
const FeaturedBrands = ({ slice }: FeaturedBrandsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for featured_brands (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FeaturedBrands
