import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Search, Clock, Calendar, ArrowRightLeft, MessageSquare, ShieldCheck } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BarterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Barter Board</h1>
          <p className="text-muted-foreground">Post and view skill exchange requests</p>
        </div>

        {/* Create Request Card */}
        <Card>
          <CardHeader>
            <CardTitle>Create Exchange Request</CardTitle>
            <CardDescription>Describe what you need and what you're offering in exchange</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input id="title" placeholder="E.g., Need help with website design, offering content writing" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="looking-for" className="text-sm font-medium">
                    I'm Looking For
                  </label>
                  <Select>
                    <SelectTrigger id="looking-for">
                      <SelectValue placeholder="Select skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-design">Web Design</SelectItem>
                      <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                      <SelectItem value="graphic-design">Graphic Design</SelectItem>
                      <SelectItem value="content-writing">Content Writing</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="data-analysis">Data Analysis</SelectItem>
                      <SelectItem value="other">Other (specify in description)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="offering" className="text-sm font-medium">
                    I'm Offering
                  </label>
                  <Select>
                    <SelectTrigger id="offering">
                      <SelectValue placeholder="Select skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-design">Web Design</SelectItem>
                      <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                      <SelectItem value="graphic-design">Graphic Design</SelectItem>
                      <SelectItem value="content-writing">Content Writing</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="data-analysis">Data Analysis</SelectItem>
                      <SelectItem value="other">Other (specify in description)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="time-needed" className="text-sm font-medium">
                    Time Needed (hours)
                  </label>
                  <Input id="time-needed" type="number" min="1" placeholder="2" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="time-offered" className="text-sm font-medium">
                    Time Offered (hours)
                  </label>
                  <Input id="time-offered" type="number" min="1" placeholder="2" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need help with and what you're offering in more detail"
                  rows={4}
                />
              </div>
              <Button className="w-full sm:w-auto justify-self-end">Post Exchange Request</Button>
            </div>
          </CardContent>
        </Card>

        {/* Barter Board Listings */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <h2 className="text-2xl font-bold">Exchange Requests</h2>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search requests..." className="pl-10" />
              </div>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="urgent">Urgent First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="myskills">Matching My Skills</TabsTrigger>
              <TabsTrigger value="mine">My Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6">
                <BarterCard
                  name="Emma Wilson"
                  title="Need website redesign, offering content marketing"
                  lookingFor="Web Design"
                  offering="Content Marketing"
                  timeNeeded={5}
                  timeOffered={5}
                  description="I need help redesigning my personal website. It's currently on WordPress but needs a modern refresh. In exchange, I can provide content marketing strategy and execution, including SEO optimization and copywriting."
                  badges={["Urgent"]}
                />
                <BarterCard
                  name="Alex Kim"
                  title="Mobile app UI design for coding help"
                  lookingFor="Coding & Development"
                  offering="UI/UX Design"
                  timeNeeded={8}
                  timeOffered={10}
                  description="I'm a UI designer looking for help implementing my mobile app design in React Native. In exchange, I can offer UI/UX design work for your project, including wireframes, prototypes, and final designs."
                />
                <BarterCard
                  name="Sarah Johnson"
                  title="Video editing for social media marketing"
                  lookingFor="Social Media Marketing"
                  offering="Video Editing"
                  timeNeeded={4}
                  timeOffered={4}
                  description="I need help with marketing my YouTube channel on social media platforms. In exchange, I can offer professional video editing services for your content. I specialize in transitions, color grading, and motion graphics."
                />
                <BarterCard
                  name="Michael Brown"
                  title="Data analysis for graphic design"
                  lookingFor="Graphic Design"
                  offering="Data Analysis"
                  timeNeeded={3}
                  timeOffered={3}
                  description="I need a new logo and brand identity for my data analytics business. In exchange, I can help with data analysis, visualization, and insights for your business or project."
                  badges={["Featured"]}
                />
              </div>
            </TabsContent>

            <TabsContent value="myskills" className="mt-6">
              <div className="grid gap-6">
                <BarterCard
                  name="Emma Wilson"
                  title="Need website redesign, offering content marketing"
                  lookingFor="Web Design"
                  offering="Content Marketing"
                  timeNeeded={5}
                  timeOffered={5}
                  description="I need help redesigning my personal website. It's currently on WordPress but needs a modern refresh. In exchange, I can provide content marketing strategy and execution, including SEO optimization and copywriting."
                  badges={["Urgent", "Match"]}
                />
                <BarterCard
                  name="Michael Brown"
                  title="Data analysis for graphic design"
                  lookingFor="Graphic Design"
                  offering="Data Analysis"
                  timeNeeded={3}
                  timeOffered={3}
                  description="I need a new logo and brand identity for my data analytics business. In exchange, I can help with data analysis, visualization, and insights for your business or project."
                  badges={["Featured", "Match"]}
                />
              </div>
            </TabsContent>

            <TabsContent value="mine" className="mt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">You haven't posted any exchange requests yet.</p>
                <Button variant="link" className="mt-2">
                  Create your first request
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface BarterCardProps {
  name: string
  title: string
  lookingFor: string
  offering: string
  timeNeeded: number
  timeOffered: number
  description: string
  badges?: string[]
}

function BarterCard({
  name,
  title,
  lookingFor,
  offering,
  timeNeeded,
  timeOffered,
  description,
  badges = [],
}: BarterCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3">
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
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>Posted by {name} • 2 days ago</CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge
                key={badge}
                variant={badge === "Urgent" ? "destructive" : badge === "Match" ? "default" : "secondary"}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Looking For</p>
                <p className="text-sm text-muted-foreground">{lookingFor}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Offering</p>
                <p className="text-sm text-muted-foreground">{offering}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Time Needed</p>
                <p className="text-sm text-muted-foreground">{timeNeeded} hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Time Offered</p>
                <p className="text-sm text-muted-foreground">{timeOffered} hours</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-2">Description</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span>Fair Exchange Guaranteed</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Propose Exchange
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
