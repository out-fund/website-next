import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"

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

  const blogPost = await client
    .getByUID("blog_post", params.uid, { lang: params.lang })
    .catch(() => notFound())

  return (
    <PageLayout lang={params.lang}>
      <article className="mb-5">
        <Wrapper width="narrow">
          <SliceZone slices={blogPost.data.slices} components={components} />
        </Wrapper>
      </article>

      {/* <PageEvent name={blogPost.uid} /> */}
    </PageLayout>
  )
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("blog_post", { lang: "*" })

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    }
  })
}

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
