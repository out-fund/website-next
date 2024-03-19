import { Inter } from "next/font/google"
import { DM_Sans } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})
