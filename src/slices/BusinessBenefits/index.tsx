import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { PrismicNextImage } from "@prismicio/next"
import { Wrapper, Heading } from "@/components/atoms"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base font-normal text-body max-w-[770px] mx-auto text-center">
      {children}
    </p>
  ),
}

/**
 * Props for `BusinessBenefits`.
 */
export type BusinessBenefitsProps =
  SliceComponentProps<Content.BusinessBenefitsSlice>

/**
 * Component for "BusinessBenefits" Slices.
 */
const BusinessBenefits = ({ slice }: BusinessBenefitsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <div className="flex justify-between ">
          {slice.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-[300px] items-center gap-1"
            >
              <PrismicNextImage
                field={item.icon}
                width={48}
                height={48}
                className=""
              />

              <Heading as="h3" size="h3" className=" text-center">
                {item.title}
              </Heading>

              <PrismicRichText
                field={item.description}
                components={components}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default BusinessBenefits
