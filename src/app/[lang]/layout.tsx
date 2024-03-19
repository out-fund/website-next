import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"
import type { Metadata } from "next"
import { createClient } from "@/prismicio"

import { inter, dmSans } from "@/lib/font"
import { langToHtmlLang } from "@/lib/utils"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    lang: string
  }
}) {
  return (
    <html lang={langToHtmlLang(params.lang)} className={dmSans.variable}>
      <body className="box-border antialiased">{children}</body>
      <GoogleAnalytics gaId="G-V6R3GNYBT3" />
      <Script strategy="afterInteractive" id="microsoftAds-UET">
        {`(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"148001090"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");`}
      </Script>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL("https://out.fund"),
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

export const viewport = {
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  width: "device-width",
  initialScale: 1,
  userScalable: "yes",
  // colorScheme: "light",
}
