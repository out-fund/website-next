import "@/styles/globals.css"

const SliceSimulatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // has to be en-GB as that is the default locale
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}

export default SliceSimulatorLayout
