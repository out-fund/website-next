import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `UnmatchedService`.
 */
export type UnmatchedServiceProps =
  SliceComponentProps<Content.UnmatchedServiceSlice>

/**
 * Component for "UnmatchedService" Slices.
 */
const UnmatchedService = ({ slice }: UnmatchedServiceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for unmatched_service (variation: {slice.variation})
      Slices
    </section>
  )
}

export default UnmatchedService
