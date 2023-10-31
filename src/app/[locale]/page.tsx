//
// Homepage only page
//

import { Metadata } from "next"
import { SliceZone } from "@prismicio/react"
import { notFound } from "next/navigation"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { getTranslatedLocales } from "@/lib/getTranslatedLocales"

import { PageLayout } from "@/components"
import { SegmentAnalytics } from "@/components/atoms"

// import { GetStaticPropsContext } from "next"

type PageProps = {
  params: {
    locale: string
  }
}

export default async function Page({ params }: PageProps) {
  const client = createClient()

  const page = await client
    .getByUID("page", "home", { lang: params.locale })
    .catch(() => notFound())
  // console.log("params lang", params.locale)

  const locales = await getTranslatedLocales(page, client)
  // console.log("locales-home", locales)

  return (
    <PageLayout locale={params.locale}>
      <SliceZone slices={page.data.slices} components={components} />
      {/* <SegmentAnalytics locale={params.locale} pageData={page} /> */}
    </PageLayout>
  )
}

// export async function generateMetadata(): Promise<Metadata> {
//   const client = createClient()
//   const page = await client.getSingle("home_page")

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//   }
// }

/**
 * @returns {Promise<import("next").Metadata>}
 */
export async function generateMetadata({ params }: PageProps) {
  const client = createClient()
  const page = await client.getByUID("page", "home", { lang: params.locale })

  return {
    metadataBase: new URL("https://out.fund"),
    title: `${page.data.title} | Outfund`,
    alternates: {
      canonical: `${page.url}`,
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      title: "Next.js",
      description: "The React Framework for the Web",
      url: "https://nextjs.org",
      siteName: "Next.js",
      images: [
        {
          url: "https://nextjs.org/og-alt.png",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  }
}

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("page", { lang: "*" })
//   // const pages = await client.getByUID("page", "home", { lang: "*" })

//   console.log(pages)

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//       lang: page.lang,
//     }
//   })
// }

// const locales = await getTranslatedLocales(page, client)
