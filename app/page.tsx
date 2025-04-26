import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Instagram, ArrowRight, Star } from "lucide-react";
import { Hero } from "@/components/hero";
import { DashboardPreview } from "@/components/dashboard-preview";

const teamMembers = [
  {
    name: "Kartik Sharma",
    role: "Frontend Developer",
    photo: "/kartik.jpg", // Updated path
    description: "Passionate about creating intuitive user interfaces.",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/",
    instagram: "https://instagram.com/",
  },
  {
    name: "Kuldeep Singh Bhadouriya",
    role: "Backend Developer",
    photo: "/kuldeep.jpg", // Updated path
    description: "Specializes in building robust backend systems.",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/",
    instagram: "https://instagram.com/",
  },
  {
    name: "Priyanshi Singh Parihar",
    role: "UI/UX Designer",
    photo: "/priyanshi.jpg",
    description: "Creates beautiful designs with a focus on user experience.",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/",
    instagram: "https://instagram.com/",
  },
  {
    name: "Satwik Somawanashi",
    role: "Project Manager",
    photo: "/satwik.jpg",
    description: "Coordinates the team and ensures the project stays on track.",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/",
    instagram: "https://instagram.com/",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] relative">
      <div className="absolute inset-0 -z-10 overflow-hidden"></div>

      <Hero />

      <DashboardPreview />

      {/* Keep the rest of the original homepage content */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                How Skill Mint Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform makes it easy to trade skills and knowledge with
                others in your community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="bg-background/50 backdrop-blur-sm border-purple-500/20 rounded-lg p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 mb-4">
                <svg
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Skill Wallet</h3>
              <p className="text-muted-foreground">
                Track your skill hours and manage your transactions in one
                place.
              </p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border-purple-500/20 rounded-lg p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 mb-4">
                <svg
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.5 9.4 7.55 4.24" />
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <path d="M3.29 7 12 12l8.71-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Skill Marketplace</h3>
              <p className="text-muted-foreground">
                Browse and discover skills offered by people in your community.
              </p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border-purple-500/20 rounded-lg p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 mb-4">
                <svg
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Sessions</h3>
              <p className="text-muted-foreground">
                Conduct live skill-sharing sessions with video conferencing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from people who have transformed their skills through our
                platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="bg-background/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Alex Johnson"
                    />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Alex Johnson</CardTitle>
                    <CardDescription>Web Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "I traded my web development skills for graphic design help.
                  Now my projects look amazing, and I've made a great
                  connection!"
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex text-purple-500">
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                </div>
              </CardFooter>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Sarah Lee"
                    />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Sarah Lee</CardTitle>
                    <CardDescription>UI/UX Designer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Found a copywriter to help with my website content in
                  exchange for UI design. The process was smooth and beneficial
                  for both of us."
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex text-purple-500">
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                </div>
              </CardFooter>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Michael Brown"
                    />
                    <AvatarFallback>MB</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Michael Brown</CardTitle>
                    <CardDescription>Data Analyst</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Exchanged data analysis for SEO expertise. My website traffic
                  improved, and I got to practice my skills. Win-win!"
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex text-purple-500">
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                  <Star className="h-4 w-4 fill-purple-500" />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                About Our Team
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet the team behind Skill Mint, created for the hackathon
                project.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-background/50 backdrop-blur-sm border-purple-500/20"
              >
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={member.photo} alt={member.name} />
                    <AvatarFallback>
                      {member.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  <p>{member.description}</p>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-purple-500 hover:text-purple-400"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-purple-500 hover:text-purple-400"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-purple-500 hover:text-purple-400"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Start Trading Skills?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community today and start exchanging skills with
                others.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="purple-gradient text-white purple-glow gap-1"
                >
                  Register
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline">
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
