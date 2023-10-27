import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { Wrapper } from "@/components/atoms"

/**
 * Props for `Benefits`.
 */
export type BenefitsProps = SliceComponentProps<Content.BenefitsSlice>

/**
 * Component for "Benefits" Slices.
 */
const Benefits = ({ slice }: BenefitsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <div className="grid">
          {slice.items.map((item, index) => (
            <div key={index}>
              {item.top_text}
              <div>{item.bottom_text}</div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default Benefits
