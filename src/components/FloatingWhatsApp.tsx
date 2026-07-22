import React from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Badge */}
      <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700/80 shadow-xl backdrop-blur-md animate-pulse">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Quick Booking 24/7</span>
      </div>

      <button
        onClick={() => {
          soundFx.playShutterSound();
          openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black' });
        }}
        className="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Book on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30"></span>
        <MessageCircle className="w-7 h-7 fill-slate-950 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
