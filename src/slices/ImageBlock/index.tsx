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
      <div>
        <div className="grid xs:grid-cols-[1fr_2fr] gap-3">
          <PrismicNextImage
            field={slice.primary.left_image}
            className="w-full h-full object-cover"
            priority={false}
          />
          <PrismicNextImage
            field={slice.primary.right_image}
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  )
}

export default ImageBlock
