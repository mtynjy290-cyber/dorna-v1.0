import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { 
  Sparkles
} from 'lucide-react';
import { 
  ArchitecturalServiceCard, 
  ArchitecturalProductCardData 
} from './ArchitecturalServiceCard';

// ============================================================================
// تنظیمات ابعاد و موقعیت کارت‌ها (اینجا را می‌توانید دستی تغییر دهید)
// ============================================================================
/**
 * میزان بیرون‌زدگی لبه کارت بعدی از سمت چپ صفحه دسکتاپ به پیکسل (Peek Offset)
 * --------------------------------------------------------------------------
 * هم‌اکنون روی 25 پیکسل تنظیم شده است.
 * شما می‌توانید این عدد را مستقیماً به هر مقداری که مایلید تغییر دهید:
 * - مثلاً 0: کارت کاملاً بیرون از کادر پنهان می‌ماند تا وقتی اسکرول شود.
 * - مثلاً 25: ۲۵ پیکسل از لبه کارت بعدی از سمت چپ دیده می‌شود.
 * - مثلاً 50 یا 70: لبه بیشتری از کارت بعدی نمایان خواهد بود.
 */
export const CARD_PEEK_OFFSET_PX = 25;

/** عرض کارت در دسکتاپ (پیکسل) */
export const CARD_DESKTOP_WIDTH_PX = 750;

/** ارتفاع کارت در دسکتاپ (پیکسل) */
export const CARD_DESKTOP_HEIGHT_PX = 350;

/** میزان لبه کارت‌های زیرین که از سمت راست بیرون می‌ماند (پیکسل) */
export const UNDERLYING_CARD_EXPOSED_PX = 100;

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
    imageUrl: '',
    description: 'حرکت خطی یکنواخت و بدون لرزش با استاندارد تردد نامحدود و اپراتورهای هوشمند اروپایی',
  },
  {
    id: 'telescopic',
    titleFa: 'درب اتوماتیک تلسکوپی',
    titleEn: 'AUTOMATIC TELESCOPIC DOORS',
    iconType: 'telescopic',
    imageUrl: '',
    description: 'افزایش بیش از ۳۰٪ عرض بازشوی مفید در ورودی‌های عریض با لنگه‌های متحرک همگام',
  },
  {
    id: 'miral',
    titleFa: 'درب های میرال',
    titleEn: 'FRAMELESS MIRAL GLASS DOORS',
    iconType: 'miral',
    imageUrl: '',
    description: 'درب‌های شیشه‌ای سکوریت نشکن با یراق‌آلات استیل ضدزنگ ۳۰۴ و استوپ‌های هیدرولیک توکار',
  },
  {
    id: 'partition',
    titleFa: 'پارتیشن شیشه ای',
    titleEn: 'FRAMELESS GLASS PARTITIONS',
    iconType: 'partition',
    imageUrl: '',
    description: 'تفکیک مدرن فضاهای اداری و پنت‌هاوس با پروفیل‌های اسلیم فریم‌لس و شیشه‌های آکوستیک',
  },
  {
    id: 'shutter',
    titleFa: 'کرکره برقی',
    titleEn: 'ELECTRIC ROROLLER SHUTTERS',
    iconType: 'shutter',
    imageUrl: '',
    description: 'تیغه‌های آلومینیوم سنگین ۶۰۶۳ و پلی‌کربنات شفاف ضدسرقت با موتورهای صنعتی ساید و توبولار',
  },
];

/**
 * Ease-In-Out Cubic Curve for velvety smooth, organic motion
 * Zero initial slope prevents sudden jumps at start of scroll
 */
const easeInOutCubic = (t: number): number => {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5 
    ? 4 * clamped * clamped * clamped 
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
};

// Layout constants for the stacking animation
// Uses UNDERLYING_CARD_EXPOSED_PX exposed on the right side of underlying cards (scaled smoothly on small mobile screens)
const getStepOffsetPx = (windowWidth: number) => {
  if (windowWidth >= 1200) {
    return UNDERLYING_CARD_EXPOSED_PX;
  }
  if (windowWidth >= 768) {
    // Smooth adaptive offset for desktop range with configured card width
    return Math.min(UNDERLYING_CARD_EXPOSED_PX, Math.max(40, Math.floor((windowWidth - CARD_DESKTOP_WIDTH_PX - 48) / 4)));
  }
  return Math.min(UNDERLYING_CARD_EXPOSED_PX, Math.max(40, Math.floor((windowWidth - 180) / 4)));
};

interface CardAnimationRange {
  start: number;
  end: number;
}

