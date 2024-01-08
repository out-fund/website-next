import { Content, isFilled } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { PrismicNextImage } from "@prismicio/next"

import { Wrapper, Heading, Button } from "@/components/atoms"
/**
 * Props for `FeaturedBrands`.
 */
export type FeaturedBrandsProps =
  SliceComponentProps<Content.FeaturedBrandsSlice>

/**
 * Component for "FeaturedBrands" Slices.
 */
const FeaturedBrands = async ({
  slice,
}: FeaturedBrandsProps): Promise<JSX.Element> => {
  const client = createClient()
  const successStoryBrands = await Promise.all(
    slice.items.map((item) => {
      if (isFilled.contentRelationship(item.brand) && item.brand.uid) {
        return client.getByUID("success_story_brand", item.brand.uid)
      }
    }),
  )
  // console.log("successStoryBrands", successStoryBrands)

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-10 mb-10 md:mt-15 md:mb-15"
    >
      <Wrapper>
        <Heading as="h2" size="h2" className="mb-5">
          {slice.primary.heading}
        </Heading>
        <ul className="grid gap-3 md:grid-cols-3">
          {successStoryBrands.map((item, index) => (
            <li
              key={index}
              className=" relative overflow-hidden h-[200px] lg:h-[360px] "
            >
              <div className="relative z-10 flex flex-col items-start h-full gap-3 p-5">
                <h3 className="text-[14px]uppercase bg-white bg-opacity-90 px-1 py-0 leading-[24px] rounded-[2px]">
                  {item?.data.cad_funded_plus_amount} {item?.data.brand_name}
                </h3>

                <div className="mt-auto max-h-[32px] ">
                  <PrismicNextImage
                    field={item?.data.brand_logo}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-full ">
                <PrismicNextImage
                  field={item?.data.card_background_image}
                  className="object-cover object-center w-full h-full"
                  priority={false}
                />
              </div>
            </li>
          ))}
          <li className=" relative overflow-hidden h-[200px] lg:h-[360px] bg-bgMedium ">
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 p-5">
              <Heading size="h3" as="h3" className="text-center ">
                {slice.primary.final_box_title}
              </Heading>
              <Button href="/">{slice.primary.button_text}</Button>
            </div>
          </li>
        </ul>
      </Wrapper>
    </section>
  )
}

export default FeaturedBrands
