import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const CamOnRentLogo: React.FC<LogoProps> = ({
  className = '',
  size = 48,
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Uploaded CamOnRent Brand Emblem Image */}
      <img
        src="https://i.ibb.co/N2s4J5FT/01-Brand-Logo-Cam-On-Rent-Emblem.png"
        alt="CamOnRent Official Logo"
        style={{ width: `${size}px`, height: `${size}px` }}
        className="object-contain drop-shadow-[0_4px_12px_rgba(245,158,11,0.3)] transition-transform duration-200 group-hover:scale-105 shrink-0"
      />

      {/* Optional Side Typography for Navbar */}
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
