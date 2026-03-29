"use client";

import { ChatMessage, UserProfile } from "@/types";
import ChatInput from "./ChatInput";

interface MapChatOverlayProps {
  readonly messages: readonly ChatMessage[];
  readonly loading: boolean;
  readonly onSend: (message: string, userProfile: UserProfile) => void;
  readonly userProfile: UserProfile;
}

export default function MapChatOverlay({
  messages,
  loading,
  onSend,
  userProfile,
}: MapChatOverlayProps) {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-[6] w-[min(92vw,560px)] -translate-x-1/2">
      <div className="pointer-events-auto rounded-3xl border border-white/30 bg-surface-container-lowest/75 p-4 shadow-2xl backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-base">auto_awesome</span>
          <p className="font-headline text-sm font-bold tracking-tight">
            Ask AI Mentor
          </p>
        </div>
        <ChatInput
          messages={messages}
          loading={loading}
          onSend={(message) => onSend(message, userProfile)}
        />
      </div>
    </div>
  );
}
