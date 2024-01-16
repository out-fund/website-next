import { Metadata, ResolvingMetadata } from "next"
import { SliceZone } from "@prismicio/react"
import { notFound } from "next/navigation"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { getTranslatedLocales } from "@/lib/getTranslatedLocales"
import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"
import { sortLocales } from "@/lib/utils"

type Props = {
  params: { id: string; locale: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: Props) {
  const client = createClient()

  const page = await client
    .getByUID("page", "home", { lang: params.locale })
    .catch(() => notFound())

  return (
    <PageLayout locale={params.locale}>
      <SliceZone slices={page.data.slices} components={components} />
    </PageLayout>
  )
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: "ttile test",
    description: "des",
  }
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
//     .getByUID("page", "home", { lang: params.locale })
//     .catch(() => notFound())
//   // console.log("params lang", params.locale)

//   // const locales = await getTranslatedLocales(page, client)
//   // console.log("locales-home", locales)

//   return (
//     <PageLayout locale={params.locale}>
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
//     .getByUID("page", "home", { lang: params.locale })
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
//       canonical: `/${params.locale}`,
//       languages,
//     },
//     openGraph: {
//       images: [page.data.meta_image.url || ""],
//     },
//   }
// }
