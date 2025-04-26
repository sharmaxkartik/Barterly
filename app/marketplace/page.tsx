import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Clock, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Marketplace() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Skill Marketplace</h1>
          <p className="text-muted-foreground">Find skills to trade or offer your expertise</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for skills..." className="pl-10" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
            <TabsTrigger value="all">All Skills</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Skill Cards */}
              <SkillCard
                name="David Kim"
                title="Web Development"
                description="Frontend development with React, Next.js, and Tailwind CSS"
                rating={4.9}
                reviews={24}
                hourlyRate="2 hours"
                badge="Popular"
              />
              <SkillCard
                name="Jessica Chen"
                title="Logo Design"
                description="Professional logo design for your brand or business"
                rating={4.7}
                reviews={18}
                hourlyRate="3 hours"
              />
              <SkillCard
                name="Michael Brown"
                title="Data Analysis"
                description="Data analysis using Python, R, and visualization tools"
                rating={4.8}
                reviews={12}
                hourlyRate="2 hours"
                badge="New"
              />
              <SkillCard
                name="Sarah Johnson"
                title="Content Writing"
                description="SEO-optimized blog posts, articles, and website content"
                rating={4.6}
                reviews={9}
                hourlyRate="4 hours"
              />
              <SkillCard
                name="Alex Martinez"
                title="Mobile App Development"
                description="Native and cross-platform mobile app development"
                rating={4.9}
                reviews={15}
                hourlyRate="3 hours"
                badge="Trending"
              />
              <SkillCard
                name="Emma Wilson"
                title="Social Media Marketing"
                description="Strategy and content creation for social media channels"
                rating={4.7}
                reviews={21}
                hourlyRate="2 hours"
              />
            </div>
          </TabsContent>

          {/* Other tab contents would be similar but with filtered skills */}
          <TabsContent value="development" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard
                name="David Kim"
                title="Web Development"
                description="Frontend development with React, Next.js, and Tailwind CSS"
                rating={4.9}
                reviews={24}
                hourlyRate="2 hours"
                badge="Popular"
              />
              <SkillCard
                name="Alex Martinez"
                title="Mobile App Development"
                description="Native and cross-platform mobile app development"
                rating={4.9}
                reviews={15}
                hourlyRate="3 hours"
                badge="Trending"
              />
              <SkillCard
                name="Michael Brown"
                title="Data Analysis"
                description="Data analysis using Python, R, and visualization tools"
                rating={4.8}
                reviews={12}
                hourlyRate="2 hours"
                badge="New"
              />
            </div>
          </TabsContent>

          {/* Other tabs content - would be similar structure but with filtered data */}
          <TabsContent value="design" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard
                name="Jessica Chen"
                title="Logo Design"
                description="Professional logo design for your brand or business"
                rating={4.7}
                reviews={18}
                hourlyRate="3 hours"
              />
            </div>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="marketing" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard
                name="Emma Wilson"
                title="Social Media Marketing"
                description="Strategy and content creation for social media channels"
                rating={4.7}
                reviews={21}
                hourlyRate="2 hours"
              />
            </div>
          </TabsContent>

          <TabsContent value="business" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No business skills available at the moment.</p>
              <Button variant="link" className="mt-2">
                Be the first to offer business skills
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="other" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No other skills available at the moment.</p>
              <Button variant="link" className="mt-2">
                Be the first to offer other skills
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Matching */}
        <Card className="bg-muted/50 border border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full bg-primary animate-pulse" />
              AI Skill Matching
            </CardTitle>
            <CardDescription>
              Let our AI find the perfect skill match for you based on your needs and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input placeholder="What skill are you looking for?" className="flex-1" />
              <Button>Find Matches</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface SkillCardProps {
  name: string
  title: string
  description: string
  rating: number
  reviews: number
  hourlyRate: string
  badge?: string
}

function SkillCard({ name, title, description, rating, reviews, hourlyRate, badge }: SkillCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
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
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{name}</p>
            </div>
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{hourlyRate}</span>
        </div>
      </CardFooter>
      <div className="pt-0 px-6 pb-6">
        <Link href="/marketplace/skill-details">
          <Button className="w-full" variant="secondary">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  )
}
