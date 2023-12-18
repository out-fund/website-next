import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next"

import { Wrapper, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    // <p className="text-[16px] leading-[24px] text-body">{children}</p>
    <Heading as="h3" size="h4" className="md:leading-[28px]">
      {children}
    </Heading>
  ),
}

/**
 * Props for `FeaturedIn`.
 */
export type FeaturedInProps = SliceComponentProps<Content.FeaturedInSlice>

/**
 * Component for "FeaturedIn" Slices.
 */
const FeaturedIn = ({ slice }: FeaturedInProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-10 mb-10 md:mt-15 md:mb-15"
    >
      <Wrapper>
        <Heading as="h2" size="h2" className="mb-4">
          {slice.primary.heading}
        </Heading>
        <div className="grid lg:grid-cols-3 gap-3 ">
          {slice.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-3 md:p-6 bg-bgMedium gap-3"
            >
              <div className="bg-bgDark px-1 text-[14px] leading-[24px] text-body">
                {item.tag}
              </div>
              <PrismicRichText
                field={item.description}
                components={components}
              />

              <PrismicNextLink field={item.url} className="mt-auto">
                <PrismicNextImage field={item.logo} className="" />
              </PrismicNextLink>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default FeaturedIn
