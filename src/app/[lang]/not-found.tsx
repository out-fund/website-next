import Link from "next/link"

export default function NotFound() {
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
