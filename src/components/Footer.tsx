//
// Footer
//
import Link from "next/link"
import { createClient } from "@/prismicio"
import { PrismicNextLink } from "@prismicio/next"
import "/node_modules/flag-icons/css/flag-icons.min.css"

import { sortLocales } from "@/lib/utils"
import { Wrapper, PageLink, Logo } from "@/components/atoms"

type FooterParams = {
  locale: string
}

export default async function Footer({ locale }: FooterParams) {
  const client = createClient()
  const navigation = await client.getSingle("footer")

  const repository = await client.getRepository()
  const locales = sortLocales(repository.languages)

  return (
    <footer className="bg-bgMedium mt-10">
      <Wrapper>
        <div className="flex flex-col pt-10 pb-3 ">
          <div className="top">
            <div className="grid grid-cols-5">
              {/* <div className="logo">
                <Link href="/">Outfund</Link>
              </div> */}
              <Link href={`/${locale}`} className="h-[26px] w-[142px]">
                <span className="sr-only">Outfund</span>
                <Logo variant="mono" />
              </Link>
              <div className="company">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {navigation.data.company_title}
                </div>
                <ul className="flex flex-col gap-2">
                  {navigation.data.company_links.map(({ label, link }) => (
                    <li key={label}>
                      <PageLink field={link} className="text-body">
                        {label}
                      </PageLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="funding">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {navigation.data.funding_title}
                </div>
                <ul className="flex flex-col gap-2">
                  {navigation.data.funding_links.map(({ label, link }) => (
                    <li key={label}>
                      <PageLink field={link} className="text-body">
                        {label}
                      </PageLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="support">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {navigation.data.support_title}
                </div>
                <ul className="flex flex-col gap-2">
                  {navigation.data.support_links.map(({ label, link }) => (
                    <li key={label}>
                      <PageLink field={link} className="text-body">
                        {label}
                      </PageLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="availableIn">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {navigation.data.countries_title}
                </div>
                <ul className=" flex flex-col gap-2">
                  {locales.map((locale) => (
                    <li key={locale.id} className="flex gap-2 pl-[3px]">
                      <span className={`fi fi-${locale.id.split("-")[1]}`} />
                      <Link
                        href={`/${locale.id}`}
                        className="inline-block text-base font-[500] text-body underline-offset-2 antialiased hover:underline focus:underline focus:outline-none"
                      >
                        {locale.name.split("- ")[1]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="py-5 max-w-[800px] text-md text-body opacity-70">
            {navigation.data.fca_statement}
          </div>
          <div className="bottom flex items-baseline gap-2 border-t border-[#DCE6EF] pt-1">
            <div className="text-xs text-body font-[400] opacity-70">
              Copyright © {new Date().getFullYear()} Outfund.{" "}
              {navigation.data.copyright}
            </div>
            <ul className="flex gap-2">
              {navigation.data.policy_links.map(({ label, link }) => (
                <li key={label}>
                  <PageLink
                    field={link}
                    className="text-xs text-body font-[400] opacity-70 "
                  >
                    {label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
    </footer>
  )
}
