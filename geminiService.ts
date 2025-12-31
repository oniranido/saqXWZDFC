
import { GoogleGenAI, Type } from "@google/genai";

export const fetchTrendAndMetadata = async (niche: string, tone: string, format: string) => {
  // Always create a new instance right before the call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Find a high-velocity viral trend in the "${niche}" niche today. 
  Create a YouTube ${format} video concept based on this trend with a "${tone}" tone.
  Return your response as a JSON block with the following fields: 
  {
    "trendTopic": "the specific trend found",
    "title": "optimized title",
    "description": "optimized description",
    "hook": "the script hook"
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: For search grounding, the output might contain citations. 
        // We omit responseMimeType: "application/json" and responseSchema to prevent errors when combined with grounding.
      }
    });
    
    // Extraction: Search grounding may add citations outside the JSON structure.
    let text = response.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }
    
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.warn("Gemini: Failed to parse JSON, using defaults.");
      result = {};
    }

    // Guidelines: Always extract website URLs from groundingChunks and list them.
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      trendTopic: result.trendTopic || niche,
      title: result.title || `${niche} Mastery - Ep ${Math.floor(Math.random() * 100)}`,
      description: result.description || "Automated high-retention content generated via ViralGrowth AI.",
      hook: result.hook || "You won't believe what's happening in this niche today...",
      sources: sources
    };
  } catch (error) {
    console.error("Gemini Growth Error:", error);
    return {
      trendTopic: niche,
      title: `${niche} Mastery - Ep ${Math.floor(Math.random() * 100)}`,
      description: "Automated high-retention content generated via ViralGrowth AI.",
      hook: "You won't believe what's happening in this niche today...",
      sources: []
    };
  }
};
