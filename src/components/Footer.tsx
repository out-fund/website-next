//
// Footer
//
import Link from "next/link"
import "/node_modules/flag-icons/css/flag-icons.min.css"
import { Wrapper, PageLink, Logo } from "@/components/atoms"

export default async function Footer(props: any) {
  return (
    <footer className="mt-10 bg-bgMedium">
      <Wrapper>
        <div className="flex flex-col pt-10 pb-3 ">
          <div className="top">
            <div className="grid grid-cols-5">
              <Link href={`/${props.locale}`} className="h-[26px] w-[142px]">
                <span className="sr-only">Outfund</span>
                <Logo variant="mono" />
              </Link>
              <div className="company">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {props.data.data.company_title}
                </div>
                <ul className="flex flex-col gap-2">
                  {props.data.data.company_links.map(
                    ({ label, link }: { label: any; link: any }) => (
                      <li key={label}>
                        <PageLink field={link} className="text-body">
                          {label}
                        </PageLink>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="funding">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {props.data.data.funding_title}
                </div>
                <ul className="flex flex-col gap-2">
                  {props.data.data.funding_links.map(
                    ({ label, link }: { label: any; link: any }) => (
                      <li key={label}>
                        <PageLink field={link} className="text-body">
                          {label}
                        </PageLink>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="support">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {props.data.data.support_title}
                </div>
                <ul className="flex flex-col gap-2">
                  {props.data.data.support_links.map(
                    ({ label, link }: { label: any; link: any }) => (
                      <li key={label}>
                        <PageLink field={link} className="text-body">
                          {label}
                        </PageLink>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="availableIn">
                <div className="text-body text-md mb-2 opacity-50 font-[400] pt-1">
                  {props.data.data.countries_title}
                </div>
                <ul className="flex flex-col gap-2 ">
                  {props.languages.map((language: any) => (
                    <li key={language.id} className="flex gap-2 pl-[3px]">
                      <span className={`fi fi-${language.id.split("-")[1]}`} />
                      <Link
                        href={`/${language.id}`}
                        className="inline-block text-base font-[500] text-body underline-offset-2 antialiased hover:underline focus:underline focus:outline-none"
                      >
                        {language.name.split("- ")[1]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="py-5 max-w-[800px] text-md text-body opacity-70">
            {props.data.data.fca_statement}
          </div>
          <div className="bottom flex items-baseline gap-2 border-t border-[#DCE6EF] pt-1">
            <div className="text-xs text-body font-[400] opacity-70">
              Copyright © {new Date().getFullYear()} Outfund.{" "}
              {props.data.data.copyright}
            </div>
            <ul className="flex gap-2">
              {props.data.data.policy_links.map(
                ({ label, link }: { label: any; link: any }) => (
                  <li key={label}>
                    <PageLink
                      field={link}
                      className="text-xs text-body font-[400] opacity-70 "
                    >
                      {label}
                    </PageLink>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Wrapper>
    </footer>
  )
}
