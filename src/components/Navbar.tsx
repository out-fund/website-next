import Link from "next/link"
import { Wrapper, PageLink, Logo } from "@/components/atoms"
import { Globe } from "@/components/atoms/Icons"

export default function Navbar(props: any) {
  // const [mobileMenueIsOpen, setMobileMenueIsOpen] = useState(false)

  return (
    <header>
      <Wrapper>
        {/* ------------------------------------------------ Mobile nav */}
        <nav className="md:hidden w-full">
          <div className="flex pt-3 pb-3 justify-between">
            <Link
              href={`/${props.lang}/`}
              className="h-[42px] w-[142px] pt-1 pb-1 block"
            >
              <span className="sr-only">Outfund</span>
              <Logo />
            </Link>
            {/* <button>Menu</button> TODO one day */}
            <ul className="flex relative top-[6px] md:gap-1 lg:gap-3">
              <li className="ml-auto">
                <PageLink
                  field={props.data.data.navbar_right[0]?.link}
                  className="block px-1 py-1 text-[16px]"
                >
                  {props.data.data.navbar_right[0]?.label}
                </PageLink>
              </li>

              <li className="items-center hidden xs:flex">
                <span className="text-[#8D9BA9]">|</span>
              </li>

              <li key="country" className="hidden xs:block">
                <Link
                  href="/country-selector"
                  className="px-1 py-1 flex items-center font-normal text-[16px] hover:underline underline-offset-2 focus:underline focus:outline-none gap-1 pl-1 whitespace-nowrap decoration-1 decoration-[#8D9BA9]	select-none"
                >
                  <i className="">
                    <Globe />
                  </i>
                  {props.data.data.navbar_right[1]?.label}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* ------------------------------------------------ Desktop nav */}
        <div className="hidden md:flex h-[110px] items-center md:gap-1 lg:gap-4">
          <Link
            href={`/${props.lang}`}
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
