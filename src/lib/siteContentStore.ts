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

export type ComparisonCategoryKey = 'clarity' | 'safety' | 'thermal' | 'privacy';

export interface GlassSpecItem {
  label: string;
  value: string;
}

export interface GlassSideProfile {
  label: string;
  sublabel: string;
  badgeText: string;
  image: string;
  specs: GlassSpecItem[];
  highlight: string;
}

export interface GlassComparisonCategoryData {
  tabLabel: string;
  title: string;
  badge: string;
  description: string;
  left: GlassSideProfile;
  right: GlassSideProfile;
}

export interface GlassLabContent {
  sectionBadge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  ctaConsultationText: string;
  ctaCalculatorText: string;
  categories: Record<ComparisonCategoryKey, GlassComparisonCategoryData>;
}

export interface SiteContentState {
  hero: HeroContent;
  brand: BrandContent;
  contact: ContactContent;
  pricing: PricingFormulaContent;
  services: ServiceContentItem[];
  projects: ProjectShowcaseItem[];
  glassLab: GlassLabContent;
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
  updateGlassLab: (data: Partial<GlassLabContent>) => void;
  updateGlassLabCategory: (categoryKey: ComparisonCategoryKey, data: Partial<GlassComparisonCategoryData>) => void;
  updateGlassLabSide: (categoryKey: ComparisonCategoryKey, side: 'left' | 'right', data: Partial<GlassSideProfile>) => void;
  resetGlassLabToDefaults: () => void;
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
  ctaPrimaryLink: '/calculator',
  ctaSecondaryText: 'پروژه‌ها و رزومه',
  ctaSecondaryLink: '/projects',
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
  address: 'تهران، خیابان ولیعصر، برج فناوری و مهندسی، طبقه ۷، واحد ۷۰۲',
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
    title: 'مجتمع اداری و تجاری پارسیان',
    district: 'تهران - ورودی اصلی',
    systemType: 'درب اتوماتیک اسلایدینگ تلسکوپی با فریم PVD گلد',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۳',
    specs: 'موتور دانکر BG75 آلمان • شیشه سوپرکلیر ۱۰ میل',
  },
  {
    id: 'p2',
    title: 'مرکز نوآوری و فناوری',
    district: 'تهران - فضای اداری',
    systemType: 'پارتیشن شیشه‌ای فریم‌لس آکوستیک دوجداره',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۳',
    specs: 'عایق صوتی تا ۴۲ دسی‌بل • شیشه هوشمند PDLC',
  },
  {
    id: 'p3',
    title: 'برج تجاری بین‌الملل',
    district: 'تهران - مرکز خرید',
    systemType: 'درب گردان اتوماتیک ریولوینگ',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۲',
    specs: 'قطر ۲.۸ متر • سنسورهای پرده‌ای BEA بلژیک',
  },
  {
    id: 'p4',
    title: 'مرکز تخصصی درمان و جراحی',
    district: 'تهران - بخش درمانی',
    systemType: 'درب اسلایدینگ بیمارستانی با سنسور فوکوس',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    year: '۱۴۰۲',
    specs: 'سیستم هوابند سایلنت • استاندارد بهداشتی Clean Room',
  },
];

