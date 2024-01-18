import { Metadata } from "next"
import { SliceZone } from "@prismicio/react"
import { notFound } from "next/navigation"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PrismicNextImage } from "@prismicio/next"
// import { getTranslatedLocales } from "@/lib/getTranslatedLocales"

import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"
import { Wrapper, Heading, PageLink } from "@/components/atoms"
import Link from "next/link"

// type PageProps = {
//   params: {
//     locale: string
//   }
// }

// type PageProps = {
//   params: { uid: string; locale: string }
//   searchParams?: { [key: string]: string | string[] | undefined }
// }

// type PageProps = {
//   uid: string
//   locale: string
// }

type Params = {
  uid: string
  locale: string
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  const blogPage = await client
    .getByUID("page", "blog", { lang: params.locale })
    .catch(() => notFound())

  const posts = await client.getAllByType("blog_post", {
    lang: params.locale,
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  })

  // const locales = await getTranslatedLocales(page, client)
  // console.log("params.locale", params.locale)
  // console.log("post", posts)
  // posts.map((post) => {
  //   console.log("post", post)
  // })

  return (
    <PageLayout locale={params.locale}>
      <SliceZone slices={blogPage.data.slices} components={components} />
      <Wrapper width="medium">
        <ul className="grid grid-cols-2 gap-4 mt-5 mb-5">
          {posts.map((post) => {
            return (
              <li key={post.uid} className="mb-2">
                <Link
                  href={`/${params.locale}/blog/${post.uid}`}
                  className="hover:underline block"
                >
                  {post.data.card_image.id && (
                    <div className="w-full h-[240px] border-[2px] border-bgDark">
                      <PrismicNextImage
                        field={post.data.card_image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* {!post.data.card_image.id && <div>{post.data.title}</div>} */}
                  <Heading size="h3" as="span" className="mt-2 block px-2">
                    {post.data.title}
                  </Heading>
                </Link>
              </li>
            )
          })}
        </ul>
      </Wrapper>

      {/* <PageLink field={link} className="text-body">
        {label}
      </PageLink> */}

      {/* Segment Event */}
      {/* <PageEvent name="Blog" /> */}
    </PageLayout>
  )
}

// export async function generateMetadata({ params }: PageProps) {
//   const client = createClient()
//   const page = await client.getByUID("page", "blog", { lang: params.locale })

//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: `Blog test ${page.data.title} | Outfund`,
//   }
// }
