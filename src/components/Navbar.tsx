import React, { useState, useEffect } from 'react';
import { Camera, Phone, Volume2, VolumeX, Menu, X, ShieldCheck, Sparkles, MessageCircle, FileSpreadsheet } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/rentalData';
import { soundFx } from '../utils/audio';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { CamOnRentLogo } from './CamOnRentLogo';

interface NavbarProps {
  onOpenBookingModal: () => void;
  onOpenSheetsModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal, onOpenSheetsModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Rentals', href: '#rentals' },
    { name: 'Slot Calendar', href: '#calendar' },
    { name: 'WhatsApp Builder', href: '#whatsapp-builder' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Accessories', href: '#accessories' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F172A]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-white/5 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Lockup */}
          <a
            href="#hero"
            className="flex items-center group focus:outline-none"
            onClick={() => soundFx.playShutterSound()}
          >
            <CamOnRentLogo size={42} showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors py-1"
                onClick={() => soundFx.playShutterSound()}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Google Sheets Sync Button */}
            {onOpenSheetsModal && (
              <button
                onClick={() => {
                  soundFx.playShutterSound();
                  onOpenSheetsModal();
                }}
                className="px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2 cursor-pointer"
                title="Google Sheets Export & Sync"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Google Sheets</span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white transition-all"
              title={isMuted ? 'Unmute Shutter Sound' : 'Mute Shutter Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#F59E0B]" />}
            </button>

            {/* Quick Call Pill */}
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Call Now</span>
            </a>

            {/* Book Now Primary Button */}
            <button
              onClick={() => {
                soundFx.playShutterSound();
                openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black' });
              }}
              className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] rounded-full text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#2563EB]" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 border border-slate-800"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundFx.playShutterSound();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                soundFx.playShutterSound();
                setIsMobileMenuOpen(false);
                openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black' });
              }}
              className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>BOOK ON WHATSAPP NOW</span>
            </button>

            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="w-full py-3 rounded-xl font-medium text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call +91 6206618952</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
