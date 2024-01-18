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
        return client.getByUID("success_story_brand", item.brand.uid, {
          lang: item.brand.lang,
        })
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
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {successStoryBrands.map((item, index) => (
            <li
              key={index}
              className=" relative overflow-hidden h-[300px] lg:h-[360px] "
            >
              <div className="relative z-10 flex flex-col justify-end  h-full gap-3 p-5">
                <h3 className="text-[14px] font-[450] self-start text-body bg-white bg-opacity-90 px-1 py-0 leading-[24px] rounded-[2px] ">
                  {item?.data.cad_funded_plus_amount} {item?.data.brand_name}
                </h3>

                <div className=" max-h-[32px] self-start ">
                  <PrismicNextImage
                    field={item?.data.brand_logo}
                    className="w-full h-full"
                    priority={false}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-full ">
                <PrismicNextImage
                  loading="lazy"
                  field={item?.data.card_background_image}
                  className="object-cover object-center w-full h-full"
                  priority={false}
                />
              </div>
            </li>
          ))}
          <li className=" relative overflow-hidden h-[300px] lg:h-[360px] bg-bgMedium ">
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 p-5">
              <Heading size="h3" as="h3" className="text-center ">
                {slice.primary.final_box_title}
              </Heading>
              <Button href="https://client.out.fund/signup">
                {slice.primary.button_text}
              </Button>
            </div>
          </li>
        </ul>
      </Wrapper>
    </section>
  )
}

export default FeaturedBrands
