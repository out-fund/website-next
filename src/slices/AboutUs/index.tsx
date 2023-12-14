import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

import { Wrapper, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base font-normal text-body max-w-[570px]  mb-5 ">
      {children}
    </p>
  ),
}

/**
 * Props for `AboutUs`.
 */
export type AboutUsProps = SliceComponentProps<Content.AboutUsSlice>

/**
 * Component for "AboutUs" Slices.
 */
const AboutUs = ({ slice }: AboutUsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-10 md:py-15  mt-10 mb-10 md:mt-15 md:mb-15 bg-bgMedium"
    >
      <Wrapper width="medium">
        <div className=" ">
          <div className="mb-4 border-b-2 border-[#E3EBF2] mx-auto md:mx-0 max-w-[80%] md:max-w-none">
            <Heading as="h2" size="h2" className="mb-2">
              {slice.primary.heading}
            </Heading>
            <PrismicRichText
              field={slice.primary.description}
              components={components}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 text-center">
            {slice.items.map((item, index) => (
              <Heading
                size="h3"
                as="h3"
                key={index}
                className="flex flex-col gap-1"
              >
                <span className="text-[16px] leading-[24px] text-body font-[400] tracking-normal">
                  {item.text_top}
                </span>
                <span className="text-[24px] leading-[32px] text-body">
                  {item.text_bottom}
                </span>
              </Heading>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default AboutUs
