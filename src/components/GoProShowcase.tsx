import React, { useState } from 'react';
import { Video, Shield, Waves, Battery, Cpu, Sparkles, Mic, Moon, CheckCircle2, MessageCircle } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const GoProShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'hypersmooth' | 'waterproof' | 'battery' | 'slowmo' | 'bluetooth'>('video');

  const showcaseTabs = [
    {
      id: 'video',
      title: '5.3K Video',
      subtitle: 'Best-in-class 5.3K60 + 4K120 resolution',
      icon: <Video className="w-5 h-5" />,
      desc: 'Capture 91% more resolution than 4K. High Dynamic Range (HDR) video brings out unbelievable shadow & highlight detail in Jharkhand landscapes.',
      image: 'https://i.ibb.co/dsx52DCW/03-Product-Go-Pro-HERO12-Black-Flagship.png',
      specs: '5.3K60, 4K120, 2.7K240 | 8-Bit / 10-Bit Log Color',
    },
    {
      id: 'hypersmooth',
      title: 'HyperSmooth 6.0',
      subtitle: 'Emmy® Award-Winning Stabilization',
      icon: <Cpu className="w-5 h-5" />,
      desc: 'Smooth out the roughest motorcycle rides and offroad mountain trails. AutoBoost automatically adjusts stabilization based on speed and movement.',
      image: 'https://i.ibb.co/SXRxT5Fg/04-Accessory-Curved-Helmet-Mount-JHook.png',
      specs: 'AutoBoost + 360° Horizon Lock (Tilt-proof)',
    },
    {
      id: 'waterproof',
      title: 'Waterproof 33ft',
      subtitle: 'Ruggedized for Extreme Water Action',
      icon: <Waves className="w-5 h-5" />,
      desc: 'Built tough and waterproof down to 33ft (10m) right out of the box. Includes water-repelling lens cover that eliminates lens flare and water drops.',
      image: 'https://i.ibb.co/xKJy89Cc/12-Gallery-Rajrappa-Waterfall-Sunset.png',
      specs: 'Waterproof 10m (33ft) | Hydrophobic Glass Cover',
    },
    {
      id: 'battery',
      title: 'Enduro Battery',
      subtitle: 'Extended Cold-Weather Run Time',
      icon: <Battery className="w-5 h-5" />,
      desc: 'Includes 2x high-performance Enduro batteries offering up to 2x longer recording time compared to standard batteries.',
      image: 'https://i.ibb.co/sdhww4Vh/08-Accessory-Enduro-Battery-Dual-Charger.png',
      specs: '70 mins continuous @ 5.3K60 | 1.5 hrs @ 4K30',
    },
    {
      id: 'slowmo',
      title: '4x Slow Motion',
      subtitle: '240 Frames Per Second Precision',
      icon: <Sparkles className="w-5 h-5" />,
      desc: 'Slow down the action up to 4x in high resolution 2.7K or 8x slow motion in 1080p. Relive every jump, splash, and stunt.',
      image: 'https://i.ibb.co/nJZtvjB/13-Gallery-Hazaribagh-Offroad-Trail.png',
      specs: '2.7K @ 240fps | 1080p @ 240fps',
    },
    {
      id: 'bluetooth',
      title: 'Bluetooth Audio',
      subtitle: 'Wireless Helmet Mic & AirPod Sync',
      icon: <Mic className="w-5 h-5" />,
      desc: 'Connect your Sena, Cardo motorcycle helmet intercom or AirPods wirelessly to record crisp voice logs while riding at high speeds.',
      image: 'https://i.ibb.co/gLmGPBpc/16-Gallery-Rajrappa-Temple-Vlogging-POV.png',
      specs: 'Dual Bluetooth Audio Streams + Voice Control',
    },
  ];

  const currentTab = showcaseTabs.find((t) => t.id === activeTab) || showcaseTabs[0];

  return (
    <section id="showcase" className="py-20 md:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Apple-Grade Product Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            GoPro HERO 12 Black <span className="text-amber-400">Deep Dive</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Click through key features to discover why it is the ultimate tool for vloggers and riders.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {showcaseTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playShutterSound();
                setActiveTab(tab.id as unknown as typeof activeTab);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Feature Display Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Text Detail */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
              <span>FEATURE SPOTLIGHT</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              {currentTab.title}
            </h3>

            <p className="text-lg font-semibold text-amber-400">
              {currentTab.subtitle}
            </p>

            <p className="text-slate-300 text-base leading-relaxed">
              {currentTab.desc}
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-slate-400 font-semibold block uppercase mb-1">Tech Specification:</span>
              <span className="text-amber-400 font-bold">{currentTab.specs}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  soundFx.playShutterSound();
                  openWhatsAppBooking({
                    cameraName: 'GoPro HERO 12 Black',
                    notes: `Inquiring specifically about ${currentTab.title}`,
                  });
                }}
                className="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>RENT THIS CAMERA NOW</span>
              </button>
            </div>
          </div>

          {/* Right Preview Image */}
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 border border-slate-800 shadow-2xl group">
            <img
              src={currentTab.image}
              alt={currentTab.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Tested Equipment</span>
              </div>
              <span className="text-amber-400 font-bold">Ramgarh Stock</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
