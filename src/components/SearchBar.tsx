"use client";

import { useState } from "react";

interface SearchBarProps {
  readonly onSearch: (query: string) => void;
  readonly loading?: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{fontSize: "17px"}}>
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources, scholarships..."
          className="w-full bg-surface-container-low border border-outline-variant/25 rounded-xl pl-10 pr-4 h-9 text-sm text-on-surface placeholder:text-on-surface/40 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-surface-container-lowest transition-all outline-none"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-outline-variant border-t-primary" />
          </div>
        )}
      </div>
    </form>
  );
}
