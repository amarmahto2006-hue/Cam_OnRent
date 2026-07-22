import React from 'react';
import { Camera, Cpu, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const LoadingSkeleton: React.FC<{ progress?: number; message?: string }> = ({
  progress = 85,
  message = "Loading 3D DRACO Engine & CamOnRent Assets..."
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#070D19] flex flex-col items-center justify-center p-6 text-slate-100 overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Skeleton Card Container */}
      <div className="relative z-10 max-w-lg w-full bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-amber-500/5 flex flex-col items-center text-center">
        {/* Brand Logo with Glowing Ring */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-blue-600 opacity-75 blur-md animate-spin" style={{ animationDuration: '4s' }}></div>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 p-2 border border-slate-700/80 shadow-2xl flex items-center justify-center">
            <img
              src="https://i.ibb.co/N2s4J5FT/01-Brand-Logo-Cam-On-Rent-Emblem.png"
              alt="CamOnRent Brand Emblem"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Brand Name Title */}
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-3xl font-black font-heading tracking-tight text-white">
            Cam<span className="text-amber-400">On</span>Rent
          </h1>
          <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest">
            Ramgarh
          </span>
        </div>

        <p className="text-xs text-slate-400 font-medium mb-6">
          GoPro HERO 12 Rental Engine & 3D Showcase
        </p>

        {/* Skeleton Shimmer Layout Preview */}
        <div className="w-full bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 mb-6 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Cpu className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
              {message}
            </span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] border border-emerald-500/20">
              &lt;3s Target
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-blue-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
            />
          </div>

          {/* Skeleton Pulse Rows */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-10 bg-slate-900/90 rounded-xl border border-slate-800/60 animate-pulse flex flex-col justify-center px-2">
              <div className="h-2 w-10 bg-slate-700/80 rounded mb-1"></div>
              <div className="h-1.5 w-14 bg-slate-800 rounded"></div>
            </div>
            <div className="h-10 bg-slate-900/90 rounded-xl border border-slate-800/60 animate-pulse flex flex-col justify-center px-2">
              <div className="h-2 w-12 bg-amber-500/40 rounded mb-1"></div>
              <div className="h-1.5 w-10 bg-slate-800 rounded"></div>
            </div>
            <div className="h-10 bg-slate-900/90 rounded-xl border border-slate-800/60 animate-pulse flex flex-col justify-center px-2">
              <div className="h-2 w-8 bg-slate-700/80 rounded mb-1"></div>
              <div className="h-1.5 w-12 bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-xs">
          <span className="flex items-center gap-1 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50">
            <Sparkles className="w-3 h-3 text-amber-400" />
            5.3K60 Cinema
          </span>
          <span className="flex items-center gap-1 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50">
            <Zap className="w-3 h-3 text-blue-400" />
            DRACO Compressed
          </span>
          <span className="flex items-center gap-1 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Instant Load
          </span>
        </div>
      </div>
    </div>
  );
};
