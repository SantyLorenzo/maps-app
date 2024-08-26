import type { Metadata } from "next";

import { cn } from "@/lib/utils"
import { VFXProvider } from 'react-vfx';
import { Inter as FontSans } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

import "./globals.css";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html >
  );
}
