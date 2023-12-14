import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

import { Wrapper, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base font-normal text-body max-w-[770px] mx-auto mb-5">
      {children}
    </p>
  ),
}

/**
 * Props for `UnmatchedService`.
 */
export type UnmatchedServiceProps =
  SliceComponentProps<Content.UnmatchedServiceSlice>

/**
 * Component for "UnmatchedService" Slices.
 */
const UnmatchedService = ({ slice }: UnmatchedServiceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-10 mb-10 md:mt-15 md:mb-15"
    >
      <Wrapper width="medium">
        <Heading as="h2" size="h2" className="mb-8 text-center">
          {slice.primary.heading}
        </Heading>
        <div className="flex flex-col md:flex-row justify-between gap-3">
          {slice.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col mx-auto md:mx-0 max-w-[80%] md:max-w-[300px] gap-1 "
            >
              <PrismicNextImage
                field={item.icon}
                width={48}
                height={48}
                className=""
              />

              <Heading as="h3" size="h3" className=" ">
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

export default UnmatchedService
