import Link from "next/link"
import { Wrapper, PageLink, Logo } from "@/components/atoms"
import { Globe } from "@/components/atoms/Icons"

export default function Navbar(props: any) {
  // const [mobileMenueIsOpen, setMobileMenueIsOpen] = useState(false)

  return (
    <header>
      <Wrapper>
        {/* ------------------------------------------------ Mobile nav */}
        <div className=" md:hidden">
          <div className="flex justify-between pt-3 pb-3 mobileTopWrapper">
            <Link
              href={`/${props.locale}`}
              className="h-[42px] w-[142px] pt-1 pb-1 block"
            >
              <span className="sr-only">Outfund</span>
              <Logo />
            </Link>
            <button>Menu</button>
          </div>

          <nav className="pb-2 Nav hidden">
            <ul className="flex flex-col border-t border-[#BFD5EE]">
              {props.data.data.navbar_left.map(
                ({ label, link }: { label: any; link: any }) => (
                  <li key={label} className="border-b border-[#BFD5EE] ">
                    <PageLink
                      field={link}
                      className="block pt-1 pb-1 pl-1 text-[20px] md:text-[16px]"
                    >
                      {label}
                    </PageLink>
                  </li>
                ),
              )}

              <li className="border-b border-[#BFD5EE]">
                <PageLink
                  field={props.data.data.navbar_right[0]?.link}
                  className="block pt-1 pb-1 pl-1 text-[20px] md:text-[16px]"
                >
                  {props.data.data.navbar_right[0]?.label}
                </PageLink>
              </li>

              <li key="country" className="border-b border-[#BFD5EE]	">
                <Link
                  href="/country-selector"
                  className="pt-1 pb-1 flex items-center font-normal text-[20px] md:text-[16px] hover:underline underline-offset-2 focus:underline focus:outline-none gap-1 pl-1 whitespace-nowrap decoration-1 decoration-[#8D9BA9] select-none"
                >
                  <i className="">
                    <Globe />
                  </i>
                  {props.data.data.navbar_right[1]?.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* ------------------------------------------------ Desktop nav */}
        <div className="hidden md:flex h-[110px] items-center md:gap-1 lg:gap-4">
          <Link
            href={`/${props.locale}`}
            className="h-[42px] w-[142px] py-1 block"
          >
            <span className="sr-only">Outfund</span>
            <Logo />
          </Link>
          <nav className="w-full">
            <ul className="flex relative top-[6px] md:gap-1 lg:gap-3">
              {props.data.data.navbar_left.map(
                ({ label, link }: { label: any; link: any }) => (
                  <li key={label} className="">
                    <PageLink
                      field={link}
                      className="block px-1 py-1 text-[20px] md:text-[16px]"
                    >
                      {label}
                    </PageLink>
                  </li>
                ),
              )}
              <li className="ml-auto">
                <PageLink
                  field={props.data.data.navbar_right[0]?.link}
                  className="block px-1 py-1 text-[20px] md:text-[16px]"
                >
                  {props.data.data.navbar_right[0]?.label}
                </PageLink>
              </li>

              <li className="flex items-center">
                <span className="text-[#8D9BA9]">|</span>
              </li>

              <li key="country" className="">
                <Link
                  href="/country-selector"
                  className="px-1 py-1 flex items-center font-normal text-[20px] md:text-[16px] hover:underline underline-offset-2 focus:underline focus:outline-none gap-1 pl-1 whitespace-nowrap decoration-1 decoration-[#8D9BA9]	select-none"
                >
                  <i className="">
                    <Globe />
                  </i>
                  {props.data.data.navbar_right[1]?.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  )
}
