import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { PrismicNextImage } from "@prismicio/next"
import { Wrapper, Heading } from "@/components/atoms"
/**
 * Props for `UsingFunds`.
 */
export type UsingFundsProps = SliceComponentProps<Content.UsingFundsSlice>

/**
 * Component for "UsingFunds" Slices.
 */
const UsingFunds = ({ slice }: UsingFundsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-10 mb-10 md:mt-15 md:mb-15"
    >
      <Wrapper>
        <Heading as="h2" size="h2" className="mb-4 text-right">
          {slice.primary.heading}
        </Heading>
        <hr className="border-t-2 border-[#F0F4F9]" />
        <div className="flex flex-col md:flex-row gap-6 pt-4 allGroup">
          {slice.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-[80%] mx-auto md:mx-0 md:w-[300px]"
            >
              <PrismicNextImage
                field={item.icon}
                width={80}
                height={80}
                className="mb-3"
              />

              <Heading as="h3" size="h3" className="mb-1">
                {item.title}
              </Heading>

              <p className="text-base font-normal text-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default UsingFunds
