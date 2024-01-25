import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@/prismicio"

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}

export const langToHtmlLang = (lang: string) => {
  return lang.split("-")[1]
    ? lang.split("-")[0] + "-" + lang.split("-")[1].toUpperCase()
    : "en-GB"
}

export function sortLocales(lang: any[]) {
  return lang.sort((a, b) =>
    a.name.split("-")[1].localeCompare(b.name.split("-")[1]),
  )
}

export async function translatedCountryNames(): Promise<any> {
  const client = createClient()
  const repository = await client.getRepository()
  const langs = sortLocales(repository.languages)
  // console.log(langs)

  return langs.map((lang) => {
    let newLangName = ""
    switch (lang.id) {
      case "en-gb":
        newLangName = "United Kingdom"
        break
      case "en-us":
        newLangName = "United States"
        break
      case "en-au":
        newLangName = "Australia"
        break
      case "nl-nl":
        newLangName = "Nederland"
        break
      case "es-es":
        newLangName = "España"
        break
      case "de-de":
        newLangName = "Deutschland"
        break
      case "en-ie":
        newLangName = "Ireland"
        break
    }
    return {
      id: lang.id,
      name: newLangName,
    }
  })
}

export function titleCase(str: string) {
  let splitStr = str.toLowerCase().split(" ")
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(" ")
}

export function langLoOgLocale(lang: string) {
  const [language, country] = lang.split("-")
  return `${language}_${country.toUpperCase()}`
}
