import React, { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { 
  ArrowLeft,
  Calculator,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { useSiteContentStore, ServiceContentItem } from '../lib/siteContentStore';

// Individual 2026 Spotlight Interactive Service Card
const ModernServiceCard: React.FC<{
  service: ServiceContentItem;
  index: number;
}> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Engineering highlights mapping based on service type
  const getEngineeringSpecs = (id: string) => {
    switch (id) {
      case 'sliding':
        return [
          { label: 'موتور', val: 'Dunker آلمان BG75' },
          { label: 'کنترلر', val: 'میکروپروسسور هوشمند ۳۲ بیتی' },
          { label: 'استاندارد', val: 'EN 16005 تردد نامحدود' },
        ];
      case 'telescopic':
        return [
          { label: 'سیستم', val: 'مکانیزم سنکرون ۲ و ۴ لنگه' },
          { label: 'راندمان', val: '۳۰٪ بازشوی بیشتر' },
          { label: 'ریل', val: 'آلومینیوم آنودایز سخت ۸۰ میکرون' },
        ];
      case 'manual_glass':
        return [
          { label: 'شیشه', val: '۱۰ میل سکوریت سوپرکلیر' },
          { label: 'یراق', val: 'استیل ۳۰۴ ضدزنگ ضدخش' },
          { label: 'استوپ', val: 'هیدرولیک روغنی بی‌صدا' },
        ];
      case 'partition':
        return [
          { label: 'پروفیل', val: 'اسلیم فریم‌لس آلومینیومی' },
          { label: 'آکوستیک', val: 'عایق صوت تا ۴۲ دسی‌بل' },
          { label: 'طراحی', val: 'تک‌جداره و دوجداره اختصاصی' },
        ];
      case 'shutter':
        return [
          { label: 'تیغه', val: 'آلومینیوم سنگین ۶۰۶۳ دوبل' },
          { label: 'موتور', val: 'ساید صنعتی با UPS اضطراری' },
          { label: 'امنیت', val: 'ضدسرقت با قفل اتوماتیک' },
        ];
      default:
        return [
          { label: 'شیشه', val: 'سکوریت جام‌ویژه ۱۰ میل' },
          { label: 'قطعات', val: 'استاندارد اروپایی CE' },
          { label: 'گارانتی', val: '۵ سال ضمانت تعویض' },
        ];
    }
  };

  const getServiceSvg = (iconType: string) => {
    switch (iconType) {
      case 'sliding':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.7" />
            <path d="M7 6v12M7 12h2" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M17 6v12M17 12h-2" strokeWidth="1.7" strokeLinecap="round" />
            <line x1="12" y1="4" x2="12" y2="20" strokeWidth="1.3" strokeDasharray="2 2" />
          </svg>
        );
      case 'telescopic':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.7" />
            <path d="M6 6v12M9 6v12M15 6v12M18 6v12" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 12h6" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        );
      case 'partition':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
            <rect x="3" y="3" width="18" height="18" rx="1.5" strokeWidth="1.7" />
            <line x1="9" y1="3" x2="9" y2="21" strokeWidth="1.7" />
            <line x1="15" y1="3" x2="15" y2="21" strokeWidth="1.7" />
            <circle cx="6" cy="12" r="1.2" fill="currentColor" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          </svg>
        );
      case 'shutter':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
            <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="1.7" />
            <line x1="4" y1="7" x2="20" y2="7" strokeWidth="1.7" />
            <line x1="4" y1="11" x2="20" y2="11" strokeWidth="1.7" />
            <line x1="4" y1="15" x2="20" y2="15" strokeWidth="1.7" />
            <circle cx="12" cy="18" r="1.2" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
            <rect x="4" y="3" width="16" height="18" rx="1.5" strokeWidth="1.7" />
            <circle cx="8" cy="12" r="1.2" fill="currentColor" />
            <path d="M12 3v18" strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M18 7l-2 2M18 17l-2-2" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  const specs = getEngineeringSpecs(service.id);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#06080F]/[0.03] hover:bg-[#06080F]/[0.06] backdrop-blur-xl border border-white/80 hover:border-[#00F090]/40 shadow-[0_4px_20px_rgba(6,8,15,0.03)] hover:shadow-[0_16px_36px_rgba(6,8,15,0.08)] transition-all duration-300 overflow-hidden"
    >
      {/* 2026 Dynamic Mouse Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              280px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 144, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Top Ambient Edge Glow */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:via-[#00F090]/60 transition-all duration-500" />

      <div>
        {/* Top Header Row: Icon + Mini Tech Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(0,240,144,0.3)] transition-all duration-300">
            {getServiceSvg(service.iconType)}
          </div>

          <span className="text-[10px] font-bold font-mono tracking-wider px-2.5 py-1 rounded-full bg-white/80 border border-white text-[#11172C] shadow-2xs group-hover:border-[#00F090]/30 transition-colors">
            {service.id === 'sliding' ? 'SERIES-SL' : service.id === 'telescopic' ? 'SERIES-TL' : service.id === 'partition' ? 'ARCH-PART' : service.id === 'shutter' ? 'IND-SHUT' : 'MIRRAL-GL'}
          </span>
        </div>

        {/* Title Block (Persian Main + Latin Architectural Subtitle) */}
        <h3 className="text-[15px] font-black text-[#06080F] tracking-tight group-hover:text-[#06080F] transition-colors leading-snug">
          {service.titleFa}
        </h3>
        
        <p className="text-[10px] font-semibold text-[#11172C]/50 font-sans tracking-wide uppercase mt-0.5 mb-3">
          {service.titleEn}
        </p>

        {/* Concise Engineering Specs Grid (High-Trust, Clean Minimalist) */}
        <div className="space-y-1.5 py-2.5 my-1 border-y border-white/60">
          {specs.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[11px] leading-tight">
              <span className="text-[#11172C]/60 font-medium">{item.label}</span>
              <span className="font-bold text-[#06080F] text-left ltr">{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-3 mt-1 flex items-center justify-between">
        <a
          href="calculator.html"
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#06080F] group-hover:text-[#06080F] transition-colors"
        >
          <Calculator className="w-3.5 h-3.5 text-[#00F090]" />
          <span>استعلام و محاسبه آنلاین</span>
        </a>

        <div className="w-6 h-6 rounded-full bg-white/80 border border-white flex items-center justify-center text-[#06080F] group-hover:bg-[#00F090] group-hover:text-[#06080F] group-hover:border-[#00F090] transition-all duration-300">
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        </div>
      </div>

      {/* Subtle Bottom Accent Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F090] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </motion.div>
  );
};

export const ServiceIconsBar: React.FC = () => {
  const storeServices = useSiteContentStore((state) => state.services);

  return (
    <section id="services" className="relative z-20 -mt-8 pt-16 pb-20 bg-[#E4EBF1] rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(6,8,15,0.4)] border-t border-white/60 overflow-hidden">
      {/* Top Architectural Accent Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[#00F090]/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-2xl h-24 bg-gradient-to-b from-[#00F090]/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimalist Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06080F]/[0.04] border border-white/90 text-[#06080F] text-xs font-bold shadow-2xs backdrop-blur-md mb-2.5">
            <Cpu className="w-3.5 h-3.5 text-[#00F090]" />
            <span>مهندسی ورودی‌های هوشمند</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#06080F] tracking-tight">
            خدمات و سیستم‌های اجرایی
          </h2>

          <p className="text-xs sm:text-sm text-[#11172C]/70 mt-1.5 font-medium leading-relaxed">
            طراحی، تأمین و نصب تخصصی با موتورهای دانکر آلمان و شیشه‌های سوپرکلیر ۱۰ میل
          </p>
        </motion.div>

        {/* 5 High-Trust Minimalist Engineering Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {storeServices.map((service, index) => (
            <ModernServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* High-Trust Engineering Standards Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-5 border-t border-white/60 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-[#11172C]/70"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <span className="flex items-center gap-1.5 text-[#06080F] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#00F090]" />
              <span>موتورهای براشلس دانکر آلمان (Dunker Motoren)</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#06080F] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#00F090]" />
              <span>۵ سال ضمانت تعویض قطعات اصلی</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#06080F] font-bold">
              <Sparkles className="w-4 h-4 text-[#00F090]" />
              <span>شیشه سوپرکلیر سکوریت ۱۰ میلی‌متر نشکن</span>
            </span>
          </div>

          <a
            href="services.html"
            className="inline-flex items-center gap-1.5 font-black text-[#06080F] hover:text-[#00D882] transition-colors py-1 px-3 rounded-lg bg-white/70 border border-white hover:border-[#00F090]/40 shadow-2xs"
          >
            <span>کاتالوگ کامل و مشخصات فنی</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
