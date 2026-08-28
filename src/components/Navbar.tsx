import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Sparkles, 
  Menu, 
  X, 
  Phone, 
  ChevronLeft, 
  Layers, 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  Info,
  Cpu,
  Shield,
  Sliders
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useSiteContentStore } from '../lib/siteContentStore';

interface NavbarProps {
  onOpenCalculator?: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHoverNav, setActiveHoverNav] = useState<string | null>(null);

  // Dynamic CMS Store selector
  const brand = useSiteContentStore((state) => state.brand);
  const contact = useSiteContentStore((state) => state.contact);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
          setIsVisible(false);
          setMobileMenuOpen(false);
        } else if (lastScrollY - currentScrollY > 6) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { id: 'home', label: 'صفحه اصلی', href: 'index.html', icon: Sparkles, desc: 'خانه و معرفی سیستم‌ها' },
    { id: 'products', label: 'قطعات و موتورها', href: 'products.html', icon: Cpu, desc: 'کاتالوگ قطعات، موتور دانکر و شیشه' },
    { id: 'services', label: 'خدمات', href: 'services.html', icon: Layers, desc: 'سیستم‌های درب اتوماتیک و شیشه' },
    { id: 'projects', label: 'پروژه‌ها', href: 'projects.html', icon: Briefcase, desc: 'پروژه‌های شاخص و رزومه اجرایی' },
    { id: 'calculator', label: 'استعلام قیمت', href: 'calculator.html', icon: Calculator, desc: 'محاسبه آنلاین و پیش‌فاکتور' },
    { id: 'standards', label: 'استانداردها', href: 'standards.html', icon: ShieldCheck, desc: `${SITE_CONFIG.guarantees.goldenWarrantyMonths} ماه گارانتی و استانداردها` },
    { id: 'blog', label: 'مقالات', href: 'blog.html', icon: FileText, desc: 'دانشنامه و مقالات فنی' },
    { id: 'about', label: 'درباره ما', href: 'about.html', icon: Info, desc: `اصالت و معرفی ${brand.name}` },
  ];

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Main Frosted Glass Header */}
        <header 
          className={`transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#CBD8E2]/90 backdrop-blur-[16px] shadow-sm shadow-[#06080F]/[0.05] border-b border-white/70 py-2' 
              : 'bg-[#CBD8E2]/80 backdrop-blur-[16px] border-b border-white/60 py-2'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-11">
              
              {/* ========================================================
                  1. RIGHT: BRAND LOGO & TAGLINE
              ======================================================== */}
              <a href="index.html" className="flex items-center gap-2.5 shrink-0" id="brand-logo-link">
                <div className="brand-logo-icon relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#06080F] flex items-center justify-center p-1 shadow-sm border border-white/20">
                  {/* Architectural Door Emblem */}
                  <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00F090" strokeWidth="1.7" />
                    <path d="M7 6v12M7 12h3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M17 6v12M17 12h-3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                    <line x1="12" y1="4" x2="12" y2="20" stroke="#00F090" strokeWidth="1.2" strokeDasharray="2 2" />
                  </svg>
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00F090] shadow-sm"></span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="font-black text-sm sm:text-base text-[#06080F] tracking-tight">{brand.name}</span>
                    <span className="text-[#00F090] font-bold text-xs hidden sm:inline">|</span>
                    <span className="font-sans font-bold text-[11px] text-[#11172C] tracking-wider hidden sm:inline uppercase">{brand.nameEn}</span>
                  </div>
                  <span className="text-[9px] text-[#11172C]/80 font-medium tracking-tight hidden sm:block">
                    {brand.tagline}
                  </span>
                </div>
              </a>

              {/* ========================================================
                  2. DESKTOP ONLY: CONCISE HORIZONTAL NAVIGATION (min-width: 1024px)
              ======================================================== */}
              <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 p-1 rounded-2xl bg-[#E4EBF1]/80 backdrop-blur-md border border-white/80 shadow-2xs">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onMouseEnter={() => setActiveHoverNav(link.id)}
                    onMouseLeave={() => setActiveHoverNav(null)}
                    className="relative px-2.5 xl:px-3 py-1 text-xs font-bold text-[#11172C] hover:text-[#06080F] hover:bg-white/80 rounded-xl transition-all whitespace-nowrap"
                  >
                    {link.label}
                    {activeHoverNav === link.id && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00F090] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                ))}
              </nav>

              {/* ========================================================
                  3. DESKTOP ONLY: SLEEK MICRO-ACTIONS & ADMIN CMS TRIGGER
              ======================================================== */}
              <div className="hidden lg:flex items-center gap-2.5 shrink-0">
                <a
                  href="admin.html"
                  id="btn-nav-admin"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#00F090] bg-[#06080F] hover:bg-[#11172C] border border-[#00F090]/40 hover:border-[#00F090] shadow-[0_0_10px_rgba(0,240,144,0.12)] hover:shadow-[0_0_14px_rgba(0,240,144,0.25)] transition-all cursor-pointer"
                  title="ورود به پنل مدیریت CRM و ویرایشگر زنده محتوا"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#00F090]" />
                  <span>پنل مدیریت CRM</span>
                </a>

                {/* Primary High-Impact CTA (Mint with Ink Black text) */}
                <button
                  onClick={onOpenInquiry}
                  id="btn-nav-inquiry"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#00F090] hover:bg-[#00D882] text-[#06080F] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>درخواست مشاوره</span>
                </button>
              </div>

              {/* ========================================================
                  4. MOBILE & TABLET ONLY: ACTION BUTTONS (max-width: 1023px)
              ======================================================== */}
              <div className="flex lg:hidden items-center gap-2 shrink-0">
                <a
                  href="admin.html"
                  aria-label="پنل مدیریت CRM"
                  className="w-8 h-8 rounded-full bg-[#06080F] text-[#00F090] border border-[#00F090]/40 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="پنل مدیریت CRM"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#00F090]" />
                </a>

                <a
                  href={`tel:${contact.centralPhoneTel}`}
                  aria-label="تماس با کارشناس"
                  id="btn-mobile-phone"
                  className="w-8 h-8 rounded-full bg-[#E4EBF1] hover:bg-white text-[#06080F] border border-white/90 shadow-2xs backdrop-blur-[8px] flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#06080F]" />
                </a>

                <button
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="منوی ناوبری"
                  id="btn-mobile-menu"
                  className="w-8 h-8 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] border border-white/60 shadow-2xs backdrop-blur-[8px] flex items-center justify-center transition-all active:scale-95 cursor-pointer font-bold"
                >
                  <Menu className="w-3.5 h-3.5 text-[#06080F]" />
                </button>
              </div>

            </div>
          </div>
        </header>
      </div>

      {/* ========================================================
          5. LUXURY MOBILE / TABLET OVERLAY DRAWER (Slide-in & Fade)
      ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#06080F]/60 backdrop-blur-md"
            />

            {/* Slide-in Luxury Glass Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#E4EBF1] text-[#06080F] border-l border-white/60 shadow-2xl backdrop-blur-[24px] flex flex-col justify-between p-6 overflow-y-auto"
            >
              {/* Drawer Top Bar */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#CBD8E2]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#06080F] flex items-center justify-center p-1.5 shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00F090" strokeWidth="1.7" />
                        <path d="M7 6v12M7 12h3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                        <path d="M17 6v12M17 12h-3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-extrabold text-base text-[#06080F]">{brand.name}</span>
                      <span className="text-[10px] text-[#11172C] block font-sans">{brand.nameEn}</span>
                    </div>
                  </div>

                  {/* Close Button ("X") */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="بستن منو"
                    className="w-9 h-9 rounded-full bg-[#CBD8E2] hover:bg-white text-[#06080F] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Vertical Navigation Links */}
                <nav className="py-5 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#11172C] uppercase tracking-wider px-3 mb-1">
                    بخش‌های وبسایت
                  </span>
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#CBD8E2]/60 hover:bg-[#CBD8E2] active:bg-[#CBD8E2] transition-all text-right group border border-white/60 hover:border-white"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/80 group-hover:bg-[#00F090] text-[#06080F] flex items-center justify-center transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-[#06080F] group-hover:text-[#06080F] transition-colors">
                              {link.label}
                            </span>
                            <span className="block text-[10px] text-[#11172C]">
                              {link.desc}
                            </span>
                          </div>
                        </div>
                        <ChevronLeft className="w-3.5 h-3.5 text-[#11172C] group-hover:text-[#06080F] group-hover:-translate-x-1 transition-all" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-5 border-t border-[#CBD8E2] space-y-2.5">
                {/* Action 1: Instant Consultation CTA (Mint #00F090 with #06080F Text) */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>درخواست مشاوره مهندسی</span>
                </button>

                {/* Action 2: Price Calculator Link */}
                <a
                  href="calculator.html"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#CBD8E2] hover:bg-white text-[#06080F] font-bold text-xs border border-white/80 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>محاسبه آنلاین قیمت</span>
                </a>

                {/* Action 3: Live CRM & CMS Admin */}
                <a
                  href="admin.html"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 px-4 rounded-xl bg-[#CBD8E2]/80 hover:bg-white text-[#11172C] font-semibold text-xs border border-white/60 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>ورود به پنل مدیریت CRM</span>
                </a>

                {/* Phone contact */}
                <a
                  href={`tel:${contact.centralPhoneTel}`}
                  className="flex items-center justify-center gap-2 py-1.5 text-[11px] font-medium text-[#11172C] hover:text-[#06080F] transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#06080F]" />
                  <span>تماس مستقیم: {contact.centralPhone}</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
