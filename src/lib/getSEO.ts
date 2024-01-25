import { createClient } from "@/prismicio"
import { sortLocales, langLoOgLocale } from "@/lib/utils"

export async function getSEO(page: any, params: any) {
  const client = createClient()
  const globalSEO = await client.getSingle("global_seo", {
    lang: params.lang,
  })

  const languages: { [key: string]: string } = {}
  const langs = await sortLocales((await client.getRepository()).languages)
  langs.forEach((lang) => {
    languages[lang.id] = `/${lang.id}/${params.uid}`
  })

  const titleCountry = () => {
    const country = params.lang.split("-")[1]
    switch (country) {
      case "us":
        return " | US"
      case "de":
        return " | Deutschland"
      case "gb":
        return " | UK"
      case "nl":
        return " | Nederland"
      case "ie":
        return " | Ireland"
      case "au":
        return " | Australia"
      case "es":
        return " | España"
      default:
        return ""
    }
  }

  const pageTitle = page.data.title
    ? `${page.data.title} | Outfund${titleCountry()}`
    : `${page.lang} ${page.uid}`

  return {
    title: pageTitle,
    description:
      page.data.meta_description || globalSEO.data.meta_description || "",
    alternates: {
      canonical: `/${params.lang}/${params.uid}/`,
      languages,
    },
    openGraph: {
      title: page.data.meta_title || page.data.title || "",
      description:
        page.data.meta_description || globalSEO.data.meta_description || "",
      url: `/${params.lang}/${params.uid}`,
      locale: langLoOgLocale(params.lang),
      images: [page.data.meta_image.url || globalSEO.data.og_image.url || ""],
      siteName: "Outfund",
      type: "website",
    },
  }
}
