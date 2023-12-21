"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { analytics } from "@/lib/segment"

import { titleCase } from "@/lib/utils"

type PageEventProps = {
  name: string
  category?: string
}

export function PageEvent({ name, category = "Web" }: PageEventProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageName = titleCase(name.replace(/-/g, " "))

  useEffect(() => {
    analytics.page(category, pageName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  return null
}
