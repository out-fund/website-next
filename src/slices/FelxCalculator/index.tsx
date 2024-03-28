"use client"
import React from "react"
import { Content, isFilled } from "@prismicio/client"

import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
  PrismicText,
} from "@prismicio/react"

import { Wrapper, Button } from "@/components/atoms"
import Heading from "@/components/Heading"

import Box from "@/components/Box"
import c from "./FlexCalculator.module.scss"

/**
 * Props for `FelxCalculator`.
 */
export type FelxCalculatorProps =
  SliceComponentProps<Content.FelxCalculatorSlice>

const calculateTermLengths = (min: any, max: any) => {
  const termLengths = []
  for (var i = min; i <= max; i++) {
    termLengths.push(i)
  }
  return termLengths
}

/**
 * Component for "FelxCalculator" Slices.
 */
const FelxCalculator = ({ slice }: FelxCalculatorProps): JSX.Element => {
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
    >
      {/* <Wrapper> */}

      <Box>
        <div className="mx-auto max-w-[90%] md:mx-0 md:max-w-none">
          {isFilled.richText(slice.primary.heading) && (
            <Heading as="h2" size="h2">
              <PrismicText field={slice.primary.heading} />
            </Heading>
          )}
          <div className="GridWrapper grid grid-cols-1 gap-5 md:grid-cols-[400px_1fr] md:gap-[100px]">
            <div className="TextGroup flex flex-col gap-3 md:gap-10">
              <PrismicRichText field={slice.primary.description} />
              <div className="">
                <Heading as="h3" size="h3" className="mb-2">
                  {slice.primary.subheading}
                </Heading>
                <ul className="flex flex-col gap-2">
                  {slice.items.map((item, index) => (
                    <li
                      key={index}
                      className={`${c.icon} flex items-center gap-2 text-base leading-6 text-body`}
                    >
                      {item.bullet_point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="CalculatorGroup flex flex-col justify-end gap-3">
              <div className="Sliders flex flex-col gap-3">
                <div className="SliderGroup">
                  <div className="textWrapper mb-1 flex justify-between">
                    <Heading as="div" size="h4" className="">
                      {slice.primary.amount_title}
                    </Heading>
                    <Heading className="self-end " as="div" size="h4">
                      {getAmount(parseInt(selectedLoanAmount))}
                    </Heading>
                  </div>
                  <div className={c.slider}>
                    <label className="sr-only" htmlFor="amount">
                      {slice.primary.amount_title}
                    </label>
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
                    <div className={c.slider__min}>
                      {getAmount(parseInt(amounts[0]))}
                    </div>
                    <div className={c.slider__max}>
                      {getAmount(parseInt(amounts[amounts.length - 1]))}
                    </div>
                  </div>
                </div>

                <div className="SliderGroup">
                  <div className="textWrapper mb-1 flex justify-between">
                    <Heading as="div" size="h4" className="">
                      {slice.primary.term_title}
                    </Heading>
                    <Heading className="" as="div" size="h4">
                      {selectedTerm} {slice.primary.slider_months_text}
                    </Heading>
                  </div>
                  <div className={c.slider}>
                    <label className="sr-only" htmlFor="term">
                      {slice.primary.term_title}
                    </label>
                    <input
                      type="range"
                      id="term"
                      name="term"
                      min="0"
                      max={termLengths.length - 1}
                      step="1"
                      defaultValue={intialTerm}
                      onChange={(event) => handleTermChange(event)}
                    />
                    <div className={c.slider__min}>
                      {termLengths[0]} {slice.primary.slider_months_text}
                    </div>
                    <div className={c.slider__max}>
                      {termLengths[termLengths.length - 1]}{" "}
                      {slice.primary.slider_months_text}
                    </div>
                  </div>
                </div>
              </div>
              <div className="BottomGroup flex w-full flex-col gap-3 self-end md:w-1/2 md:min-w-[370px]">
                <div className="RepayableGroup">
                  <div className="flex items-baseline justify-between">
                    <Heading as="div" size="h4" className="">
                      {slice.primary.total_title}
                    </Heading>
                    <hr className="w-[25%] border-dashed opacity-20 md:w-[35%]" />
                    <Heading className="" as="div" size="h4">
                      {getAmount(totalRepayable)}
                    </Heading>
                  </div>
                </div>
                <div className="ButtonGroup relative flex flex-col items-center ">
                  <Button
                    href="https://client.out.fund/signup"
                    className="w-full"
                  >
                    {slice.primary.button_text}{" "}
                    {getAmount(parseInt(selectedLoanAmount))}
                  </Button>
                  <div className="absolute top-[56px] px-2 text-center text-xs text-[#4B6686]">
                    {slice.primary.button_note}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* </Wrapper> */}
    </section>
  )
}

export default FelxCalculator
