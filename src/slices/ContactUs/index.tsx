"use client"

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
        <form
          name="contact-next"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="flex flex-col gap-2 mt-3"
        >
          <div className="">
            <input
              className="shadow appearance-none border-cobalt rounded w-full p-1  "
              type="text"
              name="fullname"
              placeholder={slice.primary.form_full_name ?? ""}
              required
            />
          </div>
          <div>
            <input
              className="shadow appearance-none border-cobalt rounded w-full p-1  "
              type="email"
              name="email"
              placeholder={slice.primary.form_business_email ?? ""}
              required
            />
          </div>
          <div>
            <textarea
              className="shadow appearance-none border-cobalt rounded w-full p-1  "
              placeholder={slice.primary.form_message ?? ""}
              name="message"
              required
            />
          </div>

          <div className="sr-only">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="border-none rounded-3xl bg-cobalt text-white px-[40px] py-[12px] leading-[24px] text-[16px] inline-block text-center font-medium hover:underline hover:outline-none focus:underline focus:outline-2 focus:outline-offset-2 decoration-1 underline-offset-2 whitespace-nowrap flex-nowrap"
            >
              {slice.primary.form_button_text ?? ""}
            </button>
          </div>
        </form>
      </Wrapper>
    </section>
  )
}

export default ContactUs
