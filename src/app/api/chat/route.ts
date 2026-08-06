import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Prepare conversation history for Gemini API format
    // We add a system prompt at the beginning to give the AI context.
    const systemPrompt = "You are ValarAI, the official, helpful, and friendly customer support AI for ValarPay (a fintech app for borderless banking, multi-currency accounts, and seamless transfers). Keep your answers concise, clear, and professional. Use emojis sparingly. If you don't know the answer, say you can connect them to human support via WhatsApp.";
    
    // Combine system prompt with user messages
    // The Gemini API requires a specific structure: { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Prepend the system instructions as the first user message, and a model acknowledgement
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ValarAI. How can I help you today?" }]
        },
        ...formattedMessages
      ]
    };

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
    }

    const data = await response.json();
    
    // Extract the text response from Gemini's payload
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request.";

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
