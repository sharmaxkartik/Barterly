import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About Skill Mint</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A hackathon project created by our team to revolutionize skill trading and knowledge exchange.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Team Member 1" />
                  <AvatarFallback>TM1</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">Team Member 1</CardTitle>
                <CardDescription>Frontend Developer</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Passionate about creating intuitive user interfaces and seamless experiences.</p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Link href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Team Member 2 */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Team Member 2" />
                  <AvatarFallback>TM2</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">Team Member 2</CardTitle>
                <CardDescription>Backend Developer</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Specializes in building robust and scalable backend systems.</p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Link href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Team Member 3 */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Team Member 3" />
                  <AvatarFallback>TM3</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">Team Member 3</CardTitle>
                <CardDescription>UI/UX Designer</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Creates beautiful designs with a focus on user experience and accessibility.</p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Link href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Team Member 4 */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Team Member 4" />
                  <AvatarFallback>TM4</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">Team Member 4</CardTitle>
                <CardDescription>Project Manager</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Coordinates the team and ensures the project stays on track to meet deadlines.</p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Link href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Our Project</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              Skill Mint was created during the [Hackathon Name] hackathon. Our goal was to create a platform that
              allows people to trade skills and knowledge without monetary exchange, fostering community and
              collaboration.
            </p>
            <div className="flex justify-center">
              <Link href="https://github.com/your-username/skill-mint" target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