export const DEFAULT_GLASS_LAB_CONTENT: GlassLabContent = {
  sectionBadge: 'آزمایشگاه متریال و آزمون شیشه درنا درب',
  sectionTitle: 'بررسی زنده و میکرومتری تفاوت شیشه‌های تخصصی',
  sectionSubtitle: 'اهرم تعاملی را به چپ یا راست بکشید تا تفاوت واقعی شفافیت، ایمنی، شکست نور و ساختار شیشه‌ها را در محیط شبیه‌سازی‌شده مقایسه کنید.',
  ctaConsultationText: 'درخواست مشاوره انتخاب متریال',
  ctaCalculatorText: 'محاسبه آنلاین قیمت متریال',
  categories: {
    clarity: {
      tabLabel: 'شفافیت (فلوت / سوپرکلیر)',
      title: 'مقایسه شفافیت و عبور نور: شیشه فلوت معمولی در برابر سوپرکلیر کریستال',
      badge: 'آزمون خلوص رنگ و ضریب عبور نور',
      description: 'شیشه‌های فلوت سنتی به دلیل غلظت بالای اکسید آهن دارای رگه‌های سبز تیره هستند. در مقابل، شیشه سوپرکلیر کم‌آهن (Low-Iron) با پالایش اکسید آهن، شفافیت کریستالی ۹۱.۸٪ و دید بدون انحراف رنگ را خلق می‌کند.',
      left: {
        label: 'شیشه فلوت معمولی (Standard Float)',
        sublabel: 'اکسید آهن ۰.۱٪ • ته‌رنگ سبز لبه‌ها • افت عبور نور',
        badgeText: 'استاندارد بازار',
        image: '/images/float-glass.jpg',
        specs: [
          { label: 'ضریب عبور نور (VLT)', value: '۸۲.۴٪ (کدرتر)' },
          { label: 'خلوص رنگ لبه شیشه', value: 'ته‌رنگ سبز زمردی' },
          { label: 'میزان اکسید آهن (Fe2O3)', value: 'حدود ۰.۱٪' },
          { label: 'کاربرد بهینه', value: 'پنجره‌های معمولی و نمای ساده' },
        ],
        highlight: 'افت روشنایی و تغییر رنگ اشیاء پشت شیشه در نور طبیعی',
      },
      right: {
        label: 'شیشه سوپرکلیر کم‌آهن (Ultra-Clear / Low-Iron)',
        sublabel: 'اکسید آهن < ۰.۰۱٪ • بدون هاله سبز • شفافیت الماس',
        badgeText: 'انتخاب مهندسی درنا درب',
        image: '/images/super-clear-glass.jpg',
        specs: [
          { label: 'ضریب عبور نور (VLT)', value: '۹۱.۸٪ (فوق شفاف بلورین)' },
          { label: 'خلوص رنگ لبه شیشه', value: 'کاملاً کریستالی و بی‌رنگ' },
          { label: 'میزان اکسید آهن (Fe2O3)', value: 'کمتر از ۰.۰۱٪' },
          { label: 'کاربرد بهینه', value: 'ورودی لابی لوکس، ویترین و پارتیشن' },
        ],
        highlight: 'انتقال ۱۰۰٪ طبیعی رنگ و نور خورشید بدون هیچ‌گونه فیلتر رنگی',
      },
    },
    safety: {
      tabLabel: 'ایمنی (سکوریت / لمینت PVB)',
      title: 'مقایسه ایمنی سازه: شیشه سکوریت حرارتی در برابر لمینت آکوستیک چندلایه',
      badge: 'آزمون مقاومت مکانیکی و رفتار هنگام شکست',
      description: 'شیشه سکوریت تحت شوک حرارتی ۷۰۰ درجه مقاومت به ضربه را ۵ برابر می‌کند؛ در صورت شکست به قطعات ریز بی‌خطر تبدیل می‌شود. شیشه لمینت با لایه PVB الاستیک مانع از فروریزش شده و ۴۲ دسی‌بل افت صدا ایجاد می‌کند.',
      left: {
        label: 'شیشه سکوریت ۱۰ میل (Tempered Glass)',
        sublabel: 'شوک حرارتی ۷۰۰°C • خرد شدن به ریزبلورهای ایمن',
        badgeText: 'ایمنی ضربه‌ای',
        image: '/images/tempered-glass.jpg',
        specs: [
          { label: 'مقاومت مکانیکی ضربه', value: '۵ برابر شیشه خام' },
          { label: 'عایق صوتی (STC)', value: '۳۲ دسی‌بل' },
          { label: 'رفتار هنگام شکست', value: 'خرد شدن پودری بدون لبه تیز' },
          { label: 'مقاومت حرارتی', value: 'تا ۲۰۰ درجه سانتی‌گراد شوک' },
        ],
        highlight: 'ایده‌آل برای لنگه‌های متحرک درب اتوماتیک پرتردد',
      },
      right: {
        label: 'شیشه لمینت ایمنی (Laminated with PVB)',
        sublabel: 'دولایه شیشه سکوریت + لایه میانی PVB الاستیک ۰.۷۶mm',
        badgeText: 'ضد سرقت و آکوستیک',
        image: '/images/laminated-safety.jpg',
        specs: [
          { label: 'مقاومت مکانیکی ضربه', value: 'ضد دیلم، ضد گلوله و پایداری کامل' },
          { label: 'عایق صوتی (STC)', value: '۴۲ دسی‌بل (سکوت مطلق)' },
          { label: 'رفتار هنگام شکست', value: 'چسبیدن قطعات به فیلم بدون ریزش' },
          { label: 'فیلتر اشعه مخرب UV', value: '۹۹٪ جلوگیری از رنگ‌پریدگی' },
        ],
        highlight: 'مانع ۱۰۰٪ در برابر نفوذ سارقین و سقوط شیشه در ارتفاعات',
      },
    },
    thermal: {
      tabLabel: 'عایق گرما (ساده / Low-E سان‌انرژی)',
      title: 'مقایسه عایق انرژی: شیشه فلوت تک‌جداره در برابر شیشه Low-E سان‌انرژی',
      badge: 'آزمون آسایش حرارتی و کاهش مصرف برق اسپلیت',
      description: 'شیشه Low-E با پوشش نانومتری اکسید نقره، تا ۷۵٪ از ورود حرارت مادون قرمز تابشی خورشید در تابستان جلوگیری کرده و در زمستان مانع از فرار گرمای محیط داخلی می‌شود.',
      left: {
        label: 'شیشه فلوت شفاف ساده (Standard Clear)',
        sublabel: 'فاقد پوشش کنترل تابش • عبور مستقیم گرمای خورشید',
        badgeText: 'انتقال حرارت بالا',
        image: '/images/float-glass.jpg',
        specs: [
          { label: 'ضریب انتقال حرارت (U-Value)', value: '۵.۸ W/m²K (اتلاف بالا)' },
          { label: 'ضریب جذب حرارت خورشید (SHGC)', value: '۰.۸۲ (ورود گرمای شدید)' },
          { label: 'فیلتر اشعه فرابنفش (UV)', value: 'کمتر از ۲۵٪' },
          { label: 'تاثیر بر هزینه سرمایش', value: 'افزایش مصرف برق چیلر/کولر' },
        ],
        highlight: 'ایجاد نقطه داغ (Hotspot) در مجاورت درب و اتلاف انرژی ساختمان',
      },
      right: {
        label: 'شیشه کنترل انرژی و Low-E (Solar Control)',
        sublabel: 'پوشش نانوپوشش نقره • رفلکس هوشمند • کنترل اقلیمی',
        badgeText: 'استاندارد ساختمان سبز',
        image: '/images/lowe-glass.jpg',
        specs: [
          { label: 'ضریب انتقال حرارت (U-Value)', value: '۱.۴ W/m²K (عایق فوق‌العاده)' },
          { label: 'ضریب جذب حرارت خورشید (SHGC)', value: '۰.۳۵ (کنترل هوشمند تابش)' },
          { label: 'فیلتر اشعه فرابنفش (UV)', value: 'بیش از ۹۵٪ فیلتراسیون' },
          { label: 'تاثیر بر هزینه سرمایش', value: 'کاهش ۴۰٪ مصرف برق تهویه' },
        ],
        highlight: 'آسایش دمایی ایده‌آل در ورودی‌های رو به آفتاب مستقیم',
      },
    },
    privacy: {
      tabLabel: 'پارتیشن (شفاف / مات ساتینا)',
      title: 'مقایسه حریم خصوصی: شیشه شفاف در برابر شیشه ساتینا و فلوتد شیاردار',
      badge: 'آزمون مات‌شوندگی نوری و دکوراسیون داخلی',
      description: 'شیشه ساتینا با اسیدکاری شیمیایی میکرومتری و شیشه فلوتد (Reeded Glass) با شیارهای برجسته عمودی، نور ملایم روز را عبور داده اما دید مستقیم را مسدود کرده و جلوه‌ای لوکس به پارتیشن‌ها می‌بخشند.',
      left: {
        label: 'شیشه شفاف ساده (Clear Glass)',
        sublabel: 'دید مستقیم دوطرفه • مناسب فضاهای عمومی',
        badgeText: 'دید کامل',
        image: '/images/super-clear-glass.jpg',
        specs: [
          { label: 'حفظ حریم خصوصی', value: 'دید مستقیم ۱۰۰٪' },
          { label: 'پراکندگی نور (Diffusion)', value: 'صفر (نور مستقیم)' },
          { label: 'اثر انگشت و لکه‌پذیری', value: 'نمایش سریع اثر انگشت' },
          { label: 'کاربرد پیشنهادی', value: 'درب اتوماتیک فروشگاه‌ها و لابی' },
        ],
        highlight: 'دید باز و نمایش کامل فضای داخلی و دکوراسیون',
      },
      right: {
        label: 'شیشه مات ساتینا و شیاردار (Satin & Reeded)',
        sublabel: 'پرداخت اسیدشور مخملی • پخش نور یکنواخت • خطوط شیاردار مدرن',
        badgeText: 'لوکس و آکوستیک',
        image: '/images/satin-glass.jpg',
        specs: [
          { label: 'حفظ حریم خصوصی', value: 'پوشش بصری کامل (مات ابریشمی)' },
          { label: 'پراکندگی نور (Diffusion)', value: 'پخش نرم و بدون سایه شدید' },
          { label: 'اثر انگشت و لکه‌پذیری', value: 'پوشش نانو ضداثر انگشت' },
          { label: 'کاربرد پیشنهادی', value: 'اتاق جلسات، پارتیشن اداری و کلینیک' },
        ],
        highlight: 'ایجاد فضایی اختصاصی با حفظ کامل روشنایی طبیعی محیط',
      },
    },
  },
};

