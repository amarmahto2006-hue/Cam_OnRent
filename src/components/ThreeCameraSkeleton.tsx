import React from 'react';
import { Cpu, Sparkles, ShieldCheck } from 'lucide-react';

export const ThreeCameraSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-blue-600/5 to-transparent pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-medium text-slate-300">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
        <span className="text-amber-400 font-semibold">Initializing 3D Model...</span>
      </div>

      <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-500/40 text-xs text-blue-400">
        <Cpu className="w-3.5 h-3.5 animate-spin" />
        <span className="font-semibold">DRACO Decoder Active</span>
      </div>

      {/* Central Skeleton Graphic Placeholder */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-3xl bg-slate-950/80 border-2 border-amber-500/40 p-3 shadow-2xl flex items-center justify-center animate-pulse">
          <img
            src="https://i.ibb.co/N2s4J5FT/01-Brand-Logo-Cam-On-Rent-Emblem.png"
            alt="CamOnRent Loading Logo"
            className="w-20 h-20 md:w-28 md:h-28 object-contain opacity-90 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </div>

        <p className="mt-4 text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>Building 3D GoPro HERO 12 Mesh</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">
          DRACO Geometry Stream &bull; Target &lt; 3.0s
        </p>
      </div>

      {/* Bottom Preset Controls Skeleton */}
      <div className="absolute bottom-4 flex items-center justify-center gap-2 bg-slate-950/70 backdrop-blur-md p-2 rounded-2xl border border-slate-800 w-11/12 max-w-md">
        <div className="h-8 w-20 bg-slate-800/80 rounded-xl animate-pulse"></div>
        <div className="h-8 w-20 bg-slate-800/80 rounded-xl animate-pulse"></div>
        <div className="h-8 w-20 bg-slate-800/80 rounded-xl animate-pulse"></div>
        <div className="h-8 w-20 bg-slate-800/80 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
};
