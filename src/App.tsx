import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceIconsBar } from './components/ServiceIconsBar';
import { MessageCircle, Phone, Calculator } from 'lucide-react';
import { useSiteContentStore } from './lib/siteContentStore';

// Lazy load below-the-fold heavy components to drastically reduce initial JS payload
const EngineeringQuality = lazy(() => import('./components/EngineeringQuality').then(m => ({ default: m.EngineeringQuality })));
const LuxuryProjectsShowcase = lazy(() => import('./components/LuxuryProjectsShowcase').then(m => ({ default: m.LuxuryProjectsShowcase })));
const GlassComparisonSlider = lazy(() => import('./components/GlassComparisonSlider').then(m => ({ default: m.GlassComparisonSlider })));
const ArticlesSection = lazy(() => import('./components/ArticlesSection').then(m => ({ default: m.ArticlesSection })));
const TehranDistrictsCoverage = lazy(() => import('./components/TehranDistrictsCoverage').then(m => ({ default: m.TehranDistrictsCoverage })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const QuickInquiryModal = lazy(() => import('./components/QuickInquiryModal').then(m => ({ default: m.QuickInquiryModal })));

export default function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const contact = useSiteContentStore((state) => state.contact);

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] flex flex-col selection:bg-[#00F090]/30 selection:text-[#06080F] relative">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with GPU acceleration, Canvas lighting, and dynamic text store */}
        <Hero 
          onOpenInquiry={() => setInquiryOpen(true)}
        />

        {/* Sub-Hero Service Icons Bar (Service Cards) */}
        <ServiceIconsBar 
          onOpenInquiry={() => setInquiryOpen(true)}
        />

        {/* Below-the-fold components loaded on-demand via Suspense with zero layout shift */}
        <Suspense fallback={<div className="min-h-[200px]" />}>
          {/* Engineering Standards & Quality Highlights */}
          <EngineeringQuality />

          {/* Luxury Projects Showcase in Tehran Districts */}
          <LuxuryProjectsShowcase 
            onOpenInquiry={() => setInquiryOpen(true)}
          />

          {/* Interactive Material Comparison Slider (Clarity & Safety) */}
          <GlassComparisonSlider 
            onOpenInquiry={() => setInquiryOpen(true)}
          />

          {/* Engineering Articles & Architectural Guides */}
          <ArticlesSection />

          {/* Tehran North Districts (1-5) Local Coverage & Dispatch */}
          <TehranDistrictsCoverage 
            onOpenInquiry={() => setInquiryOpen(true)}
          />
        </Suspense>
      </main>

      {/* Footer (Lazy Loaded) */}
      <Suspense fallback={null}>
        <Footer 
          onOpenInquiry={() => setInquiryOpen(true)}
        />
      </Suspense>

      {/* Quick Engineer Request & On-site Survey Modal (Lazy Loaded) */}
      {inquiryOpen && (
        <Suspense fallback={null}>
          <QuickInquiryModal 
            isOpen={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
          />
        </Suspense>
      )}

      {/* Floating Quick Action Widget for Luxury Tehran Clients (Desktop / Tablet) */}
      <div className="hidden md:flex fixed bottom-5 left-5 z-40 flex-col items-center gap-3">
        {/* Floating Calculator Link Button (10% Mint Accent with #06080F Text/Icon) */}
        <a
          href="/calculator"
          aria-label="Online Price Estimator"
          className="w-12 h-12 rounded-full bg-[#00F090] text-[#06080F] shadow-xl border border-white/60 backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all group cursor-pointer"
          title="محاسبه آنلاین قیمت پروژه"
        >
          <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </a>

        {/* Direct WhatsApp Call */}
        <button
          onClick={() => setInquiryOpen(true)}
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all backdrop-blur-md border border-white/20 cursor-pointer"
          title="مشاوره مستقیم در واتس‌اپ"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Direct Phone Call */}
        <a
          href={`tel:${contact.centralPhoneTel}`}
          aria-label="Call Central Office"
          className="w-12 h-12 rounded-full bg-[#06080F] text-[#00F090] shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all backdrop-blur-md border border-white/20"
          title={`تماس مستقیم با دفتر مهندسی: ${contact.centralPhone}`}
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
