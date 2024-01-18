import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { Heading, Button, PageLink, Wrapper } from "@/components/atoms"
import { PrismicNextImage } from "@prismicio/next"

/**
 * Props for `ScheduleCall`.
 */
export type ScheduleCallProps = SliceComponentProps<Content.ScheduleCallSlice>

/**
 * Component for "ScheduleCall" Slices.
 */
const ScheduleCall = ({ slice }: ScheduleCallProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <Wrapper width="wide">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg md:grid-cols-2 bg-bgMedium">
          <div className="flex flex-col justify-center px-3 py-5 left md:px-5 lg:px-10 ">
            <Heading as="h2" size="h2" className="md:max-w-[316px] mb-1">
              {slice.primary.title}
            </Heading>
            <p className="text-base text-body">{slice.primary.description}</p>

            {/* <PageLink field={slice.primary.button_link} className="">
              {slice.primary.button_text}
            </PageLink> */}
            <Button
              href="https://client.out.fund/signup"
              className="self-start mt-2 "
            >
              {slice.primary.button_text}
            </Button>
          </div>
          <div className="image overflow-hidden rounded-tr-[100px] md:rounded-tr-none md:rounded-bl-[160px] h-full object-cover">
            <PrismicNextImage
              field={slice.primary.image}
              loading="lazy"
              priority={false}
              className="object-cover h-full"
            />
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default ScheduleCall
