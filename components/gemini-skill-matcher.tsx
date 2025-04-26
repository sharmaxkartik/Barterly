"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Sparkles } from "lucide-react"
import { SkillCard } from "@/components/skill-card"
import { recommendSkills } from "@/app/actions/recommend-skills"
import type { RecommendSkillsOutput } from "@/app/actions/recommend-skills"

export function GeminiSkillMatcher() {
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [matches, setMatches] = useState<RecommendSkillsOutput["skills"]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchInput.trim()) return

    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const result = await recommendSkills({ prompt: searchInput })
      setMatches(result.skills)
    } catch (err) {
      console.error("Error finding matches:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setMatches([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-purple-500/20 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
          Gemini AI Skill Matching
        </CardTitle>
        <CardDescription>
          Let our AI find the perfect skill match for you based on your needs and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="What skill are you looking for? (e.g., 'I need help with logo design')"
                className="pl-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchInput.trim()}
              className="purple-gradient text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Finding matches...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Find Matches</span>
                </div>
              )}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">{error}</div>
          )}

          {hasSearched && !isLoading && matches.length === 0 && !error && (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">No matches found. Try a different search term.</p>
            </div>
          )}

          {matches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Gemini-Recommended Matches
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((skill, index) => (
                  <SkillCard
                    key={index}
                    name={skill.name}
                    title={skill.title}
                    description={skill.description}
                    rating={skill.rating}
                    reviews={skill.reviews}
                    hourlyRate={skill.hourlyRate}
                    badge={skill.badge}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
