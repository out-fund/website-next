// import type { Metadata } from "next"
// import { createClient } from "@/prismicio"

// type PageProps = {
//   params: { uid: string; locale: string }
//   searchParams?: { [key: string]: string | string[] | undefined }
// }

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const client = createClient()
//   const globalSEO = await client.getSingle("global_seo", {
//     lang: params.locale,
//   })
//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: {
//       template: "%s | Outfund",
//       default: `${globalSEO.data.site_title}`,
//     },
//     description: globalSEO.data.meta_description || "",
//     referrer: "origin-when-cross-origin",
//     openGraph: {
//       images: [globalSEO.data.og_image.url || ""],
//     },
//   }
// }
