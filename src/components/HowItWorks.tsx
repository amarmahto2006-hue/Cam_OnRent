import React from 'react';
import { MessageSquare, ShieldCheck, Wallet, Camera, Video, RotateCcw, ArrowRight } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Book on WhatsApp',
      desc: 'Select camera, rental dates, and optional mounts. Message us on WhatsApp for 5-minute confirmation.',
      icon: <MessageSquare className="w-6 h-6 text-amber-400" />,
      highlight: 'Instant Response',
    },
    {
      num: '2',
      title: 'Verify Your ID',
      desc: 'Submit a quick digital copy of your Aadhaar Card, Driving License, or Voter ID for verification.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      highlight: '2-Min Check',
    },
    {
      num: '3',
      title: 'Pay Deposit',
      desc: 'Pay refundable security deposit (₹3,000 Cash/UPI OR Aadhaar ID + ₹1,500 deposit).',
      icon: <Wallet className="w-6 h-6 text-emerald-400" />,
      highlight: '100% Refundable',
    },
    {
      num: '4',
      title: 'Collect Camera',
      desc: 'Pick up at Barlong, Ramgarh for FREE or opt for same-day doorstep delivery to your location.',
      icon: <Camera className="w-6 h-6 text-purple-400" />,
      highlight: 'Free Pickup',
    },
    {
      num: '5',
      title: 'Shoot Content',
      desc: 'Mount the camera and shoot 5.3K cinema quality videos on your trip, ride, or event.',
      icon: <Video className="w-6 h-6 text-amber-300" />,
      highlight: 'Full Quality',
    },
    {
      num: '6',
      title: 'Return & Refund',
      desc: 'Return the camera after your shoot. Receive your security deposit back via UPI within 2 hours.',
      icon: <RotateCcw className="w-6 h-6 text-cyan-400" />,
      highlight: 'Instant Refund',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Seamless Rental Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            How It Works in <span className="text-amber-400">6 Simple Steps</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Renting a high-end action camera in Ramgarh takes less than 3 minutes.
          </p>
        </div>

        {/* Timeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-extrabold font-heading flex items-center justify-center text-sm border border-amber-500/30">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {step.highlight}
                </span>

                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              soundFx.playShutterSound();
              openWhatsAppBooking({ cameraName: 'GoPro HERO 12 Black' });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>START STEP 1: BOOK ON WHATSAPP</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
