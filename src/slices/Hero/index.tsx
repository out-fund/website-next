import { Content } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"

import { Wrapper, Button, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="h1" className="">
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
      className="md:pb-[40px] "
    >
      {/* -------------------------------------- Default */}
      {slice.variation === "default" && (
        <>
          <Wrapper>
            <div className="grid md:grid-cols-2 ">
              <div className="relative py-9 bg-bgMedium">
                <div className="hidden md:block md:absolute md:top-[0px] md:right-[-40px] md:h-full md:w-[calc(50vw+40px)] md:bg-bgMedium"></div>
                <div className="flex flex-col max-w-[90%] mx-auto md:mx-0 md:max-w-[470px] gap-4 items-start relative">
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
              <div className="md:relative md:z-10 ">
                <div className=" lg:absolute lg:top-[40px] lg:left-[-40px] h-full lg:w-[calc(50vw+40px)] ">
                  <PrismicNextImage
                    field={slice.primary.image.mobile}
                    priority
                    height={512}
                    width={1200}
                    className="md:hidden w-full "
                  />
                  <PrismicNextImage
                    field={slice.primary.image}
                    priority
                    height={512}
                    width={768}
                    className="hidden md:block object-cover object-[20%] lg:object-left-top w-full h-full"
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
