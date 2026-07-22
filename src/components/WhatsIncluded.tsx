import React from 'react';
import { CheckCircle2, Gift, ShieldCheck, Zap } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const WhatsIncluded: React.FC = () => {
  const items = [
    {
      title: 'Action Camera Body',
      desc: 'Tested GoPro Hero 12, Osmo 4 or Insta360 X3 in pristine condition.',
      retail: '₹45,000',
    },
    {
      title: '2x High-Capacity Enduro Batteries',
      desc: 'Cold-weather, high-capacity batteries so you never run out of charge on rides.',
      retail: '₹4,500',
    },
    {
      title: 'Dual USB-C Charger + Fast Cable',
      desc: 'Charge both batteries simultaneously overnight at your hotel or stay.',
      retail: '₹2,500',
    },
    {
      title: '128GB Extreme High-Speed MicroSD Card',
      desc: 'V30 4K/5.3K high write-speed memory card capable of 4+ hours continuous recording.',
      retail: '₹2,200',
    },
    {
      title: '3-Way Extendable Selfie Stick & Tripod',
      desc: 'Adjustable extension rod that converts into a sturdy tripod for group shots.',
      retail: '₹1,800',
    },
    {
      title: 'Protective Shockproof Hard Case',
      desc: 'Padded, waterproof travel case storing all equipment safely in your backpack.',
      retail: '₹1,500',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                <span>₹8,000+ Included Free Value Stack</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                Everything Included <span className="text-amber-400">In Every Rental</span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                We don’t charge extra for essential accessories. You receive a complete creator kit ready to shoot right out of the box!
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-amber-400">⚡ Zero Surprise Fees</p>
                <p>Everything listed on the right is standard with every single camera rental.</p>
              </div>

              <button
                onClick={() => {
                  soundFx.playShutterSound();
                  openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black Kit' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20"
              >
                BOOK COMPLETE KIT ON WHATSAPP
              </button>
            </div>

            {/* Right Stack Items Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <span className="text-[10px] font-bold text-slate-400 line-through">{item.retail}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
