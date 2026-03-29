import { ChatMessage, UserProfile } from "@/types";

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

export async function chatWithOpenRouter(
  message: string,
  history: readonly ChatMessage[],
  userProfile: UserProfile
): Promise<string> {
  const apiKey = getOpenRouterApiKey();
  const model = process.env.OPENROUTER_MODEL ?? "openrouter/free";

  const messages = [
    { role: "system", content: buildSystemPrompt(userProfile) },
    ...history.map((msg) => ({ role: msg.role, content: msg.content })),
    { role: "user", content: message },
  ];

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
    body: JSON.stringify({
      model,
      messages,
    }),
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
