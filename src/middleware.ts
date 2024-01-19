import { createLocaleRedirect } from "@prismicio/next"
import { createClient } from "@/prismicio"
import { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
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
