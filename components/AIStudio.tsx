import React, { useState, useEffect } from 'react';
import { VideoMetadata } from '../types';
import { Sparkles, Copy, Loader2, Zap } from './Icons';
import { generateSocialContent } from '../services/geminiService';
import { Language, translations } from '../translations';

interface AIStudioProps {
  data: VideoMetadata;
  lang: Language;
}

const AIStudio: React.FC<AIStudioProps> = ({ data, lang }) => {
  const [toneKey, setToneKey] = useState<string>('tone_fun');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ captions: string[]; hashtags: string[] } | null>(null);

  const t = translations[lang];

  // Map keys to readable strings for current language
  const toneOptions = [
    { key: 'tone_fun', label: t.tone_fun },
    { key: 'tone_professional', label: t.tone_professional },
    { key: 'tone_informative', label: t.tone_informative },
    { key: 'tone_sarcastic', label: t.tone_sarcastic },
    { key: 'tone_minimalist', label: t.tone_minimalist },
  ];

  // Reset result when language changes if you want, or keep it.
  // Here we just update the tone labels in UI.

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Find the label for the current key to pass to the API (or pass the key if the API handles it, but service takes string)
      // We'll pass the English version or the localized version. Passing localized version is better for the model context.
      const selectedToneLabel = toneOptions.find(o => o.key === toneKey)?.label || 'Fun';
      
      const response = await generateSocialContent(data.title, data.platform, selectedToneLabel, lang);
      setResult(response);
    } catch (error) {
      console.error("Failed to generate content", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-5 rounded-2xl border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Sparkles className="text-purple-400" /> {t.ai_title}
        </h3>
        <p className="text-sm text-gray-300 mb-4">
            {t.ai_subtitle}
        </p>

        <div className="space-y-4">
            <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                    {t.select_tone}
                </label>
                <div className="flex flex-wrap gap-2">
                    {toneOptions.map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setToneKey(opt.key)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                toneKey === opt.key 
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
                {loading ? t.analyzing_content : t.generate_btn}
            </button>
        </div>
      </div>

      {result && (
        <div className="space-y-6 animate-slide-up">
            {/* Captions */}
            <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">{t.captions_title}</h4>
                <div className="grid gap-3">
                    {result.captions.map((caption, idx) => (
                        <div key={idx} className="group relative bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 transition-colors">
                            <p className="text-gray-200 text-sm leading-relaxed pr-8">{caption}</p>
                            <button 
                                onClick={() => copyToClipboard(caption)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hashtags */}
            <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">{t.hashtags_title}</h4>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-wrap gap-2">
                    {result.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer">
                            {tag}
                        </span>
                    ))}
                    <button 
                         onClick={() => copyToClipboard(result.hashtags.join(' '))}
                         className="ml-auto text-xs text-gray-500 hover:text-white flex items-center gap-1"
                    >
                        <Copy size={12} /> {t.copy_all}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AIStudio;
