import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { Heading, Wrapper, Button, PageLink } from "@/components/atoms"

/**
 * Props for `CheckList`.
 */
export type CheckListProps = SliceComponentProps<Content.CheckListSlice>

/**
 * Component for "CheckList" Slices.
 */
const CheckList = ({ slice }: CheckListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper width="medium">
        <div className="mb-4 text-center">
          <Heading as="h2" size="h2" className="mb-1">
            {slice.primary.heading}
          </Heading>
          {/* <PrismicRichText
                field={slice.primary.description}
                components={components}
              /> */}
        </div>
        test
      </Wrapper>
    </section>
  )
}

export default CheckList
