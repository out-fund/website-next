import Link from "next/link"
import { Wrapper, PageLink, Logo } from "@/components/atoms"
import { Globe } from "@/components/atoms/Icons"

export default function Navbar(props: any) {
  // const [mobileMenueIsOpen, setMobileMenueIsOpen] = useState(false)

  return (
    <header className="Navbar">
      <Wrapper>
        <div className="_MobileNav md:hidden">
          <div className="flex justify-between mt-3 mb-3 mobileTopWrapper">
            <Link
              href={`/${props.locale}`}
              className="Logo h-[42px] w-[142px] pt-1 pb-1 block"
            >
              <span className="sr-only">Outfund</span>
              <Logo />
            </Link>
            <button>Menu</button>
          </div>

          <nav className="pb-2 Nav ">
            <ul className="Links flex flex-col border-t border-[#BFD5EE]">
              {props.data.data.navbar_left.map(
                ({ label, link }: { label: any; link: any }) => (
                  <li key={label} className="border-b border-[#BFD5EE] ">
                    <PageLink field={link} className="block pt-1 pb-1 pl-1">
                      {label}
                    </PageLink>
                  </li>
                ),
              )}

              <li className="border-b border-[#BFD5EE]	">
                <PageLink
                  field={props.data.data.navbar_right[0]?.link}
                  className="block pt-1 pb-1 pl-1"
                >
                  {props.data.data.navbar_right[0]?.label}
                </PageLink>
              </li>

              <li key="country" className="border-b border-[#BFD5EE]	">
                <Link
                  href="/country-selector"
                  className="pt-1 pb-1 flex items-center font-normal text-[17px] hover:underline underline-offset-2 focus:underline focus:outline-none gap-1 pl-1"
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
        {/* <div className="desktopNav"></div> */}
      </Wrapper>
    </header>
  )
}
