import type React from "react"
import type { Metadata } from "next/types"
import { Inter, Poppins, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PerformanceOptimizer from "@/components/performance-optimizer"
import { ToastProvider } from "@/components/ui/toast-provider"

// Enhanced Inter font with more weight variations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  // Extended weight range for more typography options
  weight: ["300", "400", "500", "600", "700"],
})

// Enhanced Poppins font with more weight variations
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"], // Extended weight range
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: false, // Not critical for initial render
})

// Enhanced Montserrat font with more weight variations
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800", "900"], // Extended weight range
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true, // Critical for headings
})

export const metadata: Metadata = {
  title: "Vedang Prajapati | Frontend Developer",
  description:
    "Professional Frontend Developer with 3.5+ years of experience in building high-performance web applications",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts to speed up font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Font display optimization */}
        <meta name="font-display" content="optional" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <ToastProvider>
            <PerformanceOptimizer />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
