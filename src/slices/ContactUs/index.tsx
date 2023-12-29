import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"

import { Wrapper, Button, Heading } from "@/components/atoms"

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="h3" className="">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-[16px] leading-[24px] text-body font-[400]">
      {children}
    </p>
  ),
}

/**
 * Props for `ContactUs`.
 */
export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice>

/**
 * Component for "ContactUs" Slices.
 */
const ContactUs = ({ slice }: ContactUsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-5 md:my-10 "
    >
      <Wrapper width="narrow">
        <PrismicRichText
          field={slice.primary.description}
          components={components}
        />
        <div>{slice.primary.form_full_name}</div>
        <div>{slice.primary.form_business_email}</div>
        <div>{slice.primary.form_message}</div>
        <div>{slice.primary.form_button_text}</div>
      </Wrapper>
    </section>
  )
}

export default ContactUs
