"use client" // Error components must be Client Components

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error)
  }, [error])

  return (
    <div className="w-full h-full flex flex-col items-center mt-5 gap-2">
      <h1 className="font-bold">Page Not Found</h1>
      <Link
        href="/"
        className="font-normal text-cobalt underline underline-offset-2 focus:underline focus:outline-none whitespace-nowrap decoration-1  select-none"
      >
        Return Home
      </Link>
    </div>
  )
}
