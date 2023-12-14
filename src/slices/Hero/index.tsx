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
    <Heading as="h1" size="h1" className="leading-[64px]">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-base font-normal text-body">{children}</p>
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
      className=" mb-[120px] "
    >
      {/* -------------------------------------- Default */}
      {slice.variation === "default" && (
        <>
          <Wrapper>
            <div className="grid grid-cols-2 ">
              <div className="relative py-9 bg-bgMedium">
                <div className="container absolute top-[0px] right-[-40px] h-full w-[calc(50vw+40px)] bg-bgMedium"></div>
                <div className="flex flex-col max-w-[470px] gap-4 items-start relative">
                  <div className="flex flex-col gap-3">
                    <PrismicRichText
                      field={slice.primary.heading}
                      components={components}
                    />
                    <PrismicRichText
                      field={slice.primary.description}
                      components={components}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1 buttonWrappe">
                    <Button href="/">{slice.primary.button_text}</Button>
                    <div className="text-[12px] leading-[16px] tracking-tight text-[#5B6F85] ">
                      {slice.primary.button_note}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative z-10 image">
                <div className="container absolute top-[40px] left-[-40px] h-full  w-[calc(50vw+40px)] ">
                  <PrismicNextImage
                    field={slice.primary.image}
                    priority
                    height={512}
                    width={1200}
                    className="object-cover object-left-top w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Wrapper>
        </>
      )}

      {/* -------------------------------------- Simple */}
      {slice.variation === "simple" && <div>dimple</div>}
    </section>
  )
}

export default Hero
