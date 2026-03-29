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
    <div className="pointer-events-none absolute bottom-4 left-1/2 z-[6] w-[min(92vw,540px)] -translate-x-1/2">
      <div className="pointer-events-auto rounded-2xl border border-white/25 bg-surface/80 p-4 shadow-panel backdrop-blur-xl">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <p className="font-headline text-[14px] font-bold text-on-surface italic">
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
