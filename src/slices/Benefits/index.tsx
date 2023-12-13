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
      className="mt-15 bg-bgMedium"
    >
      <Wrapper width="medium">
        <div className="py-8">
          <div className="flex justify-between text-center">
            {slice.items.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="text-[16px] leading-[24px] text-body">
                  {item.top_text}
                </div>
                <div className="text-[24px] leading-[32px] font-medium text-body">
                  {item.bottom_text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default Benefits
