"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { UserProfile, Resource } from "@/types";
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
    <div className="flex h-full w-full items-center justify-center bg-surface-container-low/50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-on-surface/70">Loading map...</span>
      </div>
    </div>
  ),
});

type DashboardView = "explore" | "resources" | "analytics" | "profile";

interface DashboardProps {
  readonly userProfile: UserProfile;
}

const PINNED_STORAGE_KEY = "scholar-soft-pinned";

// Central Park background
const BG_PHOTO = "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1920&q=85&auto=format&fit=crop";

// Default NYC pins shown on the map before search results load
const SEED_MAP_RESOURCES: import("@/types").Resource[] = [
  { id: "_s1", title: "NYU Financial Aid Office", description: "Scholarships, grants, and work-study for NYU students.", url: "https://www.nyu.edu/financial-aid", category: "scholarships", lat: 40.7295, lng: -73.9965, location: "Greenwich Village", date: null },
  { id: "_s2", title: "CUNY Scholarship Hub", description: "Scholarship and aid resources across all CUNY campuses.", url: "https://www.cuny.edu", category: "scholarships", lat: 40.7527, lng: -73.9772, location: "Midtown", date: null },
  { id: "_s3", title: "NYU Wellness Exchange", description: "24/7 mental health counseling and crisis support.", url: "https://www.nyu.edu/wellnessexchange", category: "mental-health", lat: 40.729, lng: -73.998, location: "Washington Square", date: null },
  { id: "_s4", title: "Columbia Counseling", description: "Counseling and psychological services for Columbia students.", url: "https://health.columbia.edu/counseling", category: "mental-health", lat: 40.8075, lng: -73.9626, location: "Morningside Heights", date: null },
  { id: "_s5", title: "City Harvest", description: "NYC's largest food rescue and community pantry network.", url: "https://www.cityharvest.org", category: "food-security", lat: 40.7549, lng: -73.984, location: "Hell's Kitchen", date: null },
  { id: "_s6", title: "Food Bank For NYC", description: "Emergency food assistance and pantry locations.", url: "https://www.foodbanknyc.org", category: "food-security", lat: 40.7614, lng: -73.9776, location: "Midtown East", date: null },
  { id: "_s7", title: "NYC Housing Connect", description: "Affordable housing lottery applications and tenant resources.", url: "https://housingconnect.nyc.gov", category: "housing", lat: 40.7128, lng: -74.006, location: "Lower Manhattan", date: null },
  { id: "_s8", title: "Fordham Career Center", description: "Career coaching, internship listings, and recruiting events.", url: "https://www.fordham.edu/careers", category: "career-prep", lat: 40.8617, lng: -73.886, location: "The Bronx", date: null },
];

