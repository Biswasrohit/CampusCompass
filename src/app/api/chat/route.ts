import { NextResponse } from "next/server";
import { chatWithGemini } from "@/lib/gemini";
import { ChatRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;

    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    if (body.message.length > 500) {
      return NextResponse.json(
        { error: "Message too long (max 500 characters)" },
        { status: 400 },
      );
    }

    if (body.history && body.history.length > 50) {
      return NextResponse.json(
        { error: "Chat history too long" },
        { status: 400 },
      );
    }

    const chatResponse = await chatWithGemini(
      body.message,
      body.history ?? [],
      body.userProfile,
    );

    return NextResponse.json(chatResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get response. Please try again." },
      { status: 500 },
    );
  }
}
