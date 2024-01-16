import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import { Organization, WithContext } from "schema-dts"

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

const jsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  image: "https://www.example.com/example_image.jpg",
  url: "https://www.example.com",
  sameAs: [
    "https://example.net/profile/example1234",
    "https://example.org/example1234",
  ],
  logo: "https://www.example.com/images/logo.png",
  name: "Example Corporation",
  description:
    "The example corporation is well-known for producing high-quality widgets",
  email: "contact@example.com",
  telephone: "+47-99-999-9999",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue Improbable 99",
    addressLocality: "Paris",
    addressCountry: "FR",
    addressRegion: "Ile-de-France",
    postalCode: "75001",
  },
  vatID: "FR12345678901",
  iso6523Code: "0199:724500PMK2A2M1SQQ228",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />
      <PageEvent name={page.uid} />
    </PageLayout>
  )
}

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
//       lang: page.lang,
//     }
//   })
// }
