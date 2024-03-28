import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import { cn } from "@/lib/utils"

import Box from "@/components/Box/Box"

import c from "./FlexBenefits.module.scss"
// import sc from "./../../styles"

/**
 * Props for `FlexBenefits`.
 */
export type FlexBenefitsProps = SliceComponentProps<Content.FlexBenefitsSlice>

/**
 * Component for "FlexBenefits" Slices.
 */
const FlexBenefits = ({ slice }: FlexBenefitsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(c.flexBenefits)}
    >
      {/* <Wrapper> */}
      <Box gray={slice.primary.gray_background}>
        <div className={c.flexBenefits__grid}>
          {slice.items.map((item, index) => (
            <div className={c.flexBenefits__item} key={index}>
              {item.icon && (
                <PrismicNextImage
                  field={item.icon}
                  className={c.flexBenefits__icon}
                />
              )}
              <h2 className={c.flexBenefits__title}>
                {item.small_text && <span>{item.small_text} </span>}
                {item.big_text && <span>{item.big_text}</span>}
              </h2>
            </div>
          ))}
        </div>
      </Box>
      {/* </Wrapper> */}
    </section>
  )
}

export default FlexBenefits
