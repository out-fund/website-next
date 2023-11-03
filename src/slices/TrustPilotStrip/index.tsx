"use client"

import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

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
  // console.log(slice)
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <div className="relative mt-3">
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
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2.5,
              },
              1024: {
                slidesPerView: 3.5,
              },
            }}
          >
            {slice.items.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex h-[100%] rounded-lg bg-bgLight p-3"
              >
                <a
                  href={item.url ? item.url.toString() : "#"}
                  target="_blank"
                  className="group block"
                >
                  <div className="mb-1 h-[20px] w-[108px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 108 20"
                    >
                      <path
                        fill="#00B67A"
                        d="M20.25 0H0v20h20.25V0ZM42.188 0h-20.25v20h20.25V0ZM64.125 0h-20.25v20h20.25V0ZM86.063 0h-20.25v20h20.25V0ZM108 0H87.75v20H108V0Z"
                      />
                      <path
                        fill="#fff"
                        d="m10.125 13.48 3.08-.772 1.286 3.917-4.366-3.146Zm7.087-5.063h-5.421l-1.666-5.042-1.667 5.042h-5.42l4.387 3.125-1.667 5.041 4.388-3.125 2.7-1.916 4.366-3.125ZM32.062 13.48l3.08-.772 1.286 3.917-4.366-3.146Zm7.088-5.063h-5.422l-1.666-5.042-1.666 5.042h-5.421l4.387 3.125-1.666 5.041 4.387-3.125 2.7-1.916 4.367-3.125ZM54 13.48l3.08-.772 1.286 3.917L54 13.479Zm7.087-5.063h-5.421L54 3.375l-1.667 5.042h-5.42l4.387 3.125-1.667 5.041 4.388-3.125 2.7-1.916 4.366-3.125ZM75.937 13.48l3.08-.772 1.287 3.917-4.367-3.146Zm7.088-5.063h-5.422l-1.666-5.042-1.666 5.042H68.85l4.387 3.125-1.666 5.041 4.387-3.125 2.7-1.916 4.367-3.125ZM97.875 13.48l3.079-.772 1.287 3.917-4.366-3.146Zm7.087-5.063h-5.421l-1.666-5.042-1.667 5.042h-5.42l4.387 3.125-1.667 5.041 4.388-3.125 2.7-1.916 4.366-3.125Z"
                      />
                    </svg>
                  </div>
                  <div className="text-md mb-1	line-clamp-2 h-[36px] w-[80%] font-semibold leading-[18px] group-hover:underline">
                    {item.title}
                  </div>
                  <p className="mb-2 line-clamp-6 h-[120px] text-sm font-[450]">
                    {item.review}
                  </p>
                  <div className=" mt-auto">
                    <div className="text-sm font-[500]">{item.name}</div>
                    <div className="text-sm font-[450] opacity-50">
                      {item.date}
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>
    </section>
  )
}

export default TrustPilotStrip
