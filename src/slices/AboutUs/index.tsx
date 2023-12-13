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
      className="bg-bgMedium"
    >
      <Wrapper width="medium">
        <div className="py-8">
          <div className="mb-4 border-b-2 border-[#E3EBF2]">
            <Heading as="h2" size="h2" className="mb-2">
              {slice.primary.heading}
            </Heading>
            <PrismicRichText
              field={slice.primary.description}
              components={components}
            />
          </div>
          <div className="flex w-full justify-between">
            {slice.items.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="text-[16px] leading-[24px] text-body">
                  {item.text_top}
                </div>
                <div className="text-[24px] leading-[32px] font-medium text-body">
                  {item.text_bottom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default AboutUs
