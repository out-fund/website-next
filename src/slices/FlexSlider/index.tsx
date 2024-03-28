import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `FlexSlider`.
 */
export type FlexSliderProps = SliceComponentProps<Content.FlexSliderSlice>

/**
 * Component for "FlexSlider" Slices.
 */
const FlexSlider = ({ slice }: FlexSliderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for flex_slider (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FlexSlider
