"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { UserProfile, Resource, Category } from "@/types";
import { getSchoolByName, getLocationByName } from "@/lib/schools";
import { useResources } from "@/hooks/useResources";
import { useChat } from "@/hooks/useChat";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import EventList from "./EventList";
import MobileNav from "./MobileNav";
import MapChatOverlay from "./MapChatOverlay";
import AppNav from "./AppNav";
import MyResourcesPage from "./MyResourcesPage";
import InsightsPage from "./InsightsPage";
import ProfilePage from "./ProfilePage";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-surface-container-low">
      <div className="text-sm text-on-surface-variant">Loading map...</div>
    </div>
  ),
});

type DashboardView = "explore" | "resources" | "analytics" | "profile";

interface DashboardProps {
  readonly userProfile: UserProfile;
}

const PINNED_STORAGE_KEY = "scholar-soft-pinned";

export default function Dashboard({ userProfile }: DashboardProps) {
  const {
    resources,
    loading,
    activeFilters,
    fetchResources,
    searchResources,
    toggleFilter,
  } = useResources();

  // Track current search context - generic (profile-only) or specialized (with topics)
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(undefined);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>("explore");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<ReadonlySet<string>>(new Set());
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState<string>(userProfile.school);

  // Handle topics extracted from chat - refetch resources with the topic as query
  const handleTopicsExtracted = useCallback((topics: readonly string[]) => {
    if (topics.length > 0) {
      const topicQuery = topics.join(" ");
      setCurrentQuery(topicQuery);
      searchResources(topicQuery, {
        school: userProfile.school,
        gender: userProfile.gender,
        raceEthnicity: userProfile.raceEthnicity,
        searchLocation: selectedLocation,
      });
    }
  }, [searchResources, userProfile, selectedLocation]);

  const { messages, loading: chatLoading, sendMessage } = useChat({
    onTopicsExtracted: handleTopicsExtracted,
  });

  // Get current location center for map
  const locationInfo = getLocationByName(selectedLocation) ?? getSchoolByName(userProfile.school);
  const center: [number, number] = locationInfo
    ? [locationInfo.lat, locationInfo.lng]
    : [40.7128, -74.006];

  // Initial load: fetch generic resources based on user profile only
  useEffect(() => {
    fetchResources({
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
      searchLocation: selectedLocation,
    });
  }, [fetchResources, userProfile, selectedLocation]);

  // Load pinned resources from localStorage
  useEffect(() => {
    try {
      const storedPinned = window.localStorage.getItem(PINNED_STORAGE_KEY);
      if (!storedPinned) return;
      const parsed = JSON.parse(storedPinned) as string[];
      setPinnedIds(new Set(parsed));
    } catch {
      window.localStorage.removeItem(PINNED_STORAGE_KEY);
    }
  }, []);

  function handleTogglePinned(resource: Resource) {
    setPinnedIds((current) => {
      const next = new Set(current);
      if (next.has(resource.id)) {
        next.delete(resource.id);
      } else {
        next.add(resource.id);
      }
      window.localStorage.setItem(
        PINNED_STORAGE_KEY,
        JSON.stringify(Array.from(next))
      );
      return next;
    });
  }

  const pinnedResources = useMemo(
    () => resources.filter((resource) => pinnedIds.has(resource.id)),
    [pinnedIds, resources]
  );

  const activeFilterList = useMemo(
    () => Array.from(activeFilters) as Category[],
    [activeFilters]
  );

  // Handle manual search from search bar
  function handleSearch(query: string) {
    setCurrentQuery(query || undefined);
    searchResources(query, {
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
      searchLocation: selectedLocation,
    });
  }

  // Handle location change from filter panel
  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  // Handle refresh search with current location
  const handleRefreshSearch = useCallback(() => {
    const query = currentQuery ?? "";
    searchResources(query, {
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
      searchLocation: selectedLocation,
    });
  }, [searchResources, userProfile, selectedLocation, currentQuery]);

  const handleResetToGeneric = useCallback(() => {
    setCurrentQuery(undefined);
    fetchResources({
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
    });
  }, [fetchResources, userProfile]);

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 bg-[#fcf8fe]/80 backdrop-blur-xl border-b border-surface-variant/20">
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          {/* Brand */}
          <button
            type="button"
            onClick={() => setActiveView("explore")}
            className="text-xl font-bold text-on-surface font-headline tracking-tight whitespace-nowrap"
          >
            Scholar Soft
          </button>

          {/* Search - hidden on mobile, shown on md+ */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>

        {/* Nav links - hidden on mobile */}
        <AppNav activeView={activeView} onChangeView={setActiveView} />

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden md:flex p-2 hover:bg-surface-container transition-colors rounded-lg active:scale-95 duration-200">
            <span className="material-symbols-outlined text-on-surface-variant">
              notifications
            </span>
          </button>
          <button
            type="button"
            onClick={() => setShowEditProfile(true)}
            className="hidden md:flex p-2 hover:bg-surface-container transition-colors rounded-lg active:scale-95 duration-200"
            aria-label="Edit profile"
          >
            <span className="material-symbols-outlined text-on-surface-variant">
              edit_square
            </span>
          </button>
          {/* Avatar */}
          <button
            type="button"
            onClick={() => setShowEditProfile(true)}
            className="w-8 h-8 rounded-full overflow-hidden ml-1 ring-2 ring-primary-container bg-primary-container flex items-center justify-center"
            aria-label="Open profile"
          >
            <span className="text-xs font-bold text-on-primary-container">
              {userProfile.fullName.charAt(0).toUpperCase()}
            </span>
          </button>
          {/* Mobile nav */}
          <MobileNav
            activeFilters={activeFilters}
            onToggle={toggleFilter}
          />
        </div>
      </header>

      {/* Mobile search bar + view tabs */}
      <div className="fixed top-16 left-0 right-0 z-40 px-4 py-2 bg-background/80 backdrop-blur-md md:hidden">
        <SearchBar onSearch={handleSearch} loading={loading} />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {(["explore", "resources", "analytics"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setActiveView(view)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeView === view
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant"
              }`}
            >
              {view === "explore" ? "Explore" : view === "resources" ? "My Resources" : "Insights"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      {activeView === "explore" ? (
        <main className="flex flex-1 pt-16 overflow-hidden">
          {/* Left Panel: Filters & AI - hidden on mobile */}
          <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-surface-container-low flex-col">
            <FilterPanel
              activeFilters={activeFilters}
              onToggle={toggleFilter}
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
              onRefresh={handleRefreshSearch}
              loading={loading}
            />
          </aside>

          {/* Center Panel: Interactive Map */}
          <section className="md:ml-64 md:mr-[30%] flex-1 h-full relative p-3 md:p-6 mt-12 md:mt-0">
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-surface-container-low shadow-inner relative">
              <MapView resources={resources} center={center} />

              {/* Floating zoom controls */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-[5]">
                <button className="w-10 h-10 bg-surface-container-lowest rounded-xl shadow-md flex items-center justify-center hover:bg-primary hover:text-on-primary text-on-surface transition-all active:scale-95">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="w-10 h-10 bg-surface-container-lowest rounded-xl shadow-md flex items-center justify-center hover:bg-primary hover:text-on-primary text-on-surface transition-all active:scale-95">
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>

              {/* AI Chat Overlay */}
              <MapChatOverlay
                messages={messages}
                loading={chatLoading}
                onSend={sendMessage}
                userProfile={userProfile}
              />
            </div>

            {/* Mobile bottom sheet toggle */}
            <button
              onClick={() => setShowBottomSheet(!showBottomSheet)}
              className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary text-on-primary px-5 py-2.5 text-xs font-semibold shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
            >
              {showBottomSheet
                ? "Show Map"
                : `View Resources (${resources.length})`}
            </button>
          </section>

          {/* Right Panel: Resource List */}
          <aside
            className={`${
              showBottomSheet
                ? "fixed inset-x-0 bottom-0 z-30 h-[60vh] animate-slide-in-bottom rounded-t-3xl shadow-2xl"
                : "hidden"
            } w-full bg-surface md:fixed md:right-0 md:top-16 md:bottom-0 md:flex md:w-[30%] md:flex-col md:h-auto md:animate-none md:rounded-none md:shadow-none`}
          >
            {/* Drag handle (mobile) */}
            {showBottomSheet && (
              <div className="flex justify-center py-2 md:hidden">
                <div className="h-1 w-8 rounded-full bg-outline-variant" />
              </div>
            )}
            <div
              ref={bottomSheetRef}
              className="flex-1 overflow-hidden md:flex md:flex-col"
            >
              <EventList
                resources={resources}
                loading={loading}
                currentQuery={currentQuery}
                onReset={handleResetToGeneric}
              />
            </div>
          </aside>
        </main>
      ) : (
        <main className="min-h-0 flex-1 overflow-hidden bg-[linear-gradient(180deg,#fcf8fe_0%,#f6f2fb_100%)] px-4 pb-4 pt-28 md:px-6 md:pt-24">
          <div className="mx-auto h-full max-w-7xl">
            {activeView === "resources" ? (
              <MyResourcesPage
                pinnedResources={pinnedResources}
                onBackToExplore={() => setActiveView("explore")}
                onRemovePinned={(resourceId) => {
                  setPinnedIds((current) => {
                    const next = new Set(current);
                    next.delete(resourceId);
                    window.localStorage.setItem(
                      PINNED_STORAGE_KEY,
                      JSON.stringify(Array.from(next))
                    );
                    return next;
                  });
                }}
              />
            ) : null}

            {activeView === "analytics" ? (
              <InsightsPage
                exploredCount={resources.length}
                pinnedCount={pinnedResources.length}
                activeFilters={activeFilterList}
              />
            ) : null}
          </div>
        </main>
      )}

      {showEditProfile ? (
        <ProfilePage
          userProfile={userProfile}
          onClose={() => setShowEditProfile(false)}
        />
      ) : null}
    </div>
  );
}
