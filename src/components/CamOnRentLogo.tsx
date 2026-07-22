import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const CamOnRentLogo: React.FC<LogoProps> = ({
  className = '',
  size = 44,
  showText = true,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official CamOnRent Brand Emblem - Fast vector fallback for 0ms render */}
      {!imgError ? (
        <img
          src="https://i.ibb.co/N2s4J5FT/01-Brand-Logo-Cam-On-Rent-Emblem.png"
          alt="CamOnRent Official Logo"
          style={{ width: `${size}px`, height: `${size}px` }}
          onError={() => setImgError(true)}
          loading="eager"
          decodings="async"
          className="object-contain drop-shadow-[0_4px_12px_rgba(245,158,11,0.3)] transition-transform duration-200 group-hover:scale-105 shrink-0"
        />
      ) : (
        <div 
          style={{ width: `${size}px`, height: `${size}px` }}
          className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-blue-600 p-0.5 shadow-lg shadow-amber-500/20 shrink-0"
        >
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
            <svg className="w-6 h-6 text-amber-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12 3.75c4.972 0 9.189 3.226 10.677 7.697a1.875 1.875 0 010 1.106C21.189 17.024 16.972 20.25 12 20.25c-4.972 0-9.189-3.226-10.677-7.697a1.875 1.875 0 010-1.106zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Side Typography for Brand Identification */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight font-heading text-white flex items-center leading-none">
            Cam<span className="text-[#F59E0B]">On</span>Rent
          </span>
          <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mt-1">
            GoPro HERO 12 • Ramgarh
          </span>
        </div>
      )}
    </div>
  );
};

