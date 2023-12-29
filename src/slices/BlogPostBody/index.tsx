import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

import { Heading } from "@/components/atoms"

// const linkResolver = (doc: any) => "/" + doc.uid

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="mb-2 text-[16px] leading-[24px] text-body font-[400]">
      {children}
    </p>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="h3" className="mt-4 mb-2  font-[600] md:font-[600] ">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="h4" className="mt-4 mb-2  font-[600] md:font-[600] ">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="h5" className="mt-4 mb-2  font-[600] md:font-[600] ">
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading as="h5" size="h6" className="mt-4 mb-2  font-[600] md:font-[600] ">
      {children}
    </Heading>
  ),
  oList: ({ children }) => <ol className="mb-2 ">{children}</ol>,
  oListItem: ({ children }) => (
    <li className=" pl-1 list-decimal list-inside text-[16px] leading-[24px] text-body font-[400]">
      {children}
    </li>
  ),
  list: ({ children }) => <ul className="mb-2 ">{children}</ul>,
  listItem: ({ children }) => (
    <li className=" pl-1 list-disc list-inside text-[16px] leading-[24px] text-body font-[400]">
      {children}
    </li>
  ),
  hyperlink: ({ node, children }) => {
    return (
      <a
        href={node.data.url}
        target="_blank"
        className="hover:underline text-cobalt"
      >
        {children}
      </a>
    )
  },
  embed: ({ node }) => {
    return (
      <div
        className="relative pt-[56.25%]"
        dangerouslySetInnerHTML={{ __html: node.oembed.html || "" }}
      ></div>
    )
  },
  strong: ({ children }) => <strong className="font-[600]">{children}</strong>,
  image: ({ node }) => {
    return (
      <div className="mb-3">
        <figure className="text-center">
          <img src={node.url} alt={node.alt ? node.alt : ""} />
          <figcaption className="text-[14px] leading-[24px] text-body font-[400] mt-1">
            {node.alt}
          </figcaption>
        </figure>
      </div>
    )
  },
  // preformatted: ({ children }) => (
  //   <div dangerouslySetInnerHTML={slice.primary.preformatted}>test</div>
  // ),
  preformatted: ({ node }) => (
    <div dangerouslySetInnerHTML={{ __html: node.text }}></div>
  ),
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
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.body} components={components} />
    </div>
  )
}

export default BlogPostBody
