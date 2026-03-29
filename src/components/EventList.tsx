"use client";

import { Resource } from "@/types";
import EventCard from "./EventCard";

interface EventListProps {
  readonly resources: readonly Resource[];
  readonly loading: boolean;
}

function Skeleton() {
  return (
    <div className="space-y-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-40 w-full rounded-2xl bg-surface-container-high mb-3" />
          <div className="h-4 w-3/4 rounded bg-surface-container-high mb-2" />
          <div className="flex gap-4">
            <div className="h-3 w-24 rounded bg-surface-container" />
            <div className="h-3 w-20 rounded bg-surface-container" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventList({ resources, loading }: EventListProps) {
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-headline text-on-surface tracking-tight">
            Nearby Resources
          </h3>
        </div>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold font-headline text-on-surface tracking-tight">
          Nearby Resources
        </h3>
        <button className="text-sm font-semibold text-primary hover:underline">
          View All
        </button>
      </div>

      {resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">
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
              style={{ animationDelay: `${index * 60}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
