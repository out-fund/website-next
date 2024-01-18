"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { analytics } from "@/lib/segment"

type SegmentAnalyticsParams = {
  lang: string
  pageData?: any
}

export default function SegmentAnalytics({
  lang,
  pageData,
}: SegmentAnalyticsParams) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // console.log("locale", locale)
  // console.log("pageData", pageData)

  // console.log("pathname", pathname)
  // console.log("searchParams", searchParams)

  useEffect(() => {
    analytics.page()
  }, [pathname, searchParams])

  // useEffect(() => {
  //   analytics.page("pageName", {
  //     title: "mytitle",
  //     path: "/my-path",
  //   })
  // }, [pathname, searchParams])

  return null
}

// console.log(process.env.SEGMENT_WRITE_KEY)
