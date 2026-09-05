import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  ChevronDown,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { 
  ArchitecturalServiceCard, 
  ArchitecturalProductCardData 
} from './ArchitecturalServiceCard';

export interface ServiceIconsBarProps {
  onOpenInquiry?: (serviceName?: string) => void;
}

/**
 * The 5 Core Architectural Services:
 * ۱. درب اتوماتیک اسلایدینگ
 * ۲. درب اتوماتیک تلسکوپی
 * ۳. درب های میرال
 * ۴. پارتیشن شیشه ای
 * ۵. کرکره برقی
 */
export const SERVICES_DATA: ArchitecturalProductCardData[] = [
  {
    id: 'sliding',
    titleFa: 'درب اتوماتیک اسلایدینگ',
    titleEn: 'AUTOMATIC SLIDING DOORS',
    iconType: 'sliding',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
    description: 'حرکت خطی یکنواخت و بدون لرزش با استاندارد تردد نامحدود و اپراتورهای هوشمند اروپایی',
  },
  {
    id: 'telescopic',
    titleFa: 'درب اتوماتیک تلسکوپی',
    titleEn: 'AUTOMATIC TELESCOPIC DOORS',
    iconType: 'telescopic',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85',
    description: 'افزایش بیش از ۳۰٪ عرض بازشوی مفید در ورودی‌های عریض با لنگه‌های متحرک همگام',
  },
  {
    id: 'miral',
    titleFa: 'درب های میرال',
    titleEn: 'FRAMELESS MIRAL GLASS DOORS',
    iconType: 'miral',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85',
    description: 'درب‌های شیشه‌ای سکوریت نشکن با یراق‌آلات استیل ضدزنگ ۳۰۴ و استوپ‌های هیدرولیک توکار',
  },
  {
    id: 'partition',
    titleFa: 'پارتیشن شیشه ای',
    titleEn: 'FRAMELESS GLASS PARTITIONS',
    iconType: 'partition',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85',
    description: 'تفکیک مدرن فضاهای اداری و پنت‌هاوس با پروفیل‌های اسلیم فریم‌لس و شیشه‌های آکوستیک',
  },
  {
    id: 'shutter',
    titleFa: 'کرکره برقی',
    titleEn: 'ELECTRIC ROROLLER SHUTTERS',
    iconType: 'shutter',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=85',
    description: 'تیغه‌های آلومینیوم سنگین ۶۰۶۳ و پلی‌کربنات شفاف ضدسرقت با موتورهای صنعتی ساید و توبولار',
  },
];

/**
 * Ease-Out Cubic Mathematical Curve
 * f(t) = 1 - (1 - t)^3
 */
const easeOutCubic = (t: number): number => {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 3);
};

// Layout constants for the stacking animation
// 100px exposed on the right side of underlying cards (scaled smoothly on small mobile screens)
const getStepOffsetPx = (windowWidth: number) => {
  return windowWidth >= 768
    ? 100
    : Math.min(100, Math.max(50, Math.floor((windowWidth - 180) / 4)));
};

interface CardAnimationRange {
  start: number;
  end: number;
}

// Progress distribution for 5 cards:
// 0.00 -> Card 1 already in place
// 0.04 - 0.25 -> Card 2 enters from left and stacks
// 0.28 - 0.49 -> Card 3 enters from left and stacks
// 0.52 - 0.73 -> Card 4 enters from left and stacks
// 0.76 - 0.97 -> Card 5 enters from left and stacks
// 0.97 - 1.00 -> Full stack complete & resting before normal scroll resumes
const CARD_RANGES: CardAnimationRange[] = [
  { start: 0.00, end: 0.00 }, // Card 1: Stationary anchor
  { start: 0.04, end: 0.25 }, // Card 2
  { start: 0.28, end: 0.49 }, // Card 3
  { start: 0.52, end: 0.73 }, // Card 4
  { start: 0.76, end: 0.97 }, // Card 5
];

interface StackedCardProps {
  data: ArchitecturalProductCardData;
  index: number;
  scrollYProgress: MotionValue<number>;
  windowWidth: number;
  onInquiryClick: (product: ArchitecturalProductCardData) => void;
}

/**
 * Individual Card in the Horizontal Stack
 * - Subscribes to scroll progress with 60fps hardware accelerated transform
 * - Enters from the LEFT (negative X) and lands at its exact stacked coordinate
 * - Exactly 100px of the previous card remains visible on the right
 */
