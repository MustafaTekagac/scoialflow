
import React, { useState } from 'react';
import { VideoMetadata } from './types';
import { fetchVideoMetadata } from './services/apiService';
import VideoCard from './components/VideoCard';
import Downloader from './components/Downloader';
import { LinkIcon, Loader2, Youtube, Instagram, TikTokIcon, Globe, Download } from './components/Icons';
import { Language, translations } from './translations';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import LegalModal from './components/LegalModal';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
  const [lang, setLang] = useState<Language>('tr'); 
  
  // State for Legal Modals
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const t = translations[lang];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const data = await fetchVideoMetadata(url);
      setVideoData(data);
    } catch (err: any) {
      setError(err.message || t.error_fetch);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard');
    }
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'tr' : 'en');
  };

  // Helper to get content based on active modal
  const getLegalContent = () => {
    switch (activeLegalModal) {
      case 'privacy': return { title: t.privacy_title, content: t.privacy_content };
      case 'terms': return { title: t.terms_title, content: t.terms_content };
      default: return { title: '', content: '' };
    }
  };

  const legalInfo = getLegalContent();

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black selection:bg-blue-500/30 text-white flex flex-col">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setVideoData(null); setUrl(''); }}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Download size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">SocialFlow</span>
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all text-sm font-medium text-gray-300 hover:text-white group"
             >
                <Globe size={14} className="group-hover:text-blue-400 transition-colors" />
                <span>{lang === 'tr' ? 'TR' : 'EN'}</span>
             </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 md:pt-32 px-4 max-w-3xl mx-auto w-full">
        
        {/* REKLAM ALANI (ÜST) */}
        <AdBanner position="top" />

        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-white">
            {t.hero_title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
            {t.hero_subtitle}
          </p>
        </div>

        {/* Input Section */}
        <div className="glass-panel p-2 rounded-2xl shadow-2xl shadow-blue-900/10 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <LinkIcon size={20} />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.input_placeholder}
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-4 pl-12 pr-16 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button 
                type="button"
                onClick={handlePaste}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title="Paste"
              >
                <span className="text-xs font-semibold px-1">{t.paste_btn}</span>
              </button>
            </div>
            <button
              type="submit"
              disabled={loading || !url}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-gray-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 min-w-[140px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : t.process_btn}
            </button>
          </form>
        </div>

        {/* Supported Platforms (Visual only) */}
        {!videoData && !loading && (
          <div className="flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/5 rounded-full"><Youtube size={24} /></div>
                <span className="text-xs font-medium">{t.platform_youtube}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/5 rounded-full"><TikTokIcon className="w-6 h-6" /></div>
                <span className="text-xs font-medium">{t.platform_tiktok}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/5 rounded-full"><Instagram size={24} /></div>
                <span className="text-xs font-medium">{t.platform_instagram}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center mb-8 animate-slide-up font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Results Section */}
        {videoData && (
          <div className="space-y-6 animate-slide-up">
            <VideoCard data={videoData} lang={lang} />

            {/* Content Area - Directly show downloader */}
            <div className="glass-panel p-6 rounded-2xl min-h-[200px]">
                <Downloader lang={lang} videoData={videoData} />
            </div>

             {/* REKLAM ALANI (ALT) */}
             <AdBanner position="bottom" />

          </div>
        )}
      </main>
      
      <Footer lang={lang} onOpenLegal={(type) => setActiveLegalModal(type)} />

      {/* Legal Modal */}
      <LegalModal 
        isOpen={!!activeLegalModal} 
        onClose={() => setActiveLegalModal(null)}
        title={legalInfo.title}
        content={legalInfo.content}
      />
    </div>
  );
}

export default App;
