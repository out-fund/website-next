import * as prismic from "@prismicio/client"
// import { Metadata } from "next"
import { SliceZone } from "@prismicio/react"
import { notFound } from "next/navigation"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PrismicNextImage } from "@prismicio/next"
// import { getTranslatedLocales } from "@/lib/getTranslatedLocales"

import { PageLayout } from "@/components"
// import { PageEvent } from "@/lib/events"
import { Wrapper, Heading, PageLink } from "@/components/atoms"
import Link from "next/link"

// type PageProps = {
//   params: {
//     lang: string
//   }
// }

// type PageProps = {
//   params: { uid: string; lang: string }
//   searchParams?: { [key: string]: string | string[] | undefined }
// }

// type PageProps = {
//   uid: string
//   lang: string
// }

type Params = {
  uid: string
  lang: string
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  const blogPage = await client
    .getByUID("page", "blog", { lang: params.lang })
    .catch(() => notFound())

  const posts = await client.getAllByType("blog_post", {
    lang: params.lang,
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  })

  // const locales = await getTranslatedLocales(page, client)
  // console.log("params.lang", params.lang)
  // console.log("post", posts)
  // posts.map((post) => {
  //   console.log("post", post)
  // })

  return (
    <PageLayout lang={params.lang}>
      <div itemScope itemType="https://schema.org/BlogPosting">
        <SliceZone slices={blogPage.data.slices} components={components} />
        <Wrapper width="medium">
          <ul className="grid grid-cols-2 gap-4 mt-5 mb-5">
            {posts.map((post) => {
              return (
                <li key={post.uid} className="mb-2">
                  <Link
                    href={`/${params.lang}/blog/${post.uid}`}
                    className="hover:underline block"
                  >
                    {post.data.card_image.id && (
                      <div className="w-full h-[240px] border-[2px] border-bgDark">
                        <PrismicNextImage
                          field={post.data.card_image}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          quality={40}
                          width={465}
                          height={236}
                        />
                      </div>
                    )}
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
      </div>
    </PageLayout>
  )
}

export async function generateStaticParams() {
  const client = createClient()
  // const pages = await client.getAllByType("page", { lang: "*" })
  const pages = await client.getAllByType("page", {
    lang: "*",
    filters: [prismic.filter.at("my.page.uid", "blog")],
  })

  return pages.map((page) => {
    // console.log("page.lang", page.lang)
    return {
      lang: page.lang,
    }
  })
}

// export async function generateMetadata({ params }: PageProps) {
//   const client = createClient()
//   const page = await client.getByUID("page", "blog", { lang: params.lang })

//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: `Blog test ${page.data.title} | Outfund`,
//   }
// }
