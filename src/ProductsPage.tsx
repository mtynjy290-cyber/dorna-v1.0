import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  ArrowLeft, 
  Check, 
  Phone, 
  MessageCircle, 
  Info, 
  Wrench, 
  Award, 
  FileText, 
  CheckCircle2, 
  X, 
  Maximize2, 
  PackageCheck, 
  Clock, 
  Shield, 
  ChevronLeft,
  Filter,
  Eye,
  ExternalLink,
  Zap,
  Building2,
  Lock,
  Boxes,
  HelpCircle,
  DoorClosed,
  Grid,
  Radio,
  Sliders,
  Calculator
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal } from './components/QuickInquiryModal';

export type ProductCategory = 'all' | 'automatic_doors' | 'shutters' | 'manual_glass' | 'partitions' | 'motors_operators';

export interface ProductItem {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'automatic_doors' | 'shutters' | 'manual_glass' | 'partitions' | 'motors_operators';
  categoryLabel: string;
  originBadge: string;
  originCountry: string;
  originFlag: string;
  highlightBadge: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  status: 'in_stock' | 'project_delivery';
  statusText: string;
  warranty: string;
  keySpecs: { label: string; value: string }[];
  detailedSpecs: { label: string; value: string }[];
  applications: string[];
  features: string[];
}

