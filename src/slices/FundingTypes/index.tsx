import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { Wrapper, Heading } from "@/components/atoms"

import { PrismicNextImage } from "@prismicio/next"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

const components: JSXMapSerializer = {
  // heading1: ({ children }) => <h1 className="">{children}</h1>,

  paragraph: ({ children }) => (
    <p className="text-base font-[450] tracking-tighter text-body">
      {children}
    </p>
  ),
}

/**
 * Props for `FundingTypes`.
 */
export type FundingTypesProps = SliceComponentProps<Content.FundingTypesSlice>

/**
 * Component for "FundingTypes" Slices.
 */
const FundingTypes = ({ slice }: FundingTypesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-10"
    >
      <Wrapper width="medium">
        <div className="grid grid-cols-2 gap-5">
          {slice.items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 ">
              <PrismicNextImage field={item.icon} width={80} height={80} />

              <Heading as="h2" size="h3">
                {item.title}
              </Heading>

              <PrismicRichText
                field={item.description}
                components={components}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default FundingTypes
