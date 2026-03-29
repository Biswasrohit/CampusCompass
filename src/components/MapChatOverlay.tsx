"use client";

import { ChatMessage, UserProfile } from "@/types";
import ChatInput from "./ChatInput";

interface MapChatOverlayProps {
  readonly messages: readonly ChatMessage[];
  readonly loading: boolean;
  readonly onSend: (message: string, userProfile: UserProfile) => void;
  readonly userProfile: UserProfile;
  readonly mode?: "panel" | "overlay";
}

const SUGGESTED_QUESTIONS = [
  "What are the best housing options near NYU?",
  "Where can I find on-campus food pantries?",
  "Explain how federal work-study works?",
];

export default function MapChatOverlay({
  messages,
  loading,
  onSend,
  userProfile,
  mode = "overlay",
}: MapChatOverlayProps) {

  // ── Right panel mode (desktop) ──
  if (mode === "panel") {
    return (
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <span className="font-headline text-[15px] font-bold text-on-surface italic flex-1">
            CampusCompass Assistant
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col h-full">
              <h3 className="font-headline text-base font-bold text-on-surface mb-4 leading-snug">
                What kind of support are you looking for?
              </h3>
              <div className="space-y-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => onSend(q, userProfile)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-surface-container-low/80 hover:bg-surface-container border border-outline-variant/20 hover:border-outline-variant/40 text-sm text-on-surface flex items-center justify-between gap-3 transition-all duration-150 group active:scale-[0.99]"
                  >
                    <span className="leading-snug">{q}</span>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface shrink-0 transition-colors" style={{ fontSize: "16px" }}>
                      chevron_right
                    </span>
                  </button>
                ))}
              </div>

              {/* Campus image */}
              <div className="mt-auto pt-4">
                <div className="rounded-2xl overflow-hidden h-32 bg-primary-container/30 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-surface-container to-primary-container/40 flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-primary/60" style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}>school</span>
                    <p className="text-xs text-on-surface/70 font-body">NYC Campus Resources</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="pt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
                    if (input.value.trim()) {
                      onSend(input.value.trim(), userProfile);
                      input.value = "";
                    }
                  }}
                  className="flex items-center gap-2 bg-surface-container-low/80 rounded-xl px-4 py-2.5 border border-outline-variant/25 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all"
                >
                  <input
                    name="q"
                    type="text"
                    placeholder="Ask a question..."
                    maxLength={500}
                    className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-dim transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>send</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <ChatInput
              messages={messages}
              loading={loading}
              onSend={(message) => onSend(message, userProfile)}
            />
          )}
        </div>
      </div>
    );
  }

  // ── Mobile overlay mode ──
  return (
    <div className="pointer-events-none absolute bottom-4 left-1/2 z-[6] w-[min(92vw,540px)] -translate-x-1/2">
      <div className="pointer-events-auto rounded-2xl border border-white/25 bg-surface/95 p-4 shadow-panel backdrop-blur-xl">
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
