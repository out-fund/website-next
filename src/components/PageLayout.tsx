import { Navbar, Footer } from "@/components"

type PageLayoutParams = {
  children: React.ReactNode
  locale: string
}

export default function PageLayout({ locale, children }: PageLayoutParams) {
  return (
    <>
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  )
}
