import * as prismic from "@prismicio/client"
// import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import moment from "moment"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PageLayout } from "@/components"
import { Metadata } from "next"
import { sortLocales, langLoOgLocale } from "@/lib/utils"

import { Wrapper } from "@/components/atoms"

type Props = {
  params: { uid: string; lang: string }
}

export default async function Page({ params }: Props) {
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
            <div className="text-[14px] font-[400] leading-[24px] text-body">
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
            <div className="text-[14px] font-[400] leading-[24px] text-body">
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()

  const page = await client.getByUID("blog_post", params.uid, {
    lang: params.lang,
  })

  const globalSEO = await client.getSingle("global_seo", {
    lang: params.lang,
  })

  const languages: { [key: string]: string } = {}
  const langs = await sortLocales((await client.getRepository()).languages)
  langs.forEach((lang) => {
    languages[lang.id] = `/${lang.id}/blog/${params.uid}`
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

  let canonical = `/${params.lang}/blog/${params.uid}`
  if (params.lang.includes("en-")) {
    canonical = `/blog/${params.uid}`
  }

  return {
    title: pageTitle,
    description:
      page.data.meta_description || globalSEO.data.meta_description || "",
    alternates: {
      canonical: canonical,
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
