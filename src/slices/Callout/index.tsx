import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { Wrapper, Button, Heading } from "@/components/atoms"
/**
 * Props for `Callout`.
 */
export type CalloutProps = SliceComponentProps<Content.CalloutSlice>

/**
 * Component for "Callout" Slices.
 */
const Callout = ({ slice }: CalloutProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* -------------------------------------- Default */}
      {slice.variation === "default" && (
        <div className="my-10 md:my-15">
          <Wrapper>
            <div className="px-4 py-8 md:py-8 text-center bg-bgMedium ">
              <Heading as="h2" size="h2" className="mb-4">
                {slice.primary.title}
              </Heading>
              <Button href="/">{slice.primary.button_text}</Button>
            </div>
          </Wrapper>
        </div>
      )}
      {/* -------------------------------------- For Blog Post */}
      {slice.variation === "forBlogPage" && (
        <div className="px-4 py-8 md:py-8 text-center bg-bgMedium my-5 md:my-6 ">
          <Heading as="h2" size="h2" className="mb-4">
            {slice.primary.title}
          </Heading>
          <Button href="/">{slice.primary.button_text}</Button>
        </div>
      )}
    </section>
  )
}

export default Callout
