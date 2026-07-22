import React, { Suspense, lazy } from 'react';
import { MessageCircle, Phone, ShieldCheck, Zap, Sparkles, MapPin, CheckCircle2, Star, ArrowDown } from 'lucide-react';
import { ThreeCameraSkeleton } from './ThreeCameraSkeleton';
import { BUSINESS_CONFIG } from '../data/rentalData';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

const ThreeCameraHeroLazy = lazy(() => import('./ThreeCameraHero'));

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 md:pt-36 pb-16 overflow-hidden bg-[#0F172A] min-h-screen flex flex-col justify-between">
      {/* Immersive Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F59E0B]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        {/* Top Location & Offer Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-[#F59E0B] shadow-xl backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#F59E0B]"></span>
            <span>NOW AVAILABLE IN RAMGARH</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Launch Offer: ₹100 OFF First Booking</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white leading-[1.1]">
            Rent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-orange-400">GoPro Hero 12</span> & Create Magic.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Premium action cameras for travel creators, vloggers, and adventure seekers in Ramgarh. Professional gear starting at <span className="text-[#F59E0B] font-extrabold">₹699/day</span>.
          </p>
        </div>

        {/* 3D Camera Hero Experience */}
        <div className="relative my-4 max-w-5xl mx-auto">
          {/* Floating Badges */}
          <div className="hidden lg:block absolute left-2 top-12 z-20 px-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-[210px] animate-float">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-white">Verified Rental</p>
                <p className="text-[10px] text-white/60">12-Point Quality Check</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-2 top-20 z-20 px-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-[210px] animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-[#F59E0B] rounded-full animate-ping"></div>
              <div>
                <p className="text-xs font-bold text-white">Same Day Pickup</p>
                <p className="text-[10px] text-white/60">Doorstep Delivery Option</p>
              </div>
            </div>
          </div>

          {/* Canvas Component with Suspense & Skeleton Fallback */}
          <Suspense fallback={<ThreeCameraSkeleton />}>
            <ThreeCameraHeroLazy />
          </Suspense>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mt-6">
          <button
            onClick={() => {
              soundFx.playShutterSound();
              openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] text-[#0F172A] rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20 cursor-pointer group"
          >
            <MessageCircle className="w-6 h-6 fill-[#0F172A] group-hover:rotate-12 transition-transform" />
            <span>BOOK ON WHATSAPP</span>
          </button>

          <a
            href={`tel:${BUSINESS_CONFIG.phone}`}
            onClick={() => soundFx.playShutterSound()}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold text-base sm:text-lg backdrop-blur-sm transition-all text-white flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5 text-[#2563EB]" />
            <span>CALL NOW</span>
          </a>
        </div>

        {/* Spec Highlights Bar */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 pt-8 max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">5.3K</span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">Ultra HD</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">10m</span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">Waterproof</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">60 FPS</span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">Slo-Mo</span>
          </div>
        </div>

        {/* Feature Pills Below Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Fully Charged Batteries Included</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Sanitized Before Every Rental</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Booking Fees</span>
          </div>
        </div>
      </div>

      {/* Down Scroll Arrow */}
      <div className="text-center pt-8 pb-2 z-10">
        <a
          href="#why-us"
          className="inline-flex p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors animate-bounce"
          aria-label="Scroll to Why Us"
        >
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
