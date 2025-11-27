
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
    // Zaman aşımı kontrolcüsü (Render cold start için süreyi 90 saniyeye çıkardık)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const response = await fetch(`${API_BASE_URL}/api/info?url=${encodeURIComponent(url)}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId); // İşlem başarılıysa zaman sayacını durdur

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
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.warn("Sunucu yanıt vermedi (Zaman Aşımı - 90sn).");
        throw new Error("Sunucu uyanırken zaman aşımına uğradı. Lütfen 30 saniye sonra tekrar deneyin.");
      } else {
        console.warn("Backend bağlantısı başarısız, Demo moduna geçiliyor...", error);
      }
      // Backend hata verirse kullanıcıyı üzmemek için Demo'ya düşüyoruz.
    }
  }

  // 2. DEMO MODE (Backend yoksa veya hata verdiyse burası çalışır)
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeId = url.length % 10;
      resolve({
        id: `demo-${Date.now()}`,
        title: "Demo Video: Bağlantı Başarısız veya Backend Yok",
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
