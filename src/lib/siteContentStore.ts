/**
 * siteContentStore.ts — Centralized Content Store & CMS State Engine
 * Built with Zustand & localStorage Persistence
 * 
 * Provides ultra-fast selector subscriptions for 60FPS zero-overhead rendering.
 * Strict Architecture Safety: Only edits data values, text, and media sources.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface HeroContent {
  headline: string;
  badgeText: string;
  badgeIcon: string;
  videoUrl: string;
  posterUrl: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  operatorStatus: string;
  operatorStandard: string;
}

export interface BrandContent {
  name: string;
  nameEn: string;
  tagline: string;
  establishedYear: number;
}

export interface ContactContent {
  centralPhone: string;
  centralPhoneTel: string;
  directMobile: string;
  directMobileTel: string;
  whatsappNumber: string;
  address: string;
  workingHours: string;
  email: string;
}

export interface PricingFormulaContent {
  currency: string;
  slidingBase: number;
  slidingPerSqm: number;
  telescopicBase: number;
  telescopicPerSqm: number;
  revolvingBase: number;
  revolvingPerSqm: number;
  framelessBase: number;
  framelessPerSqm: number;
  smartGlassPerSqm: number;
  goldPvdPerMeter: number;
}

export interface ServiceContentItem {
  id: string;
  titleFa: string;
  titleEn: string;
  description: string;
  specs: string[];
  iconType: string;
}

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  district: string;
  systemType: string;
  imageUrl: string;
  year: string;
  specs: string;
}

export interface SiteContentState {
  hero: HeroContent;
  brand: BrandContent;
  contact: ContactContent;
  pricing: PricingFormulaContent;
  services: ServiceContentItem[];
  projects: ProjectShowcaseItem[];
  isAdminModalOpen: boolean;
  
  // Actions
  updateHero: (data: Partial<HeroContent>) => void;
  updateBrand: (data: Partial<BrandContent>) => void;
  updateContact: (data: Partial<ContactContent>) => void;
  updatePricing: (data: Partial<PricingFormulaContent>) => void;
  updateServices: (services: ServiceContentItem[]) => void;
  updateServiceItem: (id: string, item: Partial<ServiceContentItem>) => void;
  updateProjects: (projects: ProjectShowcaseItem[]) => void;
  updateProjectItem: (id: string, item: Partial<ProjectShowcaseItem>) => void;
  setAdminModalOpen: (open: boolean) => void;
  resetToDefaults: () => void;
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  headline: 'تلاقی شیشه، نور و مهندسی مدرن',
  badgeText: 'سیستم‌های هوشمند درب اتوماتیک و سازه‌های شیشه‌ای',
  badgeIcon: 'Sparkles',
  videoUrl: 'https://fileditchfiles.st/balpha9/659494cb8503cfb1a4c3/Og_v.webm',
  posterUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
  ctaPrimaryText: 'محاسبه آنلاین قیمت',
  ctaPrimaryLink: 'calculator.html',
  ctaSecondaryText: 'پروژه‌ها و رزومه',
  ctaSecondaryLink: 'projects.html',
  operatorStatus: 'DUNKERMOTOREN BG-75 • OPERATIONAL',
  operatorStandard: 'EN 16005',
};

export const DEFAULT_BRAND_CONTENT: BrandContent = {
  name: 'درنا درب',
  nameEn: 'DORNA DOOR',
  tagline: 'طراحی و اجرای سازه‌های شیشه‌ای و درب اتوماتیک',
  establishedYear: 1389,
};

export const DEFAULT_CONTACT_CONTENT: ContactContent = {
  centralPhone: '۰۲۱-۲۲۰۰۹۸۷۶',
  centralPhoneTel: '+982122009876',
  directMobile: '۰۹۱۲۲۰۰۹۸۷۶',
  directMobileTel: '+989122009876',
  whatsappNumber: '989122009876',
  address: 'تهران، خیابان فرشته (شهید فیاضی)، برج نماد الهیه، طبقه ۷، واحد ۷۰۲',
  workingHours: 'شنبه تا چهارشنبه ۸:۳۰ الی ۱۹:۳۰ | پنج‌شنبه‌ها ۸:۳۰ الی ۱۴:۰۰',
  email: 'info@dornadoor.ir',
};

export const DEFAULT_PRICING_CONTENT: PricingFormulaContent = {
  currency: 'تومان',
  slidingBase: 38_500_000,
  slidingPerSqm: 3_800_000,
  telescopicBase: 54_000_000,
  telescopicPerSqm: 4_200_000,
  revolvingBase: 165_000_000,
  revolvingPerSqm: 9_500_000,
  framelessBase: 8_500_000,
  framelessPerSqm: 2_950_000,
  smartGlassPerSqm: 3_200_000,
  goldPvdPerMeter: 650_000,
};

export const DEFAULT_SERVICES_CONTENT: ServiceContentItem[] = [
  {
    id: 'sliding',
    titleFa: 'درب اتوماتیک اسلایدینگ',
    titleEn: 'Automatic Sliding Doors',
    description: 'حرکت خطی پیوسته و بدون لرزش با استاندارد تردد نامحدود، سازگار با انواع فریم‌های آنودایز و شیشه‌های سوپرکلیر.',
    specs: ['حرکت نرم خطی', 'سنسورهای نوری دقیق', 'تردد نامحدود'],
    iconType: 'sliding',
  },
  {
    id: 'telescopic',
    titleFa: 'درب اتوماتیک تلسکوپی',
    titleEn: 'Automatic Telescopic Doors',
    description: 'افزایش بیش از ۳۰٪ عرض بازشوی مفید در ورودی‌های با فضای کناری محدود، با حرکت هماهنگ لنگه‌های متحرک.',
    specs: ['۳۰٪ بازشوی عریض‌تر', 'حرکت تلسکوپی همگام', 'بهینه‌سازی فضا'],
    iconType: 'telescopic',
  },
  {
    id: 'manual_glass',
    titleFa: 'درب شیشه‌ای میرال',
    titleEn: 'Manual Mirral Glass Doors',
    description: 'سیستم‌های لولایی پینی، استپی با پمپ هیدرولیک توکار و کشویی دستی با هنگرهای استیل ضدزنگ و شیشه سکوریت سوپرکلیر.',
    specs: ['استوپ هیدرولیک کف', 'یراق‌آلات استیل ۳۰۴', 'شیشه ۱۰ میل نشکن'],
    iconType: 'manual_glass',
  },
  {
    id: 'partition',
    titleFa: 'پارتیشن شیشه‌ای',
    titleEn: 'Glass Partitions',
    description: 'تفکیک مدرن فضاهای اداری و مسکونی به صورت تک‌جداره فریم‌لس و دوجداره آکوستیک با بالاترین میزان عبور نور طبیعی.',
    specs: ['عایق صوتی آکوستیک', 'پروفیل اسلیم فریم‌لس', 'شیشه ساده و سندبلاست'],
    iconType: 'partition',
  },
  {
    id: 'shutter',
    titleFa: 'کرکره برقی',
    titleEn: 'Electric Roller Shutters',
    description: 'تیغه‌های آلومینیوم فابریک دوجداره ۶۰۶۳، غضروف‌دار لوکس و پلی‌کربنات شفاف ضدسرقت با موتورهای صنعتی ساید و توبولار.',
    specs: ['تیغه آلومینیوم سنگین', 'موتورهای ساید و توبولار', 'حفاظت و امنیت بالا'],
    iconType: 'shutter',
  },
];

export const DEFAULT_PROJECTS_CONTENT: ProjectShowcaseItem[] = [
  {
    id: 'p1',
    title: 'برج نماد الهیه (فرشته)',
    district: 'منطقه ۱ - الهیه',
    systemType: 'درب اتوماتیک اسلایدینگ تلسکوپی با فریم PVD گلد',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۳',
    specs: 'موتور دانکر BG75 آلمان • شیشه سوپرکلیر ۱۰ میل',
  },
  {
    id: 'p2',
    title: 'مجتمع مسکونی رویال نیاوران',
    district: 'منطقه ۱ - نیاوران',
    systemType: 'پارتیشن شیشه‌ای فریم‌لس آکوستیک دوجداره',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۳',
    specs: 'عایق صوتی تا ۴۲ دسی‌بل • شیشه هوشمند PDLC',
  },
  {
    id: 'p3',
    title: 'برج تجاری سعادت‌آباد',
    district: 'منطقه ۲ - سعادت‌آباد',
    systemType: 'درب گردان اتوماتیک ریولوینگ لوکس',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۲',
    specs: 'قطر ۲.۸ متر • سنسورهای پرده‌ای BEA بلژیک',
  },
  {
    id: 'p4',
    title: 'ساختمان پزشکان پالادیوم زعفرانیه',
    district: 'منطقه ۱ - زعفرانیه',
    systemType: 'درب اسلایدینگ بیمارستانی با سنسور فوکوس',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۲',
    specs: 'سیستم هوابند سایلنت • استاندارد بهداشتی Clean Room',
  },
];

export const useSiteContentStore = create<SiteContentState>()(
  persist(
    (set) => ({
      hero: DEFAULT_HERO_CONTENT,
      brand: DEFAULT_BRAND_CONTENT,
      contact: DEFAULT_CONTACT_CONTENT,
      pricing: DEFAULT_PRICING_CONTENT,
      services: DEFAULT_SERVICES_CONTENT,
      projects: DEFAULT_PROJECTS_CONTENT,
      isAdminModalOpen: false,

      updateHero: (data) =>
        set((state) => ({
          hero: { ...state.hero, ...data },
        })),

      updateBrand: (data) =>
        set((state) => ({
          brand: { ...state.brand, ...data },
        })),

      updateContact: (data) =>
        set((state) => ({
          contact: { ...state.contact, ...data },
        })),

      updatePricing: (data) =>
        set((state) => ({
          pricing: { ...state.pricing, ...data },
        })),

      updateServices: (services) =>
        set(() => ({
          services,
        })),

      updateServiceItem: (id, item) =>
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...item } : s)),
        })),

      updateProjects: (projects) =>
        set(() => ({
          projects,
        })),

      updateProjectItem: (id, item) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...item } : p)),
        })),

      setAdminModalOpen: (open) =>
        set(() => ({
          isAdminModalOpen: open,
        })),

      resetToDefaults: () =>
        set(() => ({
          hero: DEFAULT_HERO_CONTENT,
          brand: DEFAULT_BRAND_CONTENT,
          contact: DEFAULT_CONTACT_CONTENT,
          pricing: DEFAULT_PRICING_CONTENT,
          services: DEFAULT_SERVICES_CONTENT,
          projects: DEFAULT_PROJECTS_CONTENT,
        })),
    }),
    {
      name: 'dorna_site_content_store_v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
