"use client";

import { useMemo, useState, useEffect } from "react";
import {
  CATEGORY_FULL_LABELS,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  type Category,
  type Resource,
} from "@/types";
import { CATEGORY_SAVINGS_ESTIMATES } from "@/lib/savings";

interface InsightsPageProps {
  readonly pinnedResources: readonly Resource[];
  readonly exploredCount: number;
}

const CURRENCY_FORMAT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ALL_CATEGORIES: readonly Category[] = [
  "scholarships",
  "mental-health",
  "food-security",
  "housing",
  "career-prep",
];

function useCountUp(target: number, duration = 1000): number {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setDisplay(0);
      return;
    }
    const startTime = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return display;
}

function CategorySavingsCard({
  category,
  count,
  estimatedValue,
  sharePercent,
}: {
  readonly category: Category;
  readonly count: number;
  readonly estimatedValue: number;
  readonly sharePercent: number;
}) {
  const estimate = CATEGORY_SAVINGS_ESTIMATES[category];
  const color = CATEGORY_COLORS[category];

  return (
    <article className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${color}18` }}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ color }}
          >
            {CATEGORY_ICONS[category]}
          </span>
        </div>
        <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-on-surface/70">
          {count} {count === 1 ? "resource" : "resources"}
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-on-surface">
        {CATEGORY_FULL_LABELS[category]}
      </p>
      <p className="mt-1 font-headline text-2xl font-bold text-on-surface">
        {CURRENCY_FORMAT.format(estimatedValue)}
      </p>
      <p className="mt-1 text-xs leading-5 text-on-surface/50">
        ~{CURRENCY_FORMAT.format(estimate.value)} · {estimate.rationale}
      </p>

      <div className="mt-4 h-2 rounded-full bg-surface-container">
        <div
          className="h-2 rounded-full transition-[width] duration-500"
          style={{
            width: `${sharePercent}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </article>
  );
}

export default function InsightsPage({
  pinnedResources,
  exploredCount,
}: InsightsPageProps) {
  const savingsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of pinnedResources) {
      counts[r.category] = (counts[r.category] ?? 0) + 1;
    }

    return ALL_CATEGORIES
      .filter((cat) => (counts[cat] ?? 0) > 0)
      .map((cat) => ({
        category: cat,
        count: counts[cat] ?? 0,
        estimatedValue: (counts[cat] ?? 0) * CATEGORY_SAVINGS_ESTIMATES[cat].value,
      }))
      .sort((a, b) => b.estimatedValue - a.estimatedValue);
  }, [pinnedResources]);

  const totalSavings = useMemo(
    () => savingsByCategory.reduce((sum, item) => sum + item.estimatedValue, 0),
    [savingsByCategory],
  );

  const activeCategoryCount = savingsByCategory.length;
  const animatedTotal = useCountUp(totalSavings);

  if (pinnedResources.length === 0) {
    return (
      <section className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-sm">
        <div className="flex flex-col items-center px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="material-symbols-outlined text-3xl text-primary">
              savings
            </span>
          </div>
          <h2 className="mt-5 font-headline text-2xl font-bold text-on-surface">
            Start saving to see your impact
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-on-surface/70">
            Pin resources from Explore and we&apos;ll estimate the value of what
            you&apos;ve found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-sm">
      {/* Header */}
      <div className="border-b border-surface-variant/20 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Your Savings Review
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface">
          Here&apos;s what you&apos;ve unlocked
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface/70">
          Every resource you save is a step toward financial security. Here&apos;s
          an estimate of the value you&apos;ve gathered.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {/* Hero savings card */}
        <article className="rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-primary/5 to-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <span className="material-symbols-outlined text-3xl text-primary">
                savings
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-on-surface/60">
                Estimated Total Savings
              </p>
              <p className="font-headline text-4xl font-bold tracking-tight text-on-surface md:text-5xl">
                {CURRENCY_FORMAT.format(animatedTotal)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-on-surface/70">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">
                push_pin
              </span>
              {pinnedResources.length}{" "}
              {pinnedResources.length === 1 ? "resource" : "resources"} saved
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">
                category
              </span>
              {activeCategoryCount}{" "}
              {activeCategoryCount === 1 ? "category" : "categories"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">
                explore
              </span>
              {exploredCount} explored
            </span>
          </div>

          <p className="mt-3 text-xs text-on-surface/40">
            Estimated values based on national averages for each resource
            category. Actual value may vary.
          </p>
        </article>

        {/* Category breakdown */}
        <h2 className="mt-6 font-headline text-xl font-bold text-on-surface">
          Savings by category
        </h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {savingsByCategory.map((item) => (
            <CategorySavingsCard
              key={item.category}
              category={item.category}
              count={item.count}
              estimatedValue={item.estimatedValue}
              sharePercent={
                totalSavings > 0
                  ? Math.round((item.estimatedValue / totalSavings) * 100)
                  : 0
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
