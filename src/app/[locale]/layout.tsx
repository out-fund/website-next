import { GoogleAnalytics } from "@next/third-parties/google"
import type { Metadata } from "next"
import { createClient } from "@/prismicio"

import { inter } from "@/lib/font"
import { convertLocaleToLang } from "@/lib/utils"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

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
      className={cn(inter.className)}
    >
      {/* text-base box-border bg-white tracking-tighter antialiased */}
      <body className="box-border antialiased LocaleLayout ">
        {children}
        {/* Prismic Previews script */}
        {/* <script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=outfund-website"
        ></script> */}
      </body>
      <GoogleAnalytics gaId="G-V6R3GNYBT3" />
    </html>
  )
}
export async function generateMetadata({
  params,
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const client = createClient()
  const globalSEO = await client.getSingle("global_seo", {
    lang: params.locale,
  })
  return {
    metadataBase: new URL("https://out.fund"),
    title: {
      template: "%s | Outfund",
      default: `${globalSEO.data.site_title}`,
    },
    description: globalSEO.data.meta_description || "",
    referrer: "origin-when-cross-origin",
    icons: {
      icon: "/images/icon.png",
      shortcut: "/images/shortcut-icon.png",
      apple: "/images/apple-touch-icon.png",
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "/images/apple-touch-icon-precomposed.png",
      },
    },
  }
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: "yes",
  colorScheme: "light",
}
