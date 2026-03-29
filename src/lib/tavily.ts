import { tavily } from "@tavily/core";
import { Category, SearchRequest } from "@/types";

function getClient() {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error("TAVILY_API_KEY is not configured");
  }
  return tavily({ apiKey });
}

interface TavilyResult {
  readonly title: string;
  readonly url: string;
  readonly content: string;
}

export interface CategorizedResults {
  readonly category: Category;
  readonly results: readonly TavilyResult[];
}

function buildQueries(profile: SearchRequest): readonly string[] {
  const { school, raceEthnicity, query } = profile;

  const queries = [
    `${school} scholarships financial aid ${raceEthnicity !== "Prefer not to say" ? raceEthnicity : ""} students 2026`,
    `free mental health counseling wellness resources NYC college students near ${school}`,
    `food pantry food assistance free meals NYC college students near ${school}`,
    `affordable student housing housing assistance NYC college students near ${school}`,
    `career prep internship mentorship programs NYC college students ${school}`,
  ];

  if (query) {
    return [...queries, `${query} ${school} NYC students`];
  }

  return queries;
}

export async function searchResources(
  profile: SearchRequest
): Promise<readonly CategorizedResults[]> {
  const queries = buildQueries(profile);
  const categories: readonly Category[] = [
    "scholarships",
    "mental-health",
    "food-security",
    "housing",
    "career-prep",
  ];

  const results = await Promise.allSettled(
    queries.map((query) =>
      getClient().search(query, { searchDepth: "basic", maxResults: 5 })
    )
  );

  return results
    .map((result, index) => {
      if (result.status === "rejected") {
        return {
          category: categories[Math.min(index, categories.length - 1)],
          results: [] as readonly TavilyResult[],
        };
      }

      return {
        category: categories[Math.min(index, categories.length - 1)],
        results: (result.value.results ?? []).map(
          (r: { title: string; url: string; content: string }) => ({
            title: r.title,
            url: r.url,
            content: r.content,
          })
        ),
      };
    })
    .filter((r) => r.results.length > 0);
}
