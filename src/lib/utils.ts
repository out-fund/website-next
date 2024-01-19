import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

// export async function getAlternates(repository: any, uid: any) {
//   const languages: { [key: string]: string } = {}
//   const langs = await sortLocales(repository.languages)
//   langs.forEach((lang) => {
//     languages[lang.id] = `/${lang.id}/${uid}`
//   })
//   return languages
// }
