import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"
import type { Metadata } from "next"
import { createClient } from "@/prismicio"

import { inter } from "@/lib/font"
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
    <html lang={langToHtmlLang(params.lang)} className={cn(inter.className)}>
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
      {/* <Script src="/js/segment.js" /> */}
      {/* <Script strategy="afterInteractive">
        {`!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window.analytics.initialized)return window.analytics[e].apply(window.analytics,arguments);var i=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");i.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}i.unshift(e);analytics.push(i);return analytics}};for(var i=0;i<analytics.methods.length;i++){var key=analytics.methods[i];analytics[key]=analytics.factory(key)}analytics.load=function(key,i){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=i};analytics._writeKey="6kydARZ2QvNoT20UA4DBT508k0Wz2alm";;analytics.SNIPPET_VERSION="5.2.0"; analytics.load("6kydARZ2QvNoT20UA4DBT508k0Wz2alm"); analytics.page();}}();`}
      </Script> */}
      {/* <Script src="/js/intercom-window.js" /> */}
      <Script strategy="afterInteractive" id="intercom-window">
        {`window.intercomSettings = { api_base: "https://api-iam.intercom.io", app_id: "myeba9bl" };`}
      </Script>
      {/* <Script src="/js/intercom.js" /> */}
      <Script strategy="afterInteractive" id="intercom">
        {`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/myeba9bl';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
      </Script>

      {/* <Script src="/js/segment.js" />
      <Script src="/js/intercom-window.js" />
      <Script src="/js/intercom.js" /> */}
    </html>
  )
}
export async function generateMetadata({
  params,
}: {
  children: React.ReactNode
  params: {
    lang: string
  }
}): Promise<Metadata> {
  const client = createClient()
  const globalSEO = await client.getSingle("global_seo", {
    lang: params.lang,
  })
  return {
    metadataBase: new URL("https://out.fund"),
    title: {
      template: "%s | Outfund",
      default: `${globalSEO.data.site_title}`,
    },
    description: globalSEO.data.meta_description || "",
    // referrer: "origin-when-cross-origin",
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
