"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { UserProfile, Resource, Category } from "@/types";
import { getSchoolByName } from "@/lib/schools";
import { useResources } from "@/hooks/useResources";
import { useChat } from "@/hooks/useChat";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import EventList from "./EventList";
import MobileNav from "./MobileNav";
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
  const { messages, loading: chatLoading, sendMessage } = useChat();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>("explore");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<ReadonlySet<string>>(new Set());
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const school = getSchoolByName(userProfile.school);
  const center: [number, number] = school
    ? [school.lat, school.lng]
    : [40.7128, -74.006];

  useEffect(() => {
    fetchResources({
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
    });
  }, [fetchResources, userProfile]);

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

  function handleSearch(query: string) {
    searchResources(query, {
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
    });
  }

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

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-surface-variant/20 bg-[#fcf8fe]/80 px-4 backdrop-blur-xl md:px-8">
        <div className="flex flex-1 items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => setActiveView("explore")}
            className="whitespace-nowrap font-headline text-xl font-bold tracking-tight text-on-surface"
          >
            Scholar Soft
          </button>

          <div className="hidden max-w-2xl flex-1 md:block">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>

        <AppNav activeView={activeView} onChangeView={setActiveView} />

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setShowEditProfile(true)}
            className="hidden rounded-lg p-2 transition-colors duration-200 hover:bg-surface-container active:scale-95 md:flex"
            aria-label="Edit profile"
          >
            <span className="material-symbols-outlined text-on-surface-variant">
              edit_square
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowEditProfile(true)}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-container ring-2 ring-primary-container"
            aria-label="Open edit profile"
          >
            <span className="text-xs font-bold text-on-primary-container">
              {userProfile.fullName.charAt(0).toUpperCase()}
            </span>
          </button>

          <MobileNav
            activeFilters={activeFilters}
            onToggle={toggleFilter}
            chatMessages={messages}
            chatLoading={chatLoading}
            onChatSend={sendMessage}
            userProfile={userProfile}
          />
        </div>
      </header>

      <div className="fixed left-0 right-0 top-16 z-40 bg-background/80 px-4 py-2 backdrop-blur-md md:hidden">
        <SearchBar onSearch={handleSearch} loading={loading} />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            type="button"
            onClick={() => setActiveView("explore")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeView === "explore"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-on-surface-variant"
            }`}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => setActiveView("resources")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeView === "resources"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-on-surface-variant"
            }`}
          >
            My Resources
          </button>
          <button
            type="button"
            onClick={() => setActiveView("analytics")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeView === "analytics"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-on-surface-variant"
            }`}
          >
            Insights
          </button>
        </div>
      </div>

      {activeView === "explore" ? (
        <main className="flex flex-1 overflow-hidden pt-16 md:pt-16">
          <aside className="fixed bottom-0 left-0 top-16 hidden w-64 flex-col bg-surface-container-low md:flex">
            <FilterPanel
              activeFilters={activeFilters}
              onToggle={toggleFilter}
              chatMessages={messages}
              chatLoading={chatLoading}
              onChatSend={sendMessage}
              userProfile={userProfile}
            />
          </aside>

          <section className="relative mt-12 h-full flex-1 p-3 md:ml-64 md:mr-[30%] md:mt-0 md:p-6">
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-surface-container-low shadow-inner">
              <MapView resources={resources} center={center} />

              <div className="absolute bottom-6 left-6 z-[5] flex flex-col gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface shadow-md transition-all hover:bg-primary hover:text-on-primary active:scale-95">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface shadow-md transition-all hover:bg-primary hover:text-on-primary active:scale-95">
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowBottomSheet(!showBottomSheet)}
              className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-on-primary shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
            >
              {showBottomSheet
                ? "Show Map"
                : `View Resources (${resources.length})`}
            </button>
          </section>

          <aside
            className={`${
              showBottomSheet
                ? "fixed inset-x-0 bottom-0 z-30 h-[60vh] animate-slide-in-bottom rounded-t-3xl shadow-2xl"
                : "hidden"
            } w-full bg-surface md:fixed md:bottom-0 md:right-0 md:top-16 md:flex md:h-auto md:w-[30%] md:flex-col md:animate-none md:rounded-none md:shadow-none`}
          >
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
                pinnedIds={pinnedIds}
                onTogglePinned={handleTogglePinned}
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
