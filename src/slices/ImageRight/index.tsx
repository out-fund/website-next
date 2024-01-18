import { Content } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"
import { Wrapper, Button, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base font-normal text-body">{children}</p>
  ),
}

/**
 * Props for `ImageRight`.
 */
export type ImageRightProps = SliceComponentProps<Content.ImageRightSlice>

/**
 * Component for "ImageRight" Slices.
 */
const ImageRight = ({ slice }: ImageRightProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-10 mb-10 lg:mt-15 lg:mb-15 "
    >
      <Wrapper>
        <div className="grid bg-bgMedium lg:grid-cols-2">
          <div className="flex flex-col items-start gap-3 p-4 lg:p-10">
            <Heading as="h2" size="h2" className="">
              {slice.primary.heading}
            </Heading>
            <div className="flex flex-col gap-2">
              <PrismicRichText
                field={slice.primary.description}
                components={components}
              />
            </div>
            <Button href="https://client.out.fund/signup">
              {slice.primary.button_text}
            </Button>
          </div>
          <div className="max-h-[400px] lg:max-h-none">
            <PrismicNextImage
              field={slice.primary.image}
              priority
              height={512}
              width={768}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default ImageRight
