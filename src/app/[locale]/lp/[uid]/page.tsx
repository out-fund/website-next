import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"

import { Wrapper } from "@/components/atoms"

type Params = {
  uid: string
  locale: string
}

export default async function LandingPage({ params }: { params: Params }) {
  const client = createClient()

  const landingPage = await client
    .getByUID("landing_page", params.uid, { lang: params.locale })
    .catch(() => notFound())

  return (
    <PageLayout locale={params.locale}>
      <SliceZone slices={landingPage.data.slices} components={components} />

      <PageEvent name={landingPage.uid} />
    </PageLayout>
  )
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Params
// }): Promise<Metadata> {
//   const client = createClient()
//   const page = await client
//     .getByUID("landing_page", params.uid)
//     .catch(() => notFound())

//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: `${page.data.title} | Outfund`,
//   }
// }

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("landing_page", { lang: "*" })

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//       lang: page.lang,
//     }
//   })
// }
