import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Calculator,
  Layers,
  Sparkles
} from 'lucide-react';
import { useSiteContentStore } from '../lib/siteContentStore';

export const ServiceIconsBar: React.FC = () => {
  const storeServices = useSiteContentStore((state) => state.services);

  const getServiceSvg = (iconType: string) => {
    switch (iconType) {
      case 'sliding':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.6" />
            <path d="M7 6v12M7 12h2" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M17 6v12M17 12h-2" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="12" y1="4" x2="12" y2="20" strokeWidth="1.2" strokeDasharray="2 2" />
          </svg>
        );
      case 'telescopic':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.6" />
            <path d="M6 6v12M9 6v12M15 6v12M18 6v12" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9 12h6" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        );
      case 'partition':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
            <rect x="3" y="3" width="18" height="18" rx="1.5" strokeWidth="1.6" />
            <line x1="9" y1="3" x2="9" y2="21" strokeWidth="1.6" />
            <line x1="15" y1="3" x2="15" y2="21" strokeWidth="1.6" />
            <circle cx="6" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        );
      case 'shutter':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
            <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="1.6" />
            <line x1="4" y1="7" x2="20" y2="7" strokeWidth="1.6" />
            <line x1="4" y1="11" x2="20" y2="11" strokeWidth="1.6" />
            <line x1="4" y1="15" x2="20" y2="15" strokeWidth="1.6" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
            <rect x="4" y="3" width="16" height="18" rx="1.5" strokeWidth="1.6" />
            <circle cx="8" cy="12" r="1.2" fill="currentColor" />
            <path d="M12 3v18" strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M18 7l-2 2M18 17l-2-2" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <section id="services" className="py-20 bg-[#E4EBF1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CBD8E2]/80 border border-white/80 text-[#11172C] text-xs font-bold shadow-xs backdrop-blur-md mb-3.5">
            <Layers className="w-4 h-4 text-[#06080F]" />
            <span>سیستم‌های مهندسی ورودی و شیشه</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06080F] tracking-tight">
            خدمات ما
          </h2>

          <p className="text-xs sm:text-sm text-[#11172C]/80 mt-2.5 font-medium leading-relaxed max-w-2xl mx-auto">
            طراحی، تأمین قطعات و اجرای تخصصی انواع سیستم‌های مدرن درب‌های اتوماتیک و سازه‌های شیشه‌ای معماری
          </p>
        </motion.div>

        {/* 5 Core Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {storeServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#CBD8E2]/60 backdrop-blur-[16px] border border-white/80 shadow-xs hover:shadow-md hover:bg-[#CBD8E2]/90 transition-all duration-300 overflow-hidden cursor-default"
            >
              <div>
                {/* Top: Clean Minimalist Line Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/70 border border-white/90 flex items-center justify-center mb-5 shadow-xs text-[#06080F] group-hover:scale-105 transition-transform">
                  {getServiceSvg(service.iconType)}
                </div>

                {/* Persian Title */}
                <h3 className="text-base font-extrabold text-[#06080F] tracking-tight transition-colors">
                  {service.titleFa}
                </h3>

                {/* Sleek English Subtitle */}
                <p className="text-[11px] font-bold text-[#11172C]/60 tracking-wide mt-1 uppercase font-sans">
                  {service.titleEn}
                </p>

                {/* Description */}
                <p className="text-xs text-[#11172C] font-normal leading-relaxed mt-3.5 mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Specs Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.specs.map((spec, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/60 text-[#11172C] border border-white/80"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action & Hover Accent Bar */}
              <div className="pt-3 border-t border-white/50 mt-2">
                <a
                  href="calculator.html"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#11172C] hover:text-[#06080F] transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>محاسبه آنلاین قیمت</span>
                  <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                </a>
              </div>

              {/* Subtle Bottom Accent Bar on Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00F090] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Direct CTA Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 p-5 rounded-2xl bg-[#CBD8E2]/80 backdrop-blur-md border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-white/80 border border-white flex items-center justify-center shrink-0 text-[#06080F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#06080F] block">
                نیاز به مشاوره فنی یا سیستم سفارشی دارید؟
              </span>
              <span className="text-xs text-[#11172C]/80 font-medium">
                کارشناسان درنا درب آماده ارائه پیش‌فاکتور مهندسی و بازدید رایگان از پروژه شما هستند.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="services.html"
              id="btn-services-all"
              className="px-5 py-2.5 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs sm:text-sm font-black flex items-center gap-2 shadow-md shadow-[#00F090]/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>مشاهده خدمات و ثبت سفارش</span>
              <ArrowLeft className="w-4 h-4 text-[#06080F]" />
            </a>
            <a
              href="calculator.html"
              id="btn-services-calc"
              className="px-5 py-2.5 rounded-full bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 hover:border-[#00F090] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#00F090]" />
              <span>محاسبه‌گر آنلاین قیمت</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
