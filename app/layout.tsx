import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import Footer from "@/components/footer";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Stars } from "@/components/stars";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barterly | Trade Skills, Grow Together",
  description:
    "A platform where users trade skills like hours of graphic design for hours of coding help",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(inter); // Debugging to ensure `inter` is defined

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Barter", href: "/barter" },
    { label: "Sessions", href: "/sessions" },
    { label: "Wallet", href: "/wallet" },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add favicon */}
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${
          inter?.className || ""
        } bg-background text-foreground min-h-screen flex flex-col relative`}
      >
        <ThemeProviderWrapper>
          {/* Stars background for all pages */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <Stars count={150} />
          </div>

          <FloatingNavbar navItems={navItems} />
          <div className="pt-24">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
