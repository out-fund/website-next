import { cn } from "@/lib/utils"
import c from "./Box.module.scss"

type BoxProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  gray?: boolean
}

export default function Box({
  as: Comp = "section",
  className,
  children,
  gray,
  ...restProps
}: BoxProps) {
  return (
    <Comp
      className={cn(c.box, gray ? c.boxGray : "", className)}
      {...restProps}
    >
      {children}
    </Comp>
  )
}
