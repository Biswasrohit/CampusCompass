"use client";

import { useState, useCallback } from "react";
import { ChatMessage, UserProfile, ChatResponse } from "@/types";

interface UseChatOptions {
  readonly onTopicsExtracted?: (topics: readonly string[]) => void;
}

export function useChat(options?: UseChatOptions) {
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string, userProfile: UserProfile) => {
      const userMessage: ChatMessage = { role: "user", content: text };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: [...messages, userMessage],
            userProfile,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = (await response.json()) as ChatResponse;
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.reply,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // If topics were extracted, notify the parent component
        if (data.extractedTopics && data.extractedTopics.length > 0) {
          options?.onTopicsExtracted?.(data.extractedTopics);
        }
      } catch {
        const errorMessage: ChatMessage = {
          role: "assistant",
          content: "Sorry, I couldn't process that. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    },
    [messages, options]
  );

  return { messages, loading, sendMessage };
}
