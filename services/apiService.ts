
import { Platform, VideoMetadata } from '../types';
import { API_BASE_URL, DEMO_DELAY } from '../config';

// Detect platform from URL
export const detectPlatform = (url: string): Platform => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return Platform.YouTube;
  if (url.includes('tiktok.com')) return Platform.TikTok;
  if (url.includes('instagram.com')) return Platform.Instagram;
  return Platform.Unknown;
};

// Main function to fetch video data
export const fetchVideoMetadata = async (url: string): Promise<VideoMetadata> => {
  const platform = detectPlatform(url);
  
  if (platform === Platform.Unknown) {
    throw new Error("Desteklenmeyen Link. Lütfen YouTube, TikTok veya Instagram linki kullanın.");
  }

  // 1. REAL BACKEND MODE
  // Eğer config.ts içinde API_BASE_URL tanımlıysa gerçek sunucuya istek atar.
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/info?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error("Sunucudan veri alınamadı.");
      const data = await response.json();
      
      // Backend'den gelen formatı VideoMetadata tipine çeviriyoruz
      return {
        id: data.id || `vid-${Date.now()}`,
        title: data.title,
        thumbnail: data.thumbnail,
        duration: data.duration,
        author: data.author,
        platform: platform,
        url: url,
        downloadUrl: data.download_url, // Backend'den gelen MP4 linki
        audioUrl: data.audio_url,       // Backend'den gelen MP3 linki
        isDemo: false
      };
    } catch (error) {
      console.warn("Backend bağlantısı başarısız, Demo moduna geçiliyor...", error);
      // Backend hata verirse kullanıcıyı üzmemek için Demo'ya düşebiliriz veya hatayı fırlatabiliriz.
      // Şimdilik demo'ya düşürelim:
    }
  }

  // 2. DEMO MODE (Backend yoksa burası çalışır)
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeId = url.length % 10;
      resolve({
        id: `demo-${Date.now()}`,
        title: "Demo Video: Gerçek İndirme İçin Backend Gerekli",
        thumbnail: `https://picsum.photos/800/450?random=${fakeId}`,
        duration: "00:30",
        author: "@DemoUser",
        platform: platform,
        url: url,
        isDemo: true
      });
    }, DEMO_DELAY);
  });
};
