"use client";

import { useState } from "react";
import { UserProfile } from "@/types";
import { NYC_SCHOOLS } from "@/lib/schools";

interface OnboardingCardProps {
  readonly onSubmit: (profile: UserProfile) => void;
}

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
] as const;

const ETHNICITY_OPTIONS = [
  "Black/African American",
  "Hispanic/Latino",
  "Asian",
  "White",
  "Native American",
  "Pacific Islander",
  "Two or More Races",
  "Other",
  "Prefer not to say",
] as const;

export default function OnboardingCard({ onSubmit }: OnboardingCardProps) {
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [gender, setGender] = useState("");
  const [raceEthnicity, setRaceEthnicity] = useState("");

  const isValid =
    fullName.trim() !== "" &&
    school !== "" &&
    gender !== "" &&
    raceEthnicity !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({
      fullName: fullName.trim(),
      school,
      gender,
      raceEthnicity,
    });
  }

  const inputClasses =
    "w-full rounded-xl bg-surface-container-highest border-none px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" />

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md animate-fade-in-up rounded-3xl bg-surface-container-lowest p-8 shadow-[0_8px_40px_rgba(60,60,207,0.04),0_2px_8px_rgba(0,0,0,0.06)]"
      >
        {/* Logo / Title */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container">
            <span className="material-symbols-outlined text-on-primary text-2xl">
              explore
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-headline text-on-surface">
            Scholar Soft
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Discover resources tailored to you
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-medium text-on-surface font-label"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className={inputClasses}
            maxLength={100}
          />
        </div>

        {/* School */}
        <div className="mb-4">
          <label
            htmlFor="school"
            className="mb-1.5 block text-sm font-medium text-on-surface font-label"
          >
            School
          </label>
          <select
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select your school</option>
            {NYC_SCHOOLS.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="mb-1.5 block text-sm font-medium text-on-surface font-label"
          >
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Race/Ethnicity */}
        <div className="mb-6">
          <label
            htmlFor="raceEthnicity"
            className="mb-1.5 block text-sm font-medium text-on-surface font-label"
          >
            Race/Ethnicity
          </label>
          <select
            id="raceEthnicity"
            value={raceEthnicity}
            onChange={(e) => setRaceEthnicity(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select race/ethnicity</option>
            {ETHNICITY_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-3xl bg-gradient-to-b from-primary to-primary-container px-4 py-3.5 text-sm font-semibold text-on-primary shadow-md shadow-primary-dim/15 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98] disabled:scale-100 disabled:opacity-40 disabled:shadow-none"
        >
          Show My Resources
        </button>
      </form>
    </div>
  );
}
