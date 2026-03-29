import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage, UserProfile, Category, ChatResponse } from "@/types";
import { SearchRequest } from "@/types";

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenerativeAI(apiKey);
}

export interface GeminiSuggestion {
  readonly query: string;
  readonly category: Category;
  readonly domain?: string;
}

export interface CuratedItem {
  readonly name: string;
  readonly domain: string;
  readonly category: Category;
}

const MAX_PER_CATEGORY = 5;

export async function filterResources(
  profile: SearchRequest,
  curatedItems: readonly CuratedItem[]
): Promise<readonly GeminiSuggestion[]> {
  const { school, gender, raceEthnicity, query } = profile;

  // Build a compact list for the prompt
  const itemList = curatedItems
    .map((item) => `- [${item.category}] ${item.name} (${item.domain})`)
    .join("\n");

  const model = getGenAI().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are a resource matcher for college students. You will receive a student profile and a curated list of resources across three categories: scholarships, mental-health, and learning.

Your job is to pick the MOST RELEVANT resources for this specific student from the provided list.

RULES:
- Pick exactly ${MAX_PER_CATEGORY} resources per category (${MAX_PER_CATEGORY * 3} total).
- If a category has fewer than ${MAX_PER_CATEGORY} items available, pick all of them.
- Prioritize resources that match the student's race/ethnicity, gender, and school when applicable, but always include broadly relevant general resources too.
- If the student provides an additional interest/query, bias your picks toward resources related to that interest.
- For each picked resource, create a specific search query that would find its official website or application page.
- The search query MUST include the exact resource name.

Respond ONLY with a JSON array. Each element must have:
- "query": a specific search query to find this resource (include the resource name)
- "category": one of "scholarships", "mental-health", or "learning"
- "domain": the domain from the provided list (e.g., "thegatesscholarship.org")

Example: [{"query": "Gates Scholarship official application 2025", "category": "scholarships", "domain": "thegatesscholarship.org"}]`,
  });

  const userContext = [
    `Student Profile:`,
    `School: ${school}`,
    `Gender: ${gender}`,
    `Race/Ethnicity: ${raceEthnicity}`,
    query ? `Additional interest: ${query}` : "",
    ``,
    `Available Resources:`,
    itemList,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await model.generateContent(userContext);
  const text = result.response.text();

  // Extract JSON from the response (handle markdown code blocks)
  const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (!jsonMatch) {
    console.error("Gemini did not return valid JSON:", text);
    return [];
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]) as Array<{
      query: string;
      category: string;
      domain?: string;
    }>;

    const validCategories = new Set(["scholarships", "mental-health", "learning"]);
    const seen = new Set<string>();

    return parsed
      .filter((item) => {
        if (!item.query || !validCategories.has(item.category)) return false;
        const key = item.query.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((item) => ({
        query: item.query.trim(),
        category: item.category as Category,
        domain: item.domain,
      }));
  } catch (e) {
    console.error("Failed to parse Gemini filter response:", e);
    return [];
  }
}

export async function chatWithGemini(
  message: string,
  history: readonly ChatMessage[],
  userProfile: UserProfile
): Promise<ChatResponse> {
  const model = getGenAI().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are a helpful assistant for ${userProfile.fullName}, a student at ${userProfile.school}. Help them find scholarships, mental health resources, and learning programs in NYC. Be concise, actionable, and encouraging. If they ask about specific programs, provide real information when possible. Keep responses under 150 words.

IMPORTANT: When the user mentions specific career interests, fields of study, or topics (e.g., "Software Engineering", "Data Science", "Nursing", "Graphic Design", "Law"), identify and extract these topics. Return your response in JSON format with two fields:
- "reply": your conversational response to the user
- "extractedTopics": an array of career/field/topic keywords extracted from the user's message (e.g., ["Software Engineering", "Computer Science"]). If no specific topics are mentioned, return an empty array.

Example response: {"reply": "That's a great field! Here are some resources...", "extractedTopics": ["Software Engineering"]}`
  });

  const chat = model.startChat({
    history: history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
  });

  const result = await chat.sendMessage(message);
  const response = result.response;
  const text = response.text();

  // Try to parse as JSON to extract topics
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as { reply: string; extractedTopics?: string[] };
      return {
        reply: parsed.reply,
        extractedTopics: parsed.extractedTopics?.filter(Boolean) ?? [],
      };
    }
  } catch {
    // Not JSON format, fall back to treating entire response as reply
  }

  return { reply: text, extractedTopics: [] };
}
