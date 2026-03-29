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
  readonly collapsed?: boolean;
  readonly onToggleCollapse?: () => void;
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
    <div className="flex h-full flex-col relative">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/10 shrink-0">
        <div className="flex items-start justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "18px" }}>
              location_on
            </span>
            <h2 className="text-[15px] font-bold font-headline text-on-surface">
              Resource Finder
            </h2>
          </div>
        </div>
        <p className="text-xs text-on-surface/70 pl-7">Show New York City</p>
      </div>

      <div className="px-4 pt-4 space-y-5 flex-1 overflow-y-auto hide-scrollbar">

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
                className="w-full appearance-none bg-surface-container-low/80 border border-outline-variant/30 rounded-xl pl-8 pr-8 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 cursor-pointer font-medium transition-all"
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

        {/* Category icon cards — 2-column grid */}
        <div>
          <span className="text-xs font-bold text-on-surface/70 uppercase tracking-wider font-headline block mb-3">
            Filter category
          </span>

          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeFilters.has(category);
              const color = CATEGORY_COLORS[category];
              return (
                <button
                  key={category}
                  onClick={() => onToggle(category)}
                  className={`flex flex-col items-center gap-2.5 p-3 rounded-2xl border transition-all duration-200 active:scale-95 group ${
                    isActive
                      ? "bg-surface-container-lowest/90 border-outline-variant/30 shadow-card"
                      : "bg-surface-container-low/40 border-white/10 hover:bg-surface-container-low/70 hover:border-outline-variant/20"
                  }`}
                >
                  {/* Neumorphic icon tile */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.08)]"
                        : "shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_1px_4px_rgba(0,0,0,0.06)]"
                    }`}
                    style={{
                      backgroundColor: isActive ? `${color}15` : "rgba(254,252,248,0.7)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined transition-all duration-200"
                      style={{
                        fontSize: "22px",
                        color: isActive ? color : "#8A847C",
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      {CATEGORY_ICONS[category]}
                    </span>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[11px] text-center leading-tight tracking-wide transition-colors ${
                      isActive ? "font-bold text-on-surface" : "font-medium text-on-surface/75"
                    }`}
                  >
                    {CATEGORY_FULL_LABELS[category]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10 mt-auto shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button className="text-[10px] text-on-surface/75 hover:text-on-surface transition-colors uppercase tracking-widest font-semibold">
              Privacy
            </button>
            <span className="text-on-surface/30 text-xs">·</span>
            <button className="text-[10px] text-on-surface/75 hover:text-on-surface transition-colors uppercase tracking-widest font-semibold">
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
