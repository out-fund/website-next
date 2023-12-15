import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { Wrapper, Button, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="h1" className="">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-base font-normal text-body">{children}</p>
  ),
  list: ({ children }) => <ul className="mt-1 list-disc pl-2 ">{children}</ul>,
}

/**
 * Props for `ProcessSteps`.
 */
export type ProcessStepsProps = SliceComponentProps<Content.ProcessStepsSlice>

/**
 * Component for "ProcessSteps" Slices.
 */
const ProcessSteps = ({ slice }: ProcessStepsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-10 mb-10 md:mt-15 md:mb-15"
    >
      <Wrapper>
        <div className="mx-auto md:mx-0 max-w-[90%] md:max-w-none">
          <Heading as="h2" size="h2" className="mb-4">
            {slice.primary.heading}
          </Heading>
          <hr className="border-t-2 border-[#F0F4F9]" />
          <div className="flex flex-col items-end ">
            {slice.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row border-b-2 border-[#F0F4F9] last:border-0 max-w-[878px] w-full items-start pb-5 pt-4  "
              >
                <Heading
                  size="h3"
                  as="h3"
                  className="mt-2 md:mt-0 md:ml-4 max-w-[270px]"
                >
                  {item.title}
                </Heading>
                <div className="pt-1 ml-auto max-w-[470px]">
                  <PrismicRichText
                    field={item.description}
                    components={components}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default ProcessSteps
