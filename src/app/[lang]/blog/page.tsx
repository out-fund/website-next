import * as prismic from "@prismicio/client"
import { Metadata } from "next"
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
import { sortLocales, langLoOgLocale } from "@/lib/utils"

type Props = {
  params: { uid: string; lang: string }
}

export default async function Page({ params }: Props) {
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

  return (
    <PageLayout lang={params.lang}>
      <SliceZone slices={blogPage.data.slices} components={components} />
      <Wrapper width="medium">
        <ul className="mb-5 mt-5 grid grid-cols-2 gap-4">
          {posts.map((post) => {
            return (
              <li key={post.uid} className="mb-2">
                <Link
                  href={`/${params.lang}/blog/${post.uid}/`}
                  className="block hover:underline"
                >
                  {post.data.card_image.id && (
                    <div className="h-[240px] w-full border-[2px] border-bgDark">
                      <PrismicNextImage
                        field={post.data.card_image}
                        loading="lazy"
                        className="h-full w-full object-cover"
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()

  const page = await client
    .getByUID("page", "blog", { lang: params.lang })
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
      canonical: `/${params.lang}/${params.uid}`,
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
