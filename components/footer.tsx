import Link from "next/link"
import { Github, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Skill Mint</h3>
            <p className="text-sm text-muted-foreground">
              A platform for trading skills and knowledge with others in your community.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-purple-400 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/barter" className="text-muted-foreground hover:text-purple-400 transition-colors">
                  Barter Board
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="text-muted-foreground hover:text-purple-400 transition-colors">
                  Skill Wallet
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-purple-400 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/your-username/skill-mint"
                  className="text-muted-foreground hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Team Members</h3>
            <div className="flex space-x-4">
              <Link href="https://linkedin.com/" className="text-muted-foreground hover:text-purple-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://instagram.com/" className="text-muted-foreground hover:text-purple-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://github.com/" className="text-muted-foreground hover:text-purple-400">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Skill Mint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
