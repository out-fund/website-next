import clsx from "clsx"
import classes from "./Wrapper.module.scss"

type WrapperProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

export default function Wrapper({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: WrapperProps) {
  return (
    <Comp className={classes.wrapper} {...restProps}>
      <div className={clsx(classes.wrapper__inner, className)}>{children}</div>
    </Comp>
  )
}
