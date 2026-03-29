"use client";

import { Resource } from "@/types";
import EventCard from "./EventCard";

interface EventListProps {
  readonly resources: readonly Resource[];
  readonly loading: boolean;
  readonly currentQuery?: string;
  readonly onReset?: () => void;
  readonly selectedLocation?: string;
  readonly pinnedIds?: ReadonlySet<string>;
  readonly onTogglePinned?: (resource: Resource) => void;
}

function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-3 animate-pulse">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-xl bg-surface-container shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-3/4 rounded bg-surface-container" />
          <div className="h-3 w-1/2 rounded bg-surface-container" />
          <div className="flex gap-2">
            <div className="h-2.5 w-16 rounded bg-surface-container" />
            <div className="h-2.5 w-20 rounded bg-surface-container" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventList({
  resources,
  loading,
  currentQuery,
  onReset,
  selectedLocation,
  pinnedIds = new Set(),
  onTogglePinned,
}: EventListProps) {
  const locationLabel = selectedLocation ?? "New York City";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20 shrink-0">
        <div>
          <h3 className="text-[15px] font-bold font-headline text-on-surface">
            {loading
              ? "Finding resources..."
              : resources.length > 0
              ? `${resources.length} Resources Near ${locationLabel}`
              : "No resources found"}
          </h3>
          {currentQuery && !loading && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-on-surface-variant">
                Showing: <span className="font-semibold text-primary">{currentQuery}</span>
              </span>
              {onReset && (
                <button
                  onClick={onReset}
                  className="text-xs text-primary underline underline-offset-2 hover:no-underline"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
        {!loading && resources.length > 0 && (
          <button className="text-xs font-semibold text-primary hover:underline underline-offset-2">
            View All
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-3">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : resources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">
              search_off
            </span>
            <p className="text-sm text-on-surface-variant font-medium">No resources found</p>
            <p className="mt-1 text-xs text-outline-variant">
              {currentQuery ? "Try a different search term" : "Try adjusting your filters or location"}
            </p>
            {onReset && currentQuery && (
              <button
                onClick={onReset}
                className="mt-4 px-4 py-2 text-sm font-semibold bg-primary text-on-primary rounded-xl hover:bg-primary-dim transition-colors"
              >
                Show All Resources
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {resources.map((resource, index) => (
              <EventCard
                key={resource.id}
                resource={resource}
                compact
                pinned={pinnedIds.has(resource.id)}
                onTogglePinned={onTogglePinned}
                style={{ animationDelay: `${Math.min(index * 40, 300)}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
