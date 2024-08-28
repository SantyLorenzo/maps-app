import { cn } from "@/lib/utils";

export function TypographyP({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <p className={cn("text-sm dark:text-black", className)}>
      {children}
    </p>
  )
}
