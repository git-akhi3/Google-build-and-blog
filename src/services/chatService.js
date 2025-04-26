import { GoogleGenerativeAI } from "@google/generative-ai";
import historicalFigures from "../datasets/historical_figures.json";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Check if API key is available
if (!API_KEY) {
  console.error("Error: Gemini API key is missing. Please check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Updated model name - try these alternatives based on what's available
const MODEL_OPTIONS = [
  "gemini-1.5-pro",  // Try this first (newer model)
  "gemini-pro",      // Original model name
  "gemini-1.0-pro"   // Another possibility
];

// Simple in-memory cache for responses
const responseCache = new Map();
// Cache expiry time (30 minutes)
const CACHE_EXPIRY = 30 * 60 * 1000;

// Queue for handling requests with rate limiting
const requestQueue = [];
let isProcessing = false;
const RATE_LIMIT_DELAY = 6000; // 6 seconds between requests (10 per minute)
let lastRequestTime = 0;

const generatePrompt = (figure, userMessage) => {
  const figureData = historicalFigures.find(f => f.figure === figure);
  
  if (!figureData) {
    console.warn(`Historical figure data for "${figure}" not found.`);
    return `You are ${figure}. Respond as you think this historical figure would.
    
    User's message: ${userMessage}`;
  }
  
  return `You are ${figure} (${figureData.era}). ${figureData.context}

Roleplay Instructions:
1. Start each response with an emoji that matches my emotional reaction to the question
2. Embody me completely! Speak in first person as if you truly are ${figure}
3. Stay authentic to my era (${figureData.era}) and expertise in ${figureData.field}
4. Keep responses concise - maximum 100 words
5. Channel my personality traits: ${figureData.personality}
6. Sprinkle in my signature quirks: ${figureData.quirks}
7. Use appropriate wit and humor, especially about: ${figureData.humorTopics}
8. For events after my lifetime, respond with: "🤔 I lived before that — but it sounds fascinating!"

User's message: ${userMessage}`;
};

// Process the request queue
const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;
  
  isProcessing = true;
  
  // Rate limiting - ensure minimum delay between requests
  const now = Date.now();
  const timeToWait = Math.max(0, RATE_LIMIT_DELAY - (now - lastRequestTime));
  
  if (timeToWait > 0) {
    await new Promise(resolve => setTimeout(resolve, timeToWait));
  }
  
  const nextRequest = requestQueue.shift();
  try {
    const result = await nextRequest.execute();
    nextRequest.resolve(result);
  } catch (error) {
    nextRequest.reject(error);
  } finally {
    lastRequestTime = Date.now();
    isProcessing = false;
    // Process next request
    processQueue();
  }
};

// Try getting a list of available models
export const listAvailableModels = async () => {
  try {
    const models = await genAI.listModels();
    console.log("Available models:", models);
    return models;
  } catch (error) {
    console.error("Error listing models:", error);
    return null;
  }
};

// Handle API request with retries for rate limiting and model fallback
const makeApiRequest = async (prompt) => {
  // Try each model name until one works
  let lastError = null;
  
  for (const modelName of MODEL_OPTIONS) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      console.log(`Success with model: ${modelName}`);
      return result.response.text();
    } catch (error) {
      console.error(`Error with model ${modelName}:`, error);
      lastError = error;
      
      // If it's a rate limit error, retry with backoff
      if (error.message?.includes("429")) {
        const waitTime = 2000;
        console.log(`Rate limit hit. Waiting ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
      
      // If it's not a model not found error, don't try other models
      if (!error.message?.includes("404") && !error.message?.includes("not found")) {
        throw error;
      }
    }
  }
  
  // If we got here, all models failed
  throw lastError;
};

export const chatWithHistoricalFigure = async (message, selectedFigure = "Albert Einstein") => {
  try {
    if (!API_KEY) {
      throw new Error("Gemini API key is missing");
    }
    
    // Create cache key
    const cacheKey = `${selectedFigure}:${message}`;
    
    // Check cache first
    if (responseCache.has(cacheKey)) {
      const cached = responseCache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_EXPIRY) {
        console.log("Using cached response");
        return cached.response;
      } else {
        // Cache expired
        responseCache.delete(cacheKey);
      }
    }
    
    console.log(`Queueing message to ${selectedFigure}: "${message}"`);
    const prompt = generatePrompt(selectedFigure, message);
    
    // Add to queue and return promise
    return new Promise((resolve, reject) => {
      requestQueue.push({
        execute: () => makeApiRequest(prompt),
        resolve: (response) => {
          // Cache the successful response
          responseCache.set(cacheKey, {
            response,
            timestamp: Date.now()
          });
          resolve(response);
        },
        reject
      });
      
      // Start processing queue if not already running
      processQueue();
    });
  } catch (error) {
    console.error("Error in chat service:", error);
    
    // More detailed error message based on the error type
    if (error.message?.includes("API key")) {
      return "Configuration error: API key is missing or invalid. Please check your environment setup.";
    } else if (error.message?.includes("429") || (error.status === 429)) {
      return "I'm getting too many requests right now. Please try again in a minute.";
    } else if (error.message?.includes("404") || error.message?.includes("not found")) {
      return "Model not found error. Please check the console for available models and update your code.";
    } else if (error.status && error.status >= 400) {
      return `API error (${error.status}): ${error.message || "Unknown error"}`;
    } else {
      return "I apologize, but I'm having trouble responding at the moment. Please try again later.";
    }
  }
};

// Export this function to check available models
export const debugApiSetup = async () => {
  try {
    console.log("Testing API setup...");
    await listAvailableModels();
    return "API setup check complete. See console for details.";
  } catch (error) {
    console.error("API setup error:", error);
    return `API setup error: ${error.message}`;
  }
};