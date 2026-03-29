"use client";

import { useState, useRef, useEffect } from "react";
import { UserProfile } from "@/types";
import { NYC_SCHOOLS } from "@/lib/schools";

interface OnboardingCardProps {
  readonly onSubmit: (profile: UserProfile) => void;
  readonly prefillName?: string;
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

interface CustomSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  label: string;
  searchable?: boolean;
}

function CustomSelect({ id, value, onChange, options, placeholder, searchable = false }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = searchable
    ? options.filter((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const displayValue = value || placeholder;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left text-sm text-slate-900 focus:border-scholarship focus:bg-white focus:outline-none focus:ring-2 focus:ring-scholarship/20"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {displayValue}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {searchable && (
            <div className="border-b border-slate-100 px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-scholarship focus:outline-none focus:ring-1 focus:ring-scholarship/20"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="max-h-60 overflow-auto">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
                setSearchQuery("");
              }}
              className={`w-full px-3.5 py-2 text-left text-sm hover:bg-slate-50 ${!value ? "bg-slate-50 font-medium text-scholarship" : "text-slate-400"}`}
            >
              {placeholder}
            </button>
            {filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className={`w-full px-3.5 py-2 text-left text-sm hover:bg-slate-50 ${value === option ? "bg-slate-50 font-medium text-scholarship" : "text-slate-700"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OnboardingCard({ onSubmit, prefillName = "" }: OnboardingCardProps) {
  const [fullName, setFullName] = useState(prefillName);
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

  const schoolNames = NYC_SCHOOLS.map((s) => s.name);

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
          <CustomSelect
            id="school"
            value={school}
            onChange={setSchool}
            options={schoolNames}
            placeholder="Select your school"
            label="School"
            searchable
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="mb-1.5 block text-sm font-medium text-on-surface font-label"
          >
            Gender
          </label>
          <CustomSelect
            id="gender"
            value={gender}
            onChange={setGender}
            options={GENDER_OPTIONS}
            placeholder="Select gender"
            label="Gender"
          />
        </div>

        {/* Race/Ethnicity */}
        <div className="mb-6">
          <label
            htmlFor="raceEthnicity"
            className="mb-1.5 block text-sm font-medium text-on-surface font-label"
          >
            Race/Ethnicity
          </label>
          <CustomSelect
            id="raceEthnicity"
            value={raceEthnicity}
            onChange={setRaceEthnicity}
            options={ETHNICITY_OPTIONS}
            placeholder="Select race/ethnicity"
            label="Race/Ethnicity"
          />
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
