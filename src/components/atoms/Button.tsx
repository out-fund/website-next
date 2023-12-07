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
        // "text-md flex rounded-3xl border-none bg-cobalt px-[24px] pb-[7px] pt-[9px] font-semibold leading-8 text-white antialiased hover:underline hover:outline-none focus:underline focus:outline-2 focus:outline-offset-2",
        "border-none rounded-3xl bg-cobalt text-white px-[40px] py-[12px] leading-[24px] text-[16px] inline-block ",
        className,
      )}
      {...restProps}
    >
      {children}
    </Link>
  )
}
