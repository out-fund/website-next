import * as prismic from "@prismicio/client"
// import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import moment from "moment"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
// import { PageEvent } from "@/lib/events"

import { Wrapper } from "@/components/atoms"

// type Params = {
//   uid: string
//   lang: string
// }

// type Params = {
//   params: { uid: string; lang: string }
// }
type Params = {
  uid: string
  lang: string
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  const formatedDate = (date: any) => {
    moment.locale(params.lang)
    return moment(date).format("DD MMMM YYYY")
  }

  const blogPost = await client
    .getByUID("blog_post", params.uid, { lang: params.lang })
    .catch(() => notFound())

  return (
    <PageLayout lang={params.lang}>
      <article
        className="mb-5"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <Wrapper width="narrow">
          <SliceZone slices={blogPost.data.slices} components={components} />
          {blogPost.data.publication_date && (
            <div className="text-[14px] leading-[24px] text-body font-[400]">
              <span>{blogPost.data.published_text}:</span>{" "}
              <span
                itemProp="datePublished"
                content={moment(blogPost.data.publication_date).toISOString()}
              >
                {formatedDate(blogPost.data.publication_date)}
              </span>
            </div>
          )}

          {blogPost.data.published_by_text && (
            <div className="text-[14px] leading-[24px] text-body font-[400]">
              <span>{blogPost.data.published_by_text}</span>{" "}
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <a
                  itemProp="url"
                  href="https://out.fund/en-gb/"
                  className="underline"
                >
                  <span itemProp="name">Outfund</span>
                </a>
              </span>
            </div>
          )}
        </Wrapper>
      </article>

      {/* <PageEvent name={blogPost.uid} /> */}
    </PageLayout>
  )
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("blog_post", {
    lang: "*",
    filters: [prismic.filter.not("my.page.uid", "blog")],
  })

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    }
  })
}

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("blog_post", { lang: "*" })

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//       lang: page.lang,
//     }
//   })
// }

// export async function generateMetadata(props: any): Promise<Metadata> {
//   const { params } = props
//   const client = createClient()
//   const page = await client
//     .getByUID("blog_post", params.uid, { lang: params.lang })
//     .catch(() => notFound())

//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: `${page.data.title} | Outfund`,
//   }
// }

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("blog_post", { lang: "*" })

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//             lang: page.lang,
//     }
//   })
// }
