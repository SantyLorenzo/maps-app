import React from "react";
import { cn } from "@/lib/utils";

type TypographyH2Props = React.ComponentProps<'h2'> & {
  className?: string;
};

export function TypographyH1({
  children,
  className,
  ...props
}: TypographyH2Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}