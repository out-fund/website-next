import clsx from "clsx"
import classes from "./Wrapper.module.scss"

type BoundedProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp className={classes.wrapper} {...restProps}>
      <div className={clsx(classes.wrapper__inner, className)}>{children}</div>
    </Comp>
  )
}
