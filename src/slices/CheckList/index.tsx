import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

import { Heading, Wrapper, Button, PageLink } from "@/components/atoms"

import classes from "../Calculator/index.module.scss"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <li
      className={`${classes.icon} flex items-center gap-2 text-base text-[16px] leading-[24px] text-body font-[400] max-w-[870px] mb-2`}
    >
      <span>{children}</span>
    </li>
  ),
}

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
      className="mt-10 mb-10  md:mt-15 md:mb-15"
    >
      <Wrapper width="medium">
        <div className="mb-4 text-center">
          <Heading as="h2" size="h2" className="mb-1 text-left">
            {slice.primary.heading}
          </Heading>
          <p className="text-[16px] leading-[24px] text-body font-[400] text-left max-w-[670px] mb-5">
            {slice.primary.description}
          </p>
        </div>
        <ul>
          {slice.items.map((item, index) => (
            <PrismicRichText
              field={item.list_item}
              components={components}
              key={index}
            />
          ))}
        </ul>
      </Wrapper>
    </section>
  )
}

export default CheckList
