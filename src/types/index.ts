export type Category =
  | "scholarships"
  | "mental-health"
  | "food-security"
  | "housing"
  | "career-prep";

export interface UserProfile {
  readonly fullName: string;
  readonly school: string;
  readonly gender: string;
  readonly raceEthnicity: string;
}

export interface SchoolInfo {
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}

export interface Resource {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly category: Category;
  readonly lat: number;
  readonly lng: number;
  readonly location: string;
  readonly date: string | null;
}

export interface ChatMessage {
  readonly role: "user" | "assistant";
  readonly content: string;
}

export interface SearchRequest {
  readonly school: string;
  readonly gender: string;
  readonly raceEthnicity: string;
  readonly query?: string;
  readonly searchLocation?: string;
}

export interface ChatRequest {
  readonly message: string;
  readonly history: readonly ChatMessage[];
  readonly userProfile: UserProfile;
}

export interface ChatResponse {
  readonly reply: string;
  readonly extractedTopics?: readonly string[];
}

export const CATEGORY_COLORS: Record<Category, string> = {
  scholarships: "#4E4FB5",
  "mental-health": "#6B4C6E",
  "food-security": "#8E3043",
  housing: "#4A4A5E",
  "career-prep": "#2A5C8F",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  scholarships: "Scholarship",
  "mental-health": "Wellness",
  "food-security": "Food",
  housing: "Housing",
  "career-prep": "Career",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  scholarships: "school",
  "mental-health": "psychology",
  "food-security": "restaurant",
  housing: "home_work",
  "career-prep": "work",
};

export const CATEGORY_FULL_LABELS: Record<Category, string> = {
  scholarships: "Scholarships",
  "mental-health": "Mental Health",
  "food-security": "Food Security",
  housing: "Housing",
  "career-prep": "Career Prep",
};
