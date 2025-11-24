import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// We assume process.env.API_KEY is available as per instructions.
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateSocialContent = async (
  videoTitle: string, 
  platform: string, 
  tone: string,
  language: 'en' | 'tr' = 'en'
): Promise<{ captions: string[], hashtags: string[] }> => {
  if (!ai) {
    console.error("Gemini API Key is missing.");
    return { captions: ["API Key missing"], hashtags: ["#error"] };
  }

  try {
    const langInstruction = language === 'tr' ? 'in Turkish' : 'in English';
    
    const prompt = `
      I have a video titled "${videoTitle}" intended for ${platform}.
      The desired tone is ${tone}.
      
      Please generate:
      1. 3 engaging captions (with emojis) ${langInstruction}.
      2. 15 relevant viral hashtags ${langInstruction}.
      
      Return the response in JSON format with keys: "captions" (array of strings) and "hashtags" (array of strings).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            captions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const jsonText = response.text || "{}";
    const parsed = JSON.parse(jsonText);
    
    return {
      captions: parsed.captions || [],
      hashtags: parsed.hashtags || []
    };

  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};

export const analyzeVideoIdea = async (description: string) => {
    if (!ai) return "API Key Missing";
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze this video idea: "${description}". Give 3 quick tips to make it more viral on TikTok/Reels.`
        });
        return response.text;
    } catch (e) {
        console.error(e);
        return "Failed to analyze.";
    }
}
