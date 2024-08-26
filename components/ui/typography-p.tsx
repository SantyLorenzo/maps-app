import { cn } from "@/lib/utils";

export function TypographyP({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <p className={cn("leading-none", className)}>
      {children}
    </p>
  )
}
