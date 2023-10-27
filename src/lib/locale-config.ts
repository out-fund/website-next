//
import { createClient } from "@/prismicio"

export async function getLocales() {
  const client = createClient()
  const repository = await client.getRepository()
  // Returns an array of supported locales because the repository.languages is an array of objects like:
  // repository.languages = { id: 'en-gb', name: 'English - United Kingdom' },...

  const locales = repository.languages.map((locale) => locale.id)
  const defaultLocale = locales[0]
  return { locales }
}

const locales = getLocales()

export type ValidLocale = typeof locales

// export const locales = [
//   "en-gb",
//   "en-us",
//   "es-es",
//   "en-au",
//   "en-ie",
//   "de-de",
//   "en-de",
//   "nl-nl",
//   "en-nl",
// ] as const
// export type ValidLocale = (typeof locales)[number]
