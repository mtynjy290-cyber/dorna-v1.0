import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, ShieldCheck, Check, Layers, Sliders, ArrowRightLeft, Info } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface GlassComparisonSliderProps {
  onOpenInquiry?: () => void;
}

export function GlassComparisonSlider({ onOpenInquiry }: GlassComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'clarity' | 'safety'>('clarity');
  const containerRef = useRef<HTMLDivElement>(null);

  // Images and specs data
  const comparisonData = {
    clarity: {
      title: 'مقایسه شفافیت و عبور نور: شیشه فلوت معمولی در برابر سوپرکلیر کریستال',
      badge: 'آزمون خلوص رنگ و عبور نور',
      description:
        'شیشه‌های فلوت سنتی به دلیل غلظت بالای اکسید آهن دارای رگه‌های سبز تیره هستند. در مقابل، شیشه سوپرکلیر کم‌آهن (Low-Iron) با پالایش اکسید آهن، شفافیت کریستالی ۹۱.۵٪ و دید بی‌نقص را خلق می‌کند.',
      left: {
        label: 'شیشه فلوت معمولی (Standard Float)',
        sublabel: 'اکسید آهن ۰.۱٪ • ته‌رنگ سبز لبه‌ها • افت عبور نور',
        image: '/images/float-glass.jpg',
        specs: [
          { label: 'ضریب عبور نور (VLT)', value: '۸۳٪ (کدرتر)' },
          { label: 'خلوص رنگ لبه شیشه', value: 'ته‌رنگ سبز مشخص' },
          { label: 'کاربرد', value: 'پنجره‌های معمولی و صنعتی' },
        ],
      },
      right: {
        label: 'شیشه سوپرکلیر کم‌آهن (Ultra-Clear / Low-Iron)',
        sublabel: 'اکسید آهن < ۰.۰۱٪ • بدون هاله سبز • شفافیت الماس',
        image: '/images/super-clear-glass.jpg',
        specs: [
          { label: 'ضریب عبور نور (VLT)', value: '۹۱.۵٪ (فوق شفاف)' },
          { label: 'خلوص رنگ لبه شیشه', value: 'کاملاً بلورین و بی‌رنگ' },
          { label: 'کاربرد', value: 'ورودی لابی لوکس، ویترین طلا و پارتیشن' },
        ],
      },
    },
    safety: {
      title: 'مقایسه ایمنی سازه: شیشه سکوریت در برابر لمینت آکوستیک چندلایه',
      badge: 'آزمون مقاومت مکانیکی و افت صوتی',
      description:
        'شیشه سکوریت تحت شوک حرارتی ۷۰۰ درجه مقاومت به ضربه را ۵ برابر می‌کند؛ در صورت شکست به قطعات ریز بی‌خطر تبدیل می‌شود. شیشه لمینت با لایه PVB الاستیک مانع از فروریزش شده و ۴۲ دسی‌بل افت صدا ایجاد می‌کند.',
      left: {
        label: 'شیشه سکوریت ۱۰ میل (Tempered Glass)',
        sublabel: 'شوک حرارتی ۷۰۰°C • خرد شدن به ریزبلورهای ایمن',
        image: '/images/float-glass.jpg',
        specs: [
          { label: 'مقاومت مکانیکی ضربه', value: '۵ برابر شیشه خام' },
          { label: 'عایق صوتی (STC)', value: '۳۲ دسی‌بل' },
          { label: 'رفتار هنگام شکست', value: 'خرد شدن پودری بی‌خطر' },
        ],
      },
      right: {
        label: 'شیشه لمینت ایمنی (Laminated with PVB)',
        sublabel: 'دولایه شیشه سکوریت + لایه میانی PVB الاستیک',
        image: '/images/laminated-safety.jpg',
        specs: [
          { label: 'مقاومت مکانیکی ضربه', value: 'ضد سرقت و ضد ضربه سنگین' },
          { label: 'عایق صوتی (STC)', value: '۴۲ دسی‌بل (سکوت مطلق)' },
          { label: 'رفتار هنگام شکست', value: 'چسبیدن قطعات به فیلم بدون ریزش' },
        ],
      },
    },
  };

  const current = comparisonData[activeTab];

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
    <section className="py-14 sm:py-20 relative overflow-hidden bg-[#E4EBF1] text-[#06080F] border-t border-white/60">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-white/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-80 h-80 bg-[#00F090]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CBD8E2]/80 border border-white/80 text-[#11172C] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
            <span>آزمایشگاه متریال {SITE_CONFIG.brand.name}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#06080F] leading-tight">
            بررسی زنده تفاوت شیشه‌های تخصصی
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#11172C]/80 font-normal leading-relaxed">
            اهرم را با موس یا لمس حرکت دهید تا تفاوت واقعی شفافیت، عبور نور و ساختار شیشه‌ها را مقایسه کنید.
          </p>

          {/* Mode Switch Tabs */}
          <div className="mt-5 inline-flex items-center p-1 rounded-2xl bg-[#CBD8E2]/80 border border-white/80 shadow-xs max-w-full overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab('clarity');
                setSliderPosition(50);
              }}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'clarity'
                  ? 'bg-[#06080F] text-[#E4EBF1] shadow-xs'
                  : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>شفافیت (فلوت / سوپرکلیر)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('safety');
                setSliderPosition(50);
              }}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'safety'
                  ? 'bg-[#06080F] text-[#E4EBF1] shadow-xs'
                  : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ایمنی (سکوریت / لمینت)</span>
            </button>
          </div>
        </div>

        {/* The Interactive Comparison Stage */}
        <div className="bg-[#CBD8E2]/70 rounded-3xl p-4 sm:p-6 border border-white/80 shadow-md backdrop-blur-md">
          
          {/* Comparison Viewport */}
          <div
            ref={containerRef}
            dir="ltr"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/80 shadow-inner group"
          >
            {/* RIGHT SIDE IMAGE */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={current.right.image}
                alt={current.right.label}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Overlay Label Right */}
              <div dir="rtl" className="absolute top-3 right-3 z-10 px-3 py-1 rounded-xl bg-[#06080F]/85 backdrop-blur-md border border-white/30 text-white text-[11px] sm:text-xs font-bold shadow-md">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F090] animate-ping"></span>
                  {current.right.label}
                </span>
              </div>
            </div>

            {/* LEFT SIDE IMAGE */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={current.left.image}
                alt={current.left.label}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
                draggable={false}
              />
              {/* Overlay Label Left */}
              <div dir="rtl" className="absolute top-3 left-3 z-10 px-3 py-1 rounded-xl bg-[#11172C]/85 backdrop-blur-md border border-white/30 text-slate-200 text-[11px] sm:text-xs font-bold shadow-md">
                <span>{current.left.label}</span>
              </div>
            </div>

            {/* THE DRAGGABLE DIVIDER LINE & HANDLE */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] cursor-ew-resize flex items-center justify-center -ml-[1px]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Round Handle */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00F090] text-[#06080F] border-2 border-white shadow-xl flex items-center justify-center font-black group-hover:scale-110 active:scale-95 transition-transform">
                <ArrowRightLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Hint Chip at Bottom */}
            <div dir="rtl" className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-[#06080F]/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold flex items-center gap-1.5 pointer-events-none">
              <Sliders className="w-3 h-3 text-[#00F090]" />
              <span>حرکت اهرم ({Math.round(sliderPosition)}٪)</span>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-white/60 font-vazir">
            
            {/* Left Specs Card */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/80 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-black text-[#06080F]">{current.left.label}</span>
                <span className="text-[10px] text-[#11172C]/60 font-bold uppercase">Standard</span>
              </div>
              
              <div className="space-y-1.5">
                {current.left.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] sm:text-xs py-0.5">
                    <span className="text-[#11172C]/70">{spec.label}:</span>
                    <span className="font-bold text-[#06080F] font-num">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Specs Card */}
            <div className="p-4 rounded-2xl bg-[#00F090]/15 border border-[#00F090]/40 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-[#00F090]/30">
                <span className="text-xs font-black text-[#06080F] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#06080F]" />
                  {current.right.label}
                </span>
                <span className="text-[10px] text-[#06080F] font-black bg-[#00F090] px-2 py-0.5 rounded-full">
                  Ultra Premium
                </span>
              </div>
              
              <div className="space-y-1.5">
                {current.right.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] sm:text-xs py-0.5">
                    <span className="text-[#11172C]">{spec.label}:</span>
                    <span className="font-black text-[#06080F] font-num">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Action / CTA - Sleek & Mobile-Optimized with 2 Equal Buttons */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white/70 border border-white/80">
            <div className="flex items-center gap-2 text-xs text-[#11172C] text-center md:text-right font-medium">
              <Info className="w-4 h-4 text-[#06080F] shrink-0 hidden sm:block" />
              <span>
                نمی‌دانید برای دهانه ورودی یا پارتیشن پروژه خود کدام نوع شیشه مناسب‌تر است؟
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs sm:text-sm font-black text-center transition-all shadow-md shadow-[#00F090]/20 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                <span>درخواست مشاوره مهندسی</span>
              </button>
              <a
                href="calculator.html"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 hover:border-[#00F090] text-xs sm:text-sm font-bold text-center transition-all shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                <span>محاسبه آنلاین قیمت</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
