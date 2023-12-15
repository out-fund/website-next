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
    <p className="text-base text-body ">{children}</p>
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

  const totalRepayable =
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
      className=" mt-10 mb-10 md:mt-15 md:mb-15 md:pb-[56px] "
    >
      <Wrapper>
        <div className="mx-auto md:mx-0 max-w-[90%] md:max-w-none">
          <div className="GridWrapper grid grid-cols-1 md:grid-cols-[400px_1fr] gap-5 md:gap-[100px]">
            <div className="flex flex-col gap-3 md:gap-10 TextGroup">
              <div className="flex flex-col gap-2">
                <Heading as="h2" size="h2" className="">
                  {slice.primary.heading}
                </Heading>
                <PrismicRichText
                  field={slice.primary.description}
                  components={components}
                />
              </div>

              <div className="hidden md:block">
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
            <div className="flex flex-col justify-end gap-3 CalculatorGroup">
              <div className="flex flex-col gap-3 Sliders">
                <div className="SliderGroup">
                  <div className="flex justify-between mb-1 textWrapper">
                    <Heading as="div" size="h4" className="">
                      {slice.primary.amount_title}
                    </Heading>
                    <Heading className="" as="div" size="h4">
                      {getAmount(parseInt(selectedLoanAmount))}
                    </Heading>
                  </div>
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

                <div className="SliderGroup">
                  <div className="flex justify-between mb-1 textWrapper">
                    <Heading as="div" size="h4" className="">
                      {slice.primary.term_title}
                    </Heading>
                    <Heading className="" as="div" size="h4">
                      {selectedTerm} {slice.primary.slider_months_text}
                    </Heading>
                  </div>
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
              </div>
              <div className="BottomGroup w-full md:w-1/2 md:min-w-[370px] self-end flex flex-col gap-3">
                <div className="RepayableGroup">
                  <div className="flex items-baseline justify-between">
                    <Heading as="div" size="h4" className="">
                      {slice.primary.total_title}
                    </Heading>
                    <hr className="w-[36%] border-dashed opacity-20" />
                    <Heading className="" as="div" size="h4">
                      {getAmount(totalRepayable)}
                    </Heading>
                  </div>
                </div>
                <div className="flex flex-col items-center ButtonGroup relative ">
                  <Button href="#" className="w-full">
                    {slice.primary.button_text}{" "}
                    {getAmount(parseInt(selectedLoanAmount))}
                  </Button>
                  <div className="px-2 text-xs text-center text-[#4B6686] absolute top-[56px]">
                    {slice.primary.button_note}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 md:hidden">
              <Heading as="h3" size="h3" className="mb-2">
                {slice.primary.subheading}
              </Heading>
              <ul className="flex flex-col gap-2">
                {slice.items.map((item, index) => (
                  <li
                    key={index}
                    className={`${classes.icon} flex items-center gap-2 text-base text-body leading-6 align-baseline `}
                  >
                    {item.bulletpoint}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default Calculator
