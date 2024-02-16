import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

import { Heading, Wrapper, Button, PageLink } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base font-[450] tracking-tighter text-body">
      {children}
    </p>
  ),
}

/**
 * Props for `Partners`.
 */
export type PartnersProps = SliceComponentProps<Content.PartnersSlice>

/**
 * Component for "Partners" Slices.
 */
const Partners = ({ slice }: PartnersProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section
          className=""
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <Wrapper width="medium">
            <div className="mb-4 text-center">
              <Heading as="h2" size="h2" className="mb-1">
                {slice.primary.heading}
              </Heading>
              <PrismicRichText
                field={slice.primary.description}
                components={components}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:justify-between ">
              {slice.items.map((item, index) => (
                <div key={index}>
                  <PrismicNextImage
                    field={item.partner_logo}
                    loading="lazy"
                    priority={false}
                  />
                </div>
              ))}
            </div>
            {slice.primary.button_text && slice.primary.button_link && (
              <div className="mt-6 text-center">
                {/* <Button
                  link={slice.primary.button_link}
                  className="text-[16px] font-[500]"
                >
                  {slice.primary.button_text}
                </Button> */}
                <PageLink
                  field={slice.primary.button_link}
                  className="border-none rounded-3xl bg-cobalt text-white px-[40px] py-[12px] leading-[24px] text-[16px] inline-block text-center font-medium hover:underline hover:outline-none focus:underline focus:outline-2 focus:outline-offset-2 decoration-1 underline-offset-2 whitespace-nowrap flex-nowrap"
                >
                  {slice.primary.button_text}
                </PageLink>
              </div>
            )}
          </Wrapper>
        </section>
      )}
      {slice.variation === "logoStripWithBg" && (
        <section
          className="py-10 bg-bgMedium md:py-15"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <Wrapper width="medium">
            <div className="mb-4 text-center">
              <Heading as="h2" size="h2" className="mb-1">
                {slice.primary.heading}
              </Heading>
              <PrismicRichText
                field={slice.primary.description}
                components={components}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:justify-between ">
              {slice.items.map((item, index) => (
                <div key={index}>
                  <PrismicNextImage
                    field={item.partner_logo}
                    loading="lazy"
                    priority={false}
                  />
                </div>
              ))}
            </div>
            {slice.primary.button_text && slice.primary.button_link && (
              <div className="mt-6 text-center">
                <PageLink
                  field={slice.primary.button_link}
                  className="border-none rounded-3xl bg-cobalt text-white px-[40px] py-[12px] leading-[24px] text-[16px] inline-block text-center font-medium hover:underline hover:outline-none focus:underline focus:outline-2 focus:outline-offset-2 decoration-1 underline-offset-2 whitespace-nowrap flex-nowrap"
                >
                  {slice.primary.button_text}
                </PageLink>
              </div>
            )}
          </Wrapper>
        </section>
      )}
    </>
  )
}

export default Partners
