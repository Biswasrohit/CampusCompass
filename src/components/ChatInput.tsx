"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChatMessage } from "@/types";

function parseBoldSegments(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function formatMessage(content: string): ReactNode {
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  const blocks: ReactNode[] = [];
  let bulletGroup: ReactNode[] = [];

  const flushBullets = () => {
    if (bulletGroup.length > 0) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="my-1 space-y-1 pl-3">
          {bulletGroup}
        </ul>
      );
      bulletGroup = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const bulletMatch = trimmed.match(/^[-•]\s+(.*)/);

    if (bulletMatch) {
      bulletGroup.push(
        <li key={`li-${i}`} className="flex gap-1.5">
          <span className="mt-0.5 shrink-0 text-[10px] text-on-surface-variant">
            •
          </span>
          <span>{parseBoldSegments(bulletMatch[1])}</span>
        </li>
      );
    } else {
      flushBullets();
      blocks.push(
        <p key={`p-${i}`} className={blocks.length > 0 ? "mt-1.5" : ""}>
          {parseBoldSegments(trimmed)}
        </p>
      );
    }
  }
  flushBullets();

  return <>{blocks}</>;
}

interface ChatInputProps {
  readonly messages: readonly ChatMessage[];
  readonly loading: boolean;
  readonly onSend: (message: string) => void;
}

export default function ChatInput({
  messages,
  loading,
  onSend,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex-1 space-y-3 overflow-y-auto"
      >
        {messages.length === 0 && (
          <p className="text-center text-xs text-on-surface-variant">
            Ask about resources near your school...
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface"
              }`}
            >
              {msg.role === "assistant"
                ? formatMessage(msg.content)
                : msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-xl bg-surface-container px-3 py-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-surface-variant" />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-surface-variant"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-surface-variant"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          maxLength={500}
          className="min-w-0 flex-1 rounded-lg bg-surface-container border-none px-3 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="shrink-0 rounded-lg bg-primary p-2 text-on-primary transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
        >
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </form>
    </div>
  );
}
