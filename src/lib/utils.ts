import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}

export const convertLocaleToLang = (locale: string) => {
  return locale.split("-")[1]
    ? locale.split("-")[0] + "-" + locale.split("-")[1].toUpperCase()
    : "en-GB"
}

export function sortLocales(locales: any[]) {
  return locales.sort((a, b) =>
    a.name.split("-")[1].localeCompare(b.name.split("-")[1]),
  )
}
