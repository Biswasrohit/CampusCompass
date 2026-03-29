"use client";

import {
  Category,
  CATEGORY_COLORS,
  CATEGORY_FULL_LABELS,
  CATEGORY_ICONS,
} from "@/types";

interface FilterPanelProps {
  readonly activeFilters: ReadonlySet<Category>;
  readonly onToggle: (category: Category) => void;
}

const CATEGORIES: readonly Category[] = [
  "scholarships",
  "mental-health",
  "food-security",
  "housing",
  "career-prep",
];

export default function FilterPanel({
  activeFilters,
  onToggle,
}: FilterPanelProps) {
  return (
    <div className="flex h-full flex-col p-4 gap-6">
      {/* Header */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold font-headline text-on-surface">
            Resource Finder
          </h2>
          <p className="text-xs text-on-surface-variant font-medium">
            New York City
          </p>
        </div>

        {/* Category buttons */}
        <div className="space-y-2">
          {CATEGORIES.map((category) => {
            const isActive = activeFilters.has(category);
            return (
              <button
                key={category}
                onClick={() => onToggle(category)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:translate-x-1 ${
                  isActive
                    ? "bg-surface-container-lowest text-primary font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: isActive
                      ? "'FILL' 1"
                      : "'FILL' 0",
                    color: isActive
                      ? CATEGORY_COLORS[category]
                      : undefined,
                  }}
                >
                  {CATEGORY_ICONS[category]}
                </span>
                <span className="text-sm font-label tracking-wide">
                  {CATEGORY_FULL_LABELS[category]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-outline-variant/10">
        <div className="flex gap-4 px-2">
          <button className="text-[10px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-bold">
            Privacy
          </button>
          <button className="text-[10px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-bold">
            Terms
          </button>
        </div>
      </div>
    </div>
  );
}
