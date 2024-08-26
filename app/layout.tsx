import type { Metadata } from "next";

import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import ErrorBoundary from "@/lib/error-boundary";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Maps app",
  description: "Search and view different countries...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ApolloWrapper>
              {children}
              <Toaster />
            </ApolloWrapper>
          </ThemeProvider>
        </ErrorBoundary>

      </body>
    </html >
  );
}
