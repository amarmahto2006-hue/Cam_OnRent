import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { GoogleSheetsIntegrationModal } from './components/GoogleSheetsIntegrationModal';
import { CameraAvailabilityCalendar } from './components/CameraAvailabilityCalendar';
import { BookingRowData } from './services/googleSheets';

// Lazy load below-the-fold components to reduce initial bundle size & ensure < 3s load budget
const OfficialBannerShowcase = lazy(() => import('./components/OfficialBannerShowcase').then(m => ({ default: m.OfficialBannerShowcase })));
const WhyCamOnRent = lazy(() => import('./components/WhyCamOnRent').then(m => ({ default: m.WhyCamOnRent })));
const FeaturedCameras = lazy(() => import('./components/FeaturedCameras').then(m => ({ default: m.FeaturedCameras })));
const GoProShowcase = lazy(() => import('./components/GoProShowcase').then(m => ({ default: m.GoProShowcase })));
const WhatsAppMessageBuilder = lazy(() => import('./components/WhatsAppMessageBuilder').then(m => ({ default: m.WhatsAppMessageBuilder })));
const WhatsIncluded = lazy(() => import('./components/WhatsIncluded').then(m => ({ default: m.WhatsIncluded })));
const Accessories = lazy(() => import('./components/Accessories').then(m => ({ default: m.Accessories })));
const HowItWorks = lazy(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })));
const PricingCalculator = lazy(() => import('./components/PricingCalculator').then(m => ({ default: m.PricingCalculator })));
const WhoUsesUs = lazy(() => import('./components/WhoUsesUs').then(m => ({ default: m.WhoUsesUs })));
const GalleryAndReviews = lazy(() => import('./components/GalleryAndReviews').then(m => ({ default: m.GalleryAndReviews })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const LeadCaptureForm = lazy(() => import('./components/LeadCaptureForm').then(m => ({ default: m.LeadCaptureForm })));
const FinalCTA = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })));

// Inline Section Fallback Skeleton
const SectionSkeleton: React.FC = () => (
  <div className="w-full py-16 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center">
    <div className="w-full h-32 rounded-3xl bg-slate-900/60 border border-slate-800 animate-pulse flex items-center justify-center">
      <div className="h-6 w-48 bg-slate-800 rounded-lg"></div>
    </div>
  </div>
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(true);

  // Google Sheets Modal state
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [currentBookingToExport, setCurrentBookingToExport] = useState<BookingRowData | null>(null);

  const handleOpenSheetsModal = (bookingData?: BookingRowData) => {
    if (bookingData) {
      setCurrentBookingToExport(bookingData);
    }
    setIsSheetsModalOpen(true);
  };

  useEffect(() => {
    // Non-blocking background image preloading for smooth performance
    const criticalAssets = [
      'https://i.ibb.co/N2s4J5FT/01-Brand-Logo-Cam-On-Rent-Emblem.png',
      'https://i.ibb.co/xqMmZv5s/02-Hero-3-D-Model-Go-Pro-HERO12.png',
      'https://i.ibb.co/dsx52DCW/03-Product-Go-Pro-HERO12-Black-Flagship.png'
    ];

    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Application Shell revealed immediately for instant performance */}
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative">
        <AnnouncementBar />
        <Navbar onOpenBookingModal={scrollToContact} onOpenSheetsModal={() => handleOpenSheetsModal()} />

        <main>
          <Hero />

          <Suspense fallback={<SectionSkeleton />}>
            <OfficialBannerShowcase />
            <WhyCamOnRent />
            <FeaturedCameras />
            <CameraAvailabilityCalendar onOpenSheetsModal={(booking) => handleOpenSheetsModal(booking)} />
            <GoProShowcase />
            <WhatsAppMessageBuilder onOpenSheetsModal={(booking) => handleOpenSheetsModal(booking)} />
            <WhatsIncluded />
            <Accessories />
            <HowItWorks />
            <PricingCalculator />
            <WhoUsesUs />
            <GalleryAndReviews />
            <FAQ />
            <LeadCaptureForm />
            <FinalCTA />
          </Suspense>
        </main>

        <Footer />
        <FloatingWhatsApp />
        <BackToTop />

        {/* Google Sheets Sync & Export Modal */}
        <GoogleSheetsIntegrationModal
          isOpen={isSheetsModalOpen}
          onClose={() => setIsSheetsModalOpen(false)}
          currentBookingToExport={currentBookingToExport}
        />
      </div>
    </>
  );
}
