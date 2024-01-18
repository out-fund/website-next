import Image from "next/image"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
  PrismicLink,
} from "@prismicio/react"
import Link from "next/link"

import "/node_modules/flag-icons/css/flag-icons.min.css"
import { Wrapper, PageLink, Logo } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-xs text-body opacity-70">{children}</p>
  ),
  hyperlink: ({ node, children }) => {
    return (
      <a href={node.data.url} target="_blank" className="underline">
        {children}
      </a>
    )
  },
}

export default async function Footer(props: any) {
  // console.log("footer", props)
  return (
    <footer className="  bg-bgMedium">
      <PrismicRichText field={props.legal_text} components={components} />
      <Wrapper>
        <div className="flex flex-col pt-10 pb-1 mx-auto md:mx-0 max-w-[90%] md:max-w-none  ">
          <div className="top">
            <div className="grid gap-5 md:grid-rows-none md:grid-cols-5">
              <Link href={`/${props.lang}`} className="h-[26px] w-[142px]">
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
                    <li
                      key={language.id}
                      className="flex gap-2 pl-[3px] items-center"
                    >
                      {/* <span className={`fi fi-${language.id.split("-")[1]}`} /> */}
                      {/* <Image
                        src={`https://out.fund/images/${language.id.split("-")[1]}.png`}
                        width={24}
                        height={16}
                        alt={`${language.id.split("-")[1]} flag`}
                        // className="w-[24px] h-[16px]"
                        priority={false}
                        loading="lazy"
                      /> */}
                      <Link
                        href={`/${language.id}`}
                        className="font-normal hover:underline underline-offset-2 focus:underline focus:outline-none whitespace-nowrap decoration-1 decoration-[#8D9BA9] select-none"
                      >
                        {language.name.split("- ")[1]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-5 pb-2 max-w-[800px]">
            <PrismicRichText
              field={props.data.data.legal_text}
              components={components}
            />
          </div>

          {/* Bottom ---------------------------------------------------------------- */}
          <div className=" flex flex-col md:flex-row items-baseline gap-2 border-t border-[#DCE6EF] pt-1">
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
