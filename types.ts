
export enum Platform {
  YouTube = 'YOUTUBE',
  TikTok = 'TIKTOK',
  Instagram = 'INSTAGRAM',
  Unknown = 'UNKNOWN'
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: Platform;
  url: string;
  // Backend'den gelecek gerçek indirme linkleri:
  downloadUrl?: string; 
  audioUrl?: string;
  isDemo?: boolean; // Verinin gerçek mi yoksa demo mu olduğunu anlamak için
}

export interface DownloadOption {
  id: string;
  label: string;
  format: string;
  size: string;
  icon: any;
}

export enum Tab {
  Download = 'DOWNLOAD'
}
