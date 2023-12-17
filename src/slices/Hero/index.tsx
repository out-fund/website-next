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
    <>
      {/* -------------------------------------- Default */}
      {slice.variation === "default" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="lg:pb-[40px] "
        >
          <Wrapper>
            <div className="grid lg:grid-cols-2 ">
              <div className="relative py-9 bg-bgMedium">
                <div className="hidden lg:block lg:absolute lg:top-[0px] lg:right-[-40px] lg:h-full lg:w-[calc(50vw+40px)] lg:bg-bgMedium"></div>
                <div className="flex flex-col max-w-[80%] mx-auto lg:mx-0 lg:max-w-[470px] gap-4 items-start relative">
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
              <div className="lg:relative lg:z-10 ">
                <div className=" lg:absolute lg:top-[40px] lg:left-[-40px] h-full lg:w-[calc(50vw+40px)] ">
                  <PrismicNextImage
                    field={slice.primary.image.mobile}
                    priority
                    height={512}
                    width={1200}
                    className="w-full lg:hidden "
                  />
                  <PrismicNextImage
                    field={slice.primary.image}
                    priority
                    height={512}
                    width={768}
                    className="hidden lg:block object-cover object-[20%] lg:object-left-top w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Wrapper>
        </section>
      )}

      {/* -------------------------------------- Simple */}
      {slice.variation === "simple" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="py-10  bg-bgMedium md:py-15"
        >
          <Wrapper>
            <div className="mx-auto md:mx-0 max-w-[90%] md:max-w-none">
              <div className="flex flex-col gap-3">
                <PrismicRichText
                  field={slice.primary.heading}
                  components={components}
                />
                <div className="max-w-[570px]">
                  <PrismicRichText
                    field={slice.primary.description}
                    components={components}
                  />
                </div>
              </div>
            </div>
          </Wrapper>
        </section>
      )}
    </>
  )
}

export default Hero
