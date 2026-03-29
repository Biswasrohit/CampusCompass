"use client";

import { useState } from "react";
import { Category } from "@/types";
import FilterPanel from "./FilterPanel";

interface MobileNavProps {
  readonly activeFilters: ReadonlySet<Category>;
  readonly onToggle: (category: Category) => void;
}

export default function MobileNav({
  activeFilters,
  onToggle,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-surface-container-lowest p-2 shadow-sm transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 md:hidden"
        aria-label="Open filters"
      >
        <span className="material-symbols-outlined text-on-surface-variant">
          tune
        </span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-inverse-surface/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-surface-container-low shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold font-headline text-on-surface">
            Filters
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-on-surface-variant transition-transform duration-200 hover:scale-110 hover:text-on-surface active:scale-95"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <FilterPanel
          activeFilters={activeFilters}
          onToggle={onToggle}
        />
      </div>
    </>
  );
}
