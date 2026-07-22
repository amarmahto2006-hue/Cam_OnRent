import React, { useState } from 'react';
import { CAMERAS } from '../data/rentalData';
import { LeadFormData } from '../types';
import { Send, CheckCircle2, Phone, User, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { submitLeadToCRM, openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const LeadCaptureForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    camera: CAMERAS[0].name,
    duration: '1 Day',
    startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deliveryOption: 'Ramgarh Pickup',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playShutterSound();

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    if (!formData.phone.match(/^\d{10}$/)) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await submitLeadToCRM(formData);
      soundFx.playSuccessBeep();
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Auto trigger WhatsApp after submission
      setTimeout(() => {
        openWhatsAppBooking({
          cameraName: formData.camera,
          rentalPeriod: formData.duration,
          startDate: formData.startDate,
          userName: formData.name,
          phone: formData.phone,
          location: formData.deliveryOption,
          notes: formData.message,
        });
      }, 800);
    } catch (err) {
      console.warn('Submission handled:', err);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>5-Minute Response Guarantee</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Request Your <span className="text-amber-400">Camera Booking</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Submit your trip details below. Our Ramgarh team will confirm availability instantly on WhatsApp.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold text-center">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Aman Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    WhatsApp Phone Number (10 Digits) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="e.g. 6206618952"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Camera Model */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Camera Model
                  </label>
                  <select
                    value={formData.camera}
                    onChange={(e) => setFormData({ ...formData, camera: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {CAMERAS.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="1 Day">1 Day (24 hrs)</option>
                    <option value="2 Days">2 Days (Weekend)</option>
                    <option value="3 Days">3 Days</option>
                    <option value="7 Days">7 Days (1 Week)</option>
                    <option value="30 Days">30 Days (Monthly)</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Trip Notes / Special Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Visiting Patratu Valley this weekend, need helmet mount..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Saving Booking Request...</span>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-slate-950" />
                    <span>SUBMIT & CONFIRM ON WHATSAPP</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white">Booking Request Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you <span className="text-amber-400 font-bold">{formData.name}</span>! Opening WhatsApp to finalize your camera setup...
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-amber-400 underline hover:text-amber-300"
              >
                Submit another request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
