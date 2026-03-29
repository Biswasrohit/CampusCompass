"use client";

import { useState, useMemo, useCallback } from "react";
import { Category, Resource, SearchRequest } from "@/types";

export function useResources() {
  const [resources, setResources] = useState<readonly Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<ReadonlySet<Category>>(
    new Set<Category>(["scholarships", "mental-health", "food-security", "housing", "career-prep"])
  );

  const fetchResources = useCallback(async (profile: SearchRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Search failed");
      }

      const data = await response.json();
      setResources(data.resources);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchResources = useCallback(
    async (query: string, profile: SearchRequest) => {
      await fetchResources({ ...profile, query });
    },
    [fetchResources]
  );

  const toggleFilter = useCallback((category: Category) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const filteredResources = useMemo(
    () => resources.filter((r) => activeFilters.has(r.category)),
    [resources, activeFilters]
  );

  return {
    resources: filteredResources,
    allResources: resources,
    loading,
    error,
    activeFilters,
    fetchResources,
    searchResources,
    toggleFilter,
  };
}
