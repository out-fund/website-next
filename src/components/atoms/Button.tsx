import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"

type ButtonProps = {
  className?: string
  href: string
  children: React.ReactNode
}

export default function Button({
  className,
  href,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "border-none rounded-3xl bg-cobalt text-white px-[40px] py-[12px] leading-[24px] text-[16px] inline-block text-center font-medium hover:underline hover:outline-none focus:underline focus:outline-2 focus:outline-offset-2 decoration-1 underline-offset-2 whitespace-nowrap flex-nowrap",
        className,
      )}
      {...restProps}
    >
      {children}
    </Link>
  )
}
