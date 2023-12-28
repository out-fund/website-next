import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { createClient } from "@/prismicio"

export async function getAllBlogPosts() {
  const client = createClient()
  // const pages = await client.getAllByType("blog_post", { lang: "*" })
  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  })

  return posts.map((post) => {
    // return {
    //   uid: page.uid,
    //   lang: page.lang,
    // }
    return [post.uid]
  })
}

/**
 * Props for `BlogListAll`.
 */
export type BlogListAllProps = SliceComponentProps<Content.BlogListAllSlice>

/**
 * Component for "BlogListAll" Slices.
 */
const BlogListAll = ({ slice }: BlogListAllProps): JSX.Element => {
  const posts = getAllBlogPosts()
  console.log("posts", posts)
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      workds
    </section>
  )
}

export default BlogListAll
