import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  Sparkles,
  MessageCircle,
  Calculator,
  ChevronLeft,
  Sliders
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useSiteContentStore } from '../lib/siteContentStore';

export const Footer: React.FC<{ onOpenInquiry?: () => void }> = ({
  onOpenInquiry,
}) => {
  const brand = useSiteContentStore((state) => state.brand);
  const contact = useSiteContentStore((state) => state.contact);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'صفحه اصلی', href: 'index.html' },
    { label: 'کاتالوگ قطعات و موتورها', href: 'products.html' },
    { label: 'خدمات مهندسی و اجرایی', href: 'services.html' },
    { label: 'پروژه‌های شاخص', href: 'projects.html' },
    { label: 'محاسبه‌گر هوشمند قیمت', href: 'calculator.html' },
    { label: 'استانداردها و تعهدات', href: 'standards.html' },
    { label: 'مجله تخصصی و مقالات', href: 'blog.html' },
    { label: 'درباره ما و اصالت برند', href: 'about.html' },
    { label: 'پنل مدیریت زنده محتوا (CMS)', href: 'admin.html' },
  ];

  return (
    <footer className="bg-[#CBD8E2] text-[#11172C] pt-16 pb-10 border-t border-white/80 relative overflow-hidden backdrop-blur-[20px]">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00F090]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/60">
          
          {/* ========================================================
              RIGHT: BRAND IDENTITY & OFFICIAL DETAILS (5 cols)
          ======================================================== */}
          <div className="lg:col-span-5 space-y-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center p-2 border border-white shadow-xs">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#06080F" strokeWidth="1.7" />
                  <path d="M9 3v18" stroke="#06080F" strokeWidth="1.7" strokeDasharray="2 2" />
                  <path d="M15 3v18" stroke="#06080F" strokeWidth="1.7" strokeDasharray="2 2" />
                  <circle cx="12" cy="12" r="2" fill="#00F090" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[#06080F] tracking-tight">{brand.name}</span>
                <span className="text-[#11172C]/40">|</span>
                <span className="text-sm font-sans font-bold text-[#11172C]/70 tracking-wider uppercase">{brand.nameEn}</span>
              </div>
            </div>

            {/* Mission Statement */}
            <p className="text-xs text-[#11172C]/80 leading-relaxed max-w-md">
              {SITE_CONFIG.brand.shortDescription}
            </p>

            {/* Official Contact Numbers */}
            <div className="pt-2 space-y-2 text-xs text-[#11172C]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#06080F] shrink-0" />
                <span className="text-[#11172C]/70">تلفن دفتر مرکزی:</span>
                <a href={`tel:${contact.centralPhoneTel}`} className="text-[#06080F] hover:text-[#00F090] font-black font-sans tracking-wide transition-colors">
                  {contact.centralPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#06080F] shrink-0" />
                <span className="text-[#11172C]/70">خط مستقیم کارشناسی فنی:</span>
                <a href={`tel:${contact.directMobileTel}`} className="text-[#06080F] hover:text-[#00F090] font-black font-sans tracking-wide transition-colors">
                  {contact.directMobile}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#06080F] shrink-0" />
                <span className="text-[#11172C]/70">آدرس:</span>
                <span className="text-[#11172C] font-medium">{contact.address}</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER: QUICK NAVIGATION LINKS (3 cols)
          ======================================================== */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black text-[#06080F] tracking-wide border-r-2 border-[#00F090] pr-2.5">
              دسترسی سریع
            </h4>

            <ul className="space-y-2.5 text-xs">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    className="text-[#11172C]/80 hover:text-[#06080F] font-bold transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#11172C]/50 group-hover:text-[#06080F] transition-colors" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================
              LEFT: DIRECT CONTACT TRIGGERS & ACTIONS (4 cols)
          ======================================================== */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-black text-[#06080F] tracking-wide border-r-2 border-[#00F090] pr-2.5">
              ارتباط مستقیم و ثبت درخواست
            </h4>

            <p className="text-xs text-[#11172C]/80 leading-relaxed">
              جهت هماهنگی بازدید حضوری کارشناس یا برآورد قیمت پیش‌فاکتور، از راه‌های مستقیم زیر با ما در ارتباط باشید:
            </p>

            {/* Direct Action Triggers */}
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={onOpenInquiry}
                className="w-full py-2.5 px-4 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md shadow-[#00F090]/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>درخواست مشاوره تخصصی و اندازه‌گیری</span>
              </button>

              <a
                href="calculator.html"
                className="w-full py-2.5 px-4 rounded-full bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 hover:border-[#00F090] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] transition-all cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-[#00F090]" />
                <span>ورود به سامانه محاسبه‌گر آنلاین قیمت</span>
              </a>

              <button
                onClick={onOpenInquiry}
                className="w-full py-2.5 px-4 rounded-full bg-white/70 hover:bg-white text-[#06080F] border border-white/90 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#06080F]" />
                <span>ارتباط مستقیم در واتس‌اپ و استعلام فوری</span>
              </button>
            </div>

            {/* Operating Hours */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#11172C]/80 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#06080F] shrink-0" />
              <span>ساعات پاسخگویی: {contact.workingHours}</span>
            </div>
          </div>

        </div>

        {/* Technical Guarantee Footnote */}
        <div className="py-5 border-b border-white/40 text-[11px] text-[#11172C]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#06080F] shrink-0" />
            <span className="font-bold">{SITE_CONFIG.guarantees.goldenWarrantyLabel} ({SITE_CONFIG.guarantees.afterSalesLabel})</span>
          </div>
          <div className="flex items-center gap-2 text-[#11172C] font-sans text-[11px] font-semibold">
            <Mail className="w-3.5 h-3.5 text-[#06080F]" />
            <span>{contact.email || SITE_CONFIG.contact.supportEmail}</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#11172C]">
          <div className="flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} {brand.name} ({brand.nameEn}). کلیه حقوق محفوظ است.</p>
            <a
              href="admin.html"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/80 hover:bg-white text-[#06080F] border border-white/80 text-[11px] font-bold transition-all shadow-xs"
              title="پنل مدیریت محتوا و تنظیمات زنده"
            >
              <Sliders className="w-3 h-3 text-[#06080F]" />
              <span>مدیریت محتوا (Live CMS)</span>
            </a>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#06080F] font-bold transition-colors border border-white/80 backdrop-blur-md cursor-pointer shadow-xs"
          >
            <span>بازگشت به ابتدای صفحه</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#06080F]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
