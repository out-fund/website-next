import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"

type Params = {
  uid: string
  locale: string
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  const sucessStory = await client
    .getByUID("success_story", params.uid, { lang: params.locale })
    .catch(() => notFound())

  return (
    <PageLayout locale={params.locale}>
      <SliceZone slices={sucessStory.data.slices} components={components} />
      <PageEvent name={sucessStory.uid} />
    </PageLayout>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client
    .getByUID("success_story", params.uid)
    .catch(() => notFound())

  return {
    metadataBase: new URL("https://out.fund"),
    title: `${page.data.title} | Outfund`,
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("success_story", { lang: "*" })

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    }
  })
}
