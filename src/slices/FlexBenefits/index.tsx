import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `FlexBenefits`.
 */
export type FlexBenefitsProps = SliceComponentProps<Content.FlexBenefitsSlice>

/**
 * Component for "FlexBenefits" Slices.
 */
const FlexBenefits = ({ slice }: FlexBenefitsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for flex_benefits (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FlexBenefits
