import { Serper } from "@langchain/community/tools/serper";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llm = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  model: "gemini-1.5-pro",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
});

export const serperTool = new Serper(process.env.NEXT_PUBLIC_SEARCH!);
