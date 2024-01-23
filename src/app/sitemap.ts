import { MetadataRoute } from "next"
import { createClient } from "@/prismicio"
import * as prismic from "@prismicio/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()
  const homePages = await client.getAllByType("page", {
    lang: "*",
    filters: [prismic.filter.at("my.page.uid", "home")],
  })
  const pages = await client.getAllByType("page", {
    lang: "*",
    filters: [prismic.filter.not("my.page.uid", "home")],
  })

  const blogPosts = await client.getAllByType("blog_post", {
    lang: "*",
  })

  const homePagesURLs = homePages.map((page) => ({
    url: `https://out.fund/${page.lang}/`,
    lastModified: page.last_publication_date,
    changeFrequency: "weekly" as const,
    priority: 1,
  }))

  const pageURLs = pages.map((page) => ({
    url: `https://out.fund/${page.lang}/${page.uid}/`,
    lastModified: page.last_publication_date,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const blogPostsURLs = blogPosts.map((page) => ({
    url: `https://out.fund/${page.lang}/blog/${page.uid}/`,
    lastModified: page.last_publication_date,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  return [
    // {
    //   url: "https://acme.com",
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 1,
    // },
    ...homePagesURLs,
    ...pageURLs,
    ...blogPostsURLs,
  ]
}
