import { notFound } from "next/navigation"
import { SliceZone } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { components } from "@/slices"

type Props = {
  params: { uid: string; lang: string }
}

export default async function Page({ params }: Props) {
  const client = createClient()

  const page = await client
    .getByUID("flexpage", params.uid, {
      lang: params.lang,
    })
    .catch(() => notFound())

  // console.log(page)

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}
