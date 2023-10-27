import { Content, isFilled } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import { createClient } from "@/prismicio"

import { Wrapper, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  // heading1: ({ children }) => <h1 className="">{children}</h1>,
  heading2: ({ children }) => (
    <Heading as="h2" className="test">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p className="">{children}</p>,
}

/**
 * Props for `ClientsSay`.
 */
export type ClientsSayProps = SliceComponentProps<Content.ClientsSaySlice>

/**
 * Component for "ClientsSay" Slices.
 */
const ClientsSay = async ({ slice }: ClientsSayProps): Promise<JSX.Element> => {
  // console.log(slice.items)
  const client = createClient()

  const testimonials = await Promise.all(
    slice.items.map((item) => {
      if (
        isFilled.contentRelationship(item.testimonial) &&
        item.testimonial.uid
      ) {
        return client.getByUID("testimonial", item.testimonial.uid)
      }
    }),
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <PrismicRichText
          field={slice.primary.heading}
          components={components}
        />
        <div className="grid">
          {testimonials.map(
            (item, index) =>
              item && (
                <div key={index}>
                  <PrismicNextImage
                    field={item.data.company_logo}
                    width={160}
                    height={40}
                  />
                  {item.data.company_name}

                  {item.data.quote}

                  <PrismicNextImage
                    field={item.data.profile_photo}
                    width={40}
                    height={40}
                    imgixParams={{ ar: "1:1", fit: "crop" }}
                  />
                  {item.data.name}
                  {item.data.job_title}
                </div>
              ),
          )}
        </div>

        <div>{slice.primary.cta_title}</div>
        <button>{slice.primary.button_text}</button>
      </Wrapper>
    </section>
  )
}

export default ClientsSay
