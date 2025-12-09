import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAssistantResponse = async (
  query: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware system instruction
    const systemInstruction = `
      You are an intelligent academic assistant for students at Central South University of Forestry and Technology (CSUFT), specifically in Tourism Management and National Park Management.
      
      Your Role:
      1. Interpret government policies (culture, tourism, forestry).
      2. Summarize academic concepts related to ecotourism and park management.
      3. Suggest research topics or methodology.
      
      Tone: Professional, academic, yet encouraging.
      Language: Simplified Chinese (unless asked otherwise).
      
      Constraint: Keep answers concise (under 200 words) as you are in a chat interface.
    `;

    // Convert history to format if needed, but for simple QA we might just push context to prompt
    // For this implementation, we use a fresh generateContent with system instruction
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the academic server right now. Please try again later.";
  }
};
