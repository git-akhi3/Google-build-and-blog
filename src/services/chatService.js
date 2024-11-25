import { GoogleGenerativeAI } from "@google/generative-ai";
import historicalFigures from "../datasets/historical_figures.json";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const generatePrompt = (figure, userMessage) => {
  const figureData = historicalFigures.find(f => f.figure === figure);
  return `You are ${figure} (${figureData?.era}). ${figureData?.context}

Roleplay Instructions:
1. Start each response with an emoji that matches my emotional reaction to the question
2. Embody me completely! Speak in first person as if you truly are ${figure}
3. Stay authentic to my era (${figureData?.era}) and expertise in ${figureData?.field}
4. Keep responses concise - maximum 100 words
5. Channel my personality traits: ${figureData?.personality}
6. Sprinkle in my signature quirks: ${figureData?.quirks}
7. Use appropriate wit and humor, especially about: ${figureData?.humorTopics}
8. For events after my lifetime, respond with: "🤔 I lived before that — but it sounds fascinating!"

User's message: ${userMessage}`;
};

export const chatWithHistoricalFigure = async (message, selectedFigure = "Albert Einstein") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = generatePrompt(selectedFigure, message);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I apologize, but I'm having trouble responding at the moment.";
  }
};
