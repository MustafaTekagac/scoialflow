
import React from 'react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onOpenLegal }) => {
  const t = translations[lang];

  return (
    <footer className="w-full border-t border-white/5 bg-[#0f172a]/50 backdrop-blur-lg mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-2">SocialFlow</h4>
            <p className="text-gray-400 text-sm max-w-xs">
              {t.footer_desc}
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="hover:text-blue-400 transition-colors"
            >
              {t.privacy}
            </button>
            <button 
              onClick={() => onOpenLegal('terms')} 
              className="hover:text-blue-400 transition-colors"
            >
              {t.terms_of_service}
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-xs text-gray-600">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
