"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { UserProfile } from "@/types";
import { getSchoolByName } from "@/lib/schools";
import { useResources } from "@/hooks/useResources";
import { useChat } from "@/hooks/useChat";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import EventList from "./EventList";
import MobileNav from "./MobileNav";
import MapChatOverlay from "./MapChatOverlay";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-surface-container-low">
      <div className="text-sm text-on-surface-variant">Loading map...</div>
    </div>
  ),
});

interface DashboardProps {
  readonly userProfile: UserProfile;
}

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

  function handleSearch(query: string) {
    searchResources(query, {
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
    });
  }

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 bg-[#fcf8fe]/80 backdrop-blur-xl border-b border-surface-variant/20">
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          {/* Brand */}
          <span className="text-xl font-bold text-on-surface font-headline tracking-tight whitespace-nowrap">
            Scholar Soft
          </span>

          {/* Search - hidden on mobile, shown on md+ */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>

        {/* Nav links - hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6 px-8">
          <a
            className="font-headline font-bold tracking-tight text-primary border-b-2 border-primary pb-1"
            href="#"
          >
            Explore
          </a>
          <a
            className="font-headline font-bold tracking-tight text-on-surface-variant hover:text-on-surface transition-colors"
            href="#"
          >
            Saved
          </a>
          <a
            className="font-headline font-bold tracking-tight text-on-surface-variant hover:text-on-surface transition-colors"
            href="#"
          >
            My Resources
          </a>
          <a
            className="font-headline font-bold tracking-tight text-on-surface-variant hover:text-on-surface transition-colors"
            href="#"
          >
            Analytics
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden md:flex p-2 hover:bg-surface-container transition-colors rounded-lg active:scale-95 duration-200">
            <span className="material-symbols-outlined text-on-surface-variant">
              notifications
            </span>
          </button>
          <button className="hidden md:flex p-2 hover:bg-surface-container transition-colors rounded-lg active:scale-95 duration-200">
            <span className="material-symbols-outlined text-on-surface-variant">
              settings
            </span>
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden ml-1 ring-2 ring-primary-container bg-primary-container flex items-center justify-center">
            <span className="text-xs font-bold text-on-primary-container">
              {userProfile.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          {/* Mobile nav */}
          <MobileNav
            activeFilters={activeFilters}
            onToggle={toggleFilter}
          />
        </div>
      </header>

      {/* Mobile search bar */}
      <div className="fixed top-16 left-0 right-0 z-40 px-4 py-2 bg-background/80 backdrop-blur-md md:hidden">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Main Content Layout */}
      <main className="flex flex-1 pt-16 overflow-hidden">
        {/* Left Panel: Filters & AI - hidden on mobile */}
        <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-surface-container-low flex-col">
          <FilterPanel
            activeFilters={activeFilters}
            onToggle={toggleFilter}
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
            <EventList resources={resources} loading={loading} />
          </div>
        </aside>
      </main>

    </div>
  );
}
