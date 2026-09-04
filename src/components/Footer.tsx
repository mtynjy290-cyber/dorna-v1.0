import React, { useState } from 'react';
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
  Sliders,
  CheckCircle2,
  Award,
  Layers,
  Building2,
  Cpu,
  Lock
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
    { label: 'صفحه اصلی', href: '/' },
    { label: 'محصولات و مشخصات فنی', href: '/products' },
    { label: 'خدمات مهندسی و اجرایی', href: '/services' },
    { label: 'پروژه‌های شاخص ملی و لوکس', href: '/projects' },
    { label: 'استعلام آنلاین و پیش‌فاکتور', href: '/calculator' },
    { label: 'استانداردها و گارانتی ۲۴ ماهه', href: '/standards' },
    { label: 'دانشنامه و مقالات تخصصی', href: '/blog' },
    { label: 'درباره ما و اصالت ۲۵ ساله', href: '/about' },
  ];

  const productLinks = [
    { label: 'درب‌های اتوماتیک اسلایدینگ و تلسکوپی', href: '/products' },
    { label: 'کرکره‌های برقی امنیتی و پلی‌کربنات', href: '/products' },
    { label: 'درب‌های شیشه‌ای میرال و اسلایدی', href: '/products' },
    { label: 'پارتیشن‌های فریم‌لس و دوجداره آکوستیک', href: '/products' },
    { label: 'موتور و اپراتورهای دانکر آلمان (Dunker)', href: '/products' },
  ];

  return (
    <footer className="relative bg-[#06080F] text-[#CBD8E2] pt-24 sm:pt-32 pb-16 sm:pb-20 border-t border-white/10 overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00F090]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      <div className="grid-container-12 relative z-10">
        
        {/* Top Highlight Feature Bar (3 x 4 cols = 12 cols, 24px gutter) */}
        <div className="grid grid-cols-12 gap-6 pb-16 sm:pb-20 border-b border-white/10">
          <div className="col-span-12 md:col-span-4 flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="w-11 h-11 rounded-xl bg-[#00F090]/10 border border-[#00F090]/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#00F090]" />
            </div>
            <div>
              <span className="text-xs font-black text-white block">۲۴ ماه گارانتی طلایی تعویض</span>
              <span className="text-[11px] text-[#CBD8E2]/70">تعهد کتبی و بی قیدوشرط برد و موتور</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-black text-white block">قطعات اورجینال اروپایی</span>
              <span className="text-[11px] text-[#CBD8E2]/70">موتور Dunkermotoren آلمان و سنسور BEA</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-black text-white block">پشتیبانی و خدمات فوری</span>
              <span className="text-[11px] text-[#CBD8E2]/70">۱۰ سال تأمین قطعات و پشتیبانی سراسر کشور</span>
            </div>
          </div>
        </div>

        {/* Main Footer Content Grid (12 Columns: 4 + 2 + 3 + 3 = 12, 24px gutter) */}
        <div className="grid grid-cols-12 gap-6 py-16 sm:py-20 border-b border-white/10">
          
          {/* ========================================================
              RIGHT: BRAND IDENTITY & OFFICIAL DETAILS (4 cols)
          ======================================================== */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#06080F] flex items-center justify-center p-2 border border-white/20 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00F090" strokeWidth="1.7" />
                  <path d="M7 6v12M7 12h3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M17 6v12M17 12h-3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                  <line x1="12" y1="4" x2="12" y2="20" stroke="#00F090" strokeWidth="1.2" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-tight">{brand.name}</span>
                <span className="text-[#00F090] font-bold text-sm">|</span>
                <span className="text-xs font-sans font-bold text-[#CBD8E2]/80 tracking-wider uppercase">{brand.nameEn}</span>
              </div>
            </div>

            {/* Mission Statement */}
            <p className="text-xs text-[#CBD8E2]/80 leading-relaxed max-w-sm">
              شرکت مهندسی درنا درب با بیش از ۲۵ سال تجربه در زمینه مشاوره، طراحی، تولید و اجرای پیشرفته‌ترین سیستم‌های درب‌های اتوماتیک، شیشه‌های سکوریت و سازه‌های معماری در سراسر کشور.
            </p>

            {/* Official Contact Numbers */}
            <div className="pt-2 space-y-2.5 text-xs text-[#CBD8E2]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#00F090]" />
                </div>
                <span className="text-[#CBD8E2]/70">تلفن دفتر مرکزی:</span>
                <a href={`tel:${contact.centralPhoneTel}`} className="text-white hover:text-[#00F090] font-bold font-sans tracking-wide transition-colors">
                  {contact.centralPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#00F090]" />
                </div>
                <span className="text-[#CBD8E2]/70">کارشناسی فنی و اندازه‌گیری:</span>
                <a href={`tel:${contact.directMobileTel}`} className="text-white hover:text-[#00F090] font-bold font-sans tracking-wide transition-colors">
                  {contact.directMobile}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00F090]" />
                </div>
                <div className="text-xs leading-relaxed">
                  <span className="text-[#CBD8E2]/70">آدرس کارخانه و دفتر: </span>
                  <span className="text-white font-medium">{contact.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER-RIGHT: QUICK NAVIGATION LINKS (2 cols)
          ======================================================== */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-r-2 border-[#00F090] pr-2.5 flex items-center gap-1.5">
              <span>صفحات اصلی</span>
            </h4>

            <ul className="space-y-2 text-xs">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    className="text-[#CBD8E2]/75 hover:text-[#00F090] font-medium transition-colors flex items-center gap-1.5 group py-0.5"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#00F090]/40 group-hover:text-[#00F090] transition-colors" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================
              CENTER-LEFT: PRODUCTS & SYSTEMS (3 cols)
          ======================================================== */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-r-2 border-[#00F090] pr-2.5 flex items-center gap-1.5">
              <span>محصولات و سیستم‌ها</span>
            </h4>

            <ul className="space-y-2 text-xs">
              {productLinks.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    className="text-[#CBD8E2]/75 hover:text-[#00F090] font-medium transition-colors flex items-center gap-1.5 group py-0.5"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#00F090]/40 group-hover:text-[#00F090] transition-colors" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================
              LEFT: DIRECT CONTACT TRIGGERS & ACTIONS (3 cols)
          ======================================================== */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-r-2 border-[#00F090] pr-2.5">
              ارتباط و استعلام قیمت
            </h4>

            <p className="text-xs text-[#CBD8E2]/80 leading-relaxed">
              جهت استعلام آنلاین، دریافت پیش‌فاکتور رسمی یا اعزام کارشناس فنی به محل پروژه:
            </p>

            {/* Direct Action Triggers */}
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={onOpenInquiry}
                className="w-full py-2.5 px-4 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-[#00F090]/15 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                <span>درخواست مشاوره و بازدید کارشناسی</span>
              </button>

              <a
                href="/calculator"
                className="w-full py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-[#00F090] border border-[#00F090]/40 hover:border-[#00F090] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-[#00F090]" />
                <span>محاسبه‌گر هوشمند آنلاین قیمت</span>
              </a>

              <a
                href="https://wa.me/989121234567"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00F090]" />
                <span>مشاوره فوری در واتس‌اپ</span>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#CBD8E2]/70 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#00F090] shrink-0" />
              <span>پاسخگویی: {contact.workingHours}</span>
            </div>
          </div>

        </div>

        {/* Technical Guarantee Footnote (12 Columns) */}
        <div className="grid grid-cols-12 gap-6 py-8 border-b border-white/10 text-[11px] text-[#CBD8E2]/70 items-center">
          <div className="col-span-12 sm:col-span-7 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00F090] shrink-0" />
            <span className="font-bold text-white">{SITE_CONFIG.guarantees.goldenWarrantyLabel} ({SITE_CONFIG.guarantees.afterSalesLabel})</span>
          </div>
          <div className="col-span-12 sm:col-span-5 flex sm:justify-end items-center gap-2 text-[#CBD8E2] font-sans text-[11px] font-semibold">
            <Mail className="w-3.5 h-3.5 text-[#00F090]" />
            <span>{contact.email || SITE_CONFIG.contact.supportEmail}</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top (12 Columns) */}
        <div className="grid grid-cols-12 gap-6 pt-8 sm:pt-10 items-center text-xs text-[#CBD8E2]/70">
          <div className="col-span-12 md:col-span-8 flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} {brand.name} ({brand.nameEn}). تمامی حقوق مادی و معنوی محفوظ است.</p>
            <span className="text-white/20 hidden sm:inline">•</span>
            {/* Discreet Admin Link */}
            <a
              href="/admin"
              id="footer-admin-login-link"
              title="ورود به پنل مدیریت (کلید میانبر: Ctrl + Shift + A)"
              className="inline-flex items-center gap-1.5 text-[#CBD8E2]/40 hover:text-[#00F090] transition-colors py-0.5 px-2 rounded hover:bg-white/5 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[11px]">ورود مدیریت</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white/50 border border-white/10">Ctrl+Shift+A</kbd>
            </a>
          </div>
          
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/15 backdrop-blur-md cursor-pointer hover:border-[#00F090]/40"
            >
              <span>بازگشت به بالای صفحه</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#00F090]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
