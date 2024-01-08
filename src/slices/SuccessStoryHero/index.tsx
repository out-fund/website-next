import { Content } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"

import { Wrapper, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="h1" className=" mb-2">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-[16px] leading-[24px] text-body font-[400] tracking-normal mb-1 last:mb-0">
      {children}
    </p>
  ),
}

/**
 * Props for `SuccessStoryHero`.
 */
export type SuccessStoryHeroProps =
  SliceComponentProps<Content.SuccessStoryHeroSlice>

/**
 * Component for "SuccessStoryHero" Slices.
 */
const SuccessStoryHero = ({ slice }: SuccessStoryHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-10 mb-3 md:mt-15 md:mb-6"
    >
      <Wrapper>
        <article>
          <div className="grid grid-cols-[670fr_440fr] gap-[60px]">
            <div className="left w-full">
              {/* <Heading size="h1" as="h1" className="">
              {slice.primary.heading}
            </Heading> */}
              <PrismicRichText
                field={slice.primary.heading}
                components={components}
              />

              <PrismicRichText
                field={slice.primary.text}
                components={components}
              />
            </div>

            <figure className="founder">
              <PrismicNextImage
                field={slice.primary.founder_image}
                priority={true}
                height={440}
                width={440}
                className="mb-1"
              />
              <figcaption>
                <Heading size="h4" as="div">
                  {slice.primary.founder_name}
                </Heading>
                <div className="text-[16px] leading-[24px] text-body font-[400]">
                  {slice.primary.founder_title}
                </div>
              </figcaption>
            </figure>
          </div>
        </article>
      </Wrapper>
    </section>
  )
}

export default SuccessStoryHero
