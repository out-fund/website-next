import { createClient } from "@/prismicio"
import { Metadata } from "next"
import Link from "next/link"

import "/node_modules/flag-icons/css/flag-icons.min.css"
import { sortLocales } from "@/lib/utils"
import { Wrapper, Heading } from "@/components/atoms"
import { PageEvent } from "@/lib/events"

const CountrySelectorPage = async () => {
  const client = createClient()
  const repository = await client.getRepository()
  const langs = sortLocales(repository.languages)

  return (
    <main>
      <Wrapper>
        <div className="mt-12">
          <Heading as="h1" size="h2" className="mb-6">
            Choose Your Country
          </Heading>
          <ul className="flex flex-col gap-2">
            {langs.map((lang) => (
              <li key={lang.id} className="flex gap-2">
                <span className={`fi fi-${lang.id.split("-")[1]}`} />
                <Link
                  href={`/${lang.id}`}
                  className="inline-block text-base font-[500] text-cobalt underline-offset-2 antialiased hover:underline focus:underline focus:outline-none"
                >
                  {lang.name.split("- ")[1]}
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

export const metadata: Metadata = {
  metadataBase: new URL("https://out.fund"),
  title: "Country Selector",
  // description: "Funding for your business",
  // alternates: {
  //   canonical: `/country-selector`,
  // },
}
