import { createClient } from "@/prismicio"
import { Metadata } from "next"
import Link from "next/link"

import "/node_modules/flag-icons/css/flag-icons.min.css"
import { sortLocales, translatedCountryNames } from "@/lib/utils"
import { Wrapper, Heading, Logo } from "@/components/atoms"
import { PageEvent } from "@/lib/events"

const CountrySelectorPage = async () => {
  const client = createClient()
  const langs = await translatedCountryNames()

  // console.log("langs", langs)
  return (
    <main>
      <Wrapper>
        <div className="mt-12">
          <Link href={`/`} className="mb-3 block h-[42px] w-[142px]">
            <span className="sr-only">Outfund</span>
            <Logo />
          </Link>
          <Heading as="h1" size="h2" className="mb-6">
            Choose Your Country
          </Heading>
          <ul className="flex flex-col gap-2">
            {langs.map((lang: any) => (
              <li key={lang.id} className="flex gap-2">
                {/* <span className={`fi fi-${lang.id.split("-")[1]}`} /> */}
                <Link
                  href={`/${lang.id}`}
                  className="inline-block text-base font-[500] text-cobalt underline-offset-2 antialiased hover:underline focus:underline focus:outline-none"
                >
                  {lang.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>

      {/* Segment Event */}
      {/* <PageEvent name="Country Selector" /> */}
    </main>
  )
}

export default CountrySelectorPage

export const metadata = {
  metadataBase: new URL("https://out.fund"),
  title: `Country Selector | Outfund`,
  description:
    "Outfund is available in multiple countries. Choose your country to get started.",
  alternates: {
    canonical: `/country-selector`,
    languages: {
      "x-default": "/country-selector",
    },
  },
}
