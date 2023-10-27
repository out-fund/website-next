import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

import { Heading, Wrapper } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => <p className="">{children}</p>,
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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <Heading as="h2">{slice.primary.heading}</Heading>
        <PrismicRichText
          field={slice.primary.description}
          components={components}
        />
        {slice.items.map((item, index) => (
          <div key={index}>
            <PrismicNextImage field={item.partner_logo} />
          </div>
        ))}
      </Wrapper>
    </section>
  )
}

export default Partners
