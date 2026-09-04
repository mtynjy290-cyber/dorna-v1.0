import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, ShieldCheck, Check, Layers, Sliders, ArrowRightLeft, Info, Sun, Eye, ZoomIn, Award } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useSiteContentStore, DEFAULT_GLASS_LAB_CONTENT, ComparisonCategoryKey } from '../lib/siteContentStore';

// Import high-resolution specialized glass comparison fallback images
import floatGlassImg from '../assets/images/standard_float_green_glass_1788185737128.jpg';
import superClearImg from '../assets/images/super_crystal_ultra_clear_1788185753980.jpg';
import temperedImg from '../assets/images/tempered_safety_glass_test_1788185769059.jpg';
import laminatedImg from '../assets/images/laminated_pvb_acoustic_glass_1788185787789.jpg';
import lowEImg from '../assets/images/solarcool_lowe_thermal_glass_1788185812691.jpg';
import satinImg from '../assets/images/satin_frosted_partition_glass_1788185826990.jpg';

interface GlassComparisonSliderProps {
  onOpenInquiry?: () => void;
}

const FALLBACK_IMAGES: Record<string, string> = {
  '/images/float-glass.jpg': floatGlassImg,
  '/images/super-clear-glass.jpg': superClearImg,
  '/images/tempered-glass.jpg': temperedImg,
  '/images/laminated-safety.jpg': laminatedImg,
  '/images/lowe-glass.jpg': lowEImg,
  '/images/satin-glass.jpg': satinImg,
};

const resolveImage = (imgSrc: string | undefined, defaultFallback: string): string => {
  if (!imgSrc || imgSrc.trim() === '') return defaultFallback;
  if (FALLBACK_IMAGES[imgSrc]) return FALLBACK_IMAGES[imgSrc];
  return imgSrc;
};

