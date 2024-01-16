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
        <script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=outfund-website"
        ></script>
      </body>
    </html>
  )
}
