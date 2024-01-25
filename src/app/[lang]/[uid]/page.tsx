import * as prismic from "@prismicio/client"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
// import { Organization, WithContext } from "schema-dts"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { components } from "@/slices"
// import { getTranslatedLocales } from "@/lib/getTranslatedLocales"
import { PageLayout } from "@/components"
// import { PageEvent } from "@/lib/events"
// import { titleCase } from "@/lib/utils"
import { sortLocales, langLoOgLocale } from "@/lib/utils"
import { getSEO } from "@/lib/getSEO"

// type Params = {
//   uid: string
//   lang: string
// }

type Props = {
  params: { uid: string; lang: string }
}

const embedComponent: JSXMapSerializer = {
  preformatted: ({ node }) => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: node.text }}
      />
    )
  },
}

export default async function Page({ params }: Props) {
  const client = createClient()

  const page = await client
    .getByUID("page", params.uid, {
      lang: params.lang,
      filters: [
        prismic.filter.not("my.page.uid", "home"),
        prismic.filter.not("my.page.uid", "blog"),
      ],
    })
    .catch(() => notFound())

  return (
    <PageLayout lang={params.lang}>
      <SliceZone slices={page.data.slices} components={components} />

      {/* Schema.org */}
      {page.data.schema_org_json_ld && (
        <PrismicRichText
          field={page.data.schema_org_json_ld}
          components={embedComponent}
        />
      )}
    </PageLayout>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID("page", params.uid, { lang: params.lang })

  const seo = await getSEO(page, params)
  console.log("seo", seo)
  return seo
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("page", {
    lang: "*",
    filters: [
      prismic.filter.not("my.page.uid", "home"),
      prismic.filter.not("my.page.uid", "blog"),
    ],
  })

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    }
  })
}
