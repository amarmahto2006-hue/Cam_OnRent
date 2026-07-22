import React from 'react';
import { Camera, MapPin, Phone, MessageCircle, Instagram, Facebook, Heart } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/rentalData';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';
import { CamOnRentLogo } from './CamOnRentLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <a
              href="#hero"
              className="flex items-center group focus:outline-none"
              onClick={() => soundFx.playShutterSound()}
            >
              <CamOnRentLogo size={48} showText={true} />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed">
              Ramgarh’s premier GoPro HERO 12 Black action camera rental platform. 5.3K60 Cinema Video, HyperSmooth 6.0 & 100% verified equipment with instant WhatsApp booking.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_CONFIG.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_CONFIG.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <button
                onClick={() => openWhatsAppBooking({ cameraName: 'General Query' })}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#rentals" className="hover:text-amber-400 transition-colors">Featured Cameras</a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-amber-400 transition-colors">GoPro Technology</a>
              </li>
              <li>
                <a href="#accessories" className="hover:text-amber-400 transition-colors">Mounts & Accessories</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors">Cost Estimator</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">Deposit & FAQ</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Camera Fleet */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Camera Fleet
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rentals" className="hover:text-amber-400 transition-colors">GoPro HERO 12 Black (₹699/d)</a>
              </li>
              <li>
                <a href="#rentals" className="hover:text-amber-400 transition-colors">DJI Osmo Action 4 (₹599/d)</a>
              </li>
              <li>
                <a href="#rentals" className="hover:text-amber-400 transition-colors">Insta360 X3 8K 360° (₹849/d)</a>
              </li>
              <li>
                <a href="#accessories" className="hover:text-amber-400 transition-colors">3-in-1 Creator Bundle (₹250/d)</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Ramgarh Location
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phone}`} className="hover:text-white">{BUSINESS_CONFIG.phone}</a>
              </p>
              <p className="text-[11px] font-semibold text-emerald-400">
                ● Open 24/7 (All Day, Every Day)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-slate-500">
          <p>© 2026 CamOnRent. All Rights Reserved. Built for Jharkhand Creators.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> in Ramgarh, Jharkhand
          </p>
        </div>
      </div>
    </footer>
  );
};
