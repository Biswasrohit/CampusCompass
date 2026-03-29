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
  scholarships: "#494adb",
  "mental-health": "#745479",
  "food-security": "#a8364b",
  housing: "#5d5d72",
  "career-prep": "#3c3ccf",
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
