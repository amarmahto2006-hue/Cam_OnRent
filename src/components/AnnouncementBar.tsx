import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const AnnouncementBar: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-2 px-4 text-xs font-bold text-center flex items-center justify-center gap-2 relative z-50">
      <Sparkles className="w-3.5 h-3.5 shrink-0" />
      <span>🎉 LAUNCH OFFER: Flat ₹100 OFF on your first camera booking!</span>
      <button
        onClick={() => {
          soundFx.playShutterSound();
          openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black', notes: 'Claiming launch offer ₹100 OFF' });
        }}
        className="underline font-extrabold hover:text-slate-900 flex items-center gap-0.5 cursor-pointer"
      >
        <span>Claim Now</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-3 top-2 text-slate-900 hover:opacity-75"
        aria-label="Dismiss Announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
