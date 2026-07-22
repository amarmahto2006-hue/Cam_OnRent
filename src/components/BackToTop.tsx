import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFx.playShutterSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-slate-700 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      aria-label="Back to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
