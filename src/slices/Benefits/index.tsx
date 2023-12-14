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
      className=" mt-10 mb-10 md:mt-15 md:mb-15 py-10 md:py-15 bg-bgMedium"
    >
      <Wrapper>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 text-center">
          {slice.items.map((item, index) => (
            <Heading
              size="h3"
              as="h3"
              key={index}
              className="flex flex-col gap-1"
            >
              <span className="text-[16px] leading-[24px] text-body">
                {item.top_text}
              </span>
              <span className="text-[24px] leading-[32px] font-medium text-body">
                {item.bottom_text}
              </span>
            </Heading>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default Benefits
