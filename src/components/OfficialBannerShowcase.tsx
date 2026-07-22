import React from 'react';

import { Sparkles, ShieldCheck, CheckCircle2, MessageCircle, Phone, Award, Zap, Camera, Star } from 'lucide-react';
import { CamOnRentLogo } from './CamOnRentLogo';
import { BUSINESS_CONFIG } from '../data/rentalData';
import { soundFx } from '../utils/audio';
import { openWhatsAppBooking } from '../utils/whatsapp';

export const OfficialBannerShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-[#0B0F19] relative overflow-hidden border-t border-b border-white/10">
      {/* Glow Effects */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-blue-600/20 via-amber-500/20 to-emerald-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-3 backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span>OFFICIAL BRANDED GEAR & PACKAGING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            Official CamOnRent Banner & Branded Kit
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl">
            Every GoPro HERO 12 Black comes sanitized, fully tested, and packed in our signature heavy-duty protective carry kit with official accessories.
          </p>
        </div>

        {/* Banner Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Branded Hero Box Showcase (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative group">
            {/* Corner Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 z-20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sanitized & QC Tested</span>
            </div>

            {/* Branded Box Representation */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex flex-col items-center justify-between p-6 shadow-inner">
              {/* Box Top Header */}
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
                <CamOnRentLogo size={42} showText={false} />
                <div className="text-right">
                  <span className="text-xs font-black text-amber-400 block tracking-wider">CAMONRENT</span>
                  <span className="text-[10px] text-white/50 block uppercase font-mono">RAMGARH EDITION</span>
                </div>
              </div>

              {/* Box Main Product Graphic */}
              <div className="relative my-4 flex flex-col items-center text-center">
                <div className="relative z-10 w-48 h-48 rounded-3xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 border-2 border-amber-500/80 p-2 shadow-2xl shadow-blue-500/20 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <img
                    src="https://i.ibb.co/xqMmZv5s/02-Hero-3-D-Model-Go-Pro-HERO12.png"
                    alt="GoPro HERO 12 Black Official Model"
                    className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(245,158,11,0.4)]"
                  />
                </div>

                {/* Ambient glow behind box graphic */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-amber-500/30 to-emerald-500/30 blur-2xl rounded-full" />
              </div>

              {/* Box Specs Footer */}
              <div className="w-full grid grid-cols-2 gap-2 text-[11px] text-white/70 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>5.3K HDR Video</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HyperSmooth 6.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Waterproof 33ft</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2x Enduro Battery</span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-4 flex items-center justify-between text-xs text-white/60">
              <span className="flex items-center gap-1.5 font-semibold">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>4.9 Star Verified Rental Experience</span>
              </span>
              <span className="font-bold text-amber-400">Ramgarh, JH</span>
            </div>
          </div>

          {/* Right Column: Cinematic Splash Banner Graphic (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-r from-blue-950/60 via-slate-900 to-amber-950/40 p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            {/* Background Water Reflection & Neon Glow Graphic Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-amber-500/10 pointer-events-none" />

            {/* Top Row: Brand Lockup & Tagline */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <CamOnRentLogo size={52} showText={true} />
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">
                  PREMIUM ACTION CAMERA RENTAL • BARLONG, RAMGARH
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Capture Every Adventure in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">5.3K Ultra HD</span> Quality
                </h3>
                <p className="mt-2 text-sm sm:text-base text-white/70">
                  Ready for Patratu Valley rides, waterfall treks, and wedding shoots. Zero heavy deposits with original ID proof!
                </p>
              </div>
            </div>

            {/* Middle Feature Highlights */}
            <div className="relative z-10 grid grid-cols-3 gap-3 my-6">
              <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                <span className="block text-lg font-black text-amber-400">₹699</span>
                <span className="text-[11px] text-white/60 font-medium">Daily Rate</span>
              </div>
              <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                <span className="block text-lg font-black text-emerald-400">₹1,299</span>
                <span className="text-[11px] text-white/60 font-medium">2-Day Weekend</span>
              </div>
              <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                <span className="block text-lg font-black text-blue-400">FREE</span>
                <span className="text-[11px] text-white/60 font-medium">Accessories Included</span>
              </div>
            </div>

            {/* Bottom Direct CTA */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundFx.playShutterSound();
                  openWhatsAppBooking({
                    cameraName: 'GoPro HERO 12 Black',
                    rentalPeriod: '1 Day',
                  });
                }}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>BOOK GOPRO ON WHATSAPP NOW</span>
              </button>

              <a
                href={`tel:${BUSINESS_CONFIG.phone}`}
                onClick={() => soundFx.playShutterSound()}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-all text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call +91 6206618952</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
