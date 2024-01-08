import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
// import { getTranslatedLocales } from "@/lib/getTranslatedLocales"
import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"
import { titleCase } from "@/lib/utils"

type Params = {
  uid: string
  locale: string
}

export default async function Page({ params }: { params: Params }) {
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
      <PageEvent name={page.uid} />
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
    .getByUID("page", params.uid, { lang: params.locale })
    .catch(() => notFound())

  return {
    // title: page.data.meta_title,
    // description: page.data.meta_description,
    metadataBase: new URL("https://out.fund"),
    title: `${page.data.title} | Outfund`,
    // alternates: {
    //   canonical: `${page.url}`,
    //   languages: {
    //     "en-US": "/en-US",
    //     "de-DE": "/de-DE",
    //   },
    // },
    // openGraph: {
    //   title: "Next.js",
    //   description: "The React Framework for the Web",
    //   url: "https://nextjs.org",
    //   siteName: "Next.js",
    //   images: [
    //     {
    //       url: "https://nextjs.org/og-alt.png",
    //       width: 1800,
    //       height: 1600,
    //       alt: "My custom alt",
    //     },
    //   ],
    //   locale: "en_US",
    //   type: "website",
    // },
  }
}

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("page")

//   return pages.map((page) => {
//     return { uid: page.uid }
//   })
// }

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType("page", { lang: "*" })

//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//       lang: page.lang,
//     }
//   })
// }

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("page", { lang: "*" })
  // const sucessPages = await client.getAllByType("success_story", { lang: "*" })
  // const pages = await client.getByUID("page", "home", { lang: "*" })

  // const allPages = pages.concat(sucessPages)

  // console.log(sucessPages)

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    }
  })
}
