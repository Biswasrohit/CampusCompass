"use client";

import {
  Category,
  CATEGORY_COLORS,
  CATEGORY_FULL_LABELS,
  CATEGORY_ICONS,
} from "@/types";
import { ALL_LOCATIONS } from "@/lib/schools";

interface FilterPanelProps {
  readonly activeFilters: ReadonlySet<Category>;
  readonly onToggle: (category: Category) => void;
  readonly selectedLocation?: string;
  readonly onLocationChange?: (location: string) => void;
  readonly onRefresh?: () => void;
  readonly loading?: boolean;
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
  selectedLocation,
  onLocationChange,
  onRefresh,
  loading = false,
}: FilterPanelProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-outline-variant/20">
        <div className="flex items-start justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "18px" }}>
              location_on
            </span>
            <h2 className="text-[15px] font-bold font-headline text-on-surface tracking-tight">
              Resource Finder
            </h2>
          </div>
          <button className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "16px" }}>more_horiz</span>
          </button>
        </div>
        <p className="text-xs text-on-surface-variant pl-7">Show New York City</p>
      </div>

      <div className="px-4 pt-4 space-y-4 flex-1">
        {/* Location selector */}
        {selectedLocation && onLocationChange && (
          <div className="space-y-2.5">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: "15px" }}>
                search
              </span>
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 rounded-xl pl-8 pr-8 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 cursor-pointer font-medium transition-all"
              >
                <optgroup label="Your School">
                  {ALL_LOCATIONS.filter(loc =>
                    !loc.name.includes("Manhattan") &&
                    !loc.name.includes("Brooklyn") &&
                    !loc.name.includes("Queens") &&
                    !loc.name.includes("Bronx") &&
                    !loc.name.includes("Staten Island")
                  ).map((loc) => (
                    <option key={loc.name} value={loc.name}>{loc.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Manhattan">
                  {ALL_LOCATIONS.filter(loc => loc.name.startsWith("Manhattan")).map((loc) => (
                    <option key={loc.name} value={loc.name}>{loc.name.replace("Manhattan - ", "")}</option>
                  ))}
                </optgroup>
                <optgroup label="Brooklyn">
                  {ALL_LOCATIONS.filter(loc => loc.name.startsWith("Brooklyn")).map((loc) => (
                    <option key={loc.name} value={loc.name}>{loc.name.replace("Brooklyn - ", "")}</option>
                  ))}
                </optgroup>
                <optgroup label="Queens">
                  {ALL_LOCATIONS.filter(loc => loc.name.startsWith("Queens")).map((loc) => (
                    <option key={loc.name} value={loc.name}>{loc.name.replace("Queens - ", "")}</option>
                  ))}
                </optgroup>
                <optgroup label="Bronx">
                  {ALL_LOCATIONS.filter(loc => loc.name.startsWith("Bronx")).map((loc) => (
                    <option key={loc.name} value={loc.name}>{loc.name.replace("Bronx - ", "")}</option>
                  ))}
                </optgroup>
                <optgroup label="Staten Island">
                  {ALL_LOCATIONS.filter(loc => loc.name.startsWith("Staten Island")).map((loc) => (
                    <option key={loc.name} value={loc.name}>{loc.name.replace("Staten Island - ", "")}</option>
                  ))}
                </optgroup>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: "16px" }}>
                expand_more
              </span>
            </div>

            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-button hover:bg-primary-dim transition-colors duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed tracking-wider uppercase"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-base">search</span>
                )}
                {loading ? "Searching..." : "Search This Area"}
              </button>
            )}
          </div>
        )}

        {/* Category filters */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-headline">
              Filter category
            </span>
            <button className="w-5 h-5 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "14px" }}>more_horiz</span>
            </button>
          </div>
          <div className="space-y-0.5">
            {CATEGORIES.map((category) => {
              const isActive = activeFilters.has(category);
              const color = CATEGORY_COLORS[category];
              return (
                <button
                  key={category}
                  onClick={() => onToggle(category)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group ${
                    isActive
                      ? "bg-surface-container"
                      : "hover:bg-surface-container-low"
                  }`}
                >
                  {/* Icon square */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? color : `${color}18`,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "15px",
                        color: isActive ? "white" : color,
                        fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      {CATEGORY_ICONS[category]}
                    </span>
                  </div>

                  <span className={`flex-1 text-sm text-left transition-colors tracking-wide ${
                    isActive ? "text-on-surface font-semibold" : "text-on-surface-variant font-medium"
                  }`}>
                    {CATEGORY_FULL_LABELS[category]}
                  </span>

                  {/* Checkbox */}
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                    isActive
                      ? "border-transparent"
                      : "border-outline-variant"
                  }`} style={{ backgroundColor: isActive ? color : "transparent" }}>
                    {isActive && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-outline-variant/20 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button className="text-[10px] text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest font-semibold">
              Privacy
            </button>
            <span className="text-on-surface-variant/30 text-xs">·</span>
            <button className="text-[10px] text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest font-semibold">
              Terms
            </button>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-primary" />
            <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS["food-security"] }} />
          </div>
        </div>
      </div>
    </div>
  );
}
