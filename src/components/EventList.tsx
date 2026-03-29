"use client";

import { Resource } from "@/types";
import EventCard from "./EventCard";

interface EventListProps {
  readonly resources: readonly Resource[];
  readonly loading: boolean;
  readonly pinnedIds?: ReadonlySet<string>;
  readonly onTogglePinned?: (resource: Resource) => void;
}

function Skeleton() {
  return (
    <div className="space-y-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="mb-3 h-40 w-full rounded-2xl bg-surface-container-high" />
          <div className="mb-2 h-4 w-3/4 rounded bg-surface-container-high" />
          <div className="flex gap-4">
            <div className="h-3 w-24 rounded bg-surface-container" />
            <div className="h-3 w-20 rounded bg-surface-container" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventList({
  resources,
  loading,
  pinnedIds,
  onTogglePinned,
}: EventListProps) {
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">
            Nearby Resources
          </h3>
        </div>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">
            Nearby Resources
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant">
            Pin helpful resources to review them later in My Resources.
          </p>
        </div>
        <button className="text-sm font-semibold text-primary hover:underline">
          View All
        </button>
      </div>

      {resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-outline-variant">
            search_off
          </span>
          <p className="text-sm text-on-surface-variant">No resources found</p>
          <p className="mt-1 text-xs text-outline-variant">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {resources.map((resource, index) => (
            <EventCard
              key={resource.id}
              resource={resource}
              isPinned={pinnedIds?.has(resource.id)}
              onTogglePinned={onTogglePinned}
              style={{ animationDelay: `${index * 60}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
