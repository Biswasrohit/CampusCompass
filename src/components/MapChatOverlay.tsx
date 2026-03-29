"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage, UserProfile } from "@/types";

interface MapChatOverlayProps {
  readonly messages: readonly ChatMessage[];
  readonly loading: boolean;
  readonly onSend: (message: string) => void;
  readonly userProfile: UserProfile;
}

export default function MapChatOverlay({
  messages,
  loading,
  onSend,
  userProfile,
}: MapChatOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSend(input.trim());
      setInput("");
    }
  }

  return (
    <div
      className={`absolute bottom-6 right-6 z-[10] transition-all duration-300 ease-in-out ${
        isExpanded
          ? "w-80 h-96"
          : "w-14 h-14 hover:scale-105"
      }`}
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full h-full rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center transition-all active:scale-95"
          aria-label="Open AI Chat"
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
        </button>
      ) : (
        <div className="w-full h-full bg-surface-container-lowest rounded-2xl shadow-xl flex flex-col overflow-hidden border border-surface-variant">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary-container border-b border-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-primary-container">
                smart_toy
              </span>
              <span className="font-semibold text-on-primary-container text-sm">
                AI Assistant
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-surface-container rounded-full transition-colors"
              aria-label="Close chat"
            >
              <span className="material-symbols-outlined text-on-primary-container text-lg">
                close
              </span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-on-surface-variant text-sm py-8">
                <p>Hi {userProfile.fullName.split(" ")[0]}!</p>
                <p className="mt-1">Ask me about scholarships, resources, or career opportunities.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-on-primary rounded-br-md"
                      : "bg-surface-container text-on-surface rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-container px-3 py-2 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-surface-variant bg-surface-container-low flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              maxLength={500}
              className="min-w-0 flex-1 rounded-lg bg-surface-container border-none px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="shrink-0 rounded-lg bg-primary p-2 text-on-primary transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
