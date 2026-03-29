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
  readonly selectedLocation: string;
  readonly onLocationChange: (location: string) => void;
  readonly onRefresh: () => void;
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

        {/* Location Selector */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          Search Area
        </h3>
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <optgroup label="Your School">
              {ALL_LOCATIONS.filter(loc => !loc.name.includes('Manhattan') && !loc.name.includes('Brooklyn') && !loc.name.includes('Queens') && !loc.name.includes('Bronx') && !loc.name.includes('Staten Island')).map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Manhattan">
              {ALL_LOCATIONS.filter(loc => loc.name.startsWith('Manhattan')).map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name.replace('Manhattan - ', '')}
                </option>
              ))}
            </optgroup>
            <optgroup label="Brooklyn">
              {ALL_LOCATIONS.filter(loc => loc.name.startsWith('Brooklyn')).map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name.replace('Brooklyn - ', '')}
                </option>
              ))}
            </optgroup>
            <optgroup label="Queens">
              {ALL_LOCATIONS.filter(loc => loc.name.startsWith('Queens')).map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name.replace('Queens - ', '')}
                </option>
              ))}
            </optgroup>
            <optgroup label="Bronx">
              {ALL_LOCATIONS.filter(loc => loc.name.startsWith('Bronx')).map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name.replace('Bronx - ', '')}
                </option>
              ))}
            </optgroup>
            <optgroup label="Staten Island">
              {ALL_LOCATIONS.filter(loc => loc.name.startsWith('Staten Island')).map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name.replace('Staten Island - ', '')}
                </option>
              ))}
            </optgroup>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>
            {loading ? 'progress_activity' : 'refresh'}
          </span>
          {loading ? 'Searching...' : 'Refresh Search'}
        </button>
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
