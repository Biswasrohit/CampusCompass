import type { Category } from "@/types";

export interface CategorySavingsEstimate {
  readonly value: number;
  readonly label: string;
  readonly rationale: string;
}

export const CATEGORY_SAVINGS_ESTIMATES: Record<Category, CategorySavingsEstimate> = {
  scholarships: {
    value: 7500,
    label: "Avg. scholarship value",
    rationale: "Average scholarship ranges $5,000–$10,000",
  },
  "mental-health": {
    value: 150,
    label: "Therapy session cost saved",
    rationale: "Average cost of one therapy session",
  },
  "food-security": {
    value: 200,
    label: "Monthly food assistance",
    rationale: "Average monthly food pantry/assistance value",
  },
  housing: {
    value: 500,
    label: "Monthly housing assistance",
    rationale: "Average monthly housing subsidy value",
  },
  "career-prep": {
    value: 1000,
    label: "Career program value",
    rationale: "Average career coaching/program value",
  },
};
