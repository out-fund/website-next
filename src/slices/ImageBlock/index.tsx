import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

import { Wrapper } from "@/components/atoms"

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <div className="flex justify-between">
          <PrismicNextImage
            field={slice.primary.left_image}
            className="max-h-[420px] w-auto"
          />
          <PrismicNextImage
            field={slice.primary.right_image}
            className="max-h-[420px] w-auto"
          />
        </div>
      </Wrapper>
    </section>
  )
}

export default ImageBlock
