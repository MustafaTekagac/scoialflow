import React from 'react';
import { X } from './Icons';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Content Container */}
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl animate-slide-up max-h-[80vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-black/20 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
          >
            Kapat / Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;