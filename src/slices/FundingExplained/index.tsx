import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

import { Wrapper, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="mb-2 text-base font-normal last:mb-0 text-body">{children}</p>
  ),
}

/**
 * Props for `FundingExplained`.
 */
export type FundingExplainedProps =
  SliceComponentProps<Content.FundingExplainedSlice>

/**
 * Component for "FundingExplained" Slices.
 */
const FundingExplained = ({ slice }: FundingExplainedProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <Wrapper>
        <Heading as="h2" size="h2" className="mb-4">
          {slice.primary.heading}
        </Heading>
        <hr className="border-t-2 border-[#F0F4F9]" />
        <div className="flex flex-col items-end ">
          {slice.items.map((item, index) => (
            <div
              key={index}
              className="flex border-b-2 border-[#F0F4F9] last:border-0 max-w-[878px] w-full items-start pb-5 pt-4"
            >
              <PrismicNextImage
                field={item.icon}
                width={79}
                height={45}
                className="pt-[11px]"
              />
              <Heading
                size="h4"
                as="h3"
                className="ml-4 max-w-[175px] font-medium text-xl text-heading"
              >
                {item.title}
              </Heading>
              <div className="pt-1 ml-auto max-w-[470px]">
                <PrismicRichText
                  field={item.description}
                  components={components}
                />
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default FundingExplained
