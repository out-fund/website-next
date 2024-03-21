import { Logo } from "@/components/atoms"
import { Content, isFilled } from "@prismicio/client"
import NavLink from "@/components/NavLink/NavLink"
import { SliceComponentProps } from "@prismicio/react"
import Link from "next/link"
import classes from "./FlexHeader.module.scss"
import ButtonLink from "@/components/ButtonLink/ButtonLink"
import Wrapper from "@/components/Wrapper/Wrapper"
import { FlexGlobe } from "@/components/atoms/Icons"

/**
 * Props for `FlexHeader`.
 */
export type FlexHeaderProps = SliceComponentProps<Content.FlexHeaderSlice>

/**
 * Component for "FlexHeader" Slices.
 */
const FlexHeader = ({ slice }: FlexHeaderProps): JSX.Element => {
  const links = slice.items
  const pageLinks = links.slice(0, links.length - 2)
  const actionLinks = links.slice(-2)

  return (
    <header
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={classes.header}
    >
      <ul className={classes.links__action__mobile}>
        <li>
          <NavLink field={actionLinks[0].navlink_link}>
            {actionLinks[0].navlink_text}
          </NavLink>
        </li>
        <li>
          <NavLink field={actionLinks[1].navlink_link}>
            <FlexGlobe />
            {actionLinks[1].navlink_text}
          </NavLink>
        </li>
      </ul>

      <div className={classes.navbar}>
        <Link href="/" className={classes.logo}>
          <span className="sr-only">{slice.primary.home_page_text}</span>
          <Logo />
        </Link>
        {isFilled.keyText(slice.primary.button_text) && (
          <ButtonLink
            field={slice.primary.button_link}
            className=""
            variant="primary"
          >
            {slice.primary.button_text}
          </ButtonLink>
        )}
      </div>

      <div className={classes.links}>
        <ul className={classes.links__page}>
          {pageLinks.map((item, index) => (
            <li key={index}>
              <NavLink field={item.navlink_link}>{item.navlink_text}</NavLink>
            </li>
          ))}
        </ul>
        <ul className={classes.links__action}>
          <li>
            <NavLink field={actionLinks[0].navlink_link}>
              {actionLinks[0].navlink_text}
            </NavLink>
          </li>
          <li>
            <NavLink field={actionLinks[1].navlink_link}>
              <FlexGlobe />
              {actionLinks[1].navlink_text}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default FlexHeader
