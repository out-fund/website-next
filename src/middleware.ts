import { createLocaleRedirect } from "@prismicio/next"
import { createClient } from "@/prismicio"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // add trailing slash to all paths
  if (!request.nextUrl.pathname.endsWith("/")) {
    return NextResponse.redirect(new URL(`${request.url}/`))
  }

  // Country redirects
  if (request.nextUrl.pathname.includes("/us/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/us/`, "/en-us/")),
    )
  }
  if (request.nextUrl.pathname.includes("/au/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/au/`, "/en-au/")),
    )
  }
  if (request.nextUrl.pathname.includes("/nl/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/nl/`, "/nl-nl/")),
    )
  }
  if (request.nextUrl.pathname.includes("/es/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/es/`, "/es-es/")),
    )
  }
  if (request.nextUrl.pathname.includes("/de/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/de/`, "/de-de/")),
    )
  }
  if (request.nextUrl.pathname.includes("/uk/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/uk/`, "/en-gb/")),
    )
  }
  if (request.nextUrl.pathname.includes("/ie/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/ie/`, "/en-ie/")),
    )
  }
  if (request.nextUrl.pathname.includes("/en/")) {
    return NextResponse.redirect(
      new URL(request.url.replace(`/en/`, "/en-gb/")),
    )
  }

  // Language redirects
  if (request.nextUrl.pathname.includes("grow2024")) {
    return NextResponse.redirect(new URL(`/`, request.url))
  }
  if (request.nextUrl.pathname.includes("accelerate2024")) {
    return NextResponse.redirect(new URL(`/`, request.url))
  }
  if (request.nextUrl.pathname.includes("flexible-finance")) {
    return NextResponse.redirect(new URL(`/`, request.url))
  }
  // FAQ redirect
  if (request.nextUrl.pathname.includes("support/faq")) {
    return NextResponse.redirect(new URL(`https://help.out.fund/`))
  }

  // Temporary redirect for the old images and signature images
  if (request.nextUrl.pathname.includes("/signatures/images/")) {
    return NextResponse.rewrite(
      new URL(request.url.replace(`/signatures/images/`, "/images/")),
    )
  }
  if (request.nextUrl.pathname.includes("/email/")) {
    return NextResponse.rewrite(
      new URL(request.url.replace(`/email/`, "/images/")),
    )
  }

  const client = createClient()
  const redirect = await createLocaleRedirect({ client, request })
  if (redirect) {
    return redirect
  }
}

export const config = {
  // Do not localize these paths
  matcher: [
    "/((?!api|_next/static|_next/image|slice-simulator|sitemap.xml|_redirects|images|docs|misc|country-selector|robots.txt|favicon.ico).*)",
  ],
}
