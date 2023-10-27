import "client-only"

import { AnalyticsBrowser } from "@segment/analytics-next"

const key =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
    : ""

export const analytics = AnalyticsBrowser.load({
  writeKey: key as string,
})
