import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Logo from "./logo"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/marketplace" className="text-sm font-medium transition-colors hover:text-primary">
            Marketplace
          </Link>
          <Link href="/barter" className="text-sm font-medium transition-colors hover:text-primary">
            Barter Board
          </Link>
          <Link href="/sessions" className="text-sm font-medium transition-colors hover:text-primary">
            Live Sessions
          </Link>
          <Link href="/wallet" className="text-sm font-medium transition-colors hover:text-primary">
            Skill Wallet
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="purple-gradient text-white">
                Get for free
              </Button>
            </Link>
          </div>
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/marketplace" className="text-sm font-medium transition-colors hover:text-primary">
                  Marketplace
                </Link>
                <Link href="/barter" className="text-sm font-medium transition-colors hover:text-primary">
                  Barter Board
                </Link>
                <Link href="/sessions" className="text-sm font-medium transition-colors hover:text-primary">
                  Live Sessions
                </Link>
                <Link href="/wallet" className="text-sm font-medium transition-colors hover:text-primary">
                  Skill Wallet
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full purple-gradient text-white">Get for free</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
