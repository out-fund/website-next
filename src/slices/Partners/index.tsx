import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

import { Heading, Wrapper } from "@/components/atoms"

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
      </Wrapper>
    </section>
  )
}

export default Partners
