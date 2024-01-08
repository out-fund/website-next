import { Content, isFilled } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { PrismicNextImage } from "@prismicio/next"

import { Wrapper, Heading, Button } from "@/components/atoms"
import { it } from "node:test"

/**
 * Props for `FeaturedStories`.
 */
export type FeaturedStoriesProps =
  SliceComponentProps<Content.FeaturedStoriesSlice>

/**
 * Component for "FeaturedStories" Slices.
 */
const FeaturedStories = async ({
  slice,
}: FeaturedStoriesProps): Promise<JSX.Element> => {
  const client = createClient()

  const successStories = await Promise.all(
    slice.items.map((item) => {
      if (
        isFilled.contentRelationship(item.featured_story) &&
        item.featured_story.uid
      ) {
        return client.getByUID("success_story", item.featured_story.uid, {
          lang: item.featured_story.lang,
        })
      }
    }),
  )

  // console.log("successStories", successStories)
  // console.log("params.locale", params.locale)

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
        <div className="grid gap-3 md:grid-cols-2">
          {successStories.map((item, index) => (
            <article
              key={index}
              className=" relative overflow-hidden h-[400px] lg:h-[560px] "
            >
              <div className="relative z-10 flex flex-col items-start h-full gap-3 p-5">
                <h3 className="sr-only">{item?.data.title}</h3>
                <p className="text-[14px]uppercase bg-white bg-opacity-90 px-1 py-0 leading-[24px] rounded-[2px]">
                  {item?.data.card_funded_plus_amount}
                </p>

                <div className="mt-auto max-h-[32px] ">
                  <PrismicNextImage
                    field={item?.data.brand_logo}
                    className="w-full h-full"
                  />
                </div>
                <Button
                  href={`/${item?.lang}/success-stories/${item?.uid}`}
                  className="p-0 bg-transparent border-2 border-white "
                >
                  {item?.data.card_link_text}
                </Button>
              </div>

              <div className="absolute top-0 left-0 w-full h-full ">
                <PrismicNextImage
                  field={item?.data.card_background_image}
                  className="object-cover object-center w-full h-full"
                  priority={false}
                />
              </div>
            </article>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}

export default FeaturedStories
