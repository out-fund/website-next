import * as prismic from "@prismicio/client"
import { Metadata } from "next"
import { SliceZone } from "@prismicio/react"
import { notFound } from "next/navigation"
// import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { components } from "@/slices"
// import { getTranslatedLocales } from "@/lib/getTranslatedLocales"
import { PageLayout } from "@/components"
// import { PageEvent } from "@/lib/events"
import { sortLocales } from "@/lib/utils"

type Props = {
  params: { uid: string; lang: string }
  // searchParams?: { [key: string]: string | string[] | undefined }
}

// const embedComponent: JSXMapSerializer = {
//   preformatted: ({ node }) => {
//     return (
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: node.text }}
//       />
//     )
//   },
// }

export default async function Page({ params }: Props) {
  const client = createClient()

  const page = await client
    .getByUID("page", "home", { lang: params.lang })
    .catch(() => notFound())

  return (
    <PageLayout lang={params.lang}>
      <SliceZone slices={page.data.slices} components={components} />

      {/* Segment Event */}
      {/* <PageEvent name="Home" /> */}

      {/* Schema.org */}
      {/* {page.data.schema_org_json_ld && (
        <PrismicRichText
          field={page.data.schema_org_json_ld}
          components={embedComponent}
        />
      )} */}
    </PageLayout>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()

  const page = await client
    .getByUID("page", "home", { lang: params.lang })
    .catch(() => notFound())
  const globalSEO = await client.getSingle("global_seo", {
    lang: params.lang,
  })

  const langToOgLocale = (lang: string) => {
    const [language, country] = lang.split("-")
    return `${language}_${country.toUpperCase()}`
  }

  const languages: { [key: string]: string } = {}
  const langs = await sortLocales((await client.getRepository()).languages)
  langs.forEach((lang) => {
    languages[lang.id] = `/${lang.id}`
  })

  return {
    title: `${page.data.title}`,
    description: page.data.meta_description,
    alternates: {
      canonical: `/${params.lang}`,
      languages,
    },
    openGraph: {
      title: `${page.data.meta_title}`,
      description: `${page.data.meta_description}`,
      url: `/${params.lang}`,
      locale: langToOgLocale(params.lang),
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
    filters: [prismic.filter.at("my.page.uid", "home")],
  })

  return pages.map((page) => {
    return {
      lang: page.lang,
    }
  })
}

// ------------------------

// const embedComponent: JSXMapSerializer = {
//   embed: ({ node }) => {
//     return (
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(node.oembed.html) }}
//       />
//     )
//   },
// }

// export default async function Page({ params }: { params: Params }) {
//   const client = createClient()

//   const page = await client
//     .getByUID("page", "home", { lang: params.lang })
//     .catch(() => notFound())
//   // console.log("params lang", params.lang)

//   // const locales = await getTranslatedLocales(page, client)
//   // console.log("locales-home", locales)

//   return (
//     <PageLayout lang={params.lang}>
//       <SliceZone slices={page.data.slices} components={components} />
//       <PageEvent name="Home" />
//       {/* Schema.org */}
//       {page.data.schema_org_json_ld && (
//         <PrismicRichText
//           field={page.data.schema_org_json_ld}
//           components={embedComponent}
//         />
//       )}
//     </PageLayout>
//   )
// }

// export async function generateMetadata(props: any): Promise<Metadata> {
//   // const { params } = props
//   const client = createClient()
//   const page = await client
//     .getByUID("page", "home", { lang: params.lang })
//     .catch(() => notFound())

//   const langs = await sortLocales((await client.getRepository()).languages)
//   const languages: { [key: string]: string } = {}

//   langs.forEach((lang) => {
//     languages[lang.id] = `/${lang.id}`
//   })

//   // console.log("params.uid", params.uid)

//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: `${page.data.title}`,
//     description: page.data.meta_description || "",
//     alternates: {
//       canonical: `/${params.lang}`,
//       languages,
//     },
//     openGraph: {
//       images: [page.data.meta_image.url || ""],
//     },
//   }
// }
