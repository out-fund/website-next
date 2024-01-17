// We have to have a "top" layout file because of the way Next.js works
// but the file doesn't need to do anything.
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
