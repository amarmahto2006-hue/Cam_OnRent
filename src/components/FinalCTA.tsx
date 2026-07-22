import React from 'react';
import { MessageCircle, Phone, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/rentalData';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-mesh relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="glass-panel p-10 md:p-16 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/95">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Ready To Shoot 5.3K Cinema Content?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Book Your GoPro Camera Today <br className="hidden sm:inline" />
            <span className="text-amber-400">Available for Same-Day Pickup in Ramgarh</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Get fully charged batteries, sanitized gear, and complete accessory bundle starting at just ₹699/day.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => {
                soundFx.playShutterSound();
                openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/30 hover:scale-[1.03] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950 group-hover:rotate-12 transition-transform" />
              <span>BOOK ON WHATSAPP NOW</span>
            </button>

            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              onClick={() => soundFx.playShutterSound()}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-sm text-slate-200 bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call +91 6206618952</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-6 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Zero Hidden Charges
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              24/7 Ramgarh Support
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Instant Deposit Refund
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
