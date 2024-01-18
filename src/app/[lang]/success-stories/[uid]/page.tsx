import * as prismic from "@prismicio/client"
// import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
// import { PageEvent } from "@/lib/events"

import { Wrapper } from "@/components/atoms"

type Params = {
  uid: string
  lang: string
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  const sucessStory = await client
    .getByUID("success_story", params.uid, { lang: params.lang })
    .catch(() => notFound())

  // console.log("params.lang", params.lang)

  return (
    <PageLayout lang={params.lang}>
      {/* <SliceZone slices={sucessStory.data.slices} components={components} /> */}
      <article className="">
        <Wrapper width="medium">
          <SliceZone slices={sucessStory.data.slices} components={components} />
        </Wrapper>
      </article>
      {/* <PageEvent name={sucessStory.uid} /> */}
    </PageLayout>
  )
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("success_story", {
    lang: "*",
    filters: [prismic.filter.not("my.page.uid", "success-stories")],
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
//   const pages = await client.getAllByType("success_story", { lang: "*" })

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//       lang: page.lang,
//     }
//   })
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Params
// }): Promise<Metadata> {
//   const client = createClient()
//   const page = await client
//     .getByUID("success_story", params.uid, { lang: params.lang })
//     .catch(() => notFound())

//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: `${page.data.title} | Outfund`,
//   }
// }
