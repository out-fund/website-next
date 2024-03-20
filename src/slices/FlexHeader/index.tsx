import { Logo } from "@/components/atoms"
import { Content, isFilled } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import { SliceComponentProps } from "@prismicio/react"
import Link from "next/link"
import classes from "./FlexHeader.module.scss"
import ButtonLink from "@/components/ButtonLink/ButtonLink"
import Wrapper from "@/components/Wrapper/Wrapper"

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
    <Wrapper
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      as="header"
      className={classes.header}
    >
      <ul className={classes.links__action__mobile}>
        {actionLinks.map((item, index) => (
          <li key={index}>
            <PrismicNextLink field={item.navlink_link}>
              {item.navlink_text}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
      <div className={classes.navbar}>
        <Link href="/" className={classes.logo}>
          <span className="sr-only">{slice.primary.home_page_text}</span>
          <Logo />
        </Link>
        {isFilled.keyText(slice.primary.button_text) && (
          <ButtonLink field={slice.primary.button_link} className="">
            {slice.primary.button_text}
          </ButtonLink>
        )}
      </div>

      <div className={classes.links}>
        <ul className={classes.links__page}>
          {pageLinks.map((item, index) => (
            <li key={index}>
              <PrismicNextLink field={item.navlink_link}>
                {item.navlink_text}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
        <ul className={classes.links__action}>
          {actionLinks.map((item, index) => (
            <li key={index}>
              <PrismicNextLink field={item.navlink_link}>
                {item.navlink_text}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  )
}

export default FlexHeader
