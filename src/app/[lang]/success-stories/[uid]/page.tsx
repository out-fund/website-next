import * as prismic from "@prismicio/client"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import { sortLocales, langLoOgLocale } from "@/lib/utils"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
// import { PageEvent } from "@/lib/events"

import { Wrapper } from "@/components/atoms"

type Props = {
  params: { uid: string; lang: string }
}

export default async function Page({ params }: Props) {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()

  const page = await client.getByUID("success_story", params.uid, {
    lang: params.lang,
  })

  const globalSEO = await client.getSingle("global_seo", {
    lang: params.lang,
  })

  const languages: { [key: string]: string } = {}
  const langs = await sortLocales((await client.getRepository()).languages)
  langs.forEach((lang) => {
    languages[lang.id] = `/${lang.id}/success-stories/${params.uid}`
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
      canonical: `/${params.lang}/success-stories/${params.uid}/`,
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
