import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

import { Wrapper, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => <p className=" ">{children}</p>,
}

/**
 * Props for `BlogPostBody`.
 */
export type BlogPostBodyProps = SliceComponentProps<Content.BlogPostBodySlice>

/**
 * Component for "BlogPostBody" Slices.
 */
const BlogPostBody = ({ slice }: BlogPostBodyProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <PrismicRichText field={slice.primary.body} components={components} />
      </Wrapper>
    </section>
  )
}

export default BlogPostBody
