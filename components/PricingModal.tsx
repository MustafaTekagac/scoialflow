import React from 'react';
import { Check, X, Crown, Sparkles, Zap } from './Icons';
import { Language, translations } from '../translations';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Free Tier */}
        <div className="flex-1 p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/5">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-300 mb-2">{t.plan_free}</h3>
            <p className="text-3xl font-bold text-white">₺0<span className="text-sm font-normal text-gray-500">/ay</span></p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-gray-400">
              <Check size={18} className="text-gray-500" /> {t.feature_720p}
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Check size={18} className="text-gray-500" /> {t.feature_speed}
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Check size={18} className="text-gray-500" /> {t.feature_ads}
            </li>
          </ul>

          <button className="w-full py-3 rounded-xl bg-white/5 text-gray-400 font-semibold cursor-not-allowed">
            {t.current_plan}
          </button>
        </div>

        {/* Pro Tier */}
        <div className="flex-1 p-8 flex flex-col relative overflow-hidden bg-gradient-to-b from-blue-900/20 to-purple-900/20">
          <div className="absolute top-0 right-0 p-3">
            <Crown className="text-yellow-400 opacity-20 rotate-12" size={100} />
          </div>

          <div className="mb-6 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold mb-3">
              <Sparkles size={12} fill="black" /> POPÜLER
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.plan_pro}</h3>
            <p className="text-3xl font-bold text-white">₺49<span className="text-sm font-normal text-gray-500">/ay</span></p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1 relative">
            <li className="flex items-center gap-3 text-white">
              <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={14} /></div>
              {t.feature_4k}
            </li>
            <li className="flex items-center gap-3 text-white">
              <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={14} /></div>
              {t.feature_fast}
            </li>
             <li className="flex items-center gap-3 text-white">
              <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={14} /></div>
              {t.feature_no_ads}
            </li>
          </ul>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-purple-900/30 transition-all transform hover:scale-[1.02]">
            {t.subscribe_btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;