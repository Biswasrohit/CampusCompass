"use client";

import { CATEGORY_LABELS, Resource } from "@/types";

interface MyResourcesPageProps {
  readonly pinnedResources: readonly Resource[];
  readonly onBackToExplore: () => void;
  readonly onRemovePinned: (resourceId: string) => void;
}

export default function MyResourcesPage({
  pinnedResources,
  onBackToExplore,
  onRemovePinned,
}: MyResourcesPageProps) {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface shadow-card">
      <div className="border-b border-surface-variant/20 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          My Resources
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface">
          Your saved resources
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface/70">
          Pin scholarships, wellness support, food resources, and campus services from Explore to keep them in one place.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {pinnedResources.length === 0 ? (
          <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-surface-variant/60 bg-surface-container-low px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">push_pin</span>
            </div>
            <h2 className="mt-5 font-headline text-2xl font-bold text-on-surface">
              No pinned resources yet
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-on-surface/70">
              Pin resources from Explore to build a shortlist of support options
              you want to revisit.
            </p>
            <button
              type="button"
              onClick={onBackToExplore}
              className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-md shadow-primary/20"
            >
              Go Back To Explore
            </button>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {pinnedResources.map((resource) => (
              <article
                key={resource.id}
                className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                      <span className="material-symbols-outlined text-sm">
                        sell
                      </span>
                      {CATEGORY_LABELS[resource.category]}
                    </div>
                    <h2 className="mt-3 font-headline text-xl font-bold text-on-surface">
                      {resource.title}
                    </h2>
                  </div>

                  <div className="rounded-full bg-primary text-on-primary px-3 py-1 text-xs font-semibold">
                    Pinned
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-on-surface/70">
                  <div className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1.5">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>{resource.location}</span>
                  </div>
                  {resource.date && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1.5">
                      <span className="material-symbols-outlined text-sm">event</span>
                      <span>{resource.date}</span>
                    </div>
                  )}
                </div>

                <p className="mt-4 text-sm leading-6 text-on-surface/70">
                  {resource.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
                  >
                    <span>Open Resource</span>
                    <span className="material-symbols-outlined text-base">
                      arrow_outward
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onRemovePinned(resource.id)}
                    className="rounded-full bg-surface-container px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