export const useSiteContentStore = create<SiteContentState>()(
  persist(
    (set) => ({
      hero: DEFAULT_HERO_CONTENT,
      brand: DEFAULT_BRAND_CONTENT,
      contact: DEFAULT_CONTACT_CONTENT,
      pricing: DEFAULT_PRICING_CONTENT,
      services: DEFAULT_SERVICES_CONTENT,
      projects: DEFAULT_PROJECTS_CONTENT,
      glassLab: DEFAULT_GLASS_LAB_CONTENT,
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

      updateGlassLab: (data) =>
        set((state) => ({
          glassLab: {
            ...state.glassLab,
            ...data,
            categories: {
              ...(state.glassLab?.categories || DEFAULT_GLASS_LAB_CONTENT.categories),
              ...(data.categories || {}),
            },
          },
        })),

      updateGlassLabCategory: (categoryKey, data) =>
        set((state) => {
          const currentCategories = state.glassLab?.categories || DEFAULT_GLASS_LAB_CONTENT.categories;
          const currentCat = currentCategories[categoryKey] || DEFAULT_GLASS_LAB_CONTENT.categories[categoryKey];
          return {
            glassLab: {
              ...state.glassLab,
              categories: {
                ...currentCategories,
                [categoryKey]: {
                  ...currentCat,
                  ...data,
                },
              },
            },
          };
        }),

      updateGlassLabSide: (categoryKey, side, data) =>
        set((state) => {
          const currentCategories = state.glassLab?.categories || DEFAULT_GLASS_LAB_CONTENT.categories;
          const currentCat = currentCategories[categoryKey] || DEFAULT_GLASS_LAB_CONTENT.categories[categoryKey];
          return {
            glassLab: {
              ...state.glassLab,
              categories: {
                ...currentCategories,
                [categoryKey]: {
                  ...currentCat,
                  [side]: {
                    ...currentCat[side],
                    ...data,
                  },
                },
              },
            },
          };
        }),

      resetGlassLabToDefaults: () =>
        set((state) => ({
          glassLab: DEFAULT_GLASS_LAB_CONTENT,
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
          glassLab: DEFAULT_GLASS_LAB_CONTENT,
        })),
    }),
    {
      name: 'dorna_site_content_store_v3',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
