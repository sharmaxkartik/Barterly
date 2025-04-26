"use server"
/**
 * @fileOverview A skill recommendation AI agent.
 *
 * - recommendSkills - A function that handles the skill recommendation process.
 * - RecommendSkillsInput - The input type for the recommendSkills function.
 * - RecommendSkillsOutput - The return type for the recommendSkills function.
 */

import { ai } from "@/ai/ai-instance"
import { z } from "genkit"

const RecommendSkillsInputSchema = z.object({
  prompt: z.string().describe("The user prompt describing their needs or interests."),
})
export type RecommendSkillsInput = z.infer<typeof RecommendSkillsInputSchema>

const RecommendSkillsOutputSchema = z.object({
  skills: z
    .array(
      z.object({
        name: z.string().describe("Person's Name"),
        title: z.string().describe("Skill Title"),
        description: z.string().describe("Detailed description"),
        rating: z.number().min(4.5).max(5.0).describe("Rating (between 4.5 and 5.0)"),
        reviews: z.number().int().min(5).max(30).describe("Number of reviews (between 5 and 30)"),
        hourlyRate: z.string().describe("Hourly rate (in hours, between 1-5 hours)"),
        badge: z
          .string()
          .optional()
          .describe('A relevant badge for some skills (like "Popular", "New", or "Trending")'),
      }),
    )
    .describe("An array of recommended skills."),
})
export type RecommendSkillsOutput = z.infer<typeof RecommendSkillsOutputSchema>

export async function recommendSkills(input: RecommendSkillsInput): Promise<RecommendSkillsOutput> {
  return recommendSkillsFlow(input)
}

const prompt = ai.definePrompt({
  name: "recommendSkillsPrompt",
  input: {
    schema: z.object({
      prompt: z.string().describe("The user prompt describing their needs or interests."),
    }),
  },
  output: {
    schema: z.object({
      skills: z
        .array(
          z.object({
            name: z.string().describe("Person's Name"),
            title: z.string().describe("Skill Title"),
            description: z.string().describe("Detailed description"),
            rating: z.number().min(4.5).max(5.0).describe("Rating (between 4.5 and 5.0)"),
            reviews: z.number().int().min(5).max(30).describe("Number of reviews (between 5 and 30)"),
            hourlyRate: z.string().describe("Hourly rate (in hours, between 1-5 hours)"),
            badge: z
              .string()
              .optional()
              .describe('A relevant badge for some skills (like "Popular", "New", or "Trending")'),
          }),
        )
        .describe("An array of recommended skills."),
    }),
  },
  prompt: `You are an AI skill matching assistant for a skill trading platform called Skill Mint.
Based on the user's request, suggest relevant skills that would match their needs.
For each skill, provide:
1. A name for the person offering the skill
2. The skill title
3. A detailed description of the skill
4. A rating (between 4.5 and 5.0)
5. Number of reviews (between 5 and 30)
6. Hourly rate (in hours, between 1-5 hours)
7. A relevant badge for some skills (like "Popular", "New", or "Trending")

Return the results as a JSON array with 3-5 skills. Each skill should have these properties:
{
  "name": "Person's Name",
  "title": "Skill Title",
  "description": "Detailed description",
  "rating": 4.8,
  "reviews": 15,
  "hourlyRate": "2 hours",
  "badge": "Popular" (optional)
}

User request: {{{prompt}}}`,
})

const recommendSkillsFlow = ai.defineFlow<typeof RecommendSkillsInputSchema, typeof RecommendSkillsOutputSchema>(
  {
    name: "recommendSkillsFlow",
    inputSchema: RecommendSkillsInputSchema,
    outputSchema: RecommendSkillsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input)
    return output!
  },
)