export default function Dashboard({ userProfile }: DashboardProps) {
  const {
    resources,
    loading,
    activeFilters,
    fetchResources,
    searchResources,
    toggleFilter,
  } = useResources();

  const [currentQuery, setCurrentQuery] = useState<string | undefined>(undefined);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>("explore");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<ReadonlySet<string>>(new Set());
  const [showAvatarCard, setShowAvatarCard] = useState(false);
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState<string>(userProfile.school);

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

  const locationInfo = getLocationByName(selectedLocation) ?? getSchoolByName(userProfile.school);
  const center: [number, number] = locationInfo
    ? [locationInfo.lat, locationInfo.lng]
    : [40.7128, -74.006];

  useEffect(() => {
    fetchResources({
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
      searchLocation: selectedLocation,
    });
  }, [fetchResources, userProfile, selectedLocation]);

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


  function handleSearch(query: string) {
    setCurrentQuery(query || undefined);
    searchResources(query, {
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
      searchLocation: selectedLocation,
    });
  }

  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

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

  // Close avatar card on outside click
  useEffect(() => {
    if (!showAvatarCard) return;
    function handler(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setShowAvatarCard(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showAvatarCard]);

  return (
    <div className="flex h-screen flex-col overflow-hidden relative">

      {/* ── Background photo ── */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BG_PHOTO}')` }}
      />
      {/* Warm overlay so text stays readable */}
      <div className="fixed inset-0 z-0 bg-[#1C1917]/70" />

      {/* ── Top Navigation Bar ── */}
      <header className="fixed top-0 w-full z-50 flex items-center gap-3 px-4 md:px-6 h-[60px] bg-surface/95 backdrop-blur-xl border-b border-white/10">
        {/* Brand */}
        <button
          type="button"
          onClick={() => setActiveView("explore")}
          className="flex items-center gap-2 shrink-0"
        >
          <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="globe-clip">
                <circle cx="50" cy="50" r="40"/>
              </clipPath>
            </defs>
            <circle cx="50" cy="50" r="40" fill="#EBF4F0"/>
            <g clipPath="url(#globe-clip)" stroke="#B8D5C8" strokeWidth="2.5" fill="none">
              <line x1="0" y1="26" x2="100" y2="26"/>
              <line x1="0" y1="38" x2="100" y2="38"/>
              <line x1="0" y1="50" x2="100" y2="50"/>
              <line x1="0" y1="62" x2="100" y2="62"/>
              <line x1="0" y1="74" x2="100" y2="74"/>
              <line x1="26" y1="0" x2="26" y2="100"/>
              <line x1="38" y1="0" x2="38" y2="100"/>
              <line x1="50" y1="0" x2="50" y2="100"/>
              <line x1="62" y1="0" x2="62" y2="100"/>
              <line x1="74" y1="0" x2="74" y2="100"/>
            </g>
            <circle cx="50" cy="50" r="40" stroke="#2A5C45" strokeWidth="8" fill="none"/>
            <path d="M50 3 L56 44 L97 50 L56 56 L50 97 L44 56 L3 50 L44 44 Z" fill="#2A5C45"/>
            <circle cx="50" cy="50" r="5" fill="white"/>
          </svg>
          <span className="font-headline text-[17px] font-bold text-on-surface">
            CampusCompass
          </span>
        </button>

        {/* Nav links — centered */}
        <div className="hidden lg:flex flex-1 justify-center">
          <AppNav activeView={activeView} onChangeView={setActiveView} />
        </div>

        {/* Avatar + sign-out */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative" ref={avatarRef}>
            <button
              type="button"
              onClick={() => setShowAvatarCard((v) => !v)}
              className="flex items-center gap-2.5 rounded-full px-1.5 py-1 hover:bg-surface-container/60 transition-colors duration-150"
            >
              <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center ring-2 ring-primary-container/50">
                <span className="text-xs font-bold text-on-primary-container leading-none">
                  {userProfile.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-[12px] font-semibold text-on-surface leading-tight">{userProfile.fullName}</p>
                <p className="text-[10px] text-on-surface-variant leading-tight">{userProfile.school}</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant hidden md:block" style={{fontSize: "14px"}}>expand_more</span>
            </button>

            {showAvatarCard && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-surface/95 backdrop-blur-xl border border-white/20 shadow-panel p-3 animate-scale-in z-50">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-outline-variant/20">
                  <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
                    <span className="text-sm font-bold text-on-primary-container">
                      {userProfile.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface font-headline">{userProfile.fullName}</p>
                    <p className="text-xs text-on-surface-variant">{userProfile.school}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowAvatarCard(false); setShowEditProfile(true); }}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-surface-container text-sm text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-on-surface-variant">edit_square</span>
                  Edit Preferences
                </button>
                <a
                  href="/api/auth/sign-out"
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-surface-container text-sm text-on-surface transition-colors mt-0.5"
                >
                  <span className="material-symbols-outlined text-base text-on-surface-variant">logout</span>
                  Sign Out
                </a>
              </div>
            )}
          </div>

          <MobileNav activeFilters={activeFilters} onToggle={toggleFilter} />
        </div>
      </header>

      {/* ── Mobile search + tabs ── */}
      <div className="fixed top-[60px] left-0 right-0 z-40 px-4 py-2 bg-surface/95 backdrop-blur-lg border-b border-white/10 md:hidden">
        <SearchBar onSearch={handleSearch} loading={loading} />
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {(["explore", "resources", "analytics"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setActiveView(view)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeView === view
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface/80"
              }`}
            >
              {view === "explore" ? "Explore" : view === "resources" ? "Saved" : "Insights"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      {activeView === "explore" ? (
        <main className="flex flex-1 pt-[60px] overflow-hidden relative z-10">

          {/* LEFT: Filter Panel — frosted glass */}
          <aside
            className={`hidden md:flex fixed left-0 top-[60px] bottom-0 flex-col border-r border-white/10 bg-surface/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
              filterCollapsed ? "w-0 border-r-0" : "w-[272px]"
            }`}
          >
            <div className="w-[272px] h-full overflow-y-auto hide-scrollbar">
              <FilterPanel
                activeFilters={activeFilters}
                onToggle={toggleFilter}
                selectedLocation={selectedLocation}
                onLocationChange={handleLocationChange}
                onRefresh={handleRefreshSearch}
                loading={loading}
                collapsed={filterCollapsed}
                onToggleCollapse={() => setFilterCollapsed((v) => !v)}
              />
            </div>
          </aside>

          {/* Filter collapse/expand tab — always visible, sits at the panel edge */}
          <button
            onClick={() => setFilterCollapsed((v) => !v)}
            className={`hidden md:flex fixed top-1/2 -translate-y-1/2 z-30 w-5 h-14 bg-surface/95 backdrop-blur-sm border border-white/20 rounded-r-xl items-center justify-center hover:bg-surface-container transition-all duration-300 shadow-sm ${
              filterCollapsed ? "left-0" : "left-[272px]"
            }`}
            aria-label={filterCollapsed ? "Open filters" : "Close filters"}
          >
            <span
              className="material-symbols-outlined text-on-surface-variant transition-transform duration-300"
              style={{ fontSize: "13px", transform: filterCollapsed ? "rotate(0deg)" : "rotate(180deg)" }}
            >
              chevron_right
            </span>
          </button>

          {/* CENTER: Map + Resource List */}
          <section
            className={`md:mr-[300px] flex-1 flex flex-col overflow-hidden p-3 md:p-4 gap-3 mt-[52px] md:mt-0 transition-all duration-300 ${
              filterCollapsed ? "md:ml-0" : "md:ml-[272px]"
            }`}
          >
            {/* Map container */}
            <div className="relative flex-none rounded-2xl overflow-hidden shadow-panel" style={{ height: "55%" }}>
              <MapView resources={resources.length > 0 ? resources : SEED_MAP_RESOURCES} center={center} />

              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-[5]">
                <button className="w-9 h-9 bg-surface-container-lowest/95 backdrop-blur-sm rounded-xl shadow-card flex items-center justify-center hover:bg-primary hover:text-on-primary text-on-surface transition-colors duration-150 active:scale-95 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
                <button className="w-9 h-9 bg-surface-container-lowest/95 backdrop-blur-sm rounded-xl shadow-card flex items-center justify-center hover:bg-primary hover:text-on-primary text-on-surface transition-colors duration-150 active:scale-95 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-base">remove</span>
                </button>
              </div>

              {/* Mobile chat overlay */}
              <div className="md:hidden">
                <MapChatOverlay
                  messages={messages}
                  loading={chatLoading}
                  onSend={sendMessage}
                  userProfile={userProfile}
                  mode="overlay"
                />
              </div>
            </div>

            {/* Resource list below map — frosted glass */}
            <div className="flex-1 overflow-hidden rounded-2xl bg-surface/95 backdrop-blur-xl border border-white/15 shadow-card flex flex-col">
              <div className="px-3 pt-3 pb-2 shrink-0">
                <SearchBar onSearch={handleSearch} loading={loading} />
              </div>
              <EventList
                resources={resources}
                loading={loading}
                currentQuery={currentQuery}
                onReset={handleResetToGeneric}
                selectedLocation={selectedLocation}
                pinnedIds={pinnedIds}
                onTogglePinned={handleTogglePinned}
                onCategorySearch={(cat) => handleSearch(cat.replace("-", " "))}
              />
            </div>

            {/* Mobile bottom sheet toggle */}
            <button
              onClick={() => setShowBottomSheet(!showBottomSheet)}
              className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary text-on-primary px-5 py-2.5 text-xs font-semibold shadow-button transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
            >
              {showBottomSheet ? "Show Map" : `View Resources (${resources.length})`}
            </button>
          </section>

          {/* RIGHT: Chat Panel (desktop only) */}
          <aside className="hidden md:flex fixed right-0 top-[60px] bottom-0 w-[300px] flex-col bg-surface/95 backdrop-blur-xl border-l border-white/10">
            <MapChatOverlay
              messages={messages}
              loading={chatLoading}
              onSend={sendMessage}
              userProfile={userProfile}
              mode="panel"
            />
          </aside>

          {/* Mobile bottom sheet */}
          {showBottomSheet && (
            <aside className="fixed inset-x-0 bottom-0 z-30 h-[60vh] animate-slide-in-bottom rounded-t-3xl shadow-panel bg-surface/95 backdrop-blur-xl md:hidden">
              <div className="flex justify-center py-2">
                <div className="h-1 w-8 rounded-full bg-outline-variant" />
              </div>
              <div ref={bottomSheetRef} className="flex-1 overflow-hidden h-full">
                <EventList
                  resources={resources}
                  loading={loading}
                  currentQuery={currentQuery}
                  onReset={handleResetToGeneric}
                  selectedLocation={selectedLocation}
                  pinnedIds={pinnedIds}
                  onTogglePinned={handleTogglePinned}
                  onCategorySearch={(cat) => handleSearch(cat.replace("-", " "))}
                />
              </div>
            </aside>
          )}
        </main>
      ) : (
        <main className="min-h-0 flex-1 overflow-hidden px-4 pb-4 pt-24 md:px-6 md:pt-20 relative z-10">
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
                pinnedResources={pinnedResources}
                exploredCount={resources.length}
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
