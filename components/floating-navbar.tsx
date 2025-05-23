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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useMobile();
  const pathname = usePathname();

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Handle scroll effect with smooth transition
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-6 px-4">
      <header
        className={cn(
          "rounded-full backdrop-blur-md shadow-lg py-3 px-6 w-auto max-w-4xl transition-all duration-500",
          scrolled
            ? "bg-background/90 border border-purple-500/30 neon-border shadow-purple-500/20"
            : "glass-card border border-purple-500/10 shadow-purple-500/5",
          "hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-300",
          className
        )}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo with animation */}
          <div className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-full p-1 transition-all duration-300 group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Image
                src="./logo.png"
                alt="Logo"
                className="h-8 w-8 rounded-full transition-transform duration-300 group-hover:rotate-12"
                width={24}
                height={24}
                priority
              />
            </div>
            <Link
              href="/"
              className="font-bold text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text hover:underline transition-all duration-300 hover:scale-105"
            >
              Barterly
            </Link>
          </div>

          {/* Desktop Navigation with enhanced animations */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems
              .filter((item) => item.label !== "Home")
              .map((item) => (
                <div
                  key={item.href}
                  className="group relative"
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-1 py-1 text-sm font-medium transition-all duration-300",
                      pathname === item.href
                        ? "text-primary scale-110"
                        : "text-foreground/80 hover:text-primary hover:scale-105"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform origin-left transition-all duration-300 ease-out",
                        pathname === item.href || hoveredItem === item.href
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      )}
                    />
                  </Link>
                </div>
              ))}
          </nav>

          {/* Action Buttons with enhanced animations */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link
                href="/login"
                className="relative px-5 py-2 rounded-full glass-button text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group overflow-hidden"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-full border border-purple-500/20 group-hover:border-purple-500/40 transition-colors duration-300" />
              </Link>
            </div>

            <div className="hidden md:block">
              <Link
                href="/register"
                className="relative px-5 py-2 rounded-full enhanced-gradient text-primary-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group overflow-hidden"
              >
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-full border border-purple-500/30 group-hover:border-purple-500/50 transition-colors duration-300" />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button with enhanced animation */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center text-foreground transition-all duration-300 hover:scale-110 active:scale-95 group"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative p-2 rounded-full transition-all duration-300 group-hover:bg-purple-500/10">
                {mobileMenuOpen ? (
                  <X
                    size={24}
                    className="transform rotate-180 transition-transform duration-300"
                  />
                ) : (
                  <Menu
                    size={24}
                    className="transition-transform duration-300"
                  />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with enhanced animations */}
        {mobileMenuOpen && (
          <div
            className={cn(
              "md:hidden mt-4 pt-4 border-t border-purple-500/20",
              "transition-all duration-500 ease-out transform",
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            )}
          >
            <nav className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  className="transform transition-all duration-300"
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                      "hover:text-primary hover:bg-purple-500/10 hover:scale-105",
                      pathname === item.href
                        ? "text-primary bg-purple-500/10"
                        : ""
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <div className="pt-2 space-y-2">
                <Link
                  href="/login"
                  className="relative block w-full text-center px-3 py-2 rounded-full glass-button text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group overflow-hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-full border border-purple-500/20 group-hover:border-purple-500/40 transition-colors duration-300" />
                </Link>
                <Link
                  href="/register"
                  className="relative block w-full text-center px-3 py-2 rounded-full enhanced-gradient text-primary-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group overflow-hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">Get for free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-full border border-purple-500/30 group-hover:border-purple-500/50 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

// Add keyframes for animations
const styles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
