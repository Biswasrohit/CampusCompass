import { NextResponse } from "next/server";
import { filterResources, CuratedItem } from "@/lib/openrouter";
import { searchFromSuggestions } from "@/lib/tavily";
import { parseResults } from "@/lib/parse-results";
import { getSchoolByName, getLocationByName } from "@/lib/schools";
import { SCHOLARSHIP_SOURCES } from "@/lib/scholarships";
import { OPPORTUNITY_SOURCES } from "@/lib/opportunities";
import { WELLNESS_SOURCES } from "@/lib/wellness";
import { SearchRequest, Category } from "@/types";

function buildCuratedList(
  raceEthnicity: string,
  gender: string
): readonly CuratedItem[] {
  const matchesTags = (tags: readonly string[]) => {
    const matchesGeneral = tags.includes("general");
    const matchesRace = tags.some((tag) =>
      raceEthnicity.toLowerCase().includes(tag.toLowerCase())
    );
    const matchesGender = tags.some((tag) =>
      gender.toLowerCase().includes(tag.toLowerCase())
    );
    return matchesGeneral || matchesRace || matchesGender;
  };

  const items: CuratedItem[] = [];

  for (const s of SCHOLARSHIP_SOURCES) {
    if (matchesTags(s.tags)) {
      items.push({ name: s.name, domain: s.domain, category: "scholarships" as Category });
    }
  }

  for (const o of OPPORTUNITY_SOURCES) {
    if (matchesTags(o.tags)) {
      items.push({ name: o.name, domain: o.domain, category: "learning" as Category });
    }
  }

  for (const w of WELLNESS_SOURCES) {
    if (matchesTags(w.tags)) {
      items.push({ name: w.name, domain: w.domain, category: "mental-health" as Category });
    }
  }

  return items;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchRequest;

    if (!body.school || !body.gender || !body.raceEthnicity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (body.school.length > 100 || body.raceEthnicity.length > 100) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    const school = getSchoolByName(body.school);
    if (!school) {
      return NextResponse.json(
        { error: "Unknown school" },
        { status: 400 }
      );
    }

    // Get location for map center - use custom search location if provided
    const searchLocation = body.searchLocation 
      ? (getLocationByName(body.searchLocation) ?? school)
      : school;

    // Step 1: Build curated list filtered by user demographics
    const curatedItems = buildCuratedList(body.raceEthnicity, body.gender);

    // Step 2: Gemini picks the most relevant items from the curated list
    const suggestions = await filterResources(body, curatedItems);

    if (suggestions.length === 0) {
      return NextResponse.json({ resources: [] });
    }

    // Step 3: Tavily fetches real URLs for each selected resource
    const categorizedResults = await searchFromSuggestions(suggestions);
    const resources = parseResults(categorizedResults, searchLocation);

    return NextResponse.json({ resources });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search resources. Please try again." },
      { status: 500 }
    );
  }
}
