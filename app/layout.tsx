import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import { FloatingNavbar } from "@/components/floating-navbar"
import { Stars } from "@/components/stars"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skill Mint | Trade Skills, Grow Together",
  description: "A platform where users trade skills like hours of graphic design for hours of coding help",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Barter", href: "/barter" },
    { label: "Sessions", href: "/sessions" },
    { label: "Wallet", href: "/wallet" },
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col relative`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {/* Stars background for all pages */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <Stars count={150} />
          </div>

          <FloatingNavbar navItems={navItems} />
          <div className="pt-24">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
