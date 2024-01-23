import Link from "next/link"
import { Logo, Button } from "@/components/atoms"

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center mt-5 gap-2 pb-10">
      <Link href={`/`} className="h-[42px] w-[142px] pt-1 pb-1 block">
        <span className="sr-only">Outfund</span>
        <Logo />
      </Link>
      <h1 className="mt-8 text-heading text-[32px] leading-[40px] font-[350] md:text-[48px] md:leading-[56px] md:font-[350] tracking-[-0.04em]">
        Page not found
      </h1>
      <Link
        href="/"
        className="font-normal text-cobalt underline underline-offset-2 focus:underline focus:outline-none whitespace-nowrap decoration-1  select-none"
      >
        Return to homepage
      </Link>
      <h1 className="mt-8 text-heading text-[40px] leading-[48px] font-[350] md:text-[56px] md:leading-[64px] md:font-[350] tracking-[-0.04em] text-center">
        But we could <br />
        fund your business
      </h1>
      <Button href="https://client.out.fund/signup" className="mt-2">
        Apply for funding
      </Button>
    </div>
  )
}
