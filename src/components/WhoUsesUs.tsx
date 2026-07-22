import React from 'react';
import { Camera, Bike, GraduationCap, Heart, Compass, Video } from 'lucide-react';

export const WhoUsesUs: React.FC = () => {
  const useCases = [
    {
      title: 'Moto Vloggers & Bikers',
      desc: 'Riding Patratu Valley, Ranchi highway, or Netarhat? Mount a GoPro Hero 12 on your helmet or bike handlebars for 5.3K stabilized riding POV.',
      icon: <Bike className="w-6 h-6 text-amber-400" />,
      tag: 'Patratu Valley Bikers',
    },
    {
      title: 'Travel YouTubers',
      desc: 'Create high-resolution travel vlogs, water sports footage, and waterfall hyperlapses without investing ₹50,000 upfront.',
      icon: <Video className="w-6 h-6 text-blue-400" />,
      tag: 'YouTube & Reels',
    },
    {
      title: 'College Projects & Shorts',
      desc: 'Film semester short movies, fest highlights, and cultural events with cinema-grade 10-bit log color cameras.',
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      tag: 'College Directors',
    },
    {
      title: 'Wedding Shoots & Functions',
      desc: 'Capture unique wide-angle 360° guest moments, poolsideHaldi, and baraat dance entries.',
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      tag: 'Wedding Crews',
    },
    {
      title: 'Adventure Trekkers & Tourists',
      desc: 'Waterproof, shockproof construction withstands rain, waterfalls, mud, and dust across Jharkhand trips.',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      tag: 'Outdoor Enthusiasts',
    },
    {
      title: 'Instagram & Reels Creators',
      desc: 'Shoot vertical 8:7 full-sensor 9:16 reels with GoPro HERO 12 Black and 3-Way tripod stick third-person angles.',
      icon: <Camera className="w-6 h-6 text-purple-400" />,
      tag: 'Reel Trends',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Tailored for Every Creator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Who Uses <span className="text-amber-400">CamOnRent?</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            From solo bike riders to professional wedding teams, see how creators leverage our cameras.
          </p>
        </div>

        {/* Use Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {uc.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                    {uc.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                  {uc.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
