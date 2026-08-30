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

  // Lock body scroll and listen for ESC key when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'صفحه اصلی', href: '/', icon: Sparkles, desc: 'خانه و معرفی سیستم‌ها' },
    { id: 'products', label: 'محصولات', href: '/products', icon: Cpu, desc: 'درب اتوماتیک، کرکره، میرال، پارتیشن و موتورها' },
    { id: 'services', label: 'خدمات', href: '/services', icon: Layers, desc: 'طراحی و اجرای پروژه‌های شیشه‌ای' },
    { id: 'projects', label: 'پروژه‌ها', href: '/projects', icon: Briefcase, desc: 'پروژه‌های شاخص و رزومه اجرایی' },
    { id: 'calculator', label: 'استعلام قیمت', href: '/calculator', icon: Calculator, desc: 'محاسبه آنلاین و پیش‌فاکتور' },
    { id: 'standards', label: 'استانداردها', href: '/standards', icon: ShieldCheck, desc: `${SITE_CONFIG.guarantees.goldenWarrantyMonths} ماه گارانتی و استانداردها` },
    { id: 'blog', label: 'مقالات', href: '/blog', icon: FileText, desc: 'دانشنامه و مقالات فنی' },
    { id: 'about', label: 'درباره ما', href: '/about', icon: Info, desc: `اصالت و معرفی ${brand.name}` },
  ];

  // Precise Active Page Link Evaluator
  const isLinkActive = (href: string) => {
    if (typeof window === 'undefined') return false;
    const pathname = window.location.pathname.toLowerCase();
    const cleanHref = href.toLowerCase().replace(/^\//, '').replace(/\/$/, '').replace('.html', '');

    if (cleanHref === '' || cleanHref === 'index') {
      return (
        pathname === '/' ||
        pathname === '' ||
        pathname.endsWith('/index.html') ||
        pathname.endsWith('index.html') ||
        (!pathname.endsWith('.html') && pathname.split('/').filter(Boolean).length === 0)
      );
    }

    return (
      pathname === `/${cleanHref}` ||
      pathname === `/${cleanHref}/` ||
      pathname.endsWith(`/${cleanHref}.html`) ||
      pathname.includes(`/${cleanHref}`)
    );
  };


  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Main Transparent / Sleek Glass Header */}
        <header 
          className={`transition-all duration-300 ease-out will-change-transform ${
            isScrolled 
              ? 'bg-[#06080F]/85 backdrop-blur-2xl border-b border-white/15 shadow-xl shadow-black/40 py-2 sm:py-2.5' 
              : 'bg-[#06080F]/40 backdrop-blur-md border-b border-white/10 py-3 sm:py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-11">
              
              {/* ========================================================
                  1. RIGHT: BRAND LOGO & TAGLINE
              ======================================================== */}
              <a href="/" className="flex items-center gap-2.5 shrink-0" id="brand-logo-link">
                <div className="brand-logo-icon relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#06080F]/80 backdrop-blur-md flex items-center justify-center p-1 shadow-sm border border-white/20">
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
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-black text-sm sm:text-base text-white tracking-tight drop-shadow-sm font-['Vazirmatn']">{brand.name}</span>
                    <span className="text-[#00F090] font-bold text-xs hidden sm:inline">|</span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[10px] sm:text-[11px] text-[#CBD8E2] tracking-wider hidden sm:inline uppercase drop-shadow-xs">{brand.nameEn}</span>
                  </div>
                  <span className="text-[9px] text-[#CBD8E2]/85 font-medium tracking-normal mt-0.5 hidden sm:block font-['Vazirmatn']">
                    {brand.tagline}
                  </span>
                </div>
              </a>

              {/* ========================================================
                  2. DESKTOP ONLY: CONCISE HORIZONTAL NAVIGATION (min-width: 1024px)
              ======================================================== */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2 p-1 rounded-2xl bg-[#06080F]/70 backdrop-blur-md border border-white/15 shadow-sm">
                {navLinks.map((link) => {
                  const isCurrent = isLinkActive(link.href);

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onMouseEnter={() => setActiveHoverNav(link.id)}
                      onMouseLeave={() => setActiveHoverNav(null)}
                      className={`relative px-2.5 xl:px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap tracking-normal ${
                        isCurrent 
                          ? 'text-[#00F090] bg-white/10 shadow-xs font-black' 
                          : 'text-[#CBD8E2] hover:text-white hover:bg-white/10 font-semibold'
                      }`}
                    >
                      {link.label}
                      {(activeHoverNav === link.id || isCurrent) && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0.5 left-2.5 right-2.5 h-[2px] bg-[#00F090] rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* ========================================================
                  3. DESKTOP ONLY: SLEEK ACTION BUTTONS WITH NEON GLOW
              ======================================================== */}
              <div className="hidden lg:flex items-center gap-2 shrink-0">
                {/* Desktop Quick Direct Phone Call Button */}
                <a
                  href={`tel:${contact.centralPhoneTel}`}
                  id="btn-nav-desktop-phone"
                  aria-label="تماس با دفتر مرکزی"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#06080F]/80 hover:bg-[#06080F] text-[#CBD8E2] hover:text-[#00F090] border border-white/15 hover:border-[#00F090]/40 transition-all duration-200 active:scale-95 whitespace-nowrap shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00F090]" />
                  <span className="font-mono text-[11px] tracking-wide" dir="ltr">{contact.centralPhone}</span>
                </a>

                {/* Primary High-Impact CTA (Mint with Ink Black text & Neon Glow) */}
                <button
                  onClick={onOpenInquiry}
                  id="btn-nav-inquiry"
                  className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-[#00F090] hover:bg-[#00FFA2] text-[#06080F] shadow-[0_0_20px_rgba(0,240,144,0.35)] hover:shadow-[0_0_30px_rgba(0,240,144,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden border border-[#00F090]/80"
                >
                  <span className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none rounded-full" />
                  <Sparkles className="w-3.5 h-3.5 text-[#06080F] group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10 font-black">استعلام فوری / مشاوره</span>
                </button>
              </div>

              {/* ========================================================
                  4. MOBILE & TABLET ONLY: ACTION BUTTONS (max-width: 1023px)
              ======================================================== */}
              <div className="flex lg:hidden items-center gap-2 shrink-0">
                <a
                  href={`tel:${contact.centralPhoneTel}`}
                  aria-label="تماس با کارشناس"
                  id="btn-mobile-phone"
                  className="w-8 h-8 rounded-full bg-[#06080F]/70 hover:bg-[#06080F] text-white border border-white/20 shadow-xs backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00F090]" />
                </a>

                <button
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="منوی ناوبری"
                  id="btn-mobile-menu"
                  className="w-8 h-8 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] border border-white/40 shadow-xs backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer font-bold"
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
              className="absolute inset-0 bg-[#06080F]/80 backdrop-blur-md"
            />

            {/* Slide-in Luxury Glass Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#06080F]/95 text-white border-l border-white/10 shadow-2xl backdrop-blur-[24px] flex flex-col justify-between p-6 overflow-y-auto"
            >
              {/* Drawer Top Bar */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#06080F] border border-[#00F090]/40 flex items-center justify-center p-1.5 shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00F090" strokeWidth="1.7" />
                        <path d="M7 6v12M7 12h3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                        <path d="M17 6v12M17 12h-3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-extrabold text-base text-white">{brand.name}</span>
                      <span className="text-[10px] text-[#CBD8E2] block font-sans">{brand.nameEn}</span>
                    </div>
                  </div>

                  {/* Close Button ("X") */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="بستن منو"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Vertical Navigation Links */}
                <nav className="py-5 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#CBD8E2]/60 uppercase tracking-wider px-3 mb-1 font-mono">
                    منوی دسترسی سریع
                  </span>
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const isCurrent = isLinkActive(link.href);

                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all text-right group border ${
                          isCurrent
                            ? 'bg-[#00F090]/15 border-[#00F090]/50 text-[#00F090]'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.1] border-white/5 hover:border-[#00F090]/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isCurrent
                              ? 'bg-[#00F090] text-[#06080F]'
                              : 'bg-white/10 group-hover:bg-[#00F090] text-[#00F090] group-hover:text-[#06080F]'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <span className={`block text-xs font-bold transition-colors ${
                              isCurrent ? 'text-[#00F090] font-black' : 'text-white group-hover:text-[#00F090]'
                            }`}>
                              {link.label}
                            </span>
                            <span className="block text-[10px] text-[#CBD8E2]/70">
                              {link.desc}
                            </span>
                          </div>
                        </div>
                        <ChevronLeft className={`w-3.5 h-3.5 transition-all ${
                          isCurrent ? 'text-[#00F090]' : 'text-[#CBD8E2]/40 group-hover:text-[#00F090] group-hover:-translate-x-1'
                        }`} />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions & Direct Phone Quick Call */}
              <div className="pt-5 border-t border-white/10 space-y-3">
                {/* Direct Phone Call Quick Access Card */}
                <a
                  href={`tel:${contact.centralPhoneTel}`}
                  id="mobile-drawer-direct-call"
                  className="w-full p-3 rounded-2xl bg-linear-to-r from-[#00F090]/15 via-[#00F090]/10 to-transparent border border-[#00F090]/40 flex items-center justify-between group hover:border-[#00F090] transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00F090] text-[#06080F] flex items-center justify-center shadow-md shadow-[#00F090]/20 group-hover:scale-105 transition-transform shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[11px] font-medium text-[#CBD8E2]">تماس مستقیم و فوری</span>
                      <span className="block text-sm font-black text-white font-mono tracking-wider group-hover:text-[#00F090] transition-colors" dir="ltr">
                        {contact.centralPhone}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#06080F] bg-[#00F090] px-2 py-0.5 rounded-md shrink-0">
                    تماس
                  </span>
                </a>

                {/* Action 1: Instant Consultation CTA (Mint #00F090 with #06080F Text) */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  id="mobile-drawer-inquiry-btn"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>درخواست مشاوره مهندسی</span>
                </button>

                {/* Action 2: Price Calculator Link */}
                <a
                  href="/calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  id="mobile-drawer-calc-link"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#00F090]" />
                  <span>محاسبه آنلاین قیمت</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
