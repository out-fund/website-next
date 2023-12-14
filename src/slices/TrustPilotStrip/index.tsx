"use client"

import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import moment from "moment"

import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/autoplay"

import { Wrapper } from "@/components/atoms"
import { Autoplay } from "swiper/modules"

/**
 * Props for `TrustPilotStrip`.
 */
export type TrustPilotStripProps =
  SliceComponentProps<Content.TrustPilotStripSlice>

/**
 * Component for "TrustPilotStrip" Slices.
 */
const TrustPilotStrip = ({ slice }: TrustPilotStripProps): JSX.Element => {
  const formatedDate = (date: any) => {
    moment.locale("en")
    return moment(date).format("DD MMMM YYYY")
  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <div className="relative ">
          <Swiper
            spaceBetween={24}
            grabCursor={true}
            roundLengths={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4.3,
              },
            }}
          >
            {slice.items.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex h-[100%] rounded-sm bg-bgMedium p-2 border-b border-[#DFE4EA]"
              >
                <figure>
                  <a
                    href={item.url ? item.url.toString() : "#"}
                    target="_blank"
                    className="block group"
                  >
                    <div className="mb-1 h-[20px] w-[108px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 108 20"
                      >
                        <path
                          fill="#E6A400"
                          fillRule="evenodd"
                          d="M20 0H0v20h20V0Zm-8.428 7.837L10 3 8.428 7.837H3.343l4.114 2.99-1.571 4.836L10 12.673l4.114 2.99-1.571-4.837 4.114-2.99h-5.085ZM42 0H22v20h20V0Zm-8.428 7.837L32 3l-1.572 4.837h-5.085l4.114 2.99-1.572 4.836L32 12.673l4.114 2.99-1.571-4.837 4.114-2.99h-5.085ZM44 0h20v20H44V0Zm10 3 1.572 4.837h5.085l-4.114 2.99 1.572 4.836L54 12.673l-4.114 2.99 1.571-4.837-4.114-2.99h5.085L54 3Zm32-3H66v20h20V0Zm-8.428 7.837L76 3l-1.572 4.837h-5.085l4.114 2.99-1.572 4.836L76 12.673l4.115 2.99-1.572-4.837 4.114-2.99h-5.085ZM88 0h20v20H88V0Zm10 3 1.572 4.837h5.085l-4.114 2.99 1.571 4.836L98 12.673l-4.115 2.99 1.572-4.837-4.114-2.99h5.085L98 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-md mb-1	line-clamp-2 h-[36px] w-[80%] font-semibold leading-[18px] group-hover:underline">
                      {item.title}
                    </div>
                    <blockquote
                      cite={item.url ? item.url.toString() : "#"}
                      className="mb-2 line-clamp-3 h-[60px] text-sm font-normal"
                    >
                      {item.review}
                    </blockquote>
                    <figcaption className="mt-auto ">
                      <div className="text-[14px] leading-[18px] font-[500]">
                        {item.name}
                      </div>
                      <div className="text-[14px] leading-[18px] font-normal opacity-50">
                        {formatedDate(item.date)}
                      </div>
                    </figcaption>
                  </a>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>
    </section>
  )
}

export default TrustPilotStrip
