import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `FelxCalculator`.
 */
export type FelxCalculatorProps =
  SliceComponentProps<Content.FelxCalculatorSlice>

/**
 * Component for "FelxCalculator" Slices.
 */
const FelxCalculator = ({ slice }: FelxCalculatorProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for felx_calculator (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FelxCalculator
