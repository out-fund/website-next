import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { Wrapper, Heading } from "@/components/atoms"

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
      className="mt-10"
    >
      <Wrapper width="medium">
        <div className="bg-bgMedium py-4 px-6 rounded">
          {/* <div className="grid grid-cols-4 items-center text-center"> */}
          <div className="flex justify-between text-center">
            {slice.items.map((item, index) => (
              <div key={index}>
                <div className="text-base text-body">{item.top_text}</div>
                <Heading as="span" size="h4" className="text-body">
                  {item.bottom_text}
                </Heading>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default Benefits
