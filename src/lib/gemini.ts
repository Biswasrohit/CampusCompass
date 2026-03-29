import { Category } from "@/types";

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
