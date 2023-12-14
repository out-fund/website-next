import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"

import classes from "./index.module.scss"
import { Wrapper, Heading, Button } from "@/components/atoms"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base font-normal text-body max-w-[770px] mx-auto mb-5 text-center">
      {children}
    </p>
  ),
}

/**
 * Props for `PerfectFit`.
 */
export type PerfectFitProps = SliceComponentProps<Content.PerfectFitSlice>

/**
 * Component for "PerfectFit" Slices.
 */
const PerfectFit = ({ slice }: PerfectFitProps): JSX.Element => {
  const tableBody = slice.items.slice(1)
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" bg-bgMedium"
    >
      <Wrapper width="medium">
        <div className="  text-center">
          <Heading as="h2" size="h2" className="mb-2 text-center">
            {slice.primary.heading}
          </Heading>
          <PrismicRichText
            field={slice.primary.description}
            components={components}
          />
          <div className={classes.table}>
            <table className="table w-full text-base border-collapse">
              <thead>
                <tr className="text-center ">
                  <th className=" w-[22%] pr-3 mr-4 text-right font-medium">
                    {slice.items[0].column1}
                  </th>
                  <th className=" bg-[#C8EDF9]">{slice.items[0].column2}</th>
                  <th className="">{slice.items[0].column3}</th>
                  <th className="">{slice.items[0].column4}</th>
                </tr>
              </thead>
              <tbody>
                {tableBody.map((item, index) => (
                  <tr className="text-center" key={index}>
                    <td className=" w-[22%] pr-3 mr-4 text-right font-medium">
                      {item.column1}
                    </td>
                    <td className="  bg-[#C8EDF9]">{item.column2}</td>
                    <td className="">{item.column3}</td>
                    <td className="">{item.column4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button href="#" className="mt-5 ">
            {slice.primary.button_text}
          </Button>
        </div>
      </Wrapper>
    </section>
  )
}

export default PerfectFit