export function GlassComparisonSlider({ onOpenInquiry }: GlassComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<ComparisonCategoryKey>('clarity');
  const containerRef = useRef<HTMLDivElement>(null);

  const glassLab = useSiteContentStore((state) => state.glassLab) || DEFAULT_GLASS_LAB_CONTENT;
  const categories = glassLab.categories || DEFAULT_GLASS_LAB_CONTENT.categories;
  const currentCategory = categories[activeTab] || DEFAULT_GLASS_LAB_CONTENT.categories[activeTab];

  // Resolve images with graceful fallbacks
  const leftImageFallback = activeTab === 'clarity' || activeTab === 'thermal' ? floatGlassImg : activeTab === 'safety' ? temperedImg : superClearImg;
  const rightImageFallback = activeTab === 'clarity' ? superClearImg : activeTab === 'safety' ? laminatedImg : activeTab === 'thermal' ? lowEImg : satinImg;

  const current = {
    ...currentCategory,
    left: {
      ...currentCategory.left,
      image: resolveImage(currentCategory.left.image, leftImageFallback),
    },
    right: {
      ...currentCategory.right,
      image: resolveImage(currentCategory.right.image, rightImageFallback),
    },
  };

  // Handle Dragging in RTL context
  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="glass-lab" className="py-28 sm:py-36 relative overflow-hidden bg-[#E4EBF1] text-[#06080F] border-t border-white/60">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-white/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-80 h-80 bg-[#00F090]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid-container-12 relative z-10">
        
        {/* Section Header (12 Columns) */}
        <div className="grid grid-cols-12 gap-6 mb-16 sm:mb-20">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CBD8E2]/80 border border-white/80 text-[#11172C] text-xs font-bold mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
              <span>{glassLab.sectionBadge || `آزمایشگاه متریال و آزمون شیشه ${SITE_CONFIG.brand.name}`}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#06080F] leading-tight">
              {glassLab.sectionTitle || 'بررسی زنده و میکرومتری تفاوت شیشه‌های تخصصی'}
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-[#11172C]/80 font-normal leading-relaxed max-w-2xl mx-auto">
              {glassLab.sectionSubtitle || 'اهرم تعاملی را به چپ یا راست بکشید تا تفاوت واقعی شفافیت، ایمنی، شکست نور و ساختار شیشه‌ها را در محیط شبیه‌سازی‌شده مقایسه کنید.'}
            </p>

            {/* Mode Switch Tabs - 4 Distinct Categories */}
            <div className="mt-8 sm:mt-10 inline-flex flex-wrap items-center justify-center p-2 rounded-2xl bg-[#CBD8E2]/80 border border-white/80 shadow-xs max-w-full gap-1.5">
              <button
                onClick={() => {
                  setActiveTab('clarity');
                  setSliderPosition(50);
                }}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'clarity'
                    ? 'bg-[#06080F] text-[#E4EBF1] shadow-xs'
                    : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{categories.clarity?.tabLabel || 'شفافیت (فلوت / سوپرکلیر)'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('safety');
                  setSliderPosition(50);
                }}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'safety'
                    ? 'bg-[#06080F] text-[#E4EBF1] shadow-xs'
                    : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{categories.safety?.tabLabel || 'ایمنی (سکوریت / لمینت PVB)'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('thermal');
                  setSliderPosition(50);
                }}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'thermal'
                    ? 'bg-[#06080F] text-[#E4EBF1] shadow-xs'
                    : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{categories.thermal?.tabLabel || 'عایق گرما (ساده / Low-E سان‌انرژی)'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('privacy');
                  setSliderPosition(50);
                }}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'privacy'
                    ? 'bg-[#06080F] text-[#E4EBF1] shadow-xs'
                    : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{categories.privacy?.tabLabel || 'پارتیشن (شفاف / مات ساتینا)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Interactive Comparison Stage (12 Columns) */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="bg-[#CBD8E2]/70 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/80 shadow-md backdrop-blur-md">
          
          {/* Active Comparison Badge & Description */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/60">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#06080F] text-[#00F090] text-[11px] font-black">
                {current.badge}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-[#06080F]">
                {current.title}
              </h3>
            </div>
            {/* Quick Slider Position Shortcuts */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#11172C]">
              <span className="hidden md:inline">موقعیت مقایسه:</span>
              <button
                onClick={() => setSliderPosition(20)}
                className="px-2.5 py-1 rounded-lg bg-white/70 hover:bg-white text-[#06080F] transition-all cursor-pointer"
              >
                ۸۰٪ چپ
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className="px-2.5 py-1 rounded-lg bg-white/70 hover:bg-white text-[#06080F] transition-all cursor-pointer"
              >
                ۵۰/۵۰
              </button>
              <button
                onClick={() => setSliderPosition(80)}
                className="px-2.5 py-1 rounded-lg bg-white/70 hover:bg-white text-[#06080F] transition-all cursor-pointer"
              >
                ۸۰٪ راست
              </button>
            </div>
          </div>

          {/* Comparison Viewport */}
          <div
            ref={containerRef}
            dir="ltr"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/80 shadow-inner group"
          >
            {/* RIGHT SIDE IMAGE (Low-Iron / Laminated / Low-E / Satin) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={current.right.image}
                alt={current.right.label}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                draggable={false}
                referrerPolicy="no-referrer"
              />
              {/* Overlay Label Right */}
              <div dir="rtl" className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-[#06080F]/90 backdrop-blur-md border border-[#00F090]/40 text-white text-[11px] sm:text-xs font-bold shadow-lg flex flex-col gap-0.5 items-start">
                <span className="flex items-center gap-1.5 text-[#00F090]">
                  <span className="w-2 h-2 rounded-full bg-[#00F090] animate-pulse"></span>
                  {current.right.label}
                </span>
                <span className="text-[10px] text-slate-300 font-normal">
                  {current.right.badgeText}
                </span>
              </div>

              {/* Technical Callout Badge at Bottom Right */}
              <div dir="rtl" className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#06080F]/80 backdrop-blur-md border border-white/20 text-[#00F090] text-[10px] font-bold">
                <Award className="w-3 h-3 text-[#00F090]" />
                <span>{current.right.highlight}</span>
              </div>
            </div>

            {/* LEFT SIDE IMAGE (Standard Float / Tempered / Clear) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={current.left.image}
                alt={current.left.label}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
                draggable={false}
                referrerPolicy="no-referrer"
              />
              {/* Overlay Label Left */}
              <div dir="rtl" className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-[#11172C]/90 backdrop-blur-md border border-white/30 text-slate-200 text-[11px] sm:text-xs font-bold shadow-lg flex flex-col gap-0.5 items-start">
                <span className="text-white">{current.left.label}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {current.left.badgeText}
                </span>
              </div>

              {/* Technical Callout Badge at Bottom Left */}
              <div dir="rtl" className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#11172C]/80 backdrop-blur-md border border-white/20 text-slate-300 text-[10px]">
                <Info className="w-3 h-3 text-amber-400" />
                <span>{current.left.highlight}</span>
              </div>
            </div>

            {/* THE DRAGGABLE DIVIDER LINE & HANDLE */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)] cursor-ew-resize flex items-center justify-center -ml-[1px]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Round Handle */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#00F090] text-[#06080F] border-2 border-white shadow-2xl flex items-center justify-center font-black group-hover:scale-110 active:scale-95 transition-transform">
                <ArrowRightLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
            </div>

            {/* Center Hint Chip */}
            <div dir="rtl" className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 rounded-full bg-[#06080F]/85 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold flex items-center gap-1.5 pointer-events-none">
              <Sliders className="w-3 h-3 text-[#00F090]" />
              <span>اهرم مقایسه ({Math.round(sliderPosition)}٪)</span>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-6 sm:pt-8 border-t border-white/60 font-vazir">
            
            {/* Left Specs Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 border border-white/80 space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-[#06080F]">{current.left.label}</span>
                <span className="text-[10px] text-[#11172C]/70 font-bold px-2.5 py-1 rounded-md bg-slate-200">
                  {current.left.badgeText}
                </span>
              </div>
              
              <div className="space-y-2">
                {current.left.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] sm:text-xs py-1">
                    <span className="text-[#11172C]/70">{spec.label}:</span>
                    <span className="font-bold text-[#06080F] font-num">{spec.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] sm:text-xs text-[#11172C]/80 pt-2 border-t border-slate-200 font-normal leading-relaxed">
                {current.left.sublabel}
              </p>
            </div>

            {/* Right Specs Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#00F090]/15 border border-[#00F090]/40 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#00F090]/30">
                <span className="text-xs sm:text-sm font-black text-[#06080F] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#06080F]" />
                  {current.right.label}
                </span>
                <span className="text-[10px] text-[#06080F] font-black bg-[#00F090] px-2.5 py-1 rounded-full">
                  {current.right.badgeText}
                </span>
              </div>
              
              <div className="space-y-2">
                {current.right.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] sm:text-xs py-1">
                    <span className="text-[#11172C]">{spec.label}:</span>
                    <span className="font-black text-[#06080F] font-num">{spec.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] sm:text-xs text-[#06080F] pt-2 border-t border-[#00F090]/30 font-medium leading-relaxed">
                {current.right.sublabel}
              </p>
            </div>

          </div>

          {/* Bottom Action / CTA */}
          <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-center justify-between gap-5 p-5 sm:p-6 rounded-3xl bg-white/70 border border-white/80">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#11172C] text-center md:text-right font-medium leading-relaxed">
              <Info className="w-5 h-5 text-[#06080F] shrink-0 hidden sm:block" />
              <span>
                نمی‌دانید برای پروژه ورودی لابی یا پارتیشن اداری شما کدام تیپ شیشه و اپراتور مهندسی مناسب‌تر است؟
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs sm:text-sm font-black text-center transition-all shadow-md shadow-[#00F090]/20 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                <span>{glassLab.ctaConsultationText || 'درخواست مشاوره انتخاب متریال'}</span>
              </button>
              <a
                href="/calculator"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 hover:border-[#00F090] text-xs sm:text-sm font-bold text-center transition-all shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <span>{glassLab.ctaCalculatorText || 'محاسبه آنلاین قیمت متریال'}</span>
              </a>
            </div>
          </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
