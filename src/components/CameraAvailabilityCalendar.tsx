import React, { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, addDays, isSameDay, isBefore, startOfDay, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ShieldCheck, Sparkles, AlertTriangle, CheckCircle2, ArrowRight, Camera, FileSpreadsheet, Info, RefreshCw } from 'lucide-react';
import { CAMERAS, BUSINESS_CONFIG } from '../data/rentalData';
import { soundFx } from '../utils/audio';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { BookingRowData } from '../services/googleSheets';

interface CameraAvailabilityCalendarProps {
  onOpenSheetsModal?: (bookingData?: BookingRowData) => void;
}

// Simulated booked & limited dates for demonstration (e.g. Patratu weekend rides)
const TODAY = startOfDay(new Date());

const BOOKED_DATES = [
  addDays(TODAY, 2),
  addDays(TODAY, 3),
  addDays(TODAY, 10),
  addDays(TODAY, 11),
  addDays(TODAY, 12),
];

const LIMITED_DATES = [
  addDays(TODAY, 5),
  addDays(TODAY, 6),
  addDays(TODAY, 15),
];

export const CameraAvailabilityCalendar: React.FC<CameraAvailabilityCalendarProps> = ({
  onOpenSheetsModal,
}) => {
  const [selectedCameraId, setSelectedCameraId] = useState<string>(CAMERAS[0]?.id || 'gopro-hero-12');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>(
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  // Default range: Starting tomorrow for 3 days
  const [range, setRange] = useState<DateRange | undefined>({
    from: addDays(TODAY, 1),
    to: addDays(TODAY, 4),
  });

  const selectedCamera = CAMERAS.find((c) => c.id === selectedCameraId) || CAMERAS[0];

  const handleRefreshAvailability = async () => {
    setIsRefreshing(true);
    soundFx.playShutterSound();

    // Simulate re-fetching latest booking data from Google Sheets
    await new Promise((resolve) => setTimeout(resolve, 750));

    const timeString = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setLastRefreshedAt(timeString);
    setIsRefreshing(false);
    setRefreshMessage(`Availability data refreshed & synced at ${timeString}`);

    setTimeout(() => {
      setRefreshMessage(null);
    }, 4000);
  };

  // Calculate rental duration in days
  const daysCount = range?.from && range?.to ? Math.max(1, differenceInDays(range.to, range.from)) : 1;

  // Calculate price estimate
  const basePricePerDay = selectedCamera?.dailyPrice || 699;
  const rawSubtotal = basePricePerDay * daysCount;
  const launchDiscount = 100;
  const finalPrice = Math.max(0, rawSubtotal - launchDiscount);

  // Check if selected range collides with booked dates
  const hasConflict = (() => {
    if (!range?.from) return false;
    const endDate = range.to || range.from;
    let curr = new Date(range.from);
    while (curr <= endDate) {
      if (BOOKED_DATES.some((b) => isSameDay(b, curr))) {
        return true;
      }
      curr = addDays(curr, 1);
    }
    return false;
  })();

  const handleSelectRange = (newRange: DateRange | undefined) => {
    soundFx.playShutterSound();
    setRange(newRange);
  };

  const handleBookOnWhatsApp = () => {
    soundFx.playShutterSound();
    const fromStr = range?.from ? format(range.from, 'dd MMM yyyy') : 'Immediate';
    const toStr = range?.to ? format(range.to, 'dd MMM yyyy') : 'Flexi';
    const msg = `*New Camera Booking Enquiry via Slot Calendar*\n\n` +
      `📹 *Camera:* ${selectedCamera.name}\n` +
      `📅 *Dates:* ${fromStr} to ${toStr} (${daysCount} Days)\n` +
      `💰 *Estimated Total:* ₹${finalPrice} (Incl. ₹100 Launch Discount)\n` +
      `🔒 *Security Deposit:* ₹${selectedCamera.securityDeposit} (Refundable)\n\n` +
      `Please confirm slot availability for Ramgarh pickup!`;
    
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleExportSheets = () => {
    if (!onOpenSheetsModal) return;
    soundFx.playShutterSound();
    const bookingObj: BookingRowData = {
      bookingId: `COR-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString('en-IN'),
      customerName: 'Calendar Lead',
      phone: 'WhatsApp User',
      bundleName: 'Calendar Direct Slot Booking',
      cameraName: selectedCamera.name,
      durationDays: daysCount,
      startDate: range?.from ? format(range.from, 'dd MMM yyyy') : 'Immediate',
      accessoriesStr: 'Standard Enduro Dual Battery + 128GB MicroSD',
      deliveryOption: 'STORE PICKUP (RAMGARH)',
      depositOption: 'Original ID Card + UPI Deposit',
      totalPrice: finalPrice,
      notes: 'Booked via Interactive Slot Availability Calendar',
    };
    onOpenSheetsModal(bookingObj);
  };

  return (
    <section id="calendar" className="py-20 bg-slate-950 relative overflow-hidden text-slate-100">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-amber-400 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>REAL-TIME INVENTORY & SLOT AVAILABILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white mb-4">
            Camera Rental <span className="text-amber-400">Date Availability Calendar</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your preferred rental dates to instantly verify camera slot availability, lock in ₹100 OFF launch discount, and reserve your GoPro for your next adventure!
          </p>
        </div>

        {/* Camera Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CAMERAS.map((cam) => {
            const isSelected = cam.id === selectedCameraId;
            return (
              <button
                key={cam.id}
                onClick={() => {
                  soundFx.playShutterSound();
                  setSelectedCameraId(cam.id);
                }}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{cam.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-slate-950 text-amber-400 font-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  ₹{cam.dailyPrice}/day
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Calendar Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive DayPicker Calendar Box */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-amber-400" />
                  Select Booking Dates
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click a start date and end date to select your rental duration
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Refresh Button */}
                <button
                  onClick={handleRefreshAvailability}
                  disabled={isRefreshing}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Re-fetch latest slot availability from Google Sheets"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Syncing...' : 'Refresh Availability'}</span>
                </button>

                {/* Status Legend */}
                <div className="hidden sm:flex items-center gap-3 text-[11px] font-semibold bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Available
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    1 Unit
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Booked
                  </span>
                </div>
              </div>
            </div>

            {/* Refresh Success Notification Banner */}
            {refreshMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-between animate-fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {refreshMessage}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Synced</span>
              </div>
            )}

            {/* Custom Styled DayPicker */}
            <div className="calendar-custom-wrapper flex justify-center py-2 text-slate-100">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleSelectRange}
                disabled={{ before: TODAY }}
                modifiers={{
                  booked: BOOKED_DATES,
                  limited: LIMITED_DATES,
                }}
                modifiersStyles={{
                  booked: {
                    color: '#f87171',
                    textDecoration: 'line-through',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                  },
                  limited: {
                    color: '#fbbf24',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                  },
                }}
              />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant 24/7 pickup &bull; Last Synced: <span className="text-slate-300 font-mono font-bold">{lastRefreshedAt}</span></span>
              </span>
              <button
                onClick={() => setRange({ from: addDays(TODAY, 1), to: addDays(TODAY, 4) })}
                className="text-amber-400 hover:underline font-bold"
              >
                Reset Dates
              </button>
            </div>
          </div>

          {/* Right: Real-Time Slot Summary & Booking Action Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCamera.image}
                  alt={selectedCamera.name}
                  className="w-16 h-16 object-contain bg-slate-950 p-2 rounded-2xl border border-slate-800"
                />
                <div>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                    Selected Model
                  </span>
                  <h3 className="text-lg font-black text-white">{selectedCamera.name}</h3>
                  <p className="text-xs text-slate-400">{selectedCamera.tagline}</p>
                </div>
              </div>

              {/* Slot Availability Alert Banner */}
              {hasConflict ? (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-sm text-red-300">Selected Dates Conflict</strong>
                    One or more selected dates overlap with an existing booking. Please pick another date range on the calendar.
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-sm text-emerald-300">Slot Confirmed & Available!</strong>
                    Camera unit is 100% available for instant handover or delivery on these dates.
                  </div>
                </div>
              )}

              {/* Duration & Date Range Breakdown */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Selected Start Date:</span>
                  <strong className="text-amber-400">
                    {range?.from ? format(range.from, 'EEE, dd MMM yyyy') : 'Not Selected'}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Selected Return Date:</span>
                  <strong className="text-amber-400">
                    {range?.to ? format(range.to, 'EEE, dd MMM yyyy') : 'Same Day'}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Rental Duration:</span>
                  <strong className="text-emerald-400 text-sm font-black">
                    {daysCount} {daysCount === 1 ? 'Day' : 'Days'}
                  </strong>
                </div>
              </div>

              {/* Pricing Estimate Card */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Base Rate (₹{basePricePerDay} × {daysCount} Days)</span>
                  <span>₹{rawSubtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                  <span>Launch Offer Special Discount</span>
                  <span>-₹{launchDiscount}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Rental Fee</span>
                    <span className="text-2xl font-black text-white font-heading">
                      ₹{finalPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Refundable Security Deposit</span>
                    <span className="text-xs font-bold text-amber-400">
                      ₹{selectedCamera.securityDeposit} (Cash / Original ID)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBookOnWhatsApp}
                  disabled={hasConflict}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Clock className="w-4 h-4" />
                  <span>RESERVE THESE DATES ON WHATSAPP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenSheetsModal && (
                  <button
                    onClick={handleExportSheets}
                    disabled={hasConflict}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Sync Selected Dates to Google Sheets</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
