// import type { Metadata } from "next"
// import { createClient } from "@/prismicio"

import { worksans } from "@/lib/font"
import { convertLocaleToLang } from "@/lib/utils"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

// export async function generateMetadata(): Promise<Metadata> {
//   const client = createClient()
//   const globalSEO = await client.getSingle("global_seo")

//   return {
//     title: globalSEO.data.site_title || "Outfund Fallback",
//     description: globalSEO.data.meta_description || "",
//     openGraph: {
//       images: [globalSEO.data.og_image.url || ""],
//     },
//   }
// }

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}) {
  return (
    <html
      lang={convertLocaleToLang(params.locale)}
      className={cn(worksans.className)}
    >
      <body className="text-text box-border bg-white tracking-tighter antialiased">
        {children}
      </body>
    </html>
  )
}
