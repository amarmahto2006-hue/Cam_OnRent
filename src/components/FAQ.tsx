import React, { useState } from 'react';
import { FAQS } from '../data/rentalData';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { soundFx } from '../utils/audio';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (id: string) => {
    soundFx.playShutterSound();
    setOpenId(openId === id ? '' : id);
  };

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-900/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Frequently Asked <span className="text-amber-400">Questions</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Everything you need to know about our security deposit, delivery, and equipment policy.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search deposit, delivery, damage policy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 shadow-xl"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white font-heading">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-3">
          <p className="text-sm font-bold text-white">Still have questions about camera rental?</p>
          <p className="text-xs text-slate-400">
            Our team is available 24/7 on WhatsApp to answer any custom queries.
          </p>
          <button
            onClick={() => {
              soundFx.playShutterSound();
              openWhatsAppBooking({ cameraName: 'General Query' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md shadow-amber-500/20"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>ASK US ON WHATSAPP</span>
          </button>
        </div>
      </div>
    </section>
  );
};
