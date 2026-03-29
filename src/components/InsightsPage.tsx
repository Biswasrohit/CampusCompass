"use client";

import { CATEGORY_FULL_LABELS, Category } from "@/types";

interface InsightsPageProps {
  readonly exploredCount: number;
  readonly pinnedCount: number;
  readonly activeFilters: readonly Category[];
}

function InsightCard({
  label,
  value,
  detail,
  icon,
}: {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly icon: string;
}) {
  return (
    <article className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-2 font-headline text-3xl font-bold text-on-surface">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{detail}</p>
    </article>
  );
}

export default function InsightsPage({
  exploredCount,
  pinnedCount,
  activeFilters,
}: InsightsPageProps) {
  const topCategory = activeFilters[0];

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-sm">
      <div className="border-b border-surface-variant/20 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Your Insights
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface">
          A lightweight student snapshot
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
          This page keeps analytics believable for the hackathon by focusing on
          discovery, saving behavior, and the kinds of support the student is
          exploring.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InsightCard
            label="Resources Explored"
            value={String(exploredCount)}
            detail="Nearby support opportunities surfaced on the map and resource list."
            icon="explore"
          />
          <InsightCard
            label="Resources Pinned"
            value={String(pinnedCount)}
            detail="Items saved to My Resources for follow-up and review."
            icon="push_pin"
          />
          <InsightCard
            label="Top Focus"
            value={topCategory ? CATEGORY_FULL_LABELS[topCategory] : "General"}
            detail="The strongest current need signal based on active filters."
            icon="insights"
          />
          <InsightCard
            label="Nearby Opportunities"
            value={String(Math.max(exploredCount - pinnedCount, 0))}
            detail="Open opportunities still available to review and save."
            icon="location_searching"
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline text-xl font-bold text-on-surface">
                  Top categories viewed
                </h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Wireframe chart placeholder for student interest patterns.
                </p>
              </div>
              <span className="material-symbols-outlined text-primary">
                bar_chart
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {activeFilters.length === 0 ? (
                <p className="text-sm text-on-surface-variant">
                  Turn on categories in Explore to populate this view.
                </p>
              ) : (
                activeFilters.slice(0, 4).map((category, index) => (
                  <div key={category}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-on-surface">
                        {CATEGORY_FULL_LABELS[category]}
                      </span>
                      <span className="text-on-surface-variant">
                        {80 - index * 12}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-surface-container">
                      <div
                        className="h-3 rounded-full bg-primary"
                        style={{ width: `${80 - index * 12}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest p-5 shadow-sm">
            <h2 className="font-headline text-xl font-bold text-on-surface">
              Demo note
            </h2>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-surface-container-low p-4 text-sm leading-6 text-on-surface">
                Scholar Soft helps students move from browsing resources to
                saving the ones most worth acting on.
              </div>
              <div className="rounded-2xl bg-surface-container-low p-4 text-sm leading-6 text-on-surface">
                These lightweight insights reinforce the product story without
                requiring heavy backend analytics.
              </div>
              <div className="rounded-2xl bg-surface-container-low p-4 text-sm leading-6 text-on-surface">
                Judges can quickly see engagement, focus areas, and follow-up
                intent.
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
