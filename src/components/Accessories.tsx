import React, { useState } from 'react';
import { ACCESSORIES } from '../data/rentalData';
import { AccessoryItem } from '../types';
import { Plus, Check, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const Accessories: React.FC = () => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  const toggleAccessory = (accId: string) => {
    soundFx.playShutterSound();
    if (selectedAccessories.includes(accId)) {
      setSelectedAccessories(selectedAccessories.filter((id) => id !== accId));
    } else {
      setSelectedAccessories([...selectedAccessories, accId]);
    }
  };

  const calculateTotalAccCost = () => {
    return selectedAccessories.reduce((sum, id) => {
      const item = ACCESSORIES.find((a) => a.id === id);
      return sum + (item ? item.dailyPrice : 0);
    }, 0);
  };

  return (
    <section id="accessories" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Customize Your Gear</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Optional <span className="text-amber-400">Mounts & Accessories</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Add specialized helmet, chest, or handlebar mounts to capture unique riding perspectives.
          </p>
        </div>

        {/* Accessory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ACCESSORIES.map((acc) => {
            const isSelected = selectedAccessories.includes(acc.id);

            return (
              <div
                key={acc.id}
                onClick={() => toggleAccessory(acc.id)}
                className={`glass-card rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  acc.isBundle
                    ? 'border-amber-500/60 bg-slate-900/90 shadow-xl shadow-amber-500/10'
                    : isSelected
                    ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-slate-950">
                    {acc.savingsBadge && (
                      <div className="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold shadow-md">
                        {acc.savingsBadge}
                      </div>
                    )}

                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                      {acc.name}
                    </h3>
                    <span className="text-sm font-extrabold text-amber-400 whitespace-nowrap">
                      +₹{acc.dailyPrice}/day
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {acc.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    {acc.specs}
                  </span>

                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-amber-500/20 group-hover:text-amber-400'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Summary Bar */}
        {selectedAccessories.length > 0 && (
          <div className="mt-10 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {selectedAccessories.length} Accessory Mount(s) Selected
                </p>
                <p className="text-xs text-slate-300">
                  Additional cost: <span className="text-amber-400 font-bold">+₹{calculateTotalAccCost()}/day</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playShutterSound();
                const accNames = selectedAccessories.map(
                  (id) => ACCESSORIES.find((a) => a.id === id)?.name || ''
                );
                openWhatsAppBooking({
                  cameraName: 'GoPro HERO 12 Black',
                  accessories: accNames,
                });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>BOOK WITH SELECTED ACCESSORIES</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
