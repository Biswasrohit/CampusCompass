"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/types";
import OnboardingCard from "@/components/OnboardingCard";
import Dashboard from "@/components/Dashboard";

interface WorkosUser {
  id: string;
  name: string;
  email: string;
}

interface ClientAppProps {
  readonly workosUser: WorkosUser;
}

function profileKey(userId: string) {
  return `campus-compass-profile:${userId}`;
}

function loadProfile(userId: string): UserProfile | null {
  try {
    const raw = localStorage.getItem(profileKey(userId));
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

function saveProfile(userId: string, profile: UserProfile) {
  try {
    localStorage.setItem(profileKey(userId), JSON.stringify(profile));
  } catch {
    // storage unavailable — silently ignore
  }
}

export default function ClientApp({ workosUser }: ClientAppProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = loadProfile(workosUser.id);
    if (saved) setUserProfile(saved);
    setReady(true);
  }, [workosUser.id]);

  function handleOnboardingSubmit(profile: UserProfile) {
    saveProfile(workosUser.id, profile);
    setTransitioning(true);
    setTimeout(() => {
      setUserProfile(profile);
    }, 400);
  }

  if (!ready) return null;

  if (userProfile) {
    return (
      <div className="animate-fade-in">
        <Dashboard userProfile={userProfile} />
      </div>
    );
  }

  return (
    <div
      className={`relative h-screen w-screen transition-opacity duration-[400ms] ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low via-background to-surface-container">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(73,74,219,1) 1px, transparent 1px), linear-gradient(90deg, rgba(73,74,219,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <OnboardingCard onSubmit={handleOnboardingSubmit} prefillName={workosUser.name} />
    </div>
  );
}