export const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [prefilledProject, setPrefilledProject] = useState<string>('استعلام محصولات و مشخصات فنی');

  const categories = [
    { id: 'all', label: 'همه محصولات', icon: Boxes },
    { id: 'automatic_doors', label: 'درب اتوماتیک', icon: DoorClosed },
    { id: 'shutters', label: 'کرکره برقی', icon: Sliders },
    { id: 'manual_glass', label: 'درب میرال و شیشه‌ای', icon: Layers },
    { id: 'partitions', label: 'پارتیشن اداری', icon: Building2 },
    { id: 'motors_operators', label: 'موتور و اپراتورها', icon: Cpu },
  ];

  const productsData: ProductItem[] = [
    // 1. AUTOMATIC DOORS
    {
      id: 'auto-sliding-dorna-master',
      nameFa: 'سیستم درب اتوماتیک اسلایدینگ تلسکوپی لوکس درنا مستر',
      nameEn: 'Dorna Master Telescopic Automatic Sliding Glass Door',
      category: 'automatic_doors',
      categoryLabel: 'درب اتوماتیک',
      originBadge: 'مهندسی درنا 🇮🇷 / موتور آلمان 🇩🇪',
      originCountry: 'ایران / آلمان',
      originFlag: '🇮🇷🇩🇪',
      highlightBadge: 'حداکثر بازشو در دهانه‌های باریک',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'سیستم تلسکوپی هوشمند با بازشوی ۲/۳ دهانه، مجهز به شیشه سوپرکلیر ۱۰ میل سکوریت، شاسی مقطع سنگین و سنسورهای مایکروویو ترکیبی.',
      fullDesc: 'درب اتوماتیک اسلایدینگ تلسکوپی درنا مستر گزینه‌ای ایده‌آل برای ورودی‌هایی است که نیاز به بیشترین پهنای تردد خالص دارند. با مکانیزم سنکرونیزاسیون تسمه‌ای و چرخ‌های پلی‌آمیدی دوبل ضدسایش، عملکردی بدون تکان و کاملاً آرام با سرعت بازشوی تنظیم‌پذیر ارائه می‌دهد.',
      status: 'in_stock',
      statusText: 'موجود با قابلیت تحویل و نصب ۴۸ ساعته',
      warranty: '۲۴ ماه گارانتی تعویض قطعات + ۱۰ سال خدمات پشتیبانی',
      keySpecs: [
        { label: 'عرض بازشوی مفید', value: 'تا ۶۵٪ پهنای کل دهانه' },
        { label: 'ظرفیت وزن لنگه‌ها', value: '۴ × ۹۰ کیلوگرم (یا ۲ × ۱۲۰kg)' },
        { label: 'نوع شیشه', value: '۱۰ میل سکوریت سوپرکلیر وین‌لایت' },
        { label: 'سنسور پیش‌فرض', value: 'BEA بلژیک پرده نوری ترکیبی' },
      ],
      detailedSpecs: [
        { label: 'پروفیل شاسی', value: 'آلومینیوم اکسترود ۶۰۶۳ سختی T6 با مقطع ریل قابل تعویض' },
        { label: 'موتور محرک', value: 'Dunkermotoren آلمان براشلس ۱۰۰ وات' },
        { label: 'سیستم کنترل', value: 'میکروپروسسور ۳۲ بیتی با قابلیت برنامه‌ریزی دیجیتال' },
        { label: 'باتری پشتیبان', value: 'UPS اختصاصی با ۵۰ بار تردد در قطعی برق' },
        { label: 'سیستم ضدبرخورد', value: 'سنسور چشم الکترونیک مادون قرمز + ریورس هوشمند' },
      ],
      applications: [
        'لابی برج‌های لوکس مسکونی و هتل‌های پنج ستاره',
        'مراکز درمانی و بیمارستان‌های تخصصی',
        'ورودی شوروم‌ها و پاساژهای تجاری پرتردد'
      ],
      features: [
        'حرکت همزمان و روان لنگه‌ها با مکانیزم تلسکوپی',
        'قفل الکترومکانیکی ضدسرقت با فرمان از ریموت یا کارت‌خوان',
        'امکان انتخاب فریم در رنگ‌های آنودایز مات، شامپاینی، طلایی و مشکی سنباده‌ای'
      ]
    },
    {
      id: 'auto-curved-revolving',
      nameFa: 'درب اتوماتیک منحنی و کرو لوکس لابی (Curved Automatic Door)',
      nameEn: 'Architectural Curved & Revolving Glass Door System',
      category: 'automatic_doors',
      categoryLabel: 'درب اتوماتیک',
      originBadge: 'تولید مهندسی اختصاصی 🇮🇷',
      originCountry: 'ایران',
      originFlag: '🇮🇷',
      highlightBadge: 'طراحی باشکوه و هلی‌کال',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'طراحی هلالی و مدور شیشه‌ای که جلوه‌ای از شکوه معماری و عایق‌بندی فوق‌العاده در برابر تبادل حرارتی و گردوغبار ایجاد می‌کند.',
      fullDesc: 'درب‌های اتوماتیک نیم‌دایره و تمام‌دایره (Curved) درنا درب بر اساس شعاع دقیق ورودی ساختمان با شیشه‌های لمینت سکوریت خم مهندسی ساخته می‌شوند. شاسی مدور با دقت میلی‌متری نورد و آنودایز شده و هوابندی درزها با لاستیک‌های سیلیکونی و مویی‌های متراکم تضمین می‌شود.',
      status: 'project_delivery',
      statusText: 'تولید سفارشی طبق ابعاد پروژه (۷ الی ۱۰ روز کاری)',
      warranty: '۲۴ ماه گارانتی طلایی درنا درب',
      keySpecs: [
        { label: 'شعاع انحنا', value: 'سفارشی از ۱۲۰۰ تا ۲۵۰۰ میلی‌متر' },
        { label: 'نوع شیشه', value: 'لمینت سکوریت خم ۱۰+۱۰ یا ۸+۸ میلیمتر' },
        { label: 'سیستم هدایت', value: 'ریل منحنی نوردشده با بلبرینگ‌های استیل' },
        { label: 'راندمان انرژی', value: 'کاهش ۴۵٪ اتلاف انرژی ورودی ساختمان' },
      ],
      detailedSpecs: [
        { label: 'شاسی و فریم', value: 'اکستروژن قوس‌دار با پوشش رنگ پودری الکترواستاتیک یا PVD استیل' },
        { label: 'موتور محرک', value: 'موتور براشلس دوقلو با گشتاور بالا' },
        { label: 'سنسورهای ایمنی', value: 'سنسورهای رادار منحنی ۳۶۰ درجه و پرده حفاظتی کف' },
      ],
      applications: [
        'برج‌های تجاری شاخص و دفاتر مرکزی شرکت‌های بین‌المللی',
        'مراکز همایش، فرودگاه‌ها و سالن‌های تشریفات VIP'
      ],
      features: [
        'عایق صوتی و حرارتی کم‌نظیر با ایجاد لابی هوایی مجازی',
        'امکان نورپردازی مخفی LED در سقف اپراتور',
        'هماهنگی کامل با سیستم BMS و اعلام حریق ساختمان'
      ]
    },

    // 2. ELECTRIC SHUTTERS
    {
      id: 'shutter-heavy-aluminum',
      nameFa: 'کرکره برقی آلومینیومی تیغه سنگین اکسترود ۸۰ و ۱۰۰ دوبل پل',
      nameEn: 'Heavy-Duty Extruded Double-Wall Aluminum Roller Shutter',
      category: 'shutters',
      categoryLabel: 'کرکره برقی',
      originBadge: 'بیلت ۶۰۶۳ استاندارد 🇮🇷',
      originCountry: 'ایران',
      originFlag: '🇮🇷',
      highlightBadge: 'بی‌صدا، ضدسرقت و مقاوم در برابر باد شدید',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'تیغه‌های فابریک آلومینیومی تولید شده از شمش خالص با وزن سنگین، کپس ضدلغزش و موتورهای ساید و توبلار پرقدرت بدون صدا.',
      fullDesc: 'کرکره‌های برقی درنا درب با بهره‌گیری از تیغه‌های آلومینیومی استاندارد با سختی ایجینگ مناسب و رنگ کوره‌ای مقاوم در برابر اشعه UV آفتاب تولید می‌شوند. حضور پل‌های تقویت‌کننده داخلی مانع از تغییر فرم تیغه در برابر فشار باد و ضربه‌های احتمالی می‌گردد.',
      status: 'in_stock',
      statusText: 'موجود در انبار با تیغه‌های ۸۰ و ۱۰۰ میلی‌متر',
      warranty: '۳۶ ماه ضمانت ثبات رنگ و ۲۴ ماه گارانتی موتور',
      keySpecs: [
        { label: 'ضخامت تیغه', value: '۸۰ و ۱۰۰ میلی‌متر دوبل پل سنگین' },
        { label: 'نوع رنگ', value: 'پودری الکترواستاتیک پلی‌استر ضدخش' },
        { label: 'موتورهای قابل سفارش', value: 'ساید زنجیری صنعتی / توبلار کورتز و بارزانته' },
        { label: 'میزان صدا', value: 'سایلنت به همراه کپس‌های PVC ژله‌ای' },
      ],
      detailedSpecs: [
        { label: 'جنس بیلت', value: 'آلومینیوم آلیاژی ۶۰۶۳ استاندارد بدون ضایعات' },
        { label: 'ریل هدایت‌کننده', value: 'ریل آلومینیومی ضخیم با نوار مویی ضدگردوغبار' },
        { label: 'سیستم خلاص‌کن', value: 'آچار دستی اضطراری در هنگام قطع برق' },
        { label: 'سیستم ضدسرقت', value: 'جا قفل برقی با قطع خودکار مدار موتور' },
      ],
      applications: [
        'پارکینگ‌های برج‌های مسکونی و اداری پرتردد',
        'مغازه‌ها، بانک‌ها، صرافی‌ها و مراکز تجاری',
        'انبارها و درب‌های سوله کارخانجات صنعتی'
      ],
      features: [
        'مقاومت بالا در برابر ضربه و تلاش برای ورود غیرمجاز',
        'حرکت نرم و بی‌صدا بدون گیرپاژ',
        'امکان افزودن تیغه پانچ دار جهت تهویه و دید شبانه'
      ]
    },
    {
      id: 'shutter-polycarbonate-transparent',
      nameFa: 'کرکره برقی شفاف پلی‌کربنات نشکن و ضدحریق بانکی (Nano Polycarbonate)',
      nameEn: 'Bulletproof Polycarbonate Security Transparent Shutter',
      category: 'shutters',
      categoryLabel: 'کرکره برقی',
      originBadge: 'مواد اولیه بایر آلمان 🇩🇪',
      originCountry: 'آلمان / مونتاژ درنا',
      originFlag: '🇩🇪',
      highlightBadge: 'دید ۲۴ ساعته + مقاومت ضدگلوله و ضدحریق',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc225?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'تیغه‌های شفاف پلی‌کربنات با اتصالات لوله استیل ضدزنگ و آلومینیومی، غیرقابل اشتعال با مقاومت در برابر شدیدترین ضربات پُتک و دیلم.',
      fullDesc: 'کرکره برقی شفاف پلی‌کربنات درنا درب از رزین نانو پلی‌کربنات خالص مقاوم در برابر پرتوهای ماوراء بنفش ساخته شده که دچار تغییر رنگ و کدر شدن نمی‌شود. لوله‌های تقویت‌کننده استیل ۳۰۴ میان تیغه‌ها سطح ایمنی فوق‌العاده‌ای برابر با دیواره‌های ضدسرقت برای طلافروشی‌ها و بانک‌ها ایجاد می‌کند.',
      status: 'in_stock',
      statusText: 'موجود در مدل‌های لوله استیل و لوله آلومینیوم',
      warranty: '۵ سال ضمانت عدم تغییر رنگ و شفافیت + ۲۴ ماه گارانتی موتور',
      keySpecs: [
        { label: 'ضخامت تیغه', value: '۴ الی ۶ میلی‌متر پلی‌کربنات نانو نشکن' },
        { label: 'اتصالات میانی', value: 'لوله استیل ضدزنگ ۳۰۴ یا آلومینیوم آنودایز' },
        { label: 'کلاس ضدحریق', value: 'خودخاموش‌شونده استاندارد DIN 4102 B1' },
        { label: 'شفافیت نوری', value: 'عبور نور تا ۸۸٪ با فیلتر کامل UV' },
      ],
      detailedSpecs: [
        { label: 'مقاومت حرارتی', value: 'از دمای -۴۰ الی +۱۳۰ درجه سانتی‌گراد' },
        { label: 'تست ضربه', value: 'مقاوم در برابر اصابت گلوله کالیبر سبک و ضربات پتک' },
        { label: 'موتور پیشنهادی', value: 'موتور ساید AC/DC مجهز به باتری بک‌آپ' },
      ],
      applications: [
        'طلافروشی‌ها، صرافی‌ها و شعبه‌های بانک‌ها',
        'موزه‌ها، گالری‌های هنری و بوتیک‌های برندهای لوکس',
        'پنجره ویلاهای مدرن و بالکن‌های لوکس'
      ],
      features: [
        'دید کامل ویترین در طول شب در عین بالاترین سطح امنیت فیزیکی',
        'ضدحریق و جلوگیری از سرایت آتش به داخل فروشگاه',
        'طراحی فوق‌العاده شیک و مدرن متناسب با معماری معاصر'
      ]
    },

    // 3. MANUAL GLASS / MIRRAL DOORS
    {
      id: 'manual-miral-floor-spring',
      nameFa: 'درب شیشه‌ای میرال فریم‌لس با استوپ هیدرولیک توکار و دستگیره لوکس',
      nameEn: 'Frameless Tempered Glass Swing Door with Heavy Hydraulic Floor Spring',
      category: 'manual_glass',
      categoryLabel: 'درب میرال و شیشه‌ای',
      originBadge: 'شیشه سوپرکلیر وین‌لایت 🇮🇷 / یراق استیل 🇩🇪',
      originCountry: 'ایران / آلمان',
      originFlag: '🇮🇷🇩🇪',
      highlightBadge: 'شفافیت کریستالی ۱۰۰٪ با بازشوی ۱۸۰ درجه',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'درب شیشه‌ای میرال ۱۰ میل سکوریت بدون فریم با استوپ روغنی کف‌خواب پرقدرت، یراق‌آلات استیل ضدزنگ ۳۰۴ و قفل فرانسوی ۱۰۵۷.',
      fullDesc: 'درب‌های شیشه‌ای میرال لولایی درنا درب با استفاده از کوره‌های سکوریت پیشرفته با حداکثر همگنی حرارتی تولید می‌شوند تا از هرگونه موج و اعوجاج نوری جلوگیری شود. استوپ‌های کف مجهز به دو شیر تنظیم سرعت بسته‌شدن و نگه‌دارنده ۹۰ درجه در بازشو هستند.',
      status: 'in_stock',
      statusText: 'تولید و تحویل ظرف ۲۴ الی ۴۸ ساعت',
      warranty: '۲۴ ماه گارانتی استوپ و یراق‌آلات استیل',
      keySpecs: [
        { label: 'ضخامت شیشه', value: '۱۰ میلی‌متر سکوریت سوپرکلیر ابزار دیاموند' },
        { label: 'یراق‌آلات', value: 'استیل ۳۰۴ ضدزنگ مات و براق طلایی/نقره‌ای' },
        { label: 'استوپ کف', value: 'هیدرولیک روغنی مجهز به ترمز بادی و کنترل سرعت' },
        { label: 'قابلیت بازشو', value: 'دولنگه و تک‌لنگه با بازشوی دوطرفه ۱۸۰ درجه' },
      ],
      detailedSpecs: [
        { label: 'تحمل بار لولا', value: 'تا ۱۲۰ کیلوگرم وزن هر لنگه شیشه' },
        { label: 'قفل اختصاصی', value: 'قفل فرانسوی پایین به همراه سیلندر ضدسرقت برنجی' },
        { label: 'دستگیره‌ها', value: 'انواع دستگیره لوله‌ای استیل، چوبی و کریستالی از ۶۰ تا ۱۸۰ سانت' },
      ],
      applications: [
        'ورودی مغازه‌ها و دفاتر کار مدرن اداری',
        'درب‌های ورودی سالن‌های زیبایی، کلینیک‌ها و استخرها',
        'فضاهای ورودی راهروها و شوروم‌های ساختمانی'
      ],
      features: [
        'لبه‌های شیشه دیاموند و لول تخت بدون کوچک‌ترین بریدگی و پلیسه',
        'مقاومت حرارتی و فیزیکی تا ۵ برابر شیشه‌های معمولی',
        'امکان چاپ طرح مات سندبلاست یا لوگوی اختصاصی کارفرما'
      ]
    },
    {
      id: 'manual-slim-sliding-glass',
      nameFa: 'سیستم درب شیشه‌ای ریلی اسلیم (Slim Frame) آنودایز مات',
      nameEn: 'Architectural Slim Profile Sliding Glass Door System',
      category: 'manual_glass',
      categoryLabel: 'درب میرال و شیشه‌ای',
      originBadge: 'پروفیل اختصاصی درنا درب 🇮🇷',
      originCountry: 'ایران',
      originFlag: '🇮🇷',
      highlightBadge: 'فریم بسیار باریک مینیمال با غلتک‌های سایلنت',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'فریم باریک ۲۰ میلی‌متری آلومینیومی اکسترود با ریل آویز فوق روان بالارو، بدون نیاز به ریل‌گذاری در کف زمین.',
      fullDesc: 'درب‌های کشویی اسلیم فریم انتخابی بی‌نظیر برای دکوراسیون داخلی مینیمال و معاصر است. ریل سقفی مخفی به همراه سیستم آرام‌بند Soft-Close دوطرفه مانع از کوبیده‌شدن درب به دیواره‌ها شده و عبور بدون مانع را در کف زمین فراهم می‌کند.',
      status: 'in_stock',
      statusText: 'موجود در رنگ‌های مشکی مات سنباده‌ای، طلایی و دودی',
      warranty: '۳۶ ماه ضمانت سیستم ریل و مکانیزم آرام‌بند',
      keySpecs: [
        { label: 'پهنای فریم نما', value: 'فقط ۲۰ میلی‌متر (Super Slim Frame)' },
        { label: 'مکانیزم ریل', value: 'آویز سقفی با چرخ‌های بلبرینگی ژاپنی سایلنت' },
        { label: 'تکنولوژی آرام‌بند', value: 'Soft-Close هیدرولیکی دوطرفه در ابتدا و انتهای کورس' },
        { label: 'هدایت‌کننده کف', value: 'پین کف‌خواب مخفی بدون مانع تردد' },
      ],
      detailedSpecs: [
        { label: 'آلیاژ پروفیل', value: 'آلومینیوم هارد آنودایز شده ضدخش' },
        { label: 'گزینه‌های شیشه', value: 'شیشه ۸ و ۱۰ میل فلوت سوپرکلیر، برنز، دودی، فلوت شیاردار (ریب)' },
      ],
      applications: [
        'درب‌های جداکننده آشپزخانه و نشیمن در پنت‌هاوس‌ها',
        'درب کلوزت روم، حمام مستر و اتاق خواب‌های لوکس',
        'دفاتر مدیریت و اتاق‌های جلسات اداری مدرن'
      ],
      features: [
        'بدون ریل‌گذاری در کف و حفظ یکپارچگی سنگ یا پارکت',
        'عملکرد روان و بی‌صدا با حرکت تک‌انگشتی',
        'قابلیت اجرای تک لنگه، دولنگه یا دیواره متحرک چندتکه'
      ]
    },

    // 4. OFFICE PARTITIONS
    {
      id: 'partition-frameless-acoustic',
      nameFa: 'پارتیشن شیشه‌ای اداری تک‌جداره فریم‌لس آکوستیک (Frameless Glass Partition)',
      nameEn: 'Modular Single-Glazed Frameless Acoustic Glass Partition',
      category: 'partitions',
      categoryLabel: 'پارتیشن اداری',
      originBadge: 'مهندسی فضاسازی درنا 🇮🇷',
      originCountry: 'ایران',
      originFlag: '🇮🇷',
      highlightBadge: 'نهایت نور و شفافیت با درزگیر پلی‌کربنات نامرئی',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'جداسازی مدرن فضاهای اداری با شیشه‌های ۱۰ و ۱۲ میل سکوریت سوپرکلیر، پروفیل‌های مینی‌مال کف و سقف و اتصال شیشه‌ها با چسب یووی و درزگیر شفاف.',
      fullDesc: 'پارتیشن‌های فریم‌لس درنا درب با حداقل پروفیل آلومینیومی در محیط و حداکثر وسعت دید شیشه‌ای، ارتباط بصری و روشنایی طبیعی دفاتر کار را حفظ می‌کنند. اتصال لبه به لبه شیشه‌ها با استفاده از نوارهای پلی‌کربنات شفاف H-Profile عایق‌بندی صوتی عالی تا ۳۲ دسی‌بل را فراهم می‌آورد.',
      status: 'in_stock',
      statusText: 'برداشت پلان و اجرای پروژه در سراسر تهران و حومه',
      warranty: '۲۴ ماه ضمانت سلامت سازه و اتصالات',
      keySpecs: [
        { label: 'ضخامت شیشه', value: '۱۰ یا ۱۲ میلی‌متر سکوریت سوپرکلیر' },
        { label: 'پروفیل محیطی', value: 'یو چنل آلومینیوم اکسترود ۳ سانتی‌متری' },
        { label: 'عایق صوتی', value: 'کاهش صدای گفتگوی اداری تا ۳۲ dB' },
        { label: 'درب متصل', value: 'امکان نصب درب شیشه‌ای لولایی یا ریلی هم‌باد' },
      ],
      detailedSpecs: [
        { label: 'پوشش پروفیل', value: 'آنودایز مات نقره‌ای، شامپاینی، مشکی و استیل PVD' },
        { label: 'اتصالات میانی', value: 'نوار درزگیر شفاف UV-Stabilized ضدزردی' },
        { label: 'قابلیت جابجایی', value: 'سیستم مدولار با امکان بازکردن و نصب مجدد در محل جدید' },
      ],
      applications: [
        'دفاتر شرکت‌های دانش‌بنیان و استارتاپ‌های نوین',
        'اتاق‌های کنفرانس و جلسات کاری شرکت‌های اداری',
        'شوروم‌ها، گالری‌ها و مراکز خدماتی مدرن'
      ],
      features: [
        'حداکثر انتقال نور طبیعی به تمام بخش‌های داخلی شرکت',
        'امکان اجرای مات‌کاری موضعی، سندبلاست خطی یا لوگوی شرکت روی شیشه',
        'نصب سریع بدون تخریب و بدون کثیف‌کاری محیط کار'
      ]
    },
    {
      id: 'partition-double-glazed-blind',
      nameFa: 'پارتیشن شیشه‌ای دوجداره آکوستیک با پرده کرکره ولومی مگنتی (Double Glazed Acoustic)',
      nameEn: 'Double Glazed Acoustic Partition with Integrated Magnetic Blinds',
      category: 'partitions',
      categoryLabel: 'پارتیشن اداری',
      originBadge: 'سیستم آکوستیک مهندسی 🇮🇷',
      originCountry: 'ایران',
      originFlag: '🇮🇷',
      highlightBadge: 'عایق صوتی فوق‌العاده ۴۲ دسی‌بل + حریم خصوصی کامل',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'سیستم دوجداره شیشه‌ای با فریم پهن اختصاصی، پرده کرکره آلومینیومی ۱۶ میل داخلی با ولوم مگنتی بدون تماس فیزیکی، عایق صدای اتاق جلسات و مدیریت.',
      fullDesc: 'پارتیشن دوجداره درنا درب با ضخامت کلی ۸۰ الی ۱۰۰ میلی‌متر و استفاده از دو لایه شیشه سکوریت، سکوت مطلق را برای جلسات محرمانه و اتاق‌های مدیران ارشد به ارمغان می‌آورد. پرده کرکره آلومینیومی درون محفظه کاملاً درزگیری شده قرار گرفته و نیاز به هیچ‌گونه نظافت و گردگیری ندارد.',
      status: 'in_stock',
      statusText: 'طراحی، ساخت و نصب تخصصی با اکیپ مجهز',
      warranty: '۳۶ ماه گارانتی سازه و ۵ سال گارانتی مکانیزم پرده مگنتی',
      keySpecs: [
        { label: 'ساختار شیشه', value: 'دوجداره (۶mm + اسپیسر گاز خنثی + ۶mm)' },
        { label: 'عایق صوتی', value: 'تا ۴۲ دسی‌بل (استاندارد عالی اتاق جلسات)' },
        { label: 'سیستم پرده', value: 'کرکره آلومینیومی با کنترلر مگنتی بدون سوراخ‌کاری' },
        { label: 'داکتینگ کابل', value: 'امکان عبور سیم‌های شبکه، برق و تلفن از داخل فریم' },
      ],
      detailedSpecs: [
        { label: 'پروفیل بدنه', value: 'آلومینیوم اکسترود هارد آنودایز دوجداره تقویت‌شده' },
        { label: 'درزگیرها', value: 'نوارهای EPDM درجه یک ضدپوسیدگی و نفوذ صوت' },
      ],
      applications: [
        'اتاق مدیریت ارشد، هیئت‌مدیره و سالن‌های کنفرانس',
        'مراکز تماس (Call Center) و استودیوهای ضبط و تدوین',
        'بانک‌ها و اتاق‌های سرور و حراست'
      ],
      features: [
        'تنظیم سریع میزان دید و نور به وسیله ولوم مگنتی شیک',
        'مانع صددرصدی انتقال صدای مکالمات محرمانه به بیرون',
        'استحکام سازه‌ای فوق‌العاده بالا و ایمنی در برابر زلزله'
      ]
    },

    // 5. MOTORS & OPERATORS
    {
      id: 'dunkermotoren-gr63x55',
      nameFa: 'موتور براشلس دانکر آلمان Dunkermotoren GR63x55',
      nameEn: 'Dunkermotoren Brushless Heavy-Duty Operator Motor',
      category: 'motors_operators',
      categoryLabel: 'موتور و اپراتورها',
      originBadge: 'آلمان 🇩🇪',
      originCountry: 'آلمان',
      originFlag: '🇩🇪',
      highlightBadge: 'موتور اورجینال تردد نامحدود',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'قلب تپنده سیستم‌های درب اتوماتیک پرتردد با گشتاور بالا، راندمان ۹۲٪ و طول عمر تضمین‌شده بالای ۵ میلیون سیکل باز و بست.',
      fullDesc: 'موتور DC براشلس بدون زغال دانکر آلمان سری GR63x55 یکی از معتبرترین و بادوام‌ترین موتورهای صنعتی در صنعت اتوماسیون درب است. این موتور مجهز به انکودر نوری مگنتیک با دقت کالیبراسیون میلی‌متری و گیربکس خورشیدی فولادی سخت‌کاری شده است که در سنگین‌ترین شرایط آب‌وهوایی و ترافیک نامحدود، عملکردی کاملاً بی‌صدا و فوق روان ارائه می‌دهد.',
      status: 'in_stock',
      statusText: 'موجود در انبار مرکزی درنا درب',
      warranty: '۲۴ ماه گارانتی طلایی تعویض بی‌قیدوشرط درنا درب',
      keySpecs: [
        { label: 'توان نامی', value: '۱۰۰ وات دائم‌کار (Continuous 100W)' },
        { label: 'گشتاور خروجی', value: '۲۷ نیوتن‌سانتی‌متر (Nm 27)' },
        { label: 'کلاس حفاظتی', value: 'IP54 مقاوم در برابر رطوبت و گردوغبار' },
        { label: 'تست استهلاک', value: 'تردد نامحدود (تست‌شده تا ۵ میلیون سیکل)' },
      ],
      detailedSpecs: [
        { label: 'کشور سازنده', value: 'آلمان (Bonndorf, Germany)' },
        { label: 'نوع تکنولوژی', value: 'براشلس بدون زغال (Brushless DC)' },
        { label: 'ولتاژ ورودی', value: '۲۴ الی ۳۰ ولت DC رگوله شده' },
        { label: 'دور موتور', value: '۳۳۵۰ دور در دقیقه با گیربکس کاهنده' },
        { label: 'سیستم موقعیت‌یاب', value: 'انکودر نوری دو کاناله مگنتیک' },
        { label: 'سطح صدا', value: 'کمتر از ۳۵ دسی‌بل (کاملاً سایلنت)' },
      ],
      applications: [
        'درب‌های اتوماتیک اسلایدینگ مراکز تجاری، بیمارستان‌ها و فرودگاه‌ها',
        'ورودی‌های پرتردد برج‌های لوکس اداری و مسکونی',
        'سیستم‌های تلسکوپی و کرو منحنی با لنگه‌های سنگین'
      ],
      features: [
        'راندمان انرژی بالا با حداقل اتلاف حرارتی',
        'شفت فولادی سخت‌کاری شده ضدسایش',
        'سازگاری ۱۰۰٪ با کنترل‌باکس‌های هوشمند ۳۲ بیتی',
        'عدم نیاز به سرویس و تعویض زغال'
      ]
    },
    {
      id: 'dorna-master-pro-150',
      nameFa: 'سیستم اپراتور هوشمند درنا مستر پرو Dorna Master Pro 150',
      nameEn: 'Intelligent Microprocessor Sliding Chassis System',
      category: 'motors_operators',
      categoryLabel: 'موتور و اپراتورها',
      originBadge: 'طراحی مهندسی درنا درب 🇮🇷',
      originCountry: 'ایران / مهندسی درنا',
      originFlag: '🇮🇷',
      highlightBadge: 'شاسی اکسترود سنگین + باتری بک‌آپ',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'شاسی آلومینیومی مقطع سنگین مجهز به مقطع ریل فولادی ضدسایش، پردازنده ۳۲ بیتی با عیب‌یابی خودکار و سیستم معکوس‌کننده هوشمند.',
      fullDesc: 'پکیج کامل اپراتور هوشمند درنا پرو نتیجه ۲۵ سال تجربه در نصب و اجرای پروژه‌های ملی است. این سیستم با بهره‌گیری از پروفیل مقطع سنگین آنودایز شده، هرزگردهای بلبرینگی دوبل و تسمه دندانه‌دار تقویت‌شده با الیاف کولار، حرکت بدون کوچک‌ترین لرزش و ضربه را تضمین می‌کند.',
      status: 'in_stock',
      statusText: 'موجود در انبار درنا درب',
      warranty: '۲۴ ماه گارانتی قطعات + ۱۰ سال خدمات تأمین قطعات',
      keySpecs: [
        { label: 'ظرفیت وزن لنگه‌ها', value: '۲ × ۱۵۰ کیلوگرم (تک‌لنگه ۲۲۰kg)' },
        { label: 'سرعت بازشو', value: 'قابل تنظیم از ۱۰ الی ۱۰۰ cm/s' },
        { label: 'باتری اضطراری', value: 'UPS هوشمند با ۲۰ بار کارکرد در قطع برق' },
        { label: 'سامانه ایمنی', value: 'ترمز هوشمند ضدبرخورد Anti-Crush' },
      ],
      detailedSpecs: [
        { label: 'پردازنده فرمان', value: 'میکروکنترلر ۳۲ بیتی با الگوریتم PID' },
        { label: 'ابعاد شاسی', value: 'ارتفاع ۱۰ سانتی‌متر × عمق ۱۲ سانتی‌متر' },
        { label: 'تسمه انتقال قدرت', value: 'تسمه تقویت‌شده ۸M ضدکشش' },
      ],
      applications: [
        'تمامی ورودی‌های تجاری، اداری و برج‌های مسکونی',
        'مراکز درمانی، داروخانه‌ها و آزمایشگاه‌ها'
      ],
      features: [
        'تنظیم آسان حالت‌های کارکرد (اتوماتیک، یکطرفه، قفل، دائم باز، زمستانه)',
        'صفحه‌کلید دیجیتال تعیین وضعیت با نمایش کدهای عیب‌یابی',
        'ورودی اختصاصی سیستم اعلام حریق جهت بازشدن اضطراری درب'
      ]
    },
    {
      id: 'bea-ixio-dt1-radar',
      nameFa: 'سنسور رادار ماکروویو ترکیبی BEA بلژیک IXIO-DT1 ضدبرخورد',
      nameEn: 'BEA Belgium IXIO-DT1 Combined Microwave & Infrared Sensor',
      category: 'motors_operators',
      categoryLabel: 'موتور و اپراتورها',
      originBadge: 'بلژیک 🇧🇪',
      originCountry: 'بلژیک',
      originFlag: '🇧🇪',
      highlightBadge: 'بالاترین دقت تشخیص و ایمنی تردد',
      image: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'رادار پیشرفته تلفیقی تشخیص حرکت مایکروویو و پرده پرتو مادون قرمز حفاظتی با قابلیت تنظیم دقیق میدان دید و حذف تداخل باد.',
      fullDesc: 'سنسور BEA IXIO-DT1 ساخت بلژیک، استاندارد طلایی ایمنی درب‌های اتوماتیک در سراسر جهان است. این سنسور دوگانه، علاوه بر بازکردن سریع درب با نزدیک‌شدن عابر، پرده‌ای نوری با ۲۴ نقطه لیزری مادون قرمز در مقابل دهانه ایجاد می‌کند تا در صورت توقف فرد یا کالسکه بین لنگه‌ها، از بسته‌شدن درب کاملاً جلوگیری نماید.',
      status: 'in_stock',
      statusText: 'موجود در انبار در رنگ‌های مشکی، نقره‌ای و سفید',
      warranty: '۲۴ ماه گارانتی اصالت و سلامت فیزیکی',
      keySpecs: [
        { label: 'تکنولوژی تشخیص', value: 'رادار مایکروویو ۲۴.۱۲۵ گیگاهرتز + مادون قرمز فعال' },
        { label: 'ارتفاع نصب مجاز', value: 'از ۲ متر تا ۳.۵ متر' },
        { label: 'استاندارد ایمنی', value: 'EN 16005 و DIN 18650 اروپا' },
        { label: 'زمان پاسخ‌دهی', value: 'کمتر از ۵۰ میلی‌ثانیه' },
      ],
      detailedSpecs: [
        { label: 'تنظیمات میدان دید', value: 'قابل برنامه‌ریزی توسط ریموت کنترل اختصاصی BEA یا کلیدهای روی سنسور' },
        { label: 'کلاس مقاومت', value: 'IP54 مقاوم در برابر رطوبت و برودت' },
      ],
      applications: [
        'ورودی‌های اتوماتیک فروشگاه‌ها، بیمارستان‌ها و فرودگاه‌ها',
        'محیط‌هایی با تردد بالای کودکان و سالمندان'
      ],
      features: [
        'حذف خطای بازشدن ناخواسته درب ناشی از لرزش یا باد شدید',
        'حفظ ایمنی ۱۰۰٪ عابرین حین عبور',
        'طراحی ظریف و هماهنگ با نمای فریم آلومینیومی'
      ]
    }
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.nameFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlightBadge.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenInquiry = (productName?: string) => {
    if (productName) {
      setPrefilledProject(`استعلام محصول: ${productName}`);
    } else {
      setPrefilledProject('استعلام محصولات و مشخصات فنی');
    }
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] selection:bg-[#00F090]/30 selection:text-[#06080F] flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-20">
        
        {/* ========================================================
            1. HERO / PAGE HEADER SECTION
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-10 bg-[#06080F] text-white border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F090]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative z-10 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#00F090] border border-[#00F090]/30 text-xs font-extrabold mb-4 shadow-sm backdrop-blur-md">
                <PackageCheck className="w-3.5 h-3.5 text-[#00F090]" />
                <span>مرجع تخصصی محصولات مهندسی و سیستم‌های ساختمانی درنا درب</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                کاتالوگ جامع محصولات و تجهیزات مهندسی
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#CBD8E2] font-medium leading-relaxed mb-6">
                مجموعه کاملی از سیستم‌های درب اتوماتیک شیشه‌ای، کرکره‌های برقی سنگین و پلی‌کربنات، درب‌های میرال فریم‌لس، پارتیشن‌های آکوستیک اداری و قطعات اصلی با موتور دانکر آلمان (Dunkermotoren) به همراه ۲۴ ماه گارانتی طلایی تعویض و ۱۰ سال خدمات پس از فروش.
              </p>

              {/* Trust Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-white font-mono">+۱۰۰٪</span>
                  <span className="text-[11px] text-[#CBD8E2]/70 font-medium">اصالت فیزیکی قطعات</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-[#00F090] font-mono">۲۴ ماه</span>
                  <span className="text-[11px] text-[#CBD8E2]/70 font-medium">گارانتی طلایی تعویض</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-white font-mono">۲۴/۷</span>
                  <span className="text-[11px] text-[#CBD8E2]/70 font-medium">پشتیبانی فنی مهندسی</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">تحویل فوری</span>
                  <span className="text-[11px] text-[#CBD8E2]/70 font-medium">ارسال به سراسر کشور</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            2. FILTERING & SEARCH CONTROLS
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#06080F]/90 backdrop-blur-md border border-white/10 shadow-sm overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = cat.id === 'all' 
                  ? productsData.length 
                  : productsData.filter(p => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as ProductCategory)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'bg-[#00F090] text-[#06080F] font-black shadow-md' 
                        : 'text-[#CBD8E2] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-[#06080F]' : 'text-[#00F090]'}`} />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-[#06080F] text-[#00F090]' : 'bg-white/10 text-white'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-4 h-4 text-[#11172C]/60 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی محصول، کرکره، میرال، دانکر، پارتیشن..."
                className="w-full pl-8 pr-10 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 focus:border-[#00F090] focus:bg-white focus:outline-none text-xs font-bold text-[#06080F] placeholder:text-[#11172C]/50 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#11172C]/60 hover:text-[#06080F] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================
            3. PRODUCTS GRID DISPLAY (LUXURY CARDS)
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-[#06080F] text-[#00F090] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#06080F] mb-1">محصولی با این مشخصات یافت نشد</h3>
              <p className="text-xs text-[#11172C]/70 mb-4">عبارت جستجو یا فیلتر دسته‌بندی را تغییر دهید یا با کارشناسان فنی تماس بگیرید.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00D882] transition-colors cursor-pointer"
              >
                نمایش همه محصولات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 hover:border-[#00F090]/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Product Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950/20 border-b border-white/60">
                    <img
                      src={product.image}
                      alt={product.nameFa}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.92] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                      {/* Origin Badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#06080F]/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm">
                        <span>{product.originFlag}</span>
                        <span>{product.originCountry}</span>
                      </span>

                      {/* Category Tag */}
                      <span className="px-2.5 py-1 rounded-xl bg-[#00F090] text-[#06080F] text-[10px] font-black shadow-sm">
                        {product.categoryLabel}
                      </span>
                    </div>

                    {/* Bottom overlay badge on image */}
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                        {product.highlightBadge}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Product Name */}
                      <div className="mb-2">
                        <span className="text-[10px] font-mono text-[#11172C]/60 block mb-0.5">
                          {product.nameEn}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-[#06080F] group-hover:text-[#06080F] transition-colors leading-snug">
                          {product.nameFa}
                        </h3>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-[#11172C]/80 leading-relaxed mb-4 line-clamp-2">
                        {product.shortDesc}
                      </p>

                      {/* Quick Specs Grid */}
                      <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#CBD8E2]/50 border border-white/60 mb-4 text-[11px]">
                        {product.keySpecs.slice(0, 4).map((spec, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-[#11172C]/60 text-[10px]">{spec.label}</span>
                            <span className="font-bold text-[#06080F] truncate font-sans">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-white/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-white text-[#06080F] text-xs font-bold border border-white/90 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#06080F]" />
                        <span>مشخصات فنی و دیتاشیت</span>
                      </button>

                      <button
                        onClick={() => handleOpenInquiry(product.nameFa)}
                        className="inline-flex items-center justify-center p-2.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] transition-all cursor-pointer"
                        title="استعلام فوری قیمت و موجودی"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================
            4. BOTTOM CTA BANNER: SPECIAL SUPPLY & INQUIRY
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 sm:p-10 bg-[#06080F] text-white border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-center lg:text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#00F090] border border-[#00F090]/30 text-xs font-bold mb-3">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>تأمین مستقیم پروژه‌ای و سفارشی‌سازی ابعاد</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  به محصول خاص یا ابعاد سفارشی برای پروژه خود نیاز دارید؟
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD8E2] font-medium leading-relaxed">
                  تیم مهندسی و انبار مرکزی درنا درب آماده تأمین انواع موتورهای دانکر سفارشی، شیشه‌های ضدگلوله و لمینت‌های خاص، ریل‌های فولادی طویل و سنسورهای ویژه برای پروژه‌های بزرگ ساختمانی در سراسر ایران است.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenInquiry()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs sm:text-sm font-black shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#06080F]" />
                  <span>درخواست استعلام محصول و پیش‌فاکتور</span>
                </button>
                <a
                  href="/calculator"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#00F090]" />
                  <span>محاسبه آنلاین قیمت</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ========================================================
          5. DETAILED TECHNICAL SPECIFICATIONS MODAL
      ======================================================== */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#06080F] text-white rounded-3xl shadow-2xl border border-white/15 overflow-hidden my-6"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 flex items-start justify-between border-b border-white/10 relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00F090]/15 border border-[#00F090]/30 flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-[#00F090]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-[#00F090] text-[#06080F] text-[10px] font-black">
                        {selectedProduct.originBadge}
                      </span>
                      <span className="text-xs text-[#CBD8E2]/70 font-mono">
                        {selectedProduct.nameEn}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-extrabold text-white leading-tight">
                      {selectedProduct.nameFa}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-6">
                
                {/* Image & Main Description */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-white/10 shadow-sm relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.nameFa}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-[#00F090] text-[10px] font-bold text-center border border-white/10">
                      {selectedProduct.highlightBadge}
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <h4 className="text-xs font-bold text-[#CBD8E2]/60 uppercase tracking-wider mb-1">شرح تخصصی و کاربرد مهندسی</h4>
                    <p className="text-xs sm:text-sm text-[#CBD8E2] font-medium leading-relaxed mb-4">
                      {selectedProduct.fullDesc}
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.06] border border-[#00F090]/30 text-white text-xs font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00F090] shrink-0" />
                      <span>{selectedProduct.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Full Specs Table */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#00F090]" />
                    <span>جدول مشخصات فنی و دیتاشیت (Technical Specifications)</span>
                  </h4>
                  <div className="rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full text-xs text-right">
                      <tbody>
                        {selectedProduct.detailedSpecs.map((spec, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-white/[0.07]'}>
                            <td className="p-3 font-semibold text-[#CBD8E2] border-b border-white/5 w-2/5">{spec.label}</td>
                            <td className="p-3 font-bold text-white border-b border-white/5 font-sans">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Features & Applications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm">
                    <h5 className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090]" />
                      <span>مزایای رقابتی و ویژگی‌ها</span>
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="text-[11px] text-[#CBD8E2] flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-[#00F090] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm">
                    <h5 className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>کاربری‌های توصیه شده</span>
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedProduct.applications.map((app, i) => (
                        <li key={i} className="text-[11px] text-[#CBD8E2] flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#CBD8E2] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#00F090]" />
                  <span>وضعیت تحویل: <strong className="text-white">{selectedProduct.statusText}</strong></span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-colors cursor-pointer"
                  >
                    بستن
                  </button>
                  <button
                    onClick={() => {
                      const name = selectedProduct.nameFa;
                      setSelectedProduct(null);
                      handleOpenInquiry(name);
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>استعلام قیمت و موجودی</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Inquiry Modal Component */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialData={{
          title: 'استعلام قیمت و موجودی محصولات درنا درب',
          projectType: 'استعلام محصول و تجهیزات مهندسی',
          details: prefilledProject,
          source: 'catalog',
        }}
      />

      {/* Page Footer */}
      <Footer />
    </div>
  );
};
