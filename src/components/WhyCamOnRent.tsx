import React from 'react';
import { IndianRupee, ShieldCheck, BatteryCharging, Sparkles, MessageSquare, Truck, Check } from 'lucide-react';

export const WhyCamOnRent: React.FC = () => {
  const features = [
    {
      icon: <IndianRupee className="w-6 h-6 text-amber-400" />,
      title: 'Affordable Pricing',
      desc: 'Action camera rentals starting at just ₹699/day. Zero hidden service fees or surprise charges.',
      badge: 'Best Value',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: 'Verified Equipment',
      desc: '12-point quality check on lens, sensor, housing & firmware before every single handover.',
      badge: '12-Pt QC',
    },
    {
      icon: <BatteryCharging className="w-6 h-6 text-emerald-400" />,
      title: 'Fully Charged Batteries',
      desc: 'Includes 2x high-capacity batteries charged to 100% + dual USB-C charger for all-day shoot.',
      badge: 'Dual Batteries',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-300" />,
      title: 'Sanitized Gear',
      desc: 'Medical-grade UV sanitization & micro-fiber cleaning before handing over gear to you.',
      badge: 'Health Safe',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      title: 'Quick WhatsApp Booking',
      desc: 'No tedious long forms or calls. Pick dates, verify ID, and confirm your camera in under 2 minutes.',
      badge: '5-Min Guarantee',
    },
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: 'Local Pickup & Delivery',
      desc: 'Free pickup at Barlong, Ramgarh. Same-day delivery available across Ramgarh, Ranchi & Bokaro.',
      badge: 'Doorstep Delivery',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Why Choose CamOnRent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Built Specifically for <span className="text-amber-400">Creators & Bikers</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            We understand the needs of vloggers, riders, and travel enthusiasts in Jharkhand. Here is why over 500+ creators trust us.
          </p>
        </div>

        {/* 6 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={item.title}
              className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-500/50 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Standard in every rental</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
