"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter

interface NavItem {
  label: string;
  href: string;
}

interface FloatingNavbarProps {
  logo?: React.ReactNode;
  navItems: NavItem[];
  className?: string;
}

export function FloatingNavbar({
  logo,
  navItems,
  className,
}: FloatingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMobile();
  const pathname = usePathname(); // Get the current route

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-6 px-4">
      <header
        className={cn(
          "rounded-full backdrop-blur-md shadow-lg py-3 px-6 w-auto max-w-4xl transition-all duration-500",
          scrolled
            ? "bg-background/80 border border-purple-500/20 neon-border"
            : "glass-card border border-purple-500/10",
          className
        )}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="./logo.png" // Replace with your local image path
              alt="Logo"
              className="h-8 w-8 rounded-full"
              width={24}
              height={24}
              priority
            />
          </div>
          <Link
            href="/"
            className="font-bold text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text hover:underline"
          >
            Barterly
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems
              .filter((item) => item.label !== "Home") // Filter out the "Home" button
              .map((item) => (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-1 py-1 text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary" // Active link styling
                        : ""
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform origin-left transition-transform duration-300 ease-out",
                        pathname === item.href
                          ? "scale-x-100" // Keep underline for active link
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </div>
              ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block transition-transform duration-300 hover:scale-105">
              <Link
                href="/login"
                className="px-5 py-2 rounded-full glass-button text-sm font-medium"
              >
                Sign In
              </Link>
            </div>

            <div className="hidden md:block transition-transform duration-300 hover:scale-105">
              <Link
                href="/register"
                className="px-5 py-2 rounded-full enhanced-gradient text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-purple-500/20"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center text-foreground transition-transform duration-300 active:scale-90"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={cn(
              "md:hidden mt-4 pt-4 border-t border-purple-500/20",
              "transition-all duration-300 ease-in-out transform",
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            )}
          >
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium hover:text-primary hover:bg-purple-500/10 transition-colors",
                      pathname === item.href ? "text-primary" : ""
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <div className="pt-2">
                <Link
                  href="/login"
                  className="block w-full text-center px-3 py-2 rounded-full glass-button text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
              <div>
                <Link
                  href="/register"
                  className="block w-full text-center px-3 py-2 rounded-full enhanced-gradient text-primary-foreground text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get for free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
