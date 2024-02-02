import * as prismic from "@prismicio/client"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
import { sortLocales, langLoOgLocale } from "@/lib/utils"

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

  // console.log(page)

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

  const page = await client
    .getByUID("page", params.uid, { lang: params.lang })
    .catch(() => notFound())

  const globalSEO = await client.getSingle("global_seo", {
    lang: params.lang,
  })

  const languages: { [key: string]: string } = {}
  const langs = await sortLocales((await client.getRepository()).languages)
  langs.forEach((lang) => {
    languages[lang.id] = `/${lang.id}/${params.uid}`
  })

  const titleCountry = () => {
    const country = params.lang.split("-")[1]
    switch (country) {
      case "us":
        return " | US"
      case "de":
        return " | Deutschland"
      case "gb":
        return " | UK"
      case "nl":
        return " | Nederland"
      case "ie":
        return " | Ireland"
      case "au":
        return " | Australia"
      case "es":
        return " | España"
      default:
        return ""
    }
  }

  const pageTitle = page.data.title
    ? `${page.data.title} | Outfund${titleCountry()}`
    : `${page.lang} ${page.uid}`

  return {
    title: pageTitle,
    description:
      page.data.meta_description || globalSEO.data.meta_description || "",
    alternates: {
      canonical: `/${params.lang}/${params.uid}/`,
      languages,
    },
    openGraph: {
      title: page.data.meta_title || page.data.title || "",
      description:
        page.data.meta_description || globalSEO.data.meta_description || "",
      url: `/${params.lang}/${params.uid}`,
      locale: langLoOgLocale(params.lang),
      images: [page.data.meta_image.url || globalSEO.data.og_image.url || ""],
      siteName: "Outfund",
      type: "website",
    },
  }
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
