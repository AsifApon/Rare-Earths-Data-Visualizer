
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(
    "Gemini API key not found. Please set the API_KEY environment variable."
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" }); // Fallback for environments where process.env might not be populated, though this is not ideal.

const model = ai.models;

export const generateText = async (prompt: string, history: ChatMessage[] = []): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }

  try {
     // For chat-like interactions, it's better to use the chat interface if multi-turn is complex.
     // For single Q&A based on context, generateContent is fine.
    const fullPrompt = `${history.map(msg => `${msg.role}: ${msg.text}`).join('\n')}\nuser: ${prompt}\nmodel:`;
    
    const response: GenerateContentResponse = await model.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: [{ role: "user", parts: [{text: prompt}] }], // Simplified for single turn context
        // If using history for context:
        // contents: [...history.map(m => ({role: m.role, parts: [{text: m.text}]})), {role: "user", parts: [{text: prompt}]}],
        // config: { // Add any specific config if needed
        //   temperature: 0.7,
        // }
    });
    
    const text = response.text;
    if (text) {
      return text;
    }
    return "No response text from Gemini.";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      return `Error from Gemini: ${error.message}`;
    }
    return "An unknown error occurred while contacting Gemini.";
  }
};
