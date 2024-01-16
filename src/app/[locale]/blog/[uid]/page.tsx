import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"

import { Wrapper } from "@/components/atoms"

type PageProps = {
  uid: string
  locale: string
}

export default async function BlogPost({ params }: { params: PageProps }) {
  const client = createClient()

  const blogPost = await client
    .getByUID("blog_post", params.uid, { lang: params.locale })
    .catch(() => notFound())

  return (
    <PageLayout locale={params.locale}>
      <article className="mb-5">
        <Wrapper width="narrow">
          <SliceZone slices={blogPost.data.slices} components={components} />
        </Wrapper>
      </article>

      <PageEvent name={blogPost.uid} />
    </PageLayout>
  )
}

export async function generateMetadata({
  params,
}: {
  params: PageProps
}): Promise<Metadata> {
  const client = createClient()
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound())

  return {
    metadataBase: new URL("https://out.fund"),
    title: `${page.data.title} | Outfund`,
  }
}

export async function generateStaticPageProps() {
  const client = createClient()
  const pages = await client.getAllByType("blog_post", { lang: "*" })

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    }
  })
}
