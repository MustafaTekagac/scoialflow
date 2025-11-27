import React from 'react';
import { VideoMetadata } from '../types';
import { Language } from '../translations';

interface AIStudioProps {
  data: VideoMetadata;
  lang: Language;
}

const AIStudio: React.FC<AIStudioProps> = ({ data, lang }) => {
  // AI Features are disabled
  return null;
};

export default AIStudio;