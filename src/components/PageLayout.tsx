import { Navbar, Footer } from "@/components"
import { createClient } from "@/prismicio"

import { sortLocales } from "@/lib/utils"

type PageLayoutParams = {
  children: React.ReactNode
  lang: string
}

export default async function PageLayout({ lang, children }: PageLayoutParams) {
  const client = createClient()
  const NavbarData = await client.getSingle("navbar", { lang: lang })
  const FooterData = await client.getSingle("footer", { lang: lang })
  const FooterLanguages = await sortLocales(
    (await client.getRepository()).languages,
  )

  return (
    <>
      <Navbar data={NavbarData} lang={lang} />
      <main className="overflow-hidden ">{children}</main>
      <Footer data={FooterData} languages={FooterLanguages} lang={lang} />
    </>
  )
}
