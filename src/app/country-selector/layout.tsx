import { GoogleAnalytics } from "@next/third-parties/google"
import { cn } from "@/lib/utils"
import { inter } from "@/lib/font"
import "@/styles/globals.css"

const CountrySelectorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // has to be en-GB as that is the default locale
    <html lang="en-GB" className={cn(inter.className)}>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-V6R3GNYBT3" />
    </html>
  )
}

export default CountrySelectorLayout
