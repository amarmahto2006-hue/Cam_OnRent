import React, { useState } from 'react';
import { CAMERAS, ACCESSORIES } from '../data/rentalData';
import { CameraItem } from '../types';
import { Calculator, Check, Sparkles, Shield, MapPin, MessageCircle, Calendar, Info, Receipt, ArrowRight } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const PricingCalculator: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<CameraItem>(CAMERAS[0]);
  const [days, setDays] = useState<number>(1);
  const [selectedAccs, setSelectedAccs] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<'ramgarh_pickup' | 'ramgarh_town' | 'ranchi' | 'bokaro'>('ramgarh_pickup');
  const [depositOption, setDepositOption] = useState<'cash' | 'id_card'>('cash');
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Calculate rental cost
  const calculateRentalRate = () => {
    let basePerDay = selectedCamera.dailyPrice;
    if (days >= 30) basePerDay = Math.round(selectedCamera.monthlyPrice / 30);
    else if (days >= 7) basePerDay = Math.round(selectedCamera.weeklyPrice / 7);
    else if (days >= 2) basePerDay = Math.round(selectedCamera.weekendPrice / 2);

    let totalRental = basePerDay * days;

    // Accessories cost
    const accTotalDaily = selectedAccs.reduce((sum, id) => {
      const acc = ACCESSORIES.find((a) => a.id === id);
      return sum + (acc ? acc.dailyPrice : 0);
    }, 0);

    totalRental += accTotalDaily * days;

    // Delivery fee
    let deliveryFee = 0;
    if (delivery === 'ramgarh_town') deliveryFee = days >= 3 ? 0 : 50;
    else if (delivery === 'ranchi') deliveryFee = 200;
    else if (delivery === 'bokaro') deliveryFee = 300;

    // Discount
    const discount = 100; // Launch offer ₹100 OFF

    const finalRental = Math.max(0, totalRental + deliveryFee - discount);

    const depositAmount =
      depositOption === 'cash'
        ? selectedCamera.securityDeposit
        : Math.round(selectedCamera.securityDeposit / 2);

    return {
      basePerDay,
      totalRental,
      deliveryFee,
      discount,
      finalRental,
      depositAmount,
    };
  };

  const calcResult = calculateRentalRate();

  const toggleAcc = (id: string) => {
    soundFx.playShutterSound();
    if (selectedAccs.includes(id)) {
      setSelectedAccs(selectedAccs.filter((a) => a !== id));
    } else {
      setSelectedAccs([...selectedAccs, id]);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Quote Generator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Rental Cost & Deposit <span className="text-amber-400">Estimator</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Customize your camera, duration, and accessories to calculate your exact price with zero surprises.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs Controls */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
            {/* Step 1: Select Camera */}
            <div>
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                1. Select Camera Model
              </label>
              <div className="grid grid-cols-1 gap-3">
                {CAMERAS.map((cam) => (
                  <div
                    key={cam.id}
                    className="p-4 rounded-2xl border bg-amber-500/15 border-amber-500 text-white shadow-lg flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-base text-white">{cam.name}</p>
                        <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                          Official Flagship
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{cam.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Daily Rate</p>
                      <p className="text-lg font-black text-amber-400">₹{cam.dailyPrice}<span className="text-xs text-slate-400 font-normal">/day</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Select Duration Days */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  2. Select Rental Duration
                </label>
                <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  {days} {days === 1 ? 'Day (24 hrs)' : 'Days'}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                {[1, 2, 3, 7, 15, 30].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      soundFx.playShutterSound();
                      setDays(d);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      days === d
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {d} {d === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Step 3: Date & Delivery Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Delivery Option
                </label>
                <select
                  value={delivery}
                  onChange={(e) => {
                    soundFx.playShutterSound();
                    setDelivery(e.target.value as typeof delivery);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="ramgarh_pickup">Barlong Ramgarh Pickup (FREE)</option>
                  <option value="ramgarh_town">Ramgarh Town Doorstep (₹50)</option>
                  <option value="ranchi">Ranchi City Delivery (₹200)</option>
                  <option value="bokaro">Bokaro Steel City Delivery (₹300)</option>
                </select>
              </div>
            </div>

            {/* Step 4: Security Deposit Choice */}
            <div>
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Security Deposit Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playShutterSound();
                    setDepositOption('cash');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    depositOption === 'cash'
                      ? 'bg-amber-500/15 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="font-bold text-white">Option A: Cash/UPI Deposit</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    ₹{selectedCamera.securityDeposit.toLocaleString('en-IN')} (100% Refundable)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playShutterSound();
                    setDepositOption('id_card');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    depositOption === 'id_card'
                      ? 'bg-amber-500/15 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="font-bold text-white">Option B: Aadhaar + Lower Cash</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Original ID + ₹{Math.round(selectedCamera.securityDeposit / 2).toLocaleString('en-IN')} Deposit
                  </p>
                </button>
              </div>
            </div>

            {/* Step 5: Optional Accessories */}
            <div>
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Add Accessories
              </label>
              <div className="flex flex-wrap gap-2">
                {ACCESSORIES.map((acc) => {
                  const isAdded = selectedAccs.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => toggleAcc(acc.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isAdded
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {acc.name} (+₹{acc.dailyPrice}/d)
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Summary Box */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6 shadow-2xl relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE ESTIMATE SUMMARY</span>
            </div>

            <div>
              <h3 className="text-xl font-bold font-heading text-white">{selectedCamera.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {days} {days === 1 ? 'Day' : 'Days'} • Start Date: {startDate}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Camera Rate ({days} days):</span>
                <span className="font-bold">₹{(calcResult.basePerDay * days).toLocaleString('en-IN')}</span>
              </div>

              {selectedAccs.length > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Accessories ({selectedAccs.length}):</span>
                  <span className="font-bold">
                    +₹
                    {(
                      calcResult.totalRental - calcResult.basePerDay * days
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {calcResult.deliveryFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Delivery Charge:</span>
                  <span className="font-bold">+₹{calcResult.deliveryFee}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Launch Offer Discount:</span>
                <span>-₹{calcResult.discount}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Estimated Rental Total:</span>
                <span className="text-3xl font-extrabold font-heading text-amber-400">
                  ₹{calcResult.finalRental.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Deposit Note */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <p className="font-bold text-slate-200 flex items-center justify-between">
                <span>Refundable Security Deposit:</span>
                <span className="text-amber-400 font-extrabold">₹{calcResult.depositAmount.toLocaleString('en-IN')}</span>
              </p>
              <p className="text-[11px] text-slate-400 leading-snug">
                {depositOption === 'cash'
                  ? '100% Cash/UPI deposit. Refunded within 2 hours of equipment return.'
                  : 'Original ID + lower deposit held securely in lockbox.'}
              </p>
            </div>

            {/* Action Button Container with Dynamic Hover Breakdown Tooltip */}
            <div className="relative group">
              {/* Dynamic Popup Tooltip preview when hovering or forced active */}
              {showTooltip && (
                <div className="absolute bottom-full left-0 right-0 mb-3 p-4 bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-2 duration-200 backdrop-blur-xl">
                  {/* Tooltip Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Receipt className="w-4 h-4 text-amber-400" />
                      <span>Instant Cost & Deposit Breakdown</span>
                    </div>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                      Preview
                    </span>
                  </div>

                  {/* Breakdown Table */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Equipment:</span>
                      <span className="font-semibold text-white">{selectedCamera.name}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Net Rental Total:</span>
                      <span className="font-bold text-amber-400">₹{calcResult.finalRental.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Refundable Security Deposit:</span>
                      <span className="font-bold text-emerald-400">₹{calcResult.depositAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="pt-2 mt-1 border-t border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-white text-xs">Total Amount at Pickup:</span>
                      <span className="font-extrabold text-sm text-amber-400">
                        ₹{(calcResult.finalRental + calcResult.depositAmount).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 pt-1 italic">
                      *Deposit is 100% refunded immediately upon returning equipment unharmed.
                    </p>
                  </div>

                  {/* Tooltip Arrow Pointer */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-amber-500"></div>
                </div>
              )}

              {/* Primary WhatsApp Booking Button with hover/focus handlers */}
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                onClick={() => {
                  soundFx.playShutterSound();
                  const accNames = selectedAccs.map(
                    (id) => ACCESSORIES.find((a) => a.id === id)?.name || ''
                  );
                  openWhatsAppBooking({
                    cameraName: selectedCamera.name,
                    rentalPeriod: `${days} Days (${startDate})`,
                    accessories: accNames,
                    totalEstimate: calcResult.finalRental,
                    location: delivery.replace('_', ' ').toUpperCase(),
                  });
                }}
                className="w-full py-4 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer relative"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>SEND QUOTE & BOOK ON WHATSAPP</span>

                {/* Info badge trigger helper */}
                <span className="ml-1 p-1 bg-slate-950/20 rounded-full text-slate-950 hover:bg-slate-950/30 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            {/* Hover Helper Note */}
            <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
              <Info className="w-3 h-3 text-amber-400 inline" />
              <span>Hover over button to preview full cost & deposit breakdown</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

