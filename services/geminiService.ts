// AI Features are currently disabled in this version.
// This file is kept as a placeholder to prevent build errors in legacy components.

export const generateSocialContent = async (
  videoTitle: string, 
  platform: string, 
  tone: string,
  language: 'en' | 'tr' = 'en'
): Promise<{ captions: string[], hashtags: string[] }> => {
  return {
    captions: [],
    hashtags: []
  };
};

export const analyzeVideoIdea = async (description: string) => {
    return "AI Feature Disabled";
}