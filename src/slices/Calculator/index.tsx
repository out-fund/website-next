"use client"

import React from "react"
import { Content } from "@prismicio/client"
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react"

import { Wrapper, Heading, Button } from "@/components/atoms"
import classes from "./index.module.scss"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base text-body">{children}</p>
  ),
}

const calculateTermLengths = (min: any, max: any) => {
  const termLengths = []
  for (var i = min; i <= max; i++) {
    termLengths.push(i)
  }
  return termLengths
}

/**
 * Props for `Calculator`.
 */
export type CalculatorProps = SliceComponentProps<Content.CalculatorSlice>

/**
 * Component for "Calculator" Slices.
 */
const Calculator = ({ slice }: CalculatorProps): JSX.Element => {
  const fees = slice.primary.fees
    ? slice.primary.fees.replace(/\s/g, "").split(",")
    : []
  const amounts = slice.primary.amounts
    ? slice.primary.amounts.replace(/\s/g, "").split(",")
    : []
  const termLengths = calculateTermLengths(
    slice.primary.term_min,
    slice.primary.term_max,
  )

  let intialAmountValue = 3
  let intialTerm = 0

  const [requestedAmount, setRequestedAmount] =
    React.useState(intialAmountValue)
  const [requestedTerm, setRequestedTerm] = React.useState(intialTerm)

  let selectedLoanAmount = amounts[requestedAmount]
  // const currency = slice.primary.currency
  const handleAmountChange = (event: any) => {
    setRequestedAmount(event.target.value)
  }
  const handleTermChange = (event: any) => {
    setRequestedTerm(event.target.value)
  }
  let selectedTerm = termLengths[requestedTerm]

  const totalPayable =
    Number(selectedLoanAmount) +
    (Number(selectedLoanAmount) * Number(fees[requestedTerm])) / 100

  let convertCurrency: Intl.NumberFormat
  switch (slice.primary.currency) {
    case "GBP":
      convertCurrency = Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumSignificantDigits: 7,
      })
      break
    case "USD":
      convertCurrency = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 7,
      })
      break
    case "EUR":
      convertCurrency = Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumSignificantDigits: 7,
      })
      break
    case "AUD":
      convertCurrency = Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumSignificantDigits: 7,
      })
      break
  }

  const getAmount = (index: number) => {
    return convertCurrency.format(index) || ""
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper width="medium">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-9">
          <div className="flex flex-col gap-6">
            <div>
              <Heading as="h2" size="h2" className="mb-2">
                {slice.primary.heading}
              </Heading>
              <PrismicRichText
                field={slice.primary.description}
                components={components}
              />
            </div>

            <div>
              <Heading as="h3" size="h3" className="mb-2">
                {slice.primary.subheading}
              </Heading>
              <ul className="flex flex-col gap-2">
                {slice.items.map((item, index) => (
                  <li
                    key={index}
                    className={`${classes.icon} flex items-center gap-2 text-base text-body leading-6`}
                  >
                    {item.bulletpoint}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-[14px]">
            <div className="flex flex-col gap-6">
              <div className="wrapper">
                <Heading as="h4" size="h4" className="leading-6">
                  {slice.primary.amount_title}
                </Heading>
                <Heading
                  className="text-sky font-semibold leading-6 mb-[12px] mt-1"
                  as="div"
                  size="h4"
                >
                  {getAmount(parseInt(selectedLoanAmount))}
                </Heading>
                <div className={classes.slider}>
                  <input
                    type="range"
                    id="amount"
                    name="amount"
                    min="0"
                    max={amounts.length - 1}
                    step="1"
                    defaultValue={intialAmountValue}
                    onChange={(event) => handleAmountChange(event)}
                  />
                  <div className={classes.slider__min}>
                    {getAmount(parseInt(amounts[0]))}
                  </div>
                  <div className={classes.slider__max}>
                    {getAmount(parseInt(amounts[amounts.length - 1]))}
                  </div>
                </div>
              </div>

              <div className="wrapper">
                <Heading as="h4" size="h4" className="leading-6">
                  {slice.primary.term_title}
                </Heading>
                <Heading
                  className="text-sky font-semibold leading-6 mb-[12px] mt-1"
                  as="div"
                  size="h4"
                >
                  {selectedTerm} {slice.primary.slider_months_text}
                </Heading>
                <div className={classes.slider}>
                  <input
                    type="range"
                    id="amount"
                    name="amount"
                    min="0"
                    max={termLengths.length - 1}
                    step="1"
                    defaultValue={intialTerm}
                    onChange={(event) => handleTermChange(event)}
                  />
                  <div className={classes.slider__min}>
                    {termLengths[0]} {slice.primary.slider_months_text}
                  </div>
                  <div className={classes.slider__max}>
                    {termLengths[termLengths.length - 1]}{" "}
                    {slice.primary.slider_months_text}
                  </div>
                </div>
              </div>

              <div className="wrapper">
                <div className="flex justify-between items-baseline">
                  <Heading as="h4" size="h4" className="leading-6">
                    {slice.primary.total_title}
                  </Heading>
                  <Heading
                    className="selectedTerm text-cobalt font-semibold leading-6"
                    as="div"
                    size="h4"
                  >
                    {getAmount(totalPayable)}
                  </Heading>
                </div>
                <p className="text-xs tracking-tight text-body opacity-70 mt-[12px] max-w-[360px]">
                  {slice.primary.example_note}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center mt-4">
              <Button href="#">
                {/* {slice.primary.button_text} {getAmount(totalPayable)} */}
                {slice.primary.button_text}{" "}
                {getAmount(parseInt(selectedLoanAmount))}
              </Button>
              <div className="text-xs tracking-tight text-body opacity-70">
                {slice.primary.button_note}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default Calculator
