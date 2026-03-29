"use client";

import { useState } from "react";
import { CATEGORY_FULL_LABELS, Category, UserProfile } from "@/types";

interface ProfilePageProps {
  readonly userProfile: UserProfile;
  readonly onClose: () => void;
}

const PROFILE_INTERESTS: readonly Category[] = [
  "scholarships",
  "housing",
  "food-security",
  "mental-health",
  "career-prep",
] as const;

const BOROUGHS = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
] as const;

export default function ProfilePage({
  userProfile,
  onClose,
}: ProfilePageProps) {
  const [selectedBorough, setSelectedBorough] = useState("Brooklyn");
  const [selectedInterests, setSelectedInterests] = useState<readonly Category[]>([
    "scholarships",
    "career-prep",
  ]);
  const [campusAlerts, setCampusAlerts] = useState(true);

  function toggleInterest(category: Category) {
    setSelectedInterests((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-inverse-surface/30 p-4 backdrop-blur-sm">
      <div className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_30px_80px_rgba(73,74,219,0.16)]">
        <div className="flex items-start justify-between border-b border-surface-variant/20 px-6 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Edit Profile
            </p>
            <h1 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface">
              Student preferences
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
              A lightweight profile editor that keeps personalization available
              without needing a dedicated settings page.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-surface-container p-2 text-on-surface-variant transition-colors hover:text-on-surface"
            aria-label="Close edit profile"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-on-primary shadow-md">
                  {userProfile.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface">
                    {userProfile.fullName}
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    Student at {userProfile.school}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-surface-container-low p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                    School
                  </p>
                  <p className="mt-2 text-sm font-semibold text-on-surface">
                    {userProfile.school}
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-container-low p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                    Current borough
                  </p>
                  <p className="mt-2 text-sm font-semibold text-on-surface">
                    {selectedBorough}
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-container-low p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                    Student focus
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-on-surface"
                      >
                        {CATEGORY_FULL_LABELS[interest]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest p-5 shadow-sm">
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-on-surface">
                    Borough / location
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BOROUGHS.map((borough) => (
                      <button
                        key={borough}
                        type="button"
                        onClick={() => setSelectedBorough(borough)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                          selectedBorough === borough
                            ? "bg-primary text-on-primary shadow-sm"
                            : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {borough}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-on-surface">
                    Resource interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROFILE_INTERESTS.map((category) => {
                      const isActive = selectedInterests.includes(category);
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => toggleInterest(category)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-primary text-on-primary shadow-sm"
                              : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          {CATEGORY_FULL_LABELS[category]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-container-low p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">
                        Resource reminders
                      </p>
                      <p className="mt-1 text-sm text-on-surface-variant">
                        Optional preference toggle for the demo wireframe.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCampusAlerts((current) => !current)}
                      className={`flex h-8 w-14 items-center rounded-full p-1 transition-colors ${
                        campusAlerts ? "bg-primary" : "bg-outline-variant"
                      }`}
                    >
                      <span
                        className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                          campusAlerts ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-md shadow-primary/20"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-surface-container px-5 py-3 text-sm font-semibold text-on-surface-variant"
                  >
                    Done
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
