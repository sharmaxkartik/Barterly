import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, Edit, MessageSquare, Clock, ArrowUpRight, Award, Bookmark, CheckCircle } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="relative pt-6 pb-4">
              <div className="absolute right-6 top-6">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">John Doe</CardTitle>
                <CardDescription>UX Designer & Web Developer</CardDescription>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-xs text-muted-foreground">(32 reviews)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-3 gap-4 py-4">
                <div>
                  <div className="text-lg font-bold">42</div>
                  <div className="text-xs text-muted-foreground">Skills Traded</div>
                </div>
                <div>
                  <div className="text-lg font-bold">124</div>
                  <div className="text-xs text-muted-foreground">Hours Given</div>
                </div>
                <div>
                  <div className="text-lg font-bold">118</div>
                  <div className="text-xs text-muted-foreground">Hours Received</div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <Button size="sm" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Request Time
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skill Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Skill Balance</span>
                    <span className="text-sm font-medium">6 hours</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="bg-muted rounded-md p-3">
                  <div className="flex justify-between text-sm">
                    <span>This month</span>
                    <span className="font-medium">+12h / -18h</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs" size="sm">
                  View Transaction History
                  <ArrowUpRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs mt-1">Pro</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs mt-1">Top Rated</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="skills">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Skills</h2>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Skills
                </Button>
              </div>

              <div className="grid gap-4">
                <SkillCard
                  title="UX/UI Design"
                  description="User experience design, user interface design, wireframing, prototyping, user research"
                  level="Expert"
                  hourRate="2 hours"
                  available={true}
                />
                <SkillCard
                  title="Front-end Development"
                  description="HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, responsive design"
                  level="Advanced"
                  hourRate="3 hours"
                  available={true}
                />
                <SkillCard
                  title="Graphic Design"
                  description="Logo design, brand identity, social media graphics, print design"
                  level="Intermediate"
                  hourRate="2 hours"
                  available={false}
                />
              </div>

              <div className="flex justify-between items-center mt-8">
                <h2 className="text-xl font-semibold">Skills I'm Looking For</h2>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit List
                </Button>
              </div>

              <div className="grid gap-4">
                <WantedSkillCard
                  title="Mobile App Development"
                  description="Looking for someone who can help with React Native or Flutter development"
                  urgency="Medium"
                />
                <WantedSkillCard
                  title="SEO & Content Marketing"
                  description="Need help with optimizing my portfolio website and content strategy"
                  urgency="High"
                />
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Portfolio</h2>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Portfolio
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <PortfolioCard
                  title="E-commerce Redesign"
                  category="UI/UX Design"
                  imageUrl="/placeholder.svg?height=200&width=300"
                />
                <PortfolioCard
                  title="Finance Dashboard"
                  category="Front-end Development"
                  imageUrl="/placeholder.svg?height=200&width=300"
                />
                <PortfolioCard
                  title="Travel App"
                  category="Mobile Design"
                  imageUrl="/placeholder.svg?height=200&width=300"
                />
                <PortfolioCard
                  title="Brand Identity"
                  category="Graphic Design"
                  imageUrl="/placeholder.svg?height=200&width=300"
                />
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                  <span className="font-bold">4.8</span>
                  <span className="text-sm text-muted-foreground">(32)</span>
                </div>
              </div>

              <div className="grid gap-4">
                <ReviewCard
                  name="Sarah Johnson"
                  date="2 weeks ago"
                  rating={5}
                  review="John was incredibly helpful with redesigning our company website. His UX skills are top-notch, and he was very responsive to feedback."
                />
                <ReviewCard
                  name="Michael Brown"
                  date="1 month ago"
                  rating={4}
                  review="Great experience working with John on our React project. He delivered high-quality code and was a pleasure to collaborate with."
                />
                <ReviewCard
                  name="Emily Chen"
                  date="2 months ago"
                  rating={5}
                  review="John helped me revamp my portfolio site and provided valuable insights on improving user experience. Would definitely work with him again!"
                />
              </div>
            </TabsContent>

            <TabsContent value="endorsements" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Endorsements</h2>
                <Button variant="outline" size="sm">
                  Request Endorsement
                </Button>
              </div>

              <div className="grid gap-4">
                <EndorsementCard
                  name="Alex Martinez"
                  role="Senior Product Designer"
                  skill="UX/UI Design"
                  endorsement="John has exceptional UX design skills. His ability to understand user needs and translate them into intuitive interfaces is impressive."
                />
                <EndorsementCard
                  name="Jessica Wong"
                  role="Frontend Developer"
                  skill="React Development"
                  endorsement="I've worked with John on several projects, and his React skills are excellent. He writes clean, maintainable code and is great at solving complex UI challenges."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface SkillCardProps {
  title: string
  description: string
  level: string
  hourRate: string
  available: boolean
}

function SkillCard({ title, description, level, hourRate, available }: SkillCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant={available ? "default" : "secondary"}>{available ? "Available" : "Unavailable"}</Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{level}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{hourRate}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

interface WantedSkillCardProps {
  title: string
  description: string
  urgency: string
}

function WantedSkillCard({ title, description, urgency }: WantedSkillCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant={urgency === "High" ? "destructive" : "secondary"}>{urgency} Urgency</Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end pt-0">
        <Button size="sm" variant="secondary">
          <Bookmark className="mr-2 h-4 w-4" />
          Find Matches
        </Button>
      </CardFooter>
    </Card>
  )
}

interface PortfolioCardProps {
  title: string
  category: string
  imageUrl: string
}

function PortfolioCard({ title, category, imageUrl }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardContent>
    </Card>
  )
}

interface ReviewCardProps {
  name: string
  date: string
  rating: number
  review: string
}

function ReviewCard({ name, date, rating, review }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{name}</CardTitle>
              <CardDescription>{date}</CardDescription>
            </div>
          </div>
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                />
              ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{review}</p>
      </CardContent>
    </Card>
  )
}

interface EndorsementCardProps {
  name: string
  role: string
  skill: string
  endorsement: string
}

function EndorsementCard({ name, role, skill, endorsement }: EndorsementCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Badge className="mb-2">{skill}</Badge>
        <p className="text-sm text-muted-foreground">{endorsement}</p>
      </CardContent>
    </Card>
  )
}
