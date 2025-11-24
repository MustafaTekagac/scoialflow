import React from 'react';
import { VideoMetadata, Platform } from '../types';
import { Youtube, Instagram, TikTokIcon, Video } from './Icons';
import { Language, translations } from '../translations';

interface VideoCardProps {
  data: VideoMetadata;
  lang: Language;
}

const VideoCard: React.FC<VideoCardProps> = ({ data, lang }) => {
  const t = translations[lang];

  const getIcon = () => {
    switch (data.platform) {
      case Platform.YouTube: return <Youtube className="text-brand-youtube" />;
      case Platform.Instagram: return <Instagram className="text-brand-instagram" />;
      case Platform.TikTok: return <TikTokIcon className="text-brand-tiktok fill-current" />;
      default: return <Video className="text-gray-400" />;
    }
  };

  const getPlatformName = () => {
    switch (data.platform) {
      case Platform.YouTube: return t.platform_youtube;
      case Platform.TikTok: return t.platform_tiktok;
      case Platform.Instagram: return t.platform_instagram;
      default: return t.unknown_video;
    }
  };

  return (
    <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-6 animate-slide-up">
      <div className="relative group w-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
        <img 
          src={data.thumbnail} 
          alt={data.title} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-mono">
          {data.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            {getIcon()}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400 font-medium">
          {getIcon()}
          <span>{getPlatformName()}</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          <span>{data.author}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight line-clamp-2">
          {data.title}
        </h2>
        <div className="mt-auto">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {t.ready_to_process}
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
