import React, {
  forwardRef,
  ElementType,
  ComponentPropsWithoutRef,
  RefAttributes,
} from "react";
import clsx from "clsx";

type BoundedProps<T extends ElementType = "section"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<T> &
  RefAttributes<Element>;

const Bounded = forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx("px-4 py-10 md:px-4 md:py-14 lg:py-16", className)}
        {...restProps}
      >
        <div className="">{children}</div>
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";

export default Bounded;
