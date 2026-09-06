import React from 'react';
import { ArrowLeft, Calculator, Image as ImageIcon } from 'lucide-react';

export interface ArchitecturalProductCardData {
  id: string;
  titleFa: string;
  titleEn: string;
  imageUrl: string;
  iconType: 'sliding' | 'telescopic' | 'miral' | 'partition' | 'shutter';
  targetUrl?: string;
  description?: string;
}

interface ArchitecturalServiceCardProps {
  data: ArchitecturalProductCardData;
  onInquiryClick?: (product: ArchitecturalProductCardData) => void;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}

/**
 * High-precision luxury SVG icons for the 5 services (#00F5A0)
 */
export const renderProductSpecificIcon = (iconType: ArchitecturalProductCardData['iconType']) => {
  switch (iconType) {
    case 'sliding':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00F5A0"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.8" />
          <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1.6" />
          <path d="M7 12H5M6 10.5L4.5 12 6 13.5" strokeWidth="1.5" />
          <path d="M17 12h2M18 10.5L19.5 12 18 13.5" strokeWidth="1.5" />
        </svg>
      );

    case 'telescopic':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00F5A0"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.8" />
          <line x1="8" y1="3" x2="8" y2="21" strokeWidth="1.5" />
          <line x1="13" y1="3" x2="13" y2="21" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="17" y1="3" x2="17" y2="21" strokeWidth="1.5" />
        </svg>
      );

    case 'miral':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00F5A0"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5"
          aria-hidden="true"
        >
          {/* Frameless glass door with stainless patch fittings */}
          <rect x="4" y="3" width="16" height="18" rx="1" strokeWidth="1.6" />
          <circle cx="17" cy="12" r="1.3" fill="#00F5A0" stroke="none" />
          <rect x="4" y="3" width="3" height="2" fill="#00F5A0" stroke="none" />
          <rect x="4" y="19" width="3" height="2" fill="#00F5A0" stroke="none" />
          <line x1="8" y1="6" x2="8" y2="18" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 2" />
        </svg>
      );

    case 'partition':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00F5A0"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="1.5" strokeWidth="1.8" />
          <line x1="9" y1="4" x2="9" y2="20" strokeWidth="1.5" />
          <line x1="15" y1="4" x2="15" y2="20" strokeWidth="1.5" />
          <circle cx="6" cy="12" r="1" fill="#00F5A0" stroke="none" />
          <circle cx="12" cy="12" r="1" fill="#00F5A0" stroke="none" />
          <circle cx="18" cy="12" r="1" fill="#00F5A0" stroke="none" />
        </svg>
      );

    case 'shutter':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00F5A0"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.8" />
          <line x1="3" y1="7" x2="21" y2="7" strokeWidth="1.5" />
          <line x1="3" y1="11" x2="21" y2="11" strokeWidth="1.5" />
          <line x1="3" y1="15" x2="21" y2="15" strokeWidth="1.5" />
          <line x1="3" y1="19" x2="21" y2="19" strokeWidth="1.5" />
        </svg>
      );
  }
};

/**
 * Architectural Service Card (Strict 1:1 Square, 70% Image with object-fit: contain, 30% Title Bar)
 */
export const ArchitecturalServiceCard: React.FC<ArchitecturalServiceCardProps> = ({
  data,
  onInquiryClick,
  className = '',
  style,
  index = 0,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onInquiryClick) {
      e.preventDefault();
      onInquiryClick(data);
    }
  };

  return (
    <article
      className={`service-square-card group relative select-none rounded-2xl sm:rounded-3xl overflow-hidden bg-[#06080F] border border-white/15 hover:border-[#00F5A0]/50 shadow-[0_12px_36px_rgba(6,8,15,0.18)] hover:shadow-[0_20px_50px_rgba(6,8,15,0.35)] transition-all duration-500 flex flex-col justify-between ${className}`}
      style={style}
      dir="rtl"
    >
      {/* 
        1. IMAGE SECTION (Takes ~68% on desktop, ~70% on mobile)
        - Completely fills the container using object-fit: cover
      */}
      <div className="relative w-full h-[68%] sm:h-[70%] overflow-hidden bg-[#0A0F1D]">
        {/* Top-Left Product Micro Icon */}
        <div 
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-[#06080F]/85 border border-white/10 shadow-sm backdrop-blur-md flex items-center justify-center"
          title={data.titleFa}
        >
          {renderProductSpecificIcon(data.iconType)}
        </div>

        {/* Full cover product image or clean architectural placeholder */}
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.titleFa}
            loading="lazy"
            decoding="async"
            style={{
              objectFit: 'cover',
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#0A0F1D] to-[#06080F] text-white/50 relative px-4 select-none">
            {/* Subtle architectural grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-2.5 shadow-inner">
              <ImageIcon className="w-6 h-6 text-[#00F5A0]/70 stroke-1" />
            </div>
            <span className="relative z-10 text-xs text-[#CBD8E2]/70 font-medium text-center">
              در انتظار بارگذاری تصویر از پنل مدیریت
            </span>
          </div>
        )}

        {/* Subtle gradient vignette at bottom to blend seamlessly into title panel */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#090E1A]/80 to-transparent pointer-events-none" />
      </div>

      {/* 
        2. SERVICE TITLE & DETAILS SECTION (Takes ~32% on desktop, ~30% on mobile)
        - Persian title
        - English subtitle
        - Brief technical description on desktop
        - Inquiry action
      */}
      <div className="relative w-full h-[32%] sm:h-[30%] flex flex-col justify-between px-3.5 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3 bg-gradient-to-b from-[#090E1A] to-[#04060B] border-t border-white/10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            {/* Main Persian Service Title */}
            <h3 className="text-white font-black text-xs sm:text-sm md:text-base lg:text-lg tracking-tight leading-snug line-clamp-1 group-hover:text-[#00F5A0] transition-colors duration-300">
              {data.titleFa}
            </h3>

            {/* Modern Subtitle in English */}
            <p className="text-[#CBD8E2]/70 font-mono text-[8.5px] sm:text-[9.5px] md:text-[10.5px] lg:text-[11px] uppercase tracking-wider font-semibold mt-0.5 line-clamp-1">
              {data.titleEn}
            </p>
          </div>

          {data.description && (
            <p className="hidden lg:block text-[#CBD8E2]/75 text-[11px] leading-relaxed max-w-sm line-clamp-2 text-right">
              {data.description}
            </p>
          )}
        </div>

        {/* Bottom Interactive Trigger Row */}
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-between w-full pt-1.5 border-t border-white/[0.08] text-[10.5px] sm:text-xs lg:text-[13px] font-bold text-white/80 hover:text-[#00F5A0] transition-colors duration-200 cursor-pointer group/action focus:outline-none"
          aria-label={`استعلام قیمت ${data.titleFa}`}
        >
          <span className="inline-flex items-center gap-1.5 lg:gap-2">
            <Calculator className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#00F5A0] shrink-0" />
            <span className="select-none">استعلام و محاسبه آنلاین قیمت</span>
          </span>

          <span className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 rounded-full bg-white/10 group-hover/action:bg-[#00F5A0] group-hover/action:text-[#06080F] text-white flex items-center justify-center transition-all duration-300 shrink-0">
            <ArrowLeft className="w-3 h-3 transform group-hover/action:-translate-x-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </article>
  );
};
