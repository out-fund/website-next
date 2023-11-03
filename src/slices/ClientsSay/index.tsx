import { Content, isFilled } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import { createClient } from "@/prismicio"

import { Wrapper, Heading, Button } from "@/components/atoms"

// const components: JSXMapSerializer = {
//   // heading1: ({ children }) => <h1 className="">{children}</h1>,
//   heading2: ({ children }) => (
//     <Heading as="h2" className="test">
//       {children}
//     </Heading>
//   ),
//   paragraph: ({ children }) => <p className="">{children}</p>,
// }

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
      className="mt-10"
    >
      <Wrapper width="medium">
        {/* <PrismicRichText
          field={slice.primary.heading}
          components={components}
        /> */}
        <Heading as="h2" size="h2" className="text-center mb-5">
          {slice.primary.heading}
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {testimonials.map(
            (item, index) =>
              item && (
                <div
                  key={index}
                  className="bg-bgMedium px-5 py-4 rounded flex flex-col "
                >
                  {/* <div className="sr-only">{item.data.company_name}</div> */}
                  <PrismicNextImage
                    field={item.data.company_logo}
                    width={160}
                    height={40}
                  />
                  <p className="text-md text-body mb-2">{item.data.quote}</p>

                  <div className="flex items-center gap-1 mt-auto">
                    <PrismicNextImage
                      field={item.data.profile_photo}
                      width={40}
                      height={40}
                      imgixParams={{ ar: "1:1", fit: "crop" }}
                      className="rounded-full"
                    />

                    <div className="text-md text-body">
                      {item.data.name}, {item.data.job_title}
                    </div>
                  </div>
                </div>
              ),
          )}
          <div className="bg-bgMedium px-5 py-4 rounded flex flex-col items-start gap-2 justify-center">
            <Heading as="h3" size="h3" className="test">
              {slice.primary.cta_title}
            </Heading>

            <Button href="#">{slice.primary.button_text}</Button>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default ClientsSay
