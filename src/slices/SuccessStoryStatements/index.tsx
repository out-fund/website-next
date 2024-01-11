import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"

import { Wrapper, Button, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => <p className="">{children}</p>,
}

/**
 * Props for `SuccessStoryStatements`.
 */
export type SuccessStoryStatementsProps =
  SliceComponentProps<Content.SuccessStoryStatementsSlice>

/**
 * Component for "SuccessStoryStatements" Slices.
 */
const SuccessStoryStatements = ({
  slice,
}: SuccessStoryStatementsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-4 md:my-8 "
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-10">
        <div className="left flex flex-col gap-5">
          {slice.items.map((item, index) => (
            <div key={index}>
              <Heading size="h3" as="h3" className=" mb-1">
                {item.title}
              </Heading>
              <PrismicRichText
                field={item.description}
                components={components}
              />
            </div>
          ))}
        </div>
        <div className="right">
          <figure>
            <Heading size="h3" as="blockquote" className="mb-1">
              {slice.primary.quote}
            </Heading>
            <Heading size="h5" as="figcaption" className="">
              {slice.primary.quote_by}
            </Heading>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default SuccessStoryStatements