// Progress distribution across 800vh vertical scroll with comfortable pauses:
// 0.00 -> Card 1 already docked; Card 2 waiting with CARD_PEEK_OFFSET_PX peek on the left
// 0.05 - 0.23 -> Card 2 glides in and stacks (Card 3 fades in at peek position)
// 0.28 - 0.46 -> Card 3 glides in and stacks (Card 4 fades in at peek position)
// 0.51 - 0.69 -> Card 4 glides in and stacks (Card 5 fades in at peek position)
// 0.74 - 0.92 -> Card 5 glides in and stacks
// 0.92 - 1.00 -> Full 5-card stack rests gracefully before exit
const CARD_RANGES: CardAnimationRange[] = [
  { start: 0.00, end: 0.00 }, // Card 1: Stationary anchor
  { start: 0.05, end: 0.23 }, // Card 2
  { start: 0.28, end: 0.46 }, // Card 3
  { start: 0.51, end: 0.69 }, // Card 4
  { start: 0.74, end: 0.92 }, // Card 5
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
 * - On desktop: CARD_PEEK_OFFSET_PX of the incoming card peeks out from the left viewport edge
 * - Glides into its docked position with velvety smooth ease-in-out curve
 * - Exactly UNDERLYING_CARD_EXPOSED_PX of each underlying card remains exposed on the right
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

  const isDesktop = windowWidth >= 768;

  // Peek start position on left edge:
  // Exactly CARD_PEEK_OFFSET_PX of the right side of the card remains visible inside the left edge of the screen.
  // Stage is centered horizontally (x = 0 is center of screen). Left screen edge is -windowWidth / 2.
  // For a card of width W, right edge is at x + W / 2.
  // We want x + W / 2 = -windowWidth / 2 + CARD_PEEK_OFFSET_PX  =>  x = -((windowWidth + W) / 2 - CARD_PEEK_OFFSET_PX)
  const startX = isDesktop
    ? -Math.round((windowWidth + CARD_DESKTOP_WIDTH_PX) / 2 - CARD_PEEK_OFFSET_PX)
    : -(Math.max(windowWidth, 400) + 300);

  const range = CARD_RANGES[index] || { start: 0, end: 1 };

  // Dynamic transform mapping with ease-in-out cubic (entering from LEFT to RIGHT)
  const cardX = useTransform(scrollYProgress, (p: number) => {
    if (index === 0) return targetX;
    if (p <= range.start) return startX;
    if (p >= range.end) return targetX;

    const rawT = (p - range.start) / (range.end - range.start);
    const easedT = easeInOutCubic(rawT);
    return startX + (targetX - startX) * easedT;
  });

  // Opacity handling:
  // - Card 0: Always 1
  // - Card 1: Always 1 (at p=0 it is visible at startX with peek offset to invite scrolling!)
  // - Cards 2..4: Fade in smoothly as the preceding card departs from the left edge
  const cardOpacity = useTransform(scrollYProgress, (p: number) => {
    if (index <= 1) return 1;

    const prevRange = CARD_RANGES[index - 1] || { start: 0, end: 1 };
    if (p < prevRange.start) return 0;

    const fadeWindow = 0.06;
    if (p < prevRange.start + fadeWindow) {
      return Math.min(1, (p - prevRange.start) / fadeWindow);
    }
    return 1;
  });

  // Layer order: Card 1 is lowest (zIndex 10), Card 5 is highest (zIndex 50)
  const zIndex = (index + 1) * 10;

  // Right-directed drop shadow on upper cards to give depth to the exposed strip below
  const stackedShadowClass = index === 0
    ? 'shadow-[0_16px_45px_rgba(6,8,15,0.35)]'
    : 'shadow-[14px_0_32px_rgba(0,0,0,0.55),0_18px_45px_rgba(6,8,15,0.4)]';

  return (
    <motion.div
      style={{
        x: cardX,
        opacity: cardOpacity,
        zIndex,
        width: isDesktop ? `${CARD_DESKTOP_WIDTH_PX}px` : undefined,
        height: isDesktop ? `${CARD_DESKTOP_HEIGHT_PX}px` : undefined,
      }}
      className={`services-stacked-card ${stackedShadowClass} rounded-2xl sm:rounded-3xl md:w-[750px] md:h-[350px]`}
    >
      <ArchitecturalServiceCard
        data={data}
        index={index}
        onInquiryClick={onInquiryClick}
        className="w-full h-full md:w-[750px] md:h-[350px]"
        style={{
          width: isDesktop ? `${CARD_DESKTOP_WIDTH_PX}px` : undefined,
          height: isDesktop ? `${CARD_DESKTOP_HEIGHT_PX}px` : undefined,
        }}
      />
    </motion.div>
  );
};

export const ServiceIconsBar: React.FC<ServiceIconsBarProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative z-20 h-[800vh] bg-[#E4EBF1] border-t border-white/60"
      dir="rtl"
    >
      {/* 
        STICKY VIEWPORT CONTAINER (Pinned during the 500vh vertical scroll)
        - Sticks at top: 0
        - Exactly 100dvh height
        - Overflow hidden to prevent any unwanted horizontal document scrollbar
      */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-4 sm:py-6 md:py-8 overflow-hidden select-none">
        
        {/* Top Ambient Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[2px] bg-gradient-to-r from-transparent via-[#00F5A0]/60 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-3xl h-24 bg-gradient-to-b from-[#00F5A0]/10 to-transparent blur-2xl pointer-events-none" />

        {/* 
          1. SECTION HEADER (Title)
        */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 shrink-0">
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
            </div>

          </div>
        </div>

        {/* 
          2. STACKING STAGE (Centered Viewport Area)
          - Contains all 5 cards in absolute stacking layout
          - Width is responsive (square 1:1)
          - Cards move horizontally driven by scroll
        */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto py-2">
          
          {/* Central Architectural Framing Stage (Configured dimensions on desktop) */}
          <div 
            className="services-stacked-stage md:w-[750px] md:h-[350px]"
            style={{
              width: windowWidth >= 768 ? `${CARD_DESKTOP_WIDTH_PX}px` : undefined,
              height: windowWidth >= 768 ? `${CARD_DESKTOP_HEIGHT_PX}px` : undefined,
            }}
          >
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

      </div>
    </section>
  );
};
