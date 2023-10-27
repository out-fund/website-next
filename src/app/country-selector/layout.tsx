import { cn } from "@/lib/utils"
import { worksans } from "@/lib/font"
import "@/styles/globals.css"

const CountrySelectorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // has to be en-GB as that is the default locale
    <html lang="en-GB" className={cn(worksans.className)}>
      <body>{children}</body>
    </html>
  )
}

export default CountrySelectorLayout
