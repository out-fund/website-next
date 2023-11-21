import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/prismicio"

export async function middleware(request: NextRequest) {
  const client = createClient()
  const repository = await client.getRepository()
  // Returns an array of supported locales because the repository.languages is an array of objects like:
  // repository.languages = { id: 'en-gb', name: 'English - United Kingdom' },...
  const locales = repository.languages.map((locale) => locale.id)
  const defaultLocale = locales[0]

  // console.log("repository.languages", repository.languages)

  let negotiatorHeaders = {}
  // @ts-ignore complaining about value and key types
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  // Returns the best locale based on the Accept-Language header
  // If comming from an unsupported language, returns empty string for locale
  let preferedlocale = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )

  // Tries to match the locales in the request with the supported locales
  // If none of the locales in the request are supported, the default locale is returned
  const matchedLocale = matchLocale(preferedlocale, locales, defaultLocale)

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  const pathnameIsMissingValidLocale = locales.every(
    (locale) => !pathname.includes(`${locale}`) && pathname !== `/${locale}`,
  )

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingValidLocale) {
    return NextResponse.redirect(
      new URL(`/${matchedLocale}${pathname}`, request.url),
    )
  }
}

export const config = {
  // Do not localize these paths
  matcher: [
    "/((?!api|_next/static|_next/image|slice-simulator|sitemap.xml|country-selector|robots.txt|favicon.ico|slice-simulator).*)",
  ],
}

// match(languages, locales, defaultLocale) // -> 'en-US'
