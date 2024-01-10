import { Metadata } from "next"
import { SliceZone } from "@prismicio/react"
import { notFound } from "next/navigation"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PrismicNextImage } from "@prismicio/next"
// import { getTranslatedLocales } from "@/lib/getTranslatedLocales"

import { PageLayout } from "@/components"
import { PageEvent } from "@/lib/events"
import { Wrapper, Heading, PageLink } from "@/components/atoms"
import Link from "next/link"

type PageProps = {
  params: {
    locale: string
  }
}

export default async function BlogPage({ params }: PageProps) {
  const client = createClient()

  const blogPage = await client
    .getByUID("page", "blog", { lang: params.locale })
    .catch(() => notFound())

  const posts = await client.getAllByType("blog_post", {
    lang: params.locale,
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  })

  // const locales = await getTranslatedLocales(page, client)
  // console.log("params.locale", params.locale)
  // console.log("post", posts)
  // posts.map((post) => {
  //   console.log("post", post)
  // })

  return (
    <PageLayout locale={params.locale}>
      <SliceZone slices={blogPage.data.slices} components={components} />
      <Wrapper width="medium">
        <ul className="grid grid-cols-2 gap-4 mt-5 mb-5">
          {posts.map((post) => {
            return (
              <li key={post.uid} className="mb-2">
                <Link
                  href={`/${params.locale}/blog/${post.uid}`}
                  className="hover:underline block"
                >
                  {post.data.card_image.id && (
                    <div className="w-full h-[240px] border-[2px] border-bgDark">
                      <PrismicNextImage
                        field={post.data.card_image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* {!post.data.card_image.id && <div>{post.data.title}</div>} */}
                  <Heading size="h3" as="span" className="mt-2 block px-2">
                    {post.data.title}
                  </Heading>
                </Link>
              </li>
            )
          })}
        </ul>
      </Wrapper>

      {/* <PageLink field={link} className="text-body">
        {label}
      </PageLink> */}

      <PageEvent name="Blog" />
    </PageLayout>
  )
}

// export default async function BlogPage({ params }: { params: Params }) {
//   const client = createClient()

//   // const blogPosts = await client
//   //   .getByUID("blog_post", params.uid, { lang: params.locale })
//   //   .catch(() => notFound())
//   const posts = await client.getAllByType("blog_post", {
//     orderings: [
//       { field: "my.blog_post.publishDate", direction: "desc" },
//       { field: "document.first_publication_date", direction: "desc" },
//     ],
//   })

//   return (
//     <PageLayout locale={params.locale}>
//       <article className="mb-5">
//         <Wrapper width="narrow">
//           <SliceZone slices={page.data.slices} components={components} />
//           <div>test</div>
//         </Wrapper>
//       </article>

//       {/* <PageEvent name={blogPost.uid} /> */}
//     </PageLayout>
//   )
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Params
// }): Promise<Metadata> {
//   const client = createClient()
//   const page = await client
//     .getByUID("blog_post", params.uid)
//     .catch(() => notFound())

//   return {
//     metadataBase: new URL("https://out.fund"),
//     title: `${page.data.title} | Outfund`,
//   }
// }

// Should create static pages for post and locale
export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("blog_post", { lang: "*" })

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    }
  })
}
