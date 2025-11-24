import { Platform, VideoMetadata } from '../types';

// Detect platform from URL
export const detectPlatform = (url: string): Platform => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return Platform.YouTube;
  if (url.includes('tiktok.com')) return Platform.TikTok;
  if (url.includes('instagram.com')) return Platform.Instagram;
  return Platform.Unknown;
};

// Simulate fetching video data since we don't have a real scraping backend
export const fetchVideoMetadata = async (url: string): Promise<VideoMetadata> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const platform = detectPlatform(url);
      
      if (platform === Platform.Unknown) {
        reject(new Error("Unsupported URL. Please use YouTube, TikTok, or Instagram."));
        return;
      }

      // Generate a deterministic but fake ID based on URL length to vary images slightly
      const fakeId = url.length % 10;
      
      resolve({
        id: `vid-${Date.now()}`,
        title: "Amazing Content | Viral Video 2024 (Official)",
        thumbnail: `https://picsum.photos/800/450?random=${fakeId}`,
        duration: "03:45",
        author: "@SocialCreator",
        platform: platform,
        url: url
      });
    }, 1500); // Simulate network delay
  });
};