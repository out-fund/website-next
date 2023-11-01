"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { analytics } from "@/lib/segment"

type PageEventProps = {
  name: string
  category?: string
}

export function PageEvent({ name, category = "Web" }: PageEventProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    analytics.page(category, name)
  }, [pathname, searchParams])

  return null
}
