import React, { useState } from 'react';
import {
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Bike,
  Video,
  Zap,
  Film,
  Compass,
  Wrench,
  Calendar,
  CheckSquare,
  MapPin,
  ShieldCheck,
  Phone,
  Tag,
  Share2,
  FileSpreadsheet,
} from 'lucide-react';
import { CAMERAS, ACCESSORIES, BUNDLE_TEMPLATES, BUSINESS_CONFIG } from '../data/rentalData';
import { BundleTemplate, CameraItem } from '../types';
import { soundFx } from '../utils/audio';
import { openWhatsAppBooking, triggerConfetti } from '../utils/whatsapp';
import { BookingRowData } from '../services/googleSheets';

interface WhatsAppMessageBuilderProps {
  onOpenSheetsModal?: (bookingData?: BookingRowData) => void;
}

export const WhatsAppMessageBuilder: React.FC<WhatsAppMessageBuilderProps> = ({ onOpenSheetsModal }) => {
  // Selected Template ID (Default to 'travel-creator')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('travel-creator');

  // Form State
  const [selectedCameraId, setSelectedCameraId] = useState<string>('gopro-hero-12');
  const [days, setDays] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>('This Saturday');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([
    'tripod-stick',
    'extra-battery',
    '256gb-sd',
  ]);
  const [deliveryOption, setDeliveryOption] = useState<'ramgarh_pickup' | 'ramgarh_delivery' | 'ranchi' | 'bokaro'>(
    'ramgarh_delivery'
  );
  const [depositOption, setDepositOption] = useState<'cash' | 'id_card'>('cash');
  const [userName, setUserName] = useState<string>('');
  const [locationNote, setLocationNote] = useState<string>(
    'Traveling across Jharkhand (Netarhat & Rajrappa Falls)! Need Travel Creator package with 3-Way tripod stick, 256GB SD card & extra Enduro battery.'
  );
  const [appliedDiscount, setAppliedDiscount] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Selected camera object
  const currentCamera: CameraItem =
    CAMERAS.find((c) => c.id === selectedCameraId) || CAMERAS[0];

  // Currently active bundle template (if applicable)
  const currentBundle = BUNDLE_TEMPLATES.find((b) => b.id === selectedTemplateId);

  // Helper to load bundle template
  const handleSelectTemplate = (bundle: BundleTemplate) => {
    soundFx.playShutterSound();
    setSelectedTemplateId(bundle.id);
    setSelectedCameraId(bundle.cameraId);
    setDays(bundle.durationDays);
    setSelectedAccessories(bundle.accessories);
    setDeliveryOption(bundle.deliveryOption);
    setLocationNote(bundle.suggestedNote);
  };

  const handleCustomMode = () => {
    soundFx.playShutterSound();
    setSelectedTemplateId('custom');
  };

  const toggleAccessory = (accId: string) => {
    soundFx.playShutterSound();
    if (selectedAccessories.includes(accId)) {
      setSelectedAccessories(selectedAccessories.filter((id) => id !== accId));
    } else {
      setSelectedAccessories([...selectedAccessories, accId]);
    }
  };

  // Price calculations
  const calculatePricing = () => {
    let baseRate = 0;
    if (days === 1) baseRate = currentCamera.dailyPrice;
    else if (days === 2) baseRate = currentCamera.weekendPrice;
    else if (days >= 7 && days < 30) baseRate = Math.round((currentCamera.weeklyPrice / 7) * days);
    else if (days >= 30) baseRate = Math.round((currentCamera.monthlyPrice / 30) * days);
    else baseRate = currentCamera.dailyPrice * days;

    const accessoryTotal = selectedAccessories.reduce((acc, accId) => {
      const item = ACCESSORIES.find((a) => a.id === accId);
      return acc + (item ? item.dailyPrice * Math.min(days, 3) : 0);
    }, 0);

    let deliveryFee = 0;
    if (deliveryOption === 'ramgarh_delivery') deliveryFee = 50;
    if (deliveryOption === 'ranchi') deliveryFee = 200;
    if (deliveryOption === 'bokaro') deliveryFee = 250;

    const discount = appliedDiscount ? 100 : 0;
    const netTotal = Math.max(0, baseRate + accessoryTotal + deliveryFee - discount);

    const depositAmount =
      depositOption === 'cash' ? currentCamera.securityDeposit : 1500;

    return { baseRate, accessoryTotal, deliveryFee, discount, netTotal, depositAmount };
  };

  const pricing = calculatePricing();

  // Delivery option label
  const getDeliveryLabel = () => {
    switch (deliveryOption) {
      case 'ramgarh_pickup':
        return 'FREE Pickup at Barlong, Ramgarh';
      case 'ramgarh_delivery':
        return 'Ramgarh Town Doorstep (+₹50)';
      case 'ranchi':
        return 'Ranchi Express Delivery (+₹200)';
      case 'bokaro':
        return 'Bokaro / Hazaribagh Delivery (+₹250)';
      default:
        return 'Ramgarh Pickup';
    }
  };

  // Accessory Names List
  const accessoryNames = selectedAccessories
    .map((id) => ACCESSORIES.find((a) => a.id === id)?.name)
    .filter(Boolean);

  // Construct Formatted WhatsApp Message Text
  const buildFormattedMessage = () => {
    let msg = `*CAMONRENT BOOKING REQUEST* 🎥\n`;
    msg += `-----------------------------------\n`;
    if (currentBundle) {
      msg += `📦 *Rental Bundle:* ${currentBundle.title} (${currentBundle.badge})\n`;
    } else {
      msg += `📦 *Rental Bundle:* Custom Gear Selection\n`;
    }
    msg += `📹 *Camera:* ${currentCamera.name}\n`;
    msg += `⏱️ *Duration:* ${days} Day${days > 1 ? 's' : ''} (${days === 2 ? 'Weekend Special' : 'Standard Rental'})\n`;
    msg += `📅 *Start Date:* ${startDate || 'As soon as possible'}\n`;
    msg += `📍 *Delivery:* ${getDeliveryLabel()}\n`;

    if (accessoryNames.length > 0) {
      msg += `\n🎒 *Included Accessories:*\n`;
      accessoryNames.forEach((acc) => {
        msg += `• ${acc}\n`;
      });
    }

    msg += `\n💰 *Pricing Estimate:*\n`;
    msg += `• Rental Rate: ₹${pricing.baseRate.toLocaleString('en-IN')}\n`;
    if (pricing.accessoryTotal > 0) {
      msg += `• Accessories: +₹${pricing.accessoryTotal.toLocaleString('en-IN')}\n`;
    }
    if (pricing.deliveryFee > 0) {
      msg += `• Delivery Fee: +₹${pricing.deliveryFee.toLocaleString('en-IN')}\n`;
    }
    if (pricing.discount > 0) {
      msg += `• Launch Discount: -₹100 (Applied! 🎉)\n`;
    }
    msg += `• *Estimated Total:* ₹${pricing.netTotal.toLocaleString('en-IN')}\n`;
    msg += `• *Security Deposit:* ₹${pricing.depositAmount.toLocaleString('en-IN')} (${
      depositOption === 'cash' ? '100% Refundable UPI/Cash' : 'Original ID + ₹1500 Cash'
    })\n`;

    if (userName) {
      msg += `\n👤 *Customer Name:* ${userName}\n`;
    }

    if (locationNote) {
      msg += `💬 *Note / Destination:* ${locationNote}\n`;
    }

    msg += `-----------------------------------\n`;
    msg += `Please confirm gear availability & pickup slot for Ramgarh. Thank you!`;

    return msg;
  };

  const fullMessageText = buildFormattedMessage();

  const handleSendWhatsApp = () => {
    soundFx.playShutterSound();
    triggerConfetti();

    openWhatsAppBooking({
      cameraName: currentCamera.name,
      rentalPeriod: `${days} Days`,
      startDate: startDate,
      accessories: accessoryNames as string[],
      totalEstimate: pricing.netTotal,
      userName: userName,
      location: getDeliveryLabel(),
      notes: locationNote,
    });
  };

  const handleCopyMessage = () => {
    soundFx.playShutterSound();
    navigator.clipboard.writeText(fullMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="whatsapp-builder"
      className="py-20 bg-[#0F172A] border-t border-white/10 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#F59E0B]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 mb-3 backdrop-blur-md">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>1-CLICK INSTANT WHATSAPP BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Dynamic WhatsApp Request Builder
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/60">
            Select a pre-configured bundle template or customize your equipment, dates, and shooting location to instantly share your request on WhatsApp.
          </p>
        </div>

        {/* Rental Bundle Selector Bar */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Step 1: Select Your Rental Bundle Package</span>
          </p>

          {/* Primary Package Quick Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* 1. Travel Creator Package */}
            {(() => {
              const bundle = BUNDLE_TEMPLATES.find((b) => b.id === 'travel-creator')!;
              const isSelected = selectedTemplateId === 'travel-creator';
              return (
                <button
                  type="button"
                  key="travel-creator"
                  onClick={() => handleSelectTemplate(bundle)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 border-blue-500 shadow-xl shadow-blue-500/20 ring-2 ring-blue-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      ACTIVE BUNDLE
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Compass className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="text-xs font-bold text-amber-400 block">
                          {bundle.badge}
                        </span>
                        <h3 className="text-base font-extrabold text-white">
                          {bundle.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {bundle.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">{bundle.durationLabel}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ₹100 OFF Applied
                    </span>
                  </div>
                </button>
              );
            })()}

            {/* 2. Action Sports Package */}
            {(() => {
              const bundle = BUNDLE_TEMPLATES.find((b) => b.id === 'action-sports')!;
              const isSelected = selectedTemplateId === 'action-sports';
              return (
                <button
                  type="button"
                  key="action-sports"
                  onClick={() => handleSelectTemplate(bundle)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500 shadow-xl shadow-amber-500/20 ring-2 ring-amber-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      ACTIVE BUNDLE
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Bike className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="text-xs font-bold text-amber-400 block">
                          {bundle.badge}
                        </span>
                        <h3 className="text-base font-extrabold text-white">
                          {bundle.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {bundle.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-slate-800/80 border-t flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">{bundle.durationLabel}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ₹100 OFF Applied
                    </span>
                  </div>
                </button>
              );
            })()}

            {/* 3. Vlogging Package */}
            {(() => {
              const bundle = BUNDLE_TEMPLATES.find((b) => b.id === 'vlogging')!;
              const isSelected = selectedTemplateId === 'vlogging';
              return (
                <button
                  type="button"
                  key="vlogging"
                  onClick={() => handleSelectTemplate(bundle)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500 shadow-xl shadow-emerald-500/20 ring-2 ring-emerald-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      ACTIVE BUNDLE
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Video className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="text-xs font-bold text-amber-400 block">
                          {bundle.badge}
                        </span>
                        <h3 className="text-base font-extrabold text-white">
                          {bundle.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {bundle.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-slate-800/80 border-t flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">{bundle.durationLabel}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ₹100 OFF Applied
                    </span>
                  </div>
                </button>
              );
            })()}
          </div>

          {/* Secondary Bundle Templates & Custom Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 px-2">
              Other Special Packages & Custom Setup:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {BUNDLE_TEMPLATES.filter(
                (b) => !['travel-creator', 'action-sports', 'vlogging'].includes(b.id)
              ).map((bundle) => {
                const isSelected = selectedTemplateId === bundle.id;
                return (
                  <button
                    key={bundle.id}
                    onClick={() => handleSelectTemplate(bundle)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {bundle.badge}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleCustomMode}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedTemplateId === 'custom'
                    ? 'bg-amber-500 border-amber-500 text-slate-950'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                }`}
              >
                🛠️ Custom Build
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Controls & Right Live WhatsApp Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            {/* 1. Camera Selection */}
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2.5">
                Select Camera Model
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CAMERAS.map((cam) => (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() => {
                      soundFx.playShutterSound();
                      setSelectedCameraId(cam.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedCameraId === cam.id
                        ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <p className="font-bold text-sm">{cam.name}</p>
                    <p className="text-xs opacity-80 font-semibold mt-0.5">
                      ₹{cam.dailyPrice}/day
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Duration & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Rental Duration (Days)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5, 7].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        soundFx.playShutterSound();
                        setDays(d);
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        days === d
                          ? 'bg-[#F59E0B] text-[#0F172A] border-[#F59E0B]'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Start Date / Timeline
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="e.g. Tomorrow, Saturday 25th July"
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Accessories Checklist */}
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                Include Accessories
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ACCESSORIES.map((acc) => {
                  const isChecked = selectedAccessories.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => toggleAccessory(acc.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white/15 border-emerald-500/80 text-white font-medium'
                          : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                              : 'border-white/30'
                          }`}
                        >
                          {isChecked && '✓'}
                        </span>
                        <span>{acc.name}</span>
                      </span>
                      <span className="font-bold text-[#F59E0B]">
                        +₹{acc.dailyPrice}/d
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Delivery & Deposit Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Delivery Option
                </label>
                <select
                  value={deliveryOption}
                  onChange={(e) => {
                    soundFx.playShutterSound();
                    setDeliveryOption(e.target.value as any);
                  }}
                  className="w-full p-2.5 bg-[#0F172A] border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="ramgarh_pickup">FREE Pickup at Barlong, Ramgarh</option>
                  <option value="ramgarh_delivery">Ramgarh Town Doorstep (+₹50)</option>
                  <option value="ranchi">Ranchi Express Delivery (+₹200)</option>
                  <option value="bokaro">Bokaro / Hazaribagh (+₹250)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Security Deposit Option
                </label>
                <select
                  value={depositOption}
                  onChange={(e) => {
                    soundFx.playShutterSound();
                    setDepositOption(e.target.value as any);
                  }}
                  className="w-full p-2.5 bg-[#0F172A] border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="cash">Option A: ₹3,000 Refundable Cash/UPI</option>
                  <option value="id_card">Option B: Original ID Card + ₹1,500 Cash</option>
                </select>
              </div>
            </div>

            {/* 5. Customer Info & Location Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Destination / Ride Note
                </label>
                <input
                  type="text"
                  value={locationNote}
                  onChange={(e) => setLocationNote(e.target.value)}
                  placeholder="e.g. Patratu ride / Rajrappa shoot"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Launch Offer Discount Banner */}
            <div className="flex items-center justify-between p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <Tag className="w-5 h-5 text-[#F59E0B]" />
                <div>
                  <p className="text-xs font-bold text-white">First Booking Launch Discount</p>
                  <p className="text-[11px] text-white/60">Flat ₹100 OFF auto-deducted from total</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFx.playShutterSound();
                  setAppliedDiscount(!appliedDiscount);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  appliedDiscount
                    ? 'bg-[#F59E0B] text-slate-950'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {appliedDiscount ? '₹100 APPLIED' : 'APPLY OFFER'}
              </button>
            </div>
          </div>

          {/* Right Column: Live Styled WhatsApp Chat Box Preview (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Step 2: Live WhatsApp Message Preview</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Auto-Formatted
              </span>
            </p>

            {/* WhatsApp Card UI */}
            <div className="rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl bg-[#0b141a]">
              {/* WhatsApp Header */}
              <div className="bg-[#1f2c34] p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                    <CameraIcon className="w-5 h-5" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1f2c34]"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>CamOnRent Ramgarh</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-[11px] text-emerald-400 font-semibold">
                      Online • +91 6206618952
                    </p>
                  </div>
                </div>

                <span className="text-[10px] bg-white/10 text-white/70 px-2.5 py-1 rounded-full font-mono">
                  WhatsApp Direct
                </span>
              </div>

              {/* Chat Message Bubble Body */}
              <div className="p-4 sm:p-5 bg-opacity-90 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="bg-[#005c4b] text-white p-4 rounded-2xl rounded-tr-none shadow-xl border border-emerald-400/20 text-xs sm:text-sm font-sans space-y-2 leading-relaxed">
                  <pre className="font-sans whitespace-pre-wrap break-words leading-relaxed text-slate-100">
                    {fullMessageText}
                  </pre>

                  <div className="pt-2 text-[10px] text-emerald-200/70 text-right flex items-center justify-end gap-1">
                    <span>Ready to send</span>
                    <span>✓✓</span>
                  </div>
                </div>

                {/* Price Summary Highlight */}
                <div className="mt-4 p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase font-bold">
                      Estimated Net Total
                    </span>
                    <span className="text-lg font-extrabold text-[#F59E0B]">
                      ₹{pricing.netTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-white/50 block text-[10px] uppercase font-bold">
                      Security Deposit
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      ₹{pricing.depositAmount.toLocaleString('en-IN')} (Refundable)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-[#1f2c34] border-t border-white/5 space-y-2.5">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950 group-hover:rotate-12 transition-transform" />
                  <span>SEND REQUEST ON WHATSAPP NOW</span>
                </button>

                {onOpenSheetsModal && (
                  <button
                    onClick={() => {
                      soundFx.playShutterSound();
                      const selectedAccs = ACCESSORIES.filter((a) => selectedAccessories.includes(a.id)).map((a) => a.name).join(', ');
                      const currentBundleObj = BUNDLE_TEMPLATES.find((b) => b.id === selectedTemplateId);
                      const bookingObj: BookingRowData = {
                        bookingId: `COR-${Math.floor(1000 + Math.random() * 9000)}`,
                        timestamp: new Date().toLocaleString('en-IN'),
                        customerName: userName || 'Guest User',
                        phone: 'WhatsApp User',
                        bundleName: currentBundleObj ? currentBundleObj.title : 'Custom Setup',
                        cameraName: currentCamera.name,
                        durationDays: days,
                        startDate: startDate || 'Immediate',
                        accessoriesStr: selectedAccs || 'Standard Kit Included',
                        deliveryOption: deliveryOption.replace('_', ' ').toUpperCase(),
                        depositOption: depositOption === 'cash' ? 'Cash/UPI Refundable Deposit' : 'Original ID Card + Cash',
                        totalPrice: pricing.netTotal,
                        notes: locationNote || '',
                      };
                      onOpenSheetsModal(bookingObj);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Export Quote to Google Sheets</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMessage}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Message Text</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    onClick={() => soundFx.playShutterSound()}
                    className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-blue-400 transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
