
import React, { useState, useEffect } from 'react';
import { Download, Film, Music, Loader2, CheckCircle, Zap } from './Icons';
import { Language, translations } from '../translations';
import { VideoMetadata } from '../types';

interface DownloaderProps {
  lang: Language;
  videoData: VideoMetadata;
}

const Downloader: React.FC<DownloaderProps> = ({ lang, videoData }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    let interval: number;
    if (downloading) {
      setProgress(0);
      setCompleted(null);
      // İndirme simülasyonu (görsel efekt için)
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            executeDownload(downloading);
            setCompleted(downloading);
            setDownloading(null);
            return 100;
          }
          return prev + 10; // Hızlı ilerle
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [downloading]);

  const executeDownload = async (typeId: string) => {
    // 1. Eğer gerçek backend verisi varsa (videoData.downloadUrl)
    if (!videoData.isDemo) {
      const targetUrl = typeId === 'mp3' ? videoData.audioUrl : videoData.downloadUrl;
      
      if (targetUrl) {
        // Gerçek indirme linkine yönlendir
        const a = document.createElement('a');
        a.href = targetUrl;
        a.download = ''; // Tarayıcıya indirme emri ver
        a.target = '_blank'; // Bazı durumlarda yeni sekmede açmak gerekebilir
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
    }

    // 2. Eğer Demo modundaysak (Backend yoksa)
    const isAudio = typeId === 'mp3';
    const sampleVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
    const sampleAudioUrl = "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/bb/Test_ogg_mp3_48kbps.wav/Test_ogg_mp3_48kbps.wav.mp3";
    
    const downloadUrl = isAudio ? sampleAudioUrl : sampleVideoUrl;
    const filename = `socialflow-demo.${isAudio ? 'mp3' : 'mp4'}`;

    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert(t.demo_download_popup);
    } catch (e) {
      alert("Demo indirme hatası: " + e);
    }
  };

  const handleDownload = (type: string) => {
    if (downloading) return;
    setDownloading(type);
  };

  const options = [
    { id: '720p', label: 'MP4 Video', size: videoData.isDemo ? '...' : 'HD', format: 'MP4', icon: <Film size={18} /> },
    { id: 'mp3', label: t.audio_only, size: videoData.isDemo ? '...' : 'HQ', format: 'MP3', icon: <Music size={18} /> },
  ];

  return (
    <div className="space-y-4 animate-slide-up">
      {videoData.isDemo && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-start gap-3">
          <Zap className="text-yellow-500 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-yellow-200/80">
            <strong>Demo Modu Aktif:</strong> Şu an bir Backend sunucusuna bağlı değilsiniz. Linkler çalışmayacaktır. Lütfen `config.ts` dosyasına API adresini girin.
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
        <Download size={20} className="text-blue-400" /> {t.download_options}
      </h3>
      
      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleDownload(opt.id)}
            disabled={!!downloading}
            className={`
              relative overflow-hidden
              flex items-center justify-between p-4 rounded-xl border transition-all duration-300
              ${downloading === opt.id 
                ? 'bg-blue-600/20 border-blue-500/50' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }
              ${completed === opt.id ? 'border-green-500/50 bg-green-500/10' : ''}
            `}
          >
            {downloading === opt.id && (
              <div 
                className="absolute inset-0 bg-blue-500/10 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            )}

            <div className="flex items-center gap-4 z-10">
              <div className={`p-2 rounded-lg ${completed === opt.id ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-blue-400'}`}>
                {opt.icon}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">{opt.label}</div>
                <div className="text-xs text-gray-400">{opt.format} • {opt.size}</div>
              </div>
            </div>

            <div className="z-10">
              {downloading === opt.id ? (
                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                  <Loader2 size={16} className="animate-spin" />
                  {Math.round(progress)}%
                </div>
              ) : completed === opt.id ? (
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium animate-pulse">
                  <CheckCircle size={18} />
                  {t.saved}
                </div>
              ) : (
                <div className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-600/20">
                  {t.download_btn}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Downloader;
