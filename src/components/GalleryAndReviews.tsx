import React, { useState } from 'react';
import { GALLERY_ITEMS, REVIEWS } from '../data/rentalData';
import { Star, Quote, MapPin, CheckCircle2, Play, Camera } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const GalleryAndReviews: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredGallery =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Gallery Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Shot On CamOnRent Gear</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Creator <span className="text-amber-400">Content Showcase</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Check out real photos & video stills shot by local Ramgarh and Jharkhand creators using our rentals.
          </p>
        </div>

        {/* Gallery Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['all', 'motovlog', 'vlog', 'travel', 'wedding', 'adventure'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playShutterSound();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Content' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden h-72 border border-slate-800 bg-slate-900 shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                decodings="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-bold">
                    {item.camera}
                  </span>
                  <span className="text-[11px] text-slate-300 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {item.location}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">{item.creator}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Customer Reviews & Impact Stats */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Loved By <span className="text-amber-400">500+ Creators</span>
          </h2>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-xl relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-500/20" />

              <div>
                <div className="flex items-center text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed font-medium">
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{rev.role} • {rev.location}</p>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    {rev.verifiedRental}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Stats Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-heading text-amber-400">1,200+</p>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">Happy Camera Rentals</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-heading text-blue-400">500+</p>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">Creator Network</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-400">98.2%</p>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">5-Star Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-heading text-purple-400">5 Mins</p>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">Avg WhatsApp Response</p>
          </div>
        </div>
      </div>
    </section>
  );
};
