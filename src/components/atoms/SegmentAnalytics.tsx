"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { analytics } from "@/lib/segment"

export default function SegmentAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    analytics.page()
  }, [pathname, searchParams])

  return null
}

// console.log(process.env.SEGMENT_WRITE_KEY)
