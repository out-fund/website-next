import { Content, isFilled } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { PrismicText } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import { cn } from "@/lib/utils"

import ButtonLink from "@/components/ButtonLink/ButtonLink"
import c from "./FlexHero.module.scss"

const bgColors = {
  cobalt: "bg-[#003EDB]",
  lavander: "bg-[#9C4DFF]",
  sky: "bg-[#11C6FF]",
}
const headingColors = {
  cobalt: "text-[#F2F6FA]",
  lavander: "text-[#F2F6FA]",
  sky: "text-[#002583]",
}
const parahrapsColors = {
  cobalt: "text-[#DFE9F2]",
  lavander: "text-[#DFE9F2]",
  sky: "text-[#2450C0]",
}

/**
 * Props for `FlexHero`.
 */
export type FlexHeroProps = SliceComponentProps<Content.FlexHeroSlice>

/**
 * Component for "FlexHero" Slices.
 */
const FlexHero = ({ slice }: FlexHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        c.flexhero,
        slice.variation === "colorBg" ? bgColors[slice.primary.color_bg] : "",
        slice.variation === "imageBg" ? c.flexhero__imageBg : "",
      )}
    >
      <div className={c.flexhero__textwrapper}>
        {isFilled.richText(slice.primary.heading) && (
          <h1
            className={
              slice.variation !== "colorBg"
                ? "text-[#F2F6FA]"
                : slice.variation === "colorBg"
                  ? headingColors[slice.primary.color_bg]
                  : ""
            }
          >
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}

        {isFilled.richText(slice.primary.description) && (
          <p
            className={
              slice.variation !== "colorBg"
                ? "text-[#DFE9F2]"
                : slice.variation === "colorBg"
                  ? parahrapsColors[slice.primary.color_bg]
                  : ""
            }
          >
            <PrismicText field={slice.primary.description} />
          </p>
        )}
      </div>

      {isFilled.keyText(slice.primary.button_text) && (
        <div className={c.flexhero__buttonWrapper}>
          <ButtonLink
            field={slice.primary.button_link}
            className=""
            variant="primary"
          >
            {slice.primary.button_text}
          </ButtonLink>
          {isFilled.keyText(slice.primary.note) && (
            <p
              className={
                slice.variation !== "colorBg"
                  ? "text-[#DFE9F2]"
                  : slice.variation === "colorBg"
                    ? parahrapsColors[slice.primary.color_bg]
                    : ""
              }
            >
              {slice.primary.note}
            </p>
          )}
        </div>
      )}

      {slice.variation === "imageBg" &&
        isFilled.image(slice.primary.image_bg) && (
          <PrismicNextImage
            field={slice.primary.image_bg}
            fill={true}
            style={{ objectFit: "cover", objectPosition: "center", zIndex: -1 }}
            quality={60}
          />
        )}
    </section>
  )
}

export default FlexHero
