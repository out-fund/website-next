import { Content } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"

import { Wrapper, Button, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  // heading1: ({ children }) => <h1 className="">{children}</h1>,
  heading1: ({ children }) => (
    <Heading as="h1" size="h1" className="text-[80px] leading-[1]">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-base font-[450] tracking-tighter text-body">
      {children}
    </p>
  ),
}

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <div className="grid grid-cols-[664fr_506fr] rounded-lg bg-bgDark">
          <div className="flex flex-col gap-6 pb-9 pl-[100px] pr-[40px] pt-9">
            <div className="flex flex-col gap-2 ">
              <PrismicRichText
                field={slice.primary.heading}
                components={components}
              />
              <PrismicRichText
                field={slice.primary.description}
                components={components}
              />
            </div>
            <div className="flex flex-col items-start gap-1	">
              <Button href="/">{slice.primary.button_text}</Button>
              <div className="text-xs tracking-tight text-body opacity-70">
                {slice.primary.button_note}
              </div>
            </div>
          </div>
          {/* <div className="self-end justify-self-center"> */}
          <div className="self-end">
            <PrismicNextImage field={slice.primary.image} priority />
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default Hero
