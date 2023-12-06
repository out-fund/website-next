import Link from "next/link"
import { Wrapper, PageLink, Logo } from "@/components/atoms"
import { Globe } from "@/components/atoms/Icons"

export default function Navbar(props: any) {
  // const [mobileMenueIsOpen, setMobileMenueIsOpen] = useState(false)

  return (
    <header className="Navbar">
      <Wrapper>
        <div className="mobileNav">
          <div className="mobileTopWrapper flex justify-between mt-3 mb-3">
            <Link
              href={`/${props.locale}`}
              className="Logo h-[42px] w-[142px] pt-1 pb-1 block"
            >
              <span className="sr-only">Outfund</span>
              <Logo />
            </Link>
            <button>Menu</button>
          </div>

          <nav className="Nav pb-2 ">
            <ul className="Links flex flex-col gap-1 ">
              {props.data.data.navbar_left.map(
                ({ label, link }: { label: any; link: any }) => (
                  <li key={label}>
                    <PageLink field={link} className="block pt-1 pb-1">
                      {label}
                    </PageLink>
                  </li>
                ),
              )}

              <li className="w-1/2 ">
                <hr className="opacity-10" />
              </li>

              <li>
                <PageLink
                  field={props.data.data.navbar_right[0]?.link}
                  className="block pt-1 pb-1"
                >
                  {props.data.data.navbar_right[0]?.label}
                </PageLink>
              </li>

              <li key="country" className="">
                <Link
                  href="/country-selector"
                  className="pt-1 pb-1 flex items-center gap-1  font-normal text-[17px] hover:underline underline-offset-2 focus:underline focus:outline-none"
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
