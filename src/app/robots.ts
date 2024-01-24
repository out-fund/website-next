import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/en-gb/thank-you*",
        "/en-us/thank-you*",
        "/en-au/thank-you*",
        "/en-ie/thank-you*",
        "/nl-nl/thank-you*",
        "/es-es/thank-you*",
        "/de-de/thank-you*",
        "/api*",
      ],
    },
  }
}
