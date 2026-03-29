import { ChatMessage, UserProfile, ChatResponse } from "@/types";
import { GeminiSuggestion, CuratedItem } from "@/lib/gemini";
export type { CuratedItem };
import { SearchRequest } from "@/types";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

class OpenRouterApiError extends Error {
  readonly status: number;
  readonly retryAfterSeconds: number | null;

  constructor(message: string, status: number, retryAfterSeconds: number | null) {
    super(message);
    this.name = "OpenRouterApiError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

type OpenRouterTextContent = {
  readonly type?: string;
  readonly text?: string;
};

type OpenRouterMessage = {
  readonly content?: string | readonly OpenRouterTextContent[];
};

type OpenRouterChoice = {
  readonly message?: OpenRouterMessage;
};

type OpenRouterResponse = {
  readonly choices?: readonly OpenRouterChoice[];
  readonly model?: string;
  readonly error?: {
    readonly message?: string;
  };
};

function getOpenRouterApiKey() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }
  return apiKey;
}

function buildSystemPrompt(userProfile: UserProfile) {
  return `You are a helpful assistant for ${userProfile.fullName}, a student at ${userProfile.school}. Help them find scholarships, mental health resources, learning programs, food, and other resources in NYC.

Formatting rules — follow these strictly:
- Lead with a ONE sentence intro (or skip it if the list speaks for itself)
- Use bullet points (- ) for every recommendation or piece of info
- **Bold** names, addresses, and key details within bullets
- 2-4 bullets max per response
- Each bullet: name, one useful detail (hours, cost, distance, what it offers), and address if relevant
- Never write paragraphs — bullets only after the intro line
- Keep total response under 120 words`;
}

function extractReplyText(data: OpenRouterResponse): string {
  const content = data.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    const merged = content
      .map((part) => (typeof part.text === "string" ? part.text : ""))
      .join("")
      .trim();

    if (merged.length > 0) {
      return merged;
    }
  }

  throw new Error("OpenRouter returned an empty response");
}

function parseRetryAfterSeconds(header: string | null): number | null {
  if (!header) {
    return null;
  }

  const numeric = Number.parseInt(header, 10);
  if (Number.isFinite(numeric) && numeric > 0) {
    return numeric;
  }

  return null;
}

async function callOpenRouter(
  messages: { role: string; content: string }[]
): Promise<string> {
  const apiKey = getOpenRouterApiKey();
  const model = process.env.OPENROUTER_MODEL ?? "openrouter/free";

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  if (process.env.OPENROUTER_SITE_URL) {
    headers["HTTP-Referer"] = process.env.OPENROUTER_SITE_URL;
  }

  if (process.env.OPENROUTER_APP_NAME) {
    headers["X-Title"] = process.env.OPENROUTER_APP_NAME;
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ model, messages }),
  });

  const data = (await response.json().catch(() => null)) as OpenRouterResponse | null;
  if (!response.ok) {
    const status = response.status;
    const providerMessage =
      data?.error?.message ?? `OpenRouter request failed with status ${status}`;
    const retryAfterSeconds = parseRetryAfterSeconds(
      response.headers.get("retry-after")
    );
    throw new OpenRouterApiError(providerMessage, status, retryAfterSeconds);
  }

  if (!data) {
    throw new Error("OpenRouter returned an invalid response body");
  }

  return extractReplyText(data);
}

const MAX_PER_CATEGORY = 5;

export async function filterResources(
  profile: SearchRequest,
  curatedItems: readonly CuratedItem[]
): Promise<readonly GeminiSuggestion[]> {
  const { school, gender, raceEthnicity, query } = profile;

  const itemList = curatedItems
    .map((item) => `- [${item.category}] ${item.name} (${item.domain})`)
    .join("\n");

  const systemPrompt = `You are a resource matcher for college students. You will receive a student profile and a curated list of resources across three categories: scholarships, mental-health, and learning.

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

Example: [{"query": "Gates Scholarship official application 2025", "category": "scholarships", "domain": "thegatesscholarship.org"}]`;

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

  const text = await callOpenRouter([
    { role: "system", content: systemPrompt },
    { role: "user", content: userContext },
  ]);

  const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (!jsonMatch) {
    console.error("OpenRouter did not return valid JSON:", text);
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
        category: item.category as GeminiSuggestion["category"],
        domain: item.domain,
      }));
  } catch (e) {
    console.error("Failed to parse OpenRouter filter response:", e);
    return [];
  }
}

export async function chatWithOpenRouter(
  message: string,
  history: readonly ChatMessage[],
  userProfile: UserProfile
): Promise<ChatResponse> {
  const systemPrompt = buildSystemPrompt(userProfile) + `

IMPORTANT: When the user mentions specific career interests, fields of study, or topics (e.g., "Software Engineering", "Data Science", "Nursing", "Graphic Design", "Law"), identify and extract these topics. Return your response in JSON format with two fields:
- "reply": your conversational response to the user
- "extractedTopics": an array of career/field/topic keywords extracted from the user's message (e.g., ["Software Engineering", "Computer Science"]). If no specific topics are mentioned, return an empty array.

Example response: {"reply": "That's a great field! Here are some resources...", "extractedTopics": ["Software Engineering"]}`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((msg) => ({ role: msg.role as string, content: msg.content })),
    { role: "user", content: message },
  ];

  const text = await callOpenRouter(messages);

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
    // Not JSON, fall back
  }

  return { reply: text, extractedTopics: [] };
}
