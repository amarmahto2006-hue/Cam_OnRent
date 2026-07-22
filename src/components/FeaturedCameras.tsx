import React, { useState } from 'react';
import { CAMERAS } from '../data/rentalData';
import { CameraItem } from '../types';
import { MessageCircle, Check, Info, Shield, Sparkles } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const FeaturedCameras: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<'daily' | 'weekend' | 'weekly' | 'monthly'>('daily');

  const getPrice = (camera: CameraItem) => {
    switch (selectedDuration) {
      case 'weekend':
        return { price: camera.weekendPrice, label: 'for 2 Days (48 hrs)', perDay: Math.round(camera.weekendPrice / 2) };
      case 'weekly':
        return { price: camera.weeklyPrice, label: 'for 7 Days (1 Wk)', perDay: Math.round(camera.weeklyPrice / 7) };
      case 'monthly':
        return { price: camera.monthlyPrice, label: 'for 30 Days (1 Mo)', perDay: Math.round(camera.monthlyPrice / 30) };
      case 'daily':
      default:
        return { price: camera.dailyPrice, label: 'per Day (24 hrs)', perDay: camera.dailyPrice };
    }
  };

  return (
    <section id="rentals" className="py-20 md:py-28 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Our Camera Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Choose Your <span className="text-amber-400">Content Beast</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            All cameras come with 2x Enduro batteries, 128GB MicroSD card, selfie stick & protective case free.
          </p>

          {/* Pricing Duration Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => {
                soundFx.playShutterSound();
                setSelectedDuration('daily');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedDuration === 'daily'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Daily (24h)
            </button>

            <button
              onClick={() => {
                soundFx.playShutterSound();
                setSelectedDuration('weekend');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedDuration === 'weekend'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekend (2 Days)
            </button>

            <button
              onClick={() => {
                soundFx.playShutterSound();
                setSelectedDuration('weekly');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedDuration === 'weekly'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly (7 Days)
            </button>

            <button
              onClick={() => {
                soundFx.playShutterSound();
                setSelectedDuration('monthly');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedDuration === 'monthly'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly (30 Days)
            </button>
          </div>
        </div>

        {/* Camera Card */}
        <div className="max-w-xl mx-auto">
          {CAMERAS.map((camera) => {
            const priceInfo = getPrice(camera);

            return (
              <div
                key={camera.id}
                className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div>
                  {/* Card Header & Badge */}
                  <div className="relative h-64 overflow-hidden bg-slate-950 flex items-center justify-center p-6">
                    {camera.badge && (
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-400 shadow-md">
                        {camera.badge}
                      </div>
                    )}

                    <img
                      src={camera.image}
                      alt={camera.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-extrabold font-heading text-white group-hover:text-amber-400 transition-colors">
                      {camera.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{camera.tagline}</p>

                    {/* Price Block */}
                    <div className="mt-5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-baseline justify-between">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold font-heading text-amber-400">
                            ₹{priceInfo.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{priceInfo.label}</span>
                        </div>
                        {selectedDuration !== 'daily' && (
                          <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                            Effective ₹{priceInfo.perDay}/day
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                          Security Deposit
                        </span>
                        <span className="text-xs font-bold text-slate-300">
                          ₹{camera.securityDeposit.toLocaleString('en-IN')} (Refundable)
                        </span>
                      </div>
                    </div>

                    {/* Specs Checklist */}
                    <div className="mt-6 space-y-2.5">
                      {camera.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 md:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      soundFx.playShutterSound();
                      openWhatsAppBooking({
                        cameraName: camera.name,
                        rentalPeriod: `${selectedDuration.toUpperCase()} (₹${priceInfo.price})`,
                      });
                    }}
                    className="flex-1 w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>BOOK ON WHATSAPP</span>
                  </button>

                  <a
                    href="#whatsapp-builder"
                    onClick={() => soundFx.playShutterSound()}
                    className="w-full sm:w-auto py-3.5 px-4 rounded-2xl font-semibold text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>CUSTOMIZE BUNDLE</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
