import * as prismic from "@prismicio/client"
import * as prismicNext from "@prismicio/next"
import slicemachineConfig from "../slicemachine.config.json"

/**
 * The project's Prismic repository name.
 */
export const repositoryName = slicemachineConfig.repositoryName

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */

const routes: prismic.ClientConfig["routes"] = [
  {
    type: "page",
    uid: "home",
    lang: "*",
    path: "/:lang/",
  },
  {
    type: "page",
    lang: "*",
    path: "/:lang/:uid/",
  },
  {
    type: "page",
    uid: "blog",
    lang: "*",
    path: "/:lang/blog/",
  },
  {
    type: "blog_post",
    lang: "*",
    path: "/:lang/blog/:uid/",
  },
  {
    type: "landing_page",
    lang: "*",
    path: "/:lang/lp/:uid/",
  },
  {
    type: "success_story",
    uid: "success-stories",
    lang: "*",
    path: "/:lang/success-stories/",
  },
  {
    type: "success_story",
    lang: "*",
    path: "/:lang/success-stories/:uid/",
  },
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  })

  prismicNext.enableAutoPreviews({ client })
  return client
}
