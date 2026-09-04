/**
 * Supabase Client & Local Persistence Adapter
 * Dorna Darb Enterprise Dashboard
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ARTICLES_DATA } from '../data/articlesData';

// Access environment variables safely in Vite
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    supabase = null;
  }
}

// ----------------------------------------------------------------------------
// Local Storage Fallback Store (Ensures 100% functionality without crash)
// ----------------------------------------------------------------------------

export interface ArticleRecord {
  id: string;
  slug?: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
  published?: boolean;
  viewsCount?: number;
  author?: string | { name: string; role: string };
  status?: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  gallery?: string[];
  keyTakeaways?: string[];
}

export interface ProjectRecord {
  id: string;
  title: string;
  location: string;
  district?: string;
  systemType: string;
  specs: string;
  category: 'residential' | 'commercial' | 'villa';
  image: string;
  clientName?: string;
  completionYear?: string;
  featured?: boolean;
}

export interface InquiryRecord {
  id: string;
  created_at: string;
  client_name: string;
  phone_number: string;
  system_type: string;
  system_title?: string;
  width: number;
  height: number;
  selected_options: Record<string, any>;
  estimated_price: number;
  district?: string;
  status: 'pending' | 'contacted' | 'quoted' | 'won' | 'lost';
  admin_notes?: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: 'glass' | 'operator' | 'frame' | 'shutter_slat' | 'shutter_motor' | 'mechanism';
  price: number; // Toman (per sqm or per unit or per meter)
  unit: string; // e.g. 'هر مترمربع', 'پکیج کامل', 'هر متر طول'
  description?: string;
  badge?: string;
  isActive: boolean;
  showInCalculator?: boolean; // Toggle for display in online price calculator
}

export interface PricingConfig {
  id: string;
  updated_at: string;
  // Catalog Items list with dynamic CRUD and toggle
  catalogItems?: CatalogItem[];
  // Glass price per sqm (legacy compatibility)
  glassPrices: {
    clear10mm: number;
    superClear10mm: number;
    frosted10mm: number;
    tintedSmoke10mm: number;
    laminatedSafety: number;
  };
  // Operator / Automation prices (legacy compatibility)
  operatorPrices: {
    germanDunker: number;
    italianLabel: number;
    turkishHolux: number;
    iranianStandard: number;
  };
  // Fitting and Profiles (legacy compatibility)
  fittingProfiles: {
    anodizedGold: number;
    anodizedSilver: number;
    matteBlackPowder: number;
    framelessStainlessSteel: number;
  };
  // Multipliers & Installation
  multipliers: {
    districtNorthMultiplier: number;
    districtStandardMultiplier: number;
    installationBaseCost: number;
    emergencyDeliveryMultiplier: number;
  };
}

export const DEFAULT_CATALOG_ITEMS: CatalogItem[] = [
  // Glasses
  {
    id: 'glass-clear-10mm',
    name: 'شیشه سکوریت ۱۰ میل شفاف سوپرکلیر',
    category: 'glass',
    price: 1450000,
    unit: 'هر مترمربع',
    description: 'سوپرکلیر وین‌لایت کم‌آهن شفاف با مقاومت حرارتی و ضربه‌ای بالا',
    badge: 'سوپرکلیر وین‌لایت شفاف',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'glass-super-clear-10mm',
    name: 'شیشه کریستال سوپرکلیر وین‌لایت ۱۰ میل',
    category: 'glass',
    price: 2650000,
    unit: 'هر مترمربع',
    description: 'شفافیت حداکثری ۹۱.۵٪ بدون سبزی، مخصوص لابی و پروژه‌های لوکس',
    badge: 'کریستال Ultra-Clear',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'glass-frosted-10mm',
    name: 'شیشه مات ساتینا / سندبلاست ۱۰ میل',
    category: 'glass',
    price: 1950000,
    unit: 'هر مترمربع',
    description: 'پوشش مات یکدست ضدلک با قابلیت خطوط دکوراتیو هندسی',
    badge: 'پوشش خصوصی سندبلاست',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'glass-tinted-smoke-10mm',
    name: 'شیشه دودی / برنز / رفلکس ۱۰ میل',
    category: 'glass',
    price: 2200000,
    unit: 'هر مترمربع',
    description: 'کنترل تابش خورشید و زیبایی بصری در نما و ورودی',
    badge: 'رنگی دودی/برنز لوکس',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'glass-laminated-safety',
    name: 'شیشه لمینت دوجداره ایمنی ضدسرقت (PVB)',
    category: 'glass',
    price: 3800000,
    unit: 'هر مترمربع',
    description: 'دولایه شیشه سکوریت با لایه طلق PVB عایق صوت و غیرقابل نفوذ',
    badge: 'دولایه نشکن PVB ضدسرقت',
    isActive: true,
    showInCalculator: true,
  },

  // Operators & Motors
  {
    id: 'op-german-dunker',
    name: 'پکیج اپراتور Dunkermotoren آلمان (براش‌لس)',
    category: 'operator',
    price: 54000000,
    unit: 'پکیج کامل',
    description: 'موتور بدون جاروبک دائم‌کار آلمان، گیربکس سیاره‌ای با ۵ سال گارانتی',
    badge: 'اورجینال آلمان • ۵ سال گارانتی',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'op-italian-label',
    name: 'پکیج اپراتور Label ایتالیا (مدل Evolus)',
    category: 'operator',
    price: 42000000,
    unit: 'پکیج کامل',
    description: 'کنترل‌باکس هوشمند دیجیتال، عملکرد نرم و بی‌صدا ساخت ایتالیا',
    badge: 'استاندارد اروپا • ۳ سال گارانتی',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'op-turkish-holux',
    name: 'پکیج اپراتور Holux Exclusive ترک',
    category: 'operator',
    price: 32000000,
    unit: 'پکیج کامل',
    description: 'سیستم اقتصادی پرفروش، تسمه تایم تقویت‌شده با ۲ سال گارانتی',
    badge: 'ترکیه • ۲ سال گارانتی',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'op-iranian-standard',
    name: 'پکیج اقتصادی دُرنا استاندارد (موتور ملی ارتقایافته)',
    category: 'operator',
    price: 24000000,
    unit: 'پکیج کامل',
    description: 'قطعات تست‌شده با گارانتی ۱۸ ماهه درنا درب و خدمات پس از فروش فوری',
    badge: 'مهندسی درنا • ۱۸ ماه گارانتی',
    isActive: true,
    showInCalculator: true,
  },

  // Frames & Profiles
  {
    id: 'frame-anodized-gold',
    name: 'فریم و شاسی آنودایز طلایی مات/براق',
    category: 'frame',
    price: 1850000,
    unit: 'هر متر طول',
    description: 'آبکاری مقاوم در برابر رطوبت و سایش، مناسب ورودی‌های مجلل',
    badge: 'آنادایز گلد لوکس',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'frame-anodized-silver',
    name: 'فریم و شاسی آنودایز سیلور مات (شامپاینی)',
    category: 'frame',
    price: 1450000,
    unit: 'هر متر طول',
    description: 'آلیاژ ۶۰۶۳ سختی بالا ضدخش و زنگ‌زدگی',
    badge: 'سیلور ضدخش',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'frame-matte-black',
    name: 'فریم مشکی مات رنگ پودری الکترواستاتیک کوره',
    category: 'frame',
    price: 1650000,
    unit: 'هر متر طول',
    description: 'پوشش کوره ۲۰۰ درجه سانتی‌گراد، بافت مات مدرن مینیمال',
    badge: 'الکترواستاتیک مشکی مات',
    isActive: true,
    showInCalculator: true,
  },
  {
    id: 'frame-stainless-steel',
    name: 'کاور و هنگر استیل ضدزنگ ۳۰۴ فریم‌لس',
    category: 'frame',
    price: 2950000,
    unit: 'هر متر طول',
    description: 'استیل نگیر مات/براق بدون فریم برای دهانه‌های شفاف شیشه‌ای',
    badge: 'استیل ۳۰۴ ضدزنگ',
    isActive: true,
    showInCalculator: true,
  },
];

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  id: 'main_pricing_config',
  updated_at: new Date().toISOString(),
  catalogItems: DEFAULT_CATALOG_ITEMS,
  glassPrices: {
    clear10mm: 1450000,
    superClear10mm: 2650000,
    frosted10mm: 1950000,
    tintedSmoke10mm: 2200000,
    laminatedSafety: 3800000,
  },
  operatorPrices: {
    germanDunker: 54000000,
    italianLabel: 42000000,
    turkishHolux: 32000000,
    iranianStandard: 24000000,
  },
  fittingProfiles: {
    anodizedGold: 1850000,
    anodizedSilver: 1450000,
    matteBlackPowder: 1650000,
    framelessStainlessSteel: 2950000,
  },
  multipliers: {
    districtNorthMultiplier: 1.05,
    districtStandardMultiplier: 1.0,
    installationBaseCost: 4500000,
    emergencyDeliveryMultiplier: 1.15,
  },
};

const INQUIRIES_STORAGE_KEY = 'dorna_admin_inquiries_v1';
const PRICING_STORAGE_KEY = 'dorna_admin_pricing_v1';
const ARTICLES_STORAGE_KEY = 'dorna_admin_articles_v2';
const PROJECTS_STORAGE_KEY = 'dorna_admin_projects_v1';

const INITIAL_ARTICLES_SEED: ArticleRecord[] = ARTICLES_DATA.map((art) => ({
  id: art.id,
  slug: art.slug,
  title: art.title,
  category: art.category,
  readTime: art.readTime,
  date: art.date,
  image: art.image,
  summary: art.summary,
  tags: art.tags,
  featured: art.featured,
  published: true,
  viewsCount: art.viewsCount || 1000,
  content: art.content,
}));

const INITIAL_PROJECTS_SEED: ProjectRecord[] = [
  {
    id: 'proj-1',
    title: 'مجتمع مسکونی رویال پالاس',
    location: 'تهران - ورودی لابی',
    district: 'تهران',
    systemType: 'درب اتوماتیک اسلایدینگ تلسکوپی',
    specs: 'شاسی آنودایز طلایی • شیشه سوپرکلیر وین‌لایت ۱۲ میل • موتور دانکر آلمان',
    category: 'residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    clientName: 'مهندس پیروزان',
    completionYear: '۱۴۰۴',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'مجتمع اداری مدرن پلازا',
    location: 'تهران - پهنه تجاری اداری',
    district: 'تهران',
    systemType: 'پارتیشن شیشه‌ای دوجداره آکوستیک',
    specs: 'عایق صوتی ۴۲ دسی‌بل • پروفیل مشکی مات فریم‌لس • یراق‌آلات دورماکابا',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
    clientName: 'هلدینگ توسعه آوا',
    completionYear: '۱۴۰۳',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'ویلای معماری سفید مینیمال',
    location: 'استان تهران',
    district: 'حومه تهران',
    systemType: 'درب شیشه‌ای میرال کشویی دستی',
    specs: 'هنگرهای استیل ۳۰۴ ضدزنگ • شیشه هوشمند مات‌شونده PDLC',
    category: 'villa',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85',
    clientName: 'دکتر فرشیدفر',
    completionYear: '۱۴۰۴',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'هتل بین‌المللی گرند پارسیان',
    location: 'تهران - ورودی اصلی',
    district: 'تهران',
    systemType: 'درب اتوماتیک اسلایدینگ ۴ لنگه',
    specs: 'پوشش آنودایز شامپاینی • سنسورهای پرده نوری ترکیبی BEA بلژیک',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85',
    clientName: 'گروه هتلداری پارسیان',
    completionYear: '۱۴۰۳',
    featured: false,
  },
  {
    id: 'proj-5',
    title: 'مجتمع مسکونی دیپلماتیک',
    location: 'تهران - ورودی مرکزی',
    district: 'تهران',
    systemType: 'درب اتوماتیک تلسکوپی ورودی لابی',
    specs: 'افزایش ۳۵٪ بازشوی مفید • اتصالات استیل ۳۱۶ سیلور سوپرپولیش',
    category: 'residential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85',
    clientName: 'مهندس سهرابی',
    completionYear: '۱۴۰۴',
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'شوروم مرکزی و ویترین تجاری',
    location: 'تهران - مرکز خرید',
    district: 'تهران',
    systemType: 'کرکره برقی لوکس پلی‌کربنات شفاف',
    specs: 'تیغه‌های نشکن ضدسرقت ۳ میل • دید کامل ویترین شبانه',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    clientName: 'بوتیک مد ارغوان',
    completionYear: '۱۴۰۳',
    featured: false,
  },
];

// ----------------------------------------------------------------------------
// DB Operations Helper with Auto-Sync
// ----------------------------------------------------------------------------

export const dbService = {
  // 1. Get Inquiries
  async getInquiries(): Promise<InquiryRecord[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) return data as InquiryRecord[];
      } catch (e) {
        console.warn('Supabase fetch error, fallback to local storage:', e);
      }
    }

    // Fallback to local storage
    const local = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!local) {
      // Seed initial sample inquiries for instant rich preview
      const initialSeed: InquiryRecord[] = [
        {
          id: 'seed-1',
          created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          client_name: 'مهندس رضایی (مجتمع الماس)',
          phone_number: '09121234567',
          system_type: 'telescopic',
          system_title: 'درب اتوماتیک تلسکوپی ۴ لت',
          width: 320,
          height: 240,
          selected_options: { glass: 'superClear10mm', operator: 'germanDunker', frame: 'anodizedGold' },
          estimated_price: 86500000,
          district: 'تهران',
          status: 'pending',
          admin_notes: 'درخواست بازدید حضوری جهت اندازه‌گیری دقیق دهنه ورودی لابی.',
        },
        {
          id: 'seed-2',
          created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          client_name: 'دکتر ستوده (کلینیک درمانی)',
          phone_number: '09129876543',
          system_type: 'sliding',
          system_title: 'درب اسلایدینگ فریم‌لس',
          width: 210,
          height: 220,
          selected_options: { glass: 'frosted10mm', operator: 'italianLabel', frame: 'matteBlackPowder' },
          estimated_price: 59400000,
          district: 'تهران',
          status: 'contacted',
          admin_notes: 'تماس تلفنی گرفته شد، ابعاد نهایی تایید شد. پیش‌فاکتور ارسال شود.',
        },
        {
          id: 'seed-3',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          client_name: 'شرکت مهندسی آریاسازان',
          phone_number: '09355554433',
          system_type: 'partition',
          system_title: 'پارتیشن شیشه‌ای اداری دوجداره',
          width: 850,
          height: 280,
          selected_options: { glass: 'laminatedSafety', frame: 'matteBlackPowder' },
          estimated_price: 142000000,
          district: 'تهران',
          status: 'quoted',
          admin_notes: 'پیش‌فاکتور رسمی ارسال شد و در انتظار تایید هیئت مدیره شرکت.',
        },
      ];
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(initialSeed));
      return initialSeed;
    }

    try {
      return JSON.parse(local);
    } catch {
      return [];
    }
  },

  // 2. Add New Inquiry
  async addInquiry(inquiry: Omit<InquiryRecord, 'id' | 'created_at'>): Promise<InquiryRecord> {
    const newRecord: InquiryRecord = {
      ...inquiry,
      id: 'inq_' + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([newRecord])
          .select()
          .single();

        if (!error && data) {
          return data as InquiryRecord;
        }
      } catch (e) {
        console.warn('Supabase insert error, saving to local storage:', e);
      }
    }

    // Update Local Storage
    const existing = await this.getInquiries();
    const updated = [newRecord, ...existing];
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  },

  // 3. Update Inquiry Status & Notes
  async updateInquiry(id: string, updates: Partial<InquiryRecord>): Promise<boolean> {
    if (supabase) {
      try {
        const { error } = await supabase
          .from('inquiries')
          .update(updates)
          .eq('id', id);

        if (!error) return true;
      } catch (e) {
        console.warn('Supabase update error:', e);
      }
    }

    // Local update
    const existing = await this.getInquiries();
    const index = existing.findIndex((item) => item.id === id);
    if (index !== -1) {
      existing[index] = { ...existing[index], ...updates };
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(existing));
      return true;
    }
    return false;
  },

  // 4. Delete Inquiry
  async deleteInquiry(id: string): Promise<boolean> {
    if (supabase) {
      try {
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (!error) return true;
      } catch (e) {
        console.warn('Supabase delete error:', e);
      }
    }

    const existing = await this.getInquiries();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // 5. Get Pricing Config
  async getPricingConfig(): Promise<PricingConfig> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('pricing_settings')
          .select('config_data')
          .eq('id', 'main_pricing_config')
          .single();

        if (!error && data?.config_data) {
          const cfg = data.config_data as PricingConfig;
          if (!cfg.catalogItems || cfg.catalogItems.length === 0) {
            cfg.catalogItems = DEFAULT_CATALOG_ITEMS;
          }
          return cfg;
        }
      } catch (e) {
        console.warn('Supabase pricing config fetch error:', e);
      }
    }

    const local = localStorage.getItem(PRICING_STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (!parsed.catalogItems || parsed.catalogItems.length === 0) {
          parsed.catalogItems = DEFAULT_CATALOG_ITEMS;
        }
        return parsed;
      } catch {
        // use default
      }
    }

    return DEFAULT_PRICING_CONFIG;
  },

  // 6. Save Pricing Config
  async savePricingConfig(config: PricingConfig): Promise<boolean> {
    const updated = {
      ...config,
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { error } = await supabase
          .from('pricing_settings')
          .upsert({ id: 'main_pricing_config', config_data: updated, updated_at: updated.updated_at });

        if (!error) {
          localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(updated));
          return true;
        }
      } catch (e) {
        console.warn('Supabase save pricing error:', e);
      }
    }

    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  // 7. Get Articles
  async getArticles(): Promise<ArticleRecord[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('date', { ascending: false });

        if (!error && data && data.length > 0) return data as ArticleRecord[];
      } catch (e) {
        console.warn('Supabase articles fetch error, fallback to local:', e);
      }
    }

    const local = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (!local) {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES_SEED));
      return INITIAL_ARTICLES_SEED;
    }

    try {
      return JSON.parse(local);
    } catch {
      return INITIAL_ARTICLES_SEED;
    }
  },

  // 8. Save/Upsert Article
  async saveArticle(article: ArticleRecord): Promise<ArticleRecord> {
    const record = {
      ...article,
      id: article.id || 'art-' + Math.random().toString(36).substring(2, 9),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('articles')
          .upsert(record)
          .select()
          .single();

        if (!error && data) {
          // sync local
        }
      } catch (e) {
        console.warn('Supabase article upsert error:', e);
      }
    }

    const existing = await this.getArticles();
    const index = existing.findIndex((a) => a.id === record.id);
    let updated: ArticleRecord[];
    if (index !== -1) {
      updated = [...existing];
      updated[index] = record;
    } else {
      updated = [record, ...existing];
    }
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    return record;
  },

  // 9. Delete Article
  async deleteArticle(id: string): Promise<boolean> {
    if (supabase) {
      try {
        await supabase.from('articles').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase article delete error:', e);
      }
    }

    const existing = await this.getArticles();
    const filtered = existing.filter((a) => a.id !== id);
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // 10. Get Projects
  async getProjects(): Promise<ProjectRecord[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: false });

        if (!error && data && data.length > 0) return data as ProjectRecord[];
      } catch (e) {
        console.warn('Supabase projects fetch error, fallback to local:', e);
      }
    }

    const local = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!local) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS_SEED));
      return INITIAL_PROJECTS_SEED;
    }

    try {
      return JSON.parse(local);
    } catch {
      return INITIAL_PROJECTS_SEED;
    }
  },

  // 11. Save/Upsert Project
  async saveProject(project: ProjectRecord): Promise<ProjectRecord> {
    const record = {
      ...project,
      id: project.id || 'proj-' + Math.random().toString(36).substring(2, 9),
    };

    if (supabase) {
      try {
        await supabase.from('projects').upsert(record);
      } catch (e) {
        console.warn('Supabase project upsert error:', e);
      }
    }

    const existing = await this.getProjects();
    const index = existing.findIndex((p) => p.id === record.id);
    let updated: ProjectRecord[];
    if (index !== -1) {
      updated = [...existing];
      updated[index] = record;
    } else {
      updated = [record, ...existing];
    }
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
    return record;
  },

  // 12. Delete Project
  async deleteProject(id: string): Promise<boolean> {
    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase project delete error:', e);
      }
    }

    const existing = await this.getProjects();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};
