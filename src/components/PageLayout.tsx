import { Navbar, Footer } from "@/components"
import { createClient } from "@/prismicio"

import { sortLocales } from "@/lib/utils"

type PageLayoutParams = {
  children: React.ReactNode
  locale: string
}

export default async function PageLayout({
  locale,
  children,
}: PageLayoutParams) {
  const client = createClient()
  const NavbarData = await client.getSingle("navbar", { lang: locale })
  const FooterData = await client.getSingle("footer", { lang: locale })
  const FooterLanguages = await sortLocales(
    (await client.getRepository()).languages,
  )

  return (
    <>
      <Navbar data={NavbarData} locale={locale} />
      <main className="overflow-hidden ">{children}</main>
      <Footer data={FooterData} languages={FooterLanguages} locale={locale} />
    </>
  )
}
