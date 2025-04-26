import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Clock } from "lucide-react"

interface SkillCardProps {
  name: string
  title: string
  description: string
  rating: number
  reviews: number
  hourlyRate: string
  badge?: string
}

export function SkillCard({ name, title, description, rating, reviews, hourlyRate, badge }: SkillCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:shadow-purple-500/10 bg-background/50 backdrop-blur-sm border-purple-500/20">
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
            <Badge
              variant="secondary"
              className={`text-xs ${badge === "Popular" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : ""}`}
            >
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
          <Star className="h-4 w-4 text-purple-500 fill-purple-500" />
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