const StackedCardItem: React.FC<StackedCardProps> = ({
  data,
  index,
  scrollYProgress,
  windowWidth,
  onInquiryClick,
}) => {
  const stepOffset = getStepOffsetPx(windowWidth);
  const baseCenterOffset = 2 * stepOffset; // Centers the stack symmetrically ([-2*step, +2*step])

  // Target docked position:
  // index 0 -> +200px
  // index 1 -> +100px (100px of index 0 exposed on the right)
  // index 2 -> 0px    (100px of index 1 exposed on the right)
  // index 3 -> -100px (100px of index 2 exposed on the right)
  // index 4 -> -200px (100px of index 3 exposed on the right)
  const targetX = baseCenterOffset - index * stepOffset;

  // Offscreen start position (to the LEFT: negative X):
  const startX = -(Math.max(windowWidth, 1100) + 400);
  const range = CARD_RANGES[index];

  // Dynamic transform mapping with ease-out cubic (entering from LEFT to RIGHT)
  const cardX = useTransform(scrollYProgress, (p: number) => {
    if (index === 0) return targetX;
    if (p <= range.start) return startX;
    if (p >= range.end) return targetX;

    const rawT = (p - range.start) / (range.end - range.start);
    const easedT = easeOutCubic(rawT);
    return startX + (targetX - startX) * easedT;
  });

  const cardOpacity = useTransform(scrollYProgress, (p: number) => {
    if (index === 0) return 1;
    if (p <= range.start) return 0;
    if (p >= range.end) return 1;

    const rawT = (p - range.start) / (range.end - range.start);
    // Smooth, rapid fade in during the first 25% of entry travel from the left
    return Math.min(1, rawT * 4);
  });

  // Layer order: Card 1 is lowest (zIndex 10), Card 5 is highest (zIndex 50)
  const zIndex = (index + 1) * 10;

  // Right-directed drop shadow on upper cards to give depth to the 100px exposed strip below
  const stackedShadowClass = index === 0
    ? 'shadow-[0_16px_45px_rgba(6,8,15,0.35)]'
    : 'shadow-[14px_0_32px_rgba(0,0,0,0.55),0_18px_45px_rgba(6,8,15,0.4)]';

  return (
    <motion.div
      style={{
        x: cardX,
        opacity: cardOpacity,
        zIndex,
      }}
      className={`services-stacked-card ${stackedShadowClass} rounded-2xl sm:rounded-3xl`}
    >
      <ArchitecturalServiceCard
        data={data}
        index={index}
        onInquiryClick={onInquiryClick}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export const ServiceIconsBar: React.FC<ServiceIconsBarProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isStackComplete, setIsStackComplete] = useState(false);

  // Responsive window width tracking
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Framer Motion scroll tracking over the tall pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Keep active step state in sync with current scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress < 0.25) {
        setActiveStep(progress < 0.04 ? 0 : 1);
        setIsStackComplete(false);
      } else if (progress < 0.49) {
        setActiveStep(2);
        setIsStackComplete(false);
      } else if (progress < 0.73) {
        setActiveStep(3);
        setIsStackComplete(false);
      } else if (progress < 0.97) {
        setActiveStep(4);
        setIsStackComplete(false);
      } else {
        setActiveStep(4);
        setIsStackComplete(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Clickable interactive step navigator
  const handleScrollToStep = useCallback((stepIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollDistance = containerRef.current.offsetHeight - window.innerHeight;

    const targetProgressMap = [0.01, 0.22, 0.47, 0.71, 0.96];
    const targetProgress = targetProgressMap[stepIndex];
    const targetY = containerTop + targetProgress * totalScrollDistance;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  const handleCardInquiry = (product: ArchitecturalProductCardData) => {
    if (onOpenInquiry) {
      onOpenInquiry(product.titleFa);
    } else {
      window.location.href = '/calculator';
    }
  };

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative z-20 h-[500vh] bg-[#E4EBF1] border-t border-white/60"
      dir="rtl"
    >
      {/* 
        STICKY VIEWPORT CONTAINER (Pinned during the 500vh vertical scroll)
        - Sticks at top: 0
        - Exactly 100dvh height
        - Overflow hidden to prevent any unwanted horizontal document scrollbar
      */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
        
        {/* Top Ambient Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[2px] bg-gradient-to-r from-transparent via-[#00F5A0]/60 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-3xl h-24 bg-gradient-to-b from-[#00F5A0]/10 to-transparent blur-2xl pointer-events-none" />

        {/* 
          1. SECTION HEADER (Titles, Indicators and Real-time Counter)
        */}
        <div className="w-full max-w-[1400px] mx-auto shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-5">
            
            {/* Header Text Group */}
            <div className="max-w-2xl">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06080F]/[0.06] border border-white/80 text-[#06080F] text-[11px] sm:text-xs font-bold shadow-2xs backdrop-blur-md mb-2 sm:mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00F5A0]" />
                <span>خدمات تخصصی درنا درب</span>
              </div>

              {/* Main Section Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#06080F] tracking-tight leading-tight">
                خدمات مهندسی و سیستم‌های ورودی
              </h2>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-xs md:text-sm text-[#11172C]/75 font-medium mt-1.5 line-clamp-1 sm:line-clamp-none">
                طراحی، تولید و اجرای ۵ سیستم استاندارد معماری با قطعات فابریک و اپراتورهای هوشمند
              </p>
            </div>

            {/* Step Indicators and Live Status Badge */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end">
              {/* Active Card Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-white/90 text-[#06080F] text-xs font-bold shadow-xs">
                <Layers className="w-3.5 h-3.5 text-[#00F5A0]" />
                <span className="font-mono">
                  {isStackComplete ? (
                    <span className="inline-flex items-center gap-1 text-[#00A86B]">
                      <span>استقرار کامل ۵ لایه</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B]" />
                    </span>
                  ) : (
                    <span>
                      کارت {(activeStep + 1).toLocaleString('fa-IR')} از ۵
                    </span>
                  )}
                </span>
              </div>

              {/* Interactive Service Step Buttons */}
              <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/70 border border-white/80 shadow-2xs">
                {SERVICES_DATA.map((service, idx) => {
                  const isCurrent = idx === activeStep;
                  const isPast = idx < activeStep;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleScrollToStep(idx)}
                      title={`مشاهده ${service.titleFa}`}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#06080F] text-[#00F5A0] shadow-sm'
                          : isPast
                          ? 'text-[#06080F] hover:bg-black/5'
                          : 'text-[#11172C]/40 hover:text-[#06080F]'
                      }`}
                    >
                      {service.titleFa.replace('درب اتوماتیک ', '').replace('درب های ', '')}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* 
          2. STACKING STAGE (Centered Viewport Area)
          - Contains all 5 cards in absolute stacking layout
          - Width is responsive (square 1:1)
          - Cards move horizontally driven by scroll
          - Exactly 25px of the previous card remains visible on the right
        */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto py-2">
          
          {/* Central Architectural Framing Stage */}
          <div className="services-stacked-stage">
            {SERVICES_DATA.map((service, index) => (
              <StackedCardItem
                key={service.id}
                data={service}
                index={index}
                scrollYProgress={scrollYProgress}
                windowWidth={windowWidth}
                onInquiryClick={handleCardInquiry}
              />
            ))}
          </div>

        </div>

        {/* 
          3. BOTTOM CONTROLS & SCROLL CUE
          - Responsive step progress bar
          - Visual cue indicating scroll direction
        */}
        <div className="w-full max-w-[1400px] mx-auto shrink-0 pt-2 pb-1">
          <div className="flex items-center justify-between gap-4">
            
            {/* Step Dots & Progress for Mobile / Tablet */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {SERVICES_DATA.map((service, idx) => {
                const isCurrent = idx === activeStep;
                const isPast = idx < activeStep;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleScrollToStep(idx)}
                    aria-label={`رفتن به سیستم ${service.titleFa}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                      isCurrent
                        ? 'w-7 sm:w-9 h-2 bg-[#06080F]'
                        : isPast
                        ? 'w-2 h-2 bg-[#00F5A0] ring-2 ring-[#00F5A0]/20'
                        : 'w-2 h-2 bg-[#06080F]/20 hover:bg-[#06080F]/40'
                    }`}
                  />
                );
              })}
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#11172C]/70 bg-white/60 px-3 py-1.5 rounded-full border border-white/80 shadow-2xs backdrop-blur-xs">
              {isStackComplete ? (
                <span className="text-[#06080F] font-bold">
                  استقرار کامل ۵ لایه با نمای ۱۰۰ پیکسلی • ادامه اسکرول عمودی
                </span>
              ) : (
                <span>
                  اسکرول عمودی جهت استقرار سیستم‌ها از سمت چپ (سیستم {activeStep + 1} از ۵)
                </span>
              )}
              <ChevronDown 
                className={`w-3.5 h-3.5 text-[#00F5A0] ${
                  isStackComplete ? 'animate-bounce' : 'animate-pulse'
                }`} 
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
