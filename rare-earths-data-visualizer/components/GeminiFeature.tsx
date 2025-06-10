
import React, { useState, useCallback } from 'react';
import { generateText } from '../services/geminiService';
import { getGeminiContextSummary } from '../data'; // Import the context summary
import type { ChatMessage } from '../types';

const GeminiFeature: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dataContextSummary = getGeminiContextSummary();

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    const newUserMessage: ChatMessage = { role: 'user', text: userInput };
    setChatHistory(prev => [...prev, newUserMessage]);

    // Construct prompt with context
    const promptWithContext = `
Context:
${dataContextSummary}
---
Based on the context above, please answer the following question. If the answer is not in the context, say so.
Question: ${userInput}
    `;

    try {
      const responseText = await generateText(promptWithContext); // Pass only the current question with context. History can be managed if using `ai.chats.create`
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setChatHistory(prev => [...prev, modelMessage]);
    } catch (e: any) {
      setError(e.message || 'Failed to get response from Gemini.');
      const errorMessage: ChatMessage = { role: 'model', text: `Error: ${e.message || 'Failed to connect'}` };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  }, [userInput, dataContextSummary]);

  return (
    <div className="mt-4">
      <div className="mb-4 p-3 bg-slate-100 rounded-lg max-h-60 overflow-y-auto border border-slate-200">
        {chatHistory.length === 0 && <p className="text-sm text-slate-500">Ask a question about the displayed rare earths data. For example: "What was the trend in Neodymium Oxide prices?" or "Which country has the largest reserves?"</p>}
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded-md ${msg.role === 'user' ? 'bg-blue-100 text-blue-800 ml-auto' : 'bg-slate-200 text-slate-800 mr-auto'} max-w-[85%]`}>
            <p className="text-sm whitespace-pre-wrap"><strong>{msg.role === 'user' ? 'You' : 'Gemini'}:</strong> {msg.text}</p>
          </div>
        ))}
         {isLoading && (
          <div className="flex justify-center items-center p-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-600"></div>
            <p className="ml-2 text-sm text-slate-600">Gemini is thinking...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask Gemini..."
          className="flex-grow p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? 'Sending...' : 'Ask'}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {!process.env.API_KEY && <p className="text-orange-500 text-xs mt-2">Warning: Gemini API key (API_KEY) is not configured in environment variables. This feature may not work.</p>}
    </div>
  );
};

export default GeminiFeature;
