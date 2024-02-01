import { MetadataRoute } from "next"
import { createClient } from "@/prismicio"
import * as prismic from "@prismicio/client"
import moment from "moment"

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

  // TODO: change weekly to monthly for pages that are not updated often later
  const homePagesURLs = homePages.map((page) => ({
    url: `https://out.fund/${page.lang}/`,
    lastModified: moment(page.last_publication_date).format("YYYY-MM-DD"),
    changeFrequency: "weekly" as const,
    priority: 1,
  }))

  const pageURLs = pages.map((page) => ({
    url: `https://out.fund/${page.lang}/${page.uid}/`,
    lastModified: moment(page.last_publication_date).format("YYYY-MM-DD"),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  const blogPostsURLs = blogPosts.map((page) => ({
    url: `https://out.fund/${page.lang}/blog/${page.uid}/`,
    lastModified: moment(page.last_publication_date).format("YYYY-MM-DD"),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  return [...homePagesURLs, ...pageURLs, ...blogPostsURLs]
}
