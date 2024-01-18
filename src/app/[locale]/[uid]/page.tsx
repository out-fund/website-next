import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import { Organization, WithContext } from "schema-dts"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { components } from "@/slices"
// import { getTranslatedLocales } from "@/lib/getTranslatedLocales"
import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"
import { titleCase } from "@/lib/utils"
import { sortLocales } from "@/lib/utils"

// type Params = {
//   uid: string
//   locale: string
// }

type Props = {
  params: { uid: string; locale: string }
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
    .getByUID("page", params.uid, { lang: params.locale })
    .catch(() => notFound())

  // const locales = await getTranslatedLocales(page, client)
  // console.log("pageData", page)
  // console.log("page.uid", page.uid)
  // console.log("slices", page.data.slices)

  // const pageName = titleCase(page.uid.replace(/-/g, " "))
  // console.log("pageName", pageName)

  return (
    <PageLayout locale={params.locale}>
      <SliceZone slices={page.data.slices} components={components} />

      {/* Segment Event */}
      {/* <PageEvent name={page.uid} /> */}

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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const client = createClient()

  const page = await client
    .getByUID("page", params.uid, { lang: params.locale })
    .catch(() => notFound())

  const globalSEO = await client.getSingle("global_seo", {
    lang: params.locale,
  })

  const toOgLocale = (locale: string) => {
    const [lang, country] = locale.split("-")
    return `${lang}_${country.toUpperCase()}`
  }

  const languages: { [key: string]: string } = {}
  const langs = await sortLocales((await client.getRepository()).languages)
  langs.forEach((lang) => {
    languages[lang.id] = `/${lang.id}/${params.uid}`
  })

  // console.log("meta url", page.data.meta_image.url)

  return {
    title: `${page.data.title}`,
    description: page.data.meta_description,
    alternates: {
      canonical: `/${params.locale}/${params.uid}`,
      languages,
    },
    openGraph: {
      title: `${page.data.meta_title || page.data.title}`,
      description: `${page.data.meta_description}`,
      url: `/${params.locale}/${params.uid}`,
      locale: toOgLocale(params.locale),
      images: [page.data.meta_image.url || globalSEO.data.og_image.url || ""],
      siteName: "Outfund",
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("page", { lang: "*" })

  return pages.map((page) => {
    // console.log("page.lang", page.lang)
    return {
      uid: page.uid,
      locale: page.lang,
    }
  })
}

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("page")

//   return pages.map((page) => {
//     return { uid: page.uid }
//   })
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Params
// }): Promise<Metadata> {
//   const client = createClient()
//   const page = await client
//     .getByUID("page", params.uid, { lang: params.locale })
//     .catch(() => notFound())

//   return {
//     // title: page.data.meta_title,
//     // description: page.data.meta_description,
//     metadataBase: new URL("https://out.fund"),
//     title: `${page.data.title} | Outfund`,
//     // alternates: {
//     //   canonical: `${page.url}`,
//     //   languages: {
//     //     "en-US": "/en-US",
//     //     "de-DE": "/de-DE",
//     //   },
//     // },
//     // openGraph: {
//     //   title: "Next.js",
//     //   description: "The React Framework for the Web",
//     //   url: "https://nextjs.org",
//     //   siteName: "Next.js",
//     //   images: [
//     //     {
//     //       url: "https://nextjs.org/og-alt.png",
//     //       width: 1800,
//     //       height: 1600,
//     //       alt: "My custom alt",
//     //     },
//     //   ],
//     //   locale: "en_US",
//     //   type: "website",
//     // },
//   }
// }

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("page", { lang: "*" })

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//             locale: page.lang,
//     }
//   })
// }

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("page", { lang: "*" })
//   // const sucessPages = await client.getAllByType("success_story", { lang: "*" })
//   // const pages = await client.getByUID("page", "home", { lang: "*" })

//   // const allPages = pages.concat(sucessPages)

//   // console.log(sucessPages)

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//             locale: page.lang,
//     }
//   })
// }
