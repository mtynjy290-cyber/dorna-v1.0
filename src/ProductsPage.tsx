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
  HelpCircle
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal } from './components/QuickInquiryModal';

export type ProductCategory = 'all' | 'operators' | 'glass' | 'profiles' | 'security';

export interface ProductItem {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'operators' | 'glass' | 'profiles' | 'security';
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
  const [prefilledProject, setPrefilledProject] = useState<string>('استعلام قطعات فنی و اپراتور');

  const categories = [
    { id: 'all', label: 'همه قطعات و متریال', icon: Boxes },
    { id: 'operators', label: 'اپراتورها و موتورها', icon: Cpu },
    { id: 'glass', label: 'شیشه‌های تخصصی', icon: Layers },
    { id: 'profiles', label: 'فریم و پروفیل', icon: Building2 },
    { id: 'security', label: 'سیستم‌های امنیتی و کنترل', icon: Lock },
  ];

  const productsData: ProductItem[] = [
    {
      id: 'dunkermotoren-gr63x55',
      nameFa: 'موتور براشلس دانکر آلمان Dunkermotoren GR63x55',
      nameEn: 'Dunkermotoren Brushless Heavy-Duty Operator Motor',
      category: 'operators',
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
      category: 'operators',
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
        { label: 'مقطع ریل حرکتی', value: 'استیل ضدسایش با قابلیت تعویض آسان' },
        { label: 'نوع تسمه انتقال', value: 'تسمه پلی‌یورتان تقویت‌شده با الیاف Kevlar' },
        { label: 'ابعاد هدر کیسینگ', value: 'ارتفاع ۱۰.۵ سانتی‌متر / عمق ۱۵.۵ سانتی‌متر' },
        { label: 'پورت‌های ارتباطی', value: 'اتصال مستقیم به رادارها، سیستم حریق و BMS' },
      ],
      applications: [
        'لابی برج‌های مسکونی مناطق ۱ تا ۵ تهران',
        'مراکز درمانی، کلینیک‌ها و فضاهای اداری مدرن',
        'فروشگاه‌ها و شوروم‌های لوکس تجاری'
      ],
      features: [
        'دارای کلید تعیین وضعیت دیجیتال چندحالته (قفل، یک‌طرفه، اتوماتیک، باز دائم)',
        'تنظیم خودکار دامنه بازشو در ساعات کم‌تردد جهت ذخیره انرژی',
        'مقاوم در برابر نوسانات ولتاژ برق شهری'
      ]
    },
    {
      id: 'sesamo-dtm-italy',
      nameFa: 'موتور لولایی الکترومکانیک سسامو Sesamo DTM ایتالیا',
      nameEn: 'Sesamo Swing Heavy-Duty Door Automation',
      category: 'operators',
      originBadge: 'ایتالیا 🇮🇹',
      originCountry: 'ایتالیا',
      originFlag: '🇮🇹',
      highlightBadge: 'سیستم Push & Go لولایی',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'سیستم اتوماسیون درب‌های لولایی تک و دولنگه سنگین با مکانیزم بازوی کششی و فشاری، مناسب درب‌های لابی و کلین‌روم‌ها.',
      fullDesc: 'اپراتور لولایی سسامو ساخت ایتالیا گزینه‌ای بی‌نظیر برای برقی‌سازی درب‌های لولایی چوبی، شیشه‌ای و ضدحریق است بدون آنکه نیازی به تغییر چهارچوب باشد. این دستگاه مجهز به مکانیزم Push & Go است؛ یعنی با یک هل دادن ملایم دست، درب به شکل هوشمند به حرکت درمی‌آید.',
      status: 'project_delivery',
      statusText: 'تحویل پروژه‌ای فوری (۲ الی ۴ روزه)',
      warranty: '۲۴ ماه گارانتی درنا درب',
      keySpecs: [
        { label: 'حداکثر وزن لنگه', value: 'تا ۲۵۰ کیلوگرم (عرض لنگه تا ۱۴۰cm)' },
        { label: 'زاویه بازشو', value: '۹۰ الی ۱۱۰ درجه با زمان توقف قابل تنظیم' },
        { label: 'نوع مکانیزم', value: 'الکترومکانیک با بازوی تلسکوپی مفصلی' },
        { label: 'حالت تردد دستی', value: 'حرکت کاملاً نرم و سبک در مواقع اضطراری' },
      ],
      detailedSpecs: [
        { label: 'سازنده', value: 'سسامو ایتالیا (Sesamo S.p.A)' },
        { label: 'موتور داخلی', value: 'براشلس ۲۴ ولت با کنترل گشتاور دینامیک' },
        { label: 'زمان بازشدن', value: 'قابل تنظیم بین ۳ الی ۶ ثانیه' },
        { label: 'سازگاری ایمنی', value: 'انطباق با استاندارد ایمنی EN 16005' },
      ],
      applications: [
        'درب‌های ورودی لابی‌های کلاسیک و مجلل',
        'بیمارستان‌ها، اتاق‌های عمل و فضاهای ایزوله کلین‌روم',
        'درب‌های ضدحریق و کنترل دسترسی اداری'
      ],
      features: [
        'سیستم ضدباد جهت مقاومت در برابر فشار هوای لابی',
        'قابلیت اتصال به سیستم اینترلاک (عدم باز شدن همزمان دو درب)',
        'پوشش آلومینیومی آنودایز شده باریک و زیبا'
      ]
    },
    {
      id: 'superclear-10mm-tempered',
      nameFa: 'شیشه ۱۰ میل سکوریت سوپرکلیر وین‌لایت (Super Clear 10mm)',
      nameEn: 'Ultra-Clear Low-Iron Tempered Glass',
      category: 'glass',
      originBadge: 'بلژیک / فرآوری درنا 🇧🇪',
      originCountry: 'بلژیک / فرآوری اختصاصی',
      originFlag: '🇧🇪',
      highlightBadge: 'شفافیت نوری ۹۲٪ بدون ته‌رنگ سبز',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'شیشه سکوریت فوق‌شفاف Low-Iron با حداکثر خلوص سیلیس، تراش لبه دیاموند CNC و مقاومت ضربه‌ای ۵ برابر شیشه فلوت معمولی.',
      fullDesc: 'شیشه سوپرکلیر وین‌لایت با استفاده از مرغوب‌ترین جام‌های فاقد اکسید آهن تولید شده و در کوره‌های حرارتی افقی استاندارد سکوریت می‌شود. لبه‌های این شیشه‌ها با دستگاه‌های تمام‌اتوماتیک CNC به صورت دیاموند براق پخ می‌خورد تا علاوه بر زیبایی خارق‌العاده، ایمنی کامل در برابر تنش‌های محیطی فراهم شود.',
      status: 'in_stock',
      statusText: 'موجود در انبار درنا درب در ابعاد استاندارد و سفارشی',
      warranty: 'ضمانت مادام‌العمر عدم ایجاد موج، لک و تغییر رنگ',
      keySpecs: [
        { label: 'ضخامت اسمی', value: '۱۰ میلی‌متر (±۰.۲mm)' },
        { label: 'میزان شفافیت', value: 'انتقال نور بالای ۹۲٪ (Super Clear)' },
        { label: 'نوع فرآیند', value: 'سکوریت کوره افقی در دمای ۷۰۰ درجه سانتی‌گراد' },
        { label: 'تراش لبه‌ها', value: 'دیاموند براق CNC با زاویه ۴۵ درجه' },
      ],
      detailedSpecs: [
        { label: 'استاندارد ایمنی', value: 'BS 6206 و ANSI Z97.1 ایمن در خردشوندگی' },
        { label: 'مقاومت مکانیکی', value: 'تحمل بار فشاری تا ۲۰۰ مگاپاسکال' },
        { label: 'مقاومت حرارتی', value: 'مقاومت در برابر شوک دمایی تا ۲۵۰ درجه سانتی‌گراد' },
        { label: 'نوع برش', value: 'برش با میز برش تمام‌اتوماتیک لیزری' },
      ],
      applications: [
        'لنگه‌های متحرک و ثابت درب‌های اتوماتیک اسلایدینگ و تلسکوپی',
        'پارتیشن‌های شیشه‌ای فریم‌لس اداری و اتاق کنفرانس',
        'جان‌پناه‌ها و هندریل‌های شیشه‌ای لوکس'
      ],
      features: [
        'خلوص استثنایی بدون ته رنگ سبز سنتی شیشه‌های فلوت',
        'قابلیت سندبلاست، مات‌کاری طرح‌دار و چاپ لوگوی سازمان',
        'الگوی شکست دانه‌ای ریز غیربرنده در صورت حوادث نادر'
      ]
    },
    {
      id: 'pdlc-smart-privacy-glass',
      nameFa: 'شیشه هوشمند مات‌شونده لمینت PDLC (Smart Privacy Glass)',
      nameEn: 'Liquid Crystal PDLC Smart Switchable Glass',
      category: 'glass',
      originBadge: 'کره جنوبی 🇰🇷',
      originCountry: 'کره جنوبی / لمینت درنا',
      originFlag: '🇰🇷',
      highlightBadge: 'تغییر وضعیت مات/شفاف در ۲۰ میلی‌ثانیه',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'حریم خصوصی آنی تنها با فشردن یک دکمه. تغییر حالت از شفاف به مات کامل در کسری از ثانیه با قابلیت اتصال به خانه هوشمند BMS.',
      fullDesc: 'شیشه هوشمند مات‌شونده با فناوری کریستال مایع PDLC و لایه‌های لمینت EVA ضدحرارت تولید می‌شود. این شیشه‌ها در حالت خاموش مات کدر بوده و مانع از دید افراد می‌شود، اما با اعمال ولتاژ ملایم، کریستال‌ها به خط شده و شفافیت کامل فراهم می‌گردد.',
      status: 'project_delivery',
      statusText: 'تولید سفارشی پروژه (تحویل ۴۸ ساعته)',
      warranty: '۳۶ ماه گارانتی برد، اینورتر نانو و فیلم PDLC',
      keySpecs: [
        { label: 'ساختار لمینت', value: '۶+۶ میل سکوریت لمینت با فیلم مایع PDLC' },
        { label: 'سرعت سوئیچینگ', value: 'کمتر از ۲۰ میلی‌ثانیه' },
        { label: 'مصرف انرژی', value: '۳ الی ۵ وات بر متر مربع در حالت روشن' },
        { label: 'روش‌های کنترل', value: 'ریموت، کلید لمسی، حسگر حضور و اپلیکیشن موبایل' },
      ],
      detailedSpecs: [
        { label: 'کشور سازنده فیلم', value: 'کره جنوبی (Korean Nano PDLC Core)' },
        { label: 'ولتاژ کاری اینورتر', value: '۴۸ الی ۶۰ ولت AC ایمن' },
        { label: 'طول عمر سوئیچ', value: 'بیش از ۸۰ میلیون بار تغییر وضعیت' },
        { label: 'عایق صوتی', value: 'افت صوت تا ۳۸ دسی‌بل در حالت لمینت' },
        { label: 'مسدودسازی UV', value: 'جلوگیری از ۹۹٪ پرتوهای مضر فرابنفش' },
      ],
      applications: [
        'اتاق‌های کنفرانس VIP و دفاتر مدیریت ارشد',
        'مستر روم‌ها و حمام‌های لوکس در ویلاها و پنت‌هاوس‌ها',
        'بیمارستان‌ها، اتاق‌های معاینه و فضاهای درمانی'
      ],
      features: [
        'حذف کامل نیاز به پرده‌های کرکره‌ای پردردسر و غبارگیر',
        'امکان استفاده به عنوان صفحه نمایش پروژکتور با رزولوشن بالا در حالت مات',
        'امکان بخش‌بندی چندناحیه‌ای (مات شدن بخشی از شیشه به صورت نواری)'
      ]
    },
    {
      id: 'acoustic-double-glazed-glass',
      nameFa: 'شیشه لمینت دوجداره آکوستیک Low-E ضدصدا',
      nameEn: 'Acoustic Double-Glazed Soundproof Glass',
      category: 'glass',
      originBadge: 'تولید اختصاصی درنا درب 🇮🇷',
      originCountry: 'ایران / خط تولید درنا درب',
      originFlag: '🇮🇷',
      highlightBadge: 'افت صوتی تا ۴۲dB + عایق حرارتی Low-E',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'راهکار قطعی حذف آلودگی صوتی شهری و افت دما با لایه آکوستیک PVB، تزریق گاز آرگون ۹۵٪ و پوشش متالیک محافظ انرژی.',
      fullDesc: 'این ترکیب شیشه‌ای با ساختار تخصصی چندلایه مانع از ورود امواج صوتی فرکانس پایین ترافیک و سر و صدای خیابان می‌شود. گاز آرگون تزریق شده در فاصله میانی به همراه لایه پوشش نقره Low-E اتلاف حرارتی زمستان و گرمای تابستان را تا ۶۰٪ کاهش می‌دهد.',
      status: 'in_stock',
      statusText: 'موجود و قابل تولید در ابعاد مهندسی دلخواه',
      warranty: '۱۰ سال ضمانت عدم نفوذ رطوبت، بخارزدگی و افت گاز آرگون',
      keySpecs: [
        { label: 'ترکیب لایه‌ها', value: '۶ میل سکوریت + اسپیسر ۱۲ میل + ۶ میل لمینت آکوستیک' },
        { label: 'کاهش آلودگی صوتی', value: 'تا ۴۲ دسی‌بل (افت صدا تا ۸۰٪)' },
        { label: 'ضریب انتقال حرارت', value: 'Ug = 1.3 W/m²K (ذخیره انرژی بالا)' },
        { label: 'گاز میانی', value: 'تزریق گاز آرگون با خلوص استاندارد ۹۵٪' },
      ],
      detailedSpecs: [
        { label: 'نوع اسپیسر', value: 'آلومینیوم آنودایز مشکی با رطوبت‌گیر سیلیکاژل' },
        { label: 'درزبندی لبه', value: 'چسب بوتیل اولیه + پلی‌سولفاید ثانویه رباتیک' },
        { label: 'پوشش تابشی', value: 'لایه میکرونی Low-E نقره بازتابنده اشعه فروسرخ' },
      ],
      applications: [
        'ورودی‌های مشرف به اتوبان‌ها و خیابان‌های شلوغ تهران',
        'استودیوهای صدا، اتاق‌های جلسات محرمانه و کلینیک‌ها',
        'نماهای شیشه‌ای و کرتین‌وال‌های دوجداره'
      ],
      features: [
        'ایجاد محیطی کاملاً آرام و بدون تنش صوتی در داخل ساختمان',
        'جلوگیری از تشکیل قطرات آب و تعریق روی شیشه در فصول سرد',
        'افزایش بهره‌وری سیستم‌های سرمایشی و گرمایشی'
      ]
    },
    {
      id: 'anodized-profile-6063',
      nameFa: 'پروفیل آلومینیومی فریم مقطع سنگین ۶۰۶۳ آنودایز',
      nameEn: 'Extruded Anodized Architectural Aluminum Profiles',
      category: 'profiles',
      originBadge: 'آلیاژ هوانوردی ۶۰۶۳-T6',
      originCountry: 'ایران / اکستروژن سفارشی',
      originFlag: '🇮🇷',
      highlightBadge: 'سختی وبستر ۱۴+ | آنودایز ۲۰ میکرون',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'پروفیل آلومینیوم دوبال مقطع سنگین با پوشش آنودایز سخت مات و براق در رنگ‌های مشکی، شامپاینی، دودی و سیلور متالیک.',
      fullDesc: 'پروفیل‌های اختصاصی درنا درب از شمش‌های آلومینیوم فابریک ۶۰۶۳ اکسترود شده و پس از فرآیند سخت‌کاری حرارتی T6 به سختی وبستر ۱۴ می‌رسند. لایه آنودایز الکترولیتی به ضخامت ۱۵ تا ۲۰ میکرون مقاومت بی‌نظیری در برابر سایش، خط و خش و تابش اشعه آفتاب ایجاد می‌کند.',
      status: 'in_stock',
      statusText: 'موجود در انبار درنا درب در کلیه رنگ‌بندی‌ها',
      warranty: '۱۵ سال گارانتی ثبات رنگ و عدم خوردگی و شوره',
      keySpecs: [
        { label: 'گرید آلیاژ', value: 'آلومینیوم اکسترود ۶۰۶۳ با سختی وبستر ۱۴+' },
        { label: 'ضخامت آنودایز', value: '۱۵ الی ۲۰ میکرون استاندارد Qualanod اروپا' },
        { label: 'رنگ‌بندی', value: 'مشکی مات مخملی، شامپاینی لوکس، دودی، سیلور' },
        { label: 'درزبندی', value: 'شیار استاندارد لاستیک EPDM و مویی سیلیکونی' },
      ],
      detailedSpecs: [
        { label: 'طول شاخه‌ها', value: '۶ متر با قابلیت برش فارسی‌بر زاویه ۴۵ درجه' },
        { label: 'ضخامت گوشت پروفیل', value: '۲.۲ الی ۲.۸ میلی‌متر مقطع فوق سنگین' },
        { label: 'مقاومت به خمش', value: 'تحمل وزن شیشه‌های ۱۰ و ۱۲ میل بدون دفرمه شدن' },
      ],
      applications: [
        'کلاف دور شیشه درب‌های اتوماتیک اسلایدینگ و تلسکوپی',
        'چهارچوب و فریمینگ پارتیشن‌های مدولار شیشه‌ای',
        'کاور و شاسی‌کشی هدرهای اتوماتیک'
      ],
      features: [
        'طراحی لبه‌های ارگونومیک و بدون درز با اتصال کرنر مستحکم',
        'درزبندی کامل در برابر نفوذ گرد و غبار و اتلاف حرارت با لاستیک‌های EPDM',
        'امکان رنگ‌پذیری با پوشش الکترواستاتیک پودری در کدهای رنگ RAL سفارشی'
      ]
    },
    {
      id: 'stainless-steel-pvd-cladding',
      nameFa: 'کاور استیل نگیر طلایی و دودی ۳۰۴ ضدخش PVD (Titanium Gold)',
      nameEn: 'Stainless Steel 304 Titanium PVD Cladding',
      category: 'profiles',
      originBadge: 'استیل ۳۰۴ نگیر تایوان / PVD',
      originCountry: 'تایوان / پوشش تیتانیوم سوئیس',
      originFlag: '🇹🇼',
      highlightBadge: 'پوشش تیتانیوم PVD آینه‌ای و براش',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'ورق‌های استنلس استیل ۳۰4 ضدزنگ با پوشش بخار فیزیکی تیتانیوم PVD در رنگ‌های طلایی آینه‌ای، رزگلد و دودی براش بدون تغییر رنگ.',
      fullDesc: 'کاورهای استیل PVD درنا درب با بهره‌گیری از ورق‌های استیل ۳۰۴ نگیر با ضخامت ۱.۵ میلی‌متر تولید می‌شوند. این کاورها با تکنولوژی PVD در محیط خلأ با تیتانیوم پوشش داده شده‌اند که مقاومت فوق‌العاده‌ای در برابر خط و خش، مواد شوینده و رطوبت ایجاد کرده و نمایی خیره‌کننده به ورودی‌های لوکس می‌بخشند.',
      status: 'in_stock',
      statusText: 'موجود در انبار درنا درب',
      warranty: 'گارانتی مادام‌العمر عدم زنگ‌زدگی، تغییر رنگ و پوسته‌شدن',
      keySpecs: [
        { label: 'گرید استیل', value: 'استنلس استیل ۳۰۴ نگیر (Non-Magnetic 304)' },
        { label: 'تکنولوژی پوشش', value: 'پوشش بخار فیزیکی تیتانیوم (PVD Titanium Coating)' },
        { label: 'ضخامت ورق', value: '۱.۲ الی ۱.۵ میلی‌متر با خمش CNC دقیق' },
        { label: 'فینیش سطحی', value: 'میرور سوپر براق آینه‌ای و براش خش‌دار مات' },
      ],
      detailedSpecs: [
        { label: 'کشور تولیدکننده ورق', value: 'تایوان (Yusco Taiwan Standard)' },
        { label: 'رنگ‌های موجود', value: 'طلایی متالیک، دودی تیتانیوم، رزگلد، مشکی پیانو' },
        { label: 'مقاومت خوردگی', value: 'گذرانده تست پاشش نمک اسیدی (Salt Spray > 1000h)' },
      ],
      applications: [
        'پوشش هدر و شاسی درب‌های اتوماتیک در لابی‌های مجلل',
        'ستون‌ها و چهارچوب‌های ورودی برج‌های فاخر مسکونی',
        'دستگیره‌های سفارشی استیل با ارتفاع کامل'
      ],
      features: [
        'درخشش آینه‌ای عمیق با برش لیزری بدون هیچ‌گونه پلیسه یا سوختگی لبه',
        'تمیزشوندگی آسان و مقاومت در برابر اثر انگشت در فینیش‌های براش',
        'ایجاد هارمونی کامل با متریال‌های سنگ مرمر و چوب طبیعی در معماری لابی'
      ]
    },
    {
      id: 'bea-zensafe-radar-sensor',
      nameFa: 'رادار پرده نوری ترکیبی بئا سوئیس BEA ZenSafe',
      nameEn: 'BEA Combined Motion & Active Infrared Safety Radar',
      category: 'security',
      originBadge: 'بلژیک / سوئیس 🇨🇭',
      originCountry: 'سوئیس / بلژیک',
      originFlag: '🇨🇭',
      highlightBadge: 'استاندارد ایمنی اروپایی EN 16005',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'ترکیب رادار مایکروویو حرکتی و پرده مادون قرمز اکتیو سه‌بعدی بدون نقطه کور جهت حفاظت کامل از عابران، کودکان و ویلچر.',
      fullDesc: 'سنسور پیشرفته بئا ZenSafe از پرچم‌داران سامانه‌های ایمنی درب‌های اتوماتیک در جهان است. این سنسور با ایجاد یک پرده متراکم نوری در دهانه عبور، حتی اشخاصی که کاملاً ساکن در میان درب ایستاده‌اند را شناسایی کرده و بلافاصله از بسته شدن لنگه‌ها جلوگیری می‌نماید.',
      status: 'in_stock',
      statusText: 'موجود در انبار درنا درب',
      warranty: '۲۴ ماه گارانتی تعویض کامل سنسور',
      keySpecs: [
        { label: 'تکنولوژی سنسور', value: 'مایکروویو فلت (حرکت) + پرده نوری مادون قرمز (ایمنی)' },
        { label: 'میدان پوشش', value: 'عرض سه‌بعدی تا ۴ متر و عمق تا ۳ متر' },
        { label: 'استاندارد ایمنی', value: 'مطابق با استاندارد اروپایی EN 16005 و DIN 18650' },
        { label: 'ارتفاع نصب', value: '۲ الی ۳.۵ متر با زاویه تنظیم‌پذیر الکترونیکی' },
      ],
      detailedSpecs: [
        { label: 'کمپانی سازنده', value: 'BEA Sensors Europe (Belgium/Switzerland)' },
        { label: 'ولتاژ ورودی', value: '۱۲ الی ۲۴ ولت AC/DC' },
        { label: 'زمان واکنش سنسور', value: 'کمتر از ۵۰ میلی‌ثانیه' },
        { label: 'کلاس حفاظتی', value: 'IP54 مقاوم در برابر باران و نور شدید خورشید' },
      ],
      applications: [
        'ورودی پرتردد مراکز خرید، مال‌ها و مجتمع‌های تجاری',
        'بیمارستان‌ها، مراکز درمانی و خانه‌های سالمندان',
        'ورودی برج‌های مسکونی لوکس با حساسیت بالای تردد کودکان'
      ],
      features: [
        'قابلیت تنظیم ابعاد میدان دید با ریموت کنترل اختصاصی بدون نیاز به باز کردن کاور',
        'فناوری ضدنور خورشید (عدم تحریک با بازتاب نور و چراغ‌های خودرو)',
        'سیستم خودتست دائمی و اعلام عیب به مدار فرمان'
      ]
    },
    {
      id: 'dorna-touchpass-biometric',
      nameFa: 'سیستم کنترل تردد بیومتریک و کدینگ اکسس Dorna TouchPass',
      nameEn: 'Biometric Facial & Fingerprint Access Controller',
      category: 'security',
      originBadge: 'آلمان / تایوان 🇩🇪',
      originCountry: 'آلمان / تایوان',
      originFlag: '🇩🇪',
      highlightBadge: 'تشخیص چهره 3D هوش مصنوعی + کارت RFID',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'دستگاه کنترل دسترسی ضدآب و ضدخرابی با تشخیص چهره سریع، اسکنر اثر انگشت خازنی، کارت‌خوان RFID و اتصال مستقیم به رله درب.',
      fullDesc: 'سیستم کنترل دسترسی بیومتریک تاچ‌پاس درنا درب با بدنه تمام‌فلزی زاماک و محافظت نفوذ آب IP65 طراحی شده است. این دستگاه به طور مستقیم به مدار فرمان اپراتورهای اتوماتیک متصل شده و قابلیت ثبت تردد، صدور دسترسی موقت برای مهمان و سناریونویسی با سیستم اعلام حریق را فراهم می‌سازد.',
      status: 'in_stock',
      statusText: 'موجود در انبار درنا درب',
      warranty: '۲۴ ماه گارانتی تعویض برد و ماژول اسکنر',
      keySpecs: [
        { label: 'روش‌های احراز هویت', value: 'تشخیص چهره هوش مصنوعی، اثر انگشت، کارت RFID و رمز عبور' },
        { label: 'ظرفیت حافظه', value: '۳۰۰۰ چهره + ۵۰۰۰ اثر انگشت + ۱۰۰,۰۰۰ لاگ تردد' },
        { label: 'کلاس بدنه', value: 'ضدضربه Vandal-Proof با استاندارد IP65 فلزی' },
        { label: 'پروتکل ارتباطی', value: 'پورت شبکه TCP/IP، خروجی رله درب، پورت Wiegand و Wi-Fi' },
      ],
      detailedSpecs: [
        { label: 'سرعت شناسایی', value: 'کمتر از ۰.۳ ثانیه با دقت ۹۹.۹٪' },
        { label: 'صفحه نمایش', value: 'نمایشگر ۲.۸ اینچی لمسی خازنی رنگی' },
        { label: 'ولتاژ کاری', value: '۱۲ ولت DC با محافظت اتصال کوتاه' },
      ],
      applications: [
        'درب‌های ورودی لابی برج‌های مسکونی اختصاصی و پنت‌هاوس‌ها',
        'اتاق‌های سرور، خزانه‌ها و اتاق‌های اسناد محرمانه',
        'پارتیشن‌های شیشه‌ای دفاتر مدیریت ارشد و بانک‌ها'
      ],
      features: [
        'تشخیص زنده بودن چهره جهت جلوگیری از تقلب با عکس یا ویدیو',
        'کلید لمسی زنگ در و ارتباط صوتی دوطرفه با واحد نگهبانی',
        'امکان گزارش‌گیری اکسل از طریق فلش مموری یا نرم‌افزار تحت وب'
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
        item.originCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlightBadge.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenInquiry = (productName?: string) => {
    if (productName) {
      setPrefilledProject(`استعلام قطعه: ${productName}`);
    } else {
      setPrefilledProject('استعلام قطعات فنی و اپراتور');
    }
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E2E4E8] text-slate-900 selection:bg-blue-600/30 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-20">
        
        {/* ========================================================
            1. HERO / PAGE HEADER SECTION
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="frosted-glass-card rounded-3xl p-6 sm:p-10 border border-white/90 shadow-sm relative overflow-hidden"
          >
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative z-10 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold mb-4 shadow-2xs">
                <PackageCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>انبار مرکزی قطعات اصلی درنا درب</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-3">
                کاتالوگ قطعات و سیستم‌های تخصصی
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6">
                تأمین و توزیع مستقیم موتورهای براشلس دانکر آلمان (Dunkermotoren)، شیشه‌های سوپرکلیر ۱۰ میل سکوریت، فریم‌های اکسترود مقطع سنگین آنودایز و رادارهای هوشمند با ضمانت اصالت فیزیکی و گارانتی تعویض ۲۴ ماهه در سراسر کشور.
              </p>

              {/* Trust Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/60">
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">+۱۰۰٪</span>
                  <span className="text-[11px] text-slate-500 font-medium">اصالت فیزیکی قطعات</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-blue-600 font-mono">۲۴ ماه</span>
                  <span className="text-[11px] text-slate-500 font-medium">گارانتی طلایی تعویض</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">۲۴/۷</span>
                  <span className="text-[11px] text-slate-500 font-medium">پشتیبانی فنی مهندسی</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-emerald-600 font-mono">تحویل فوری</span>
                  <span className="text-[11px] text-slate-500 font-medium">ارسال به تمام تهران</span>
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
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs overflow-x-auto no-scrollbar">
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
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-white/80'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-slate-800 text-blue-300' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی قطعه، برند، ضخامت، کشور سازنده..."
                className="w-full pl-8 pr-10 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 focus:border-blue-500 focus:bg-white focus:outline-none text-xs font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================
            3. PRODUCTS GRID DISPLAY (GLASS CARDS)
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {filteredProducts.length === 0 ? (
            <div className="frosted-glass-card rounded-3xl p-12 text-center border border-white/80 shadow-sm max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">قطعه‌ای با این مشخصات یافت نشد</h3>
              <p className="text-xs text-slate-500 mb-4">عبارت جستجو یا فیلتر دسته‌بندی را تغییر دهید یا با کارشناسان فنی تماس بگیرید.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer"
              >
                نمایش همه قطعات
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
                  className="group frosted-glass-card rounded-3xl border border-white/90 hover:border-blue-400/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                      {/* Origin Badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm">
                        <span>{product.originFlag}</span>
                        <span>{product.originCountry}</span>
                      </span>

                      {/* Stock Status Badge */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md shadow-sm ${
                        product.status === 'in_stock' 
                          ? 'bg-emerald-500/90 text-white border border-emerald-300/30' 
                          : 'bg-amber-500/90 text-white border border-amber-300/30'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>{product.status === 'in_stock' ? 'موجود در انبار' : 'سفارشی'}</span>
                      </span>
                    </div>

                    {/* Bottom Floating Highlight Badge */}
                    <div className="absolute bottom-3 right-3 left-3 pointer-events-none">
                      <span className="text-[10px] font-extrabold text-blue-200 bg-blue-950/80 backdrop-blur-md border border-blue-400/30 px-2.5 py-0.5 rounded-lg inline-block">
                        {product.highlightBadge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* English Subtitle / Code */}
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        {product.nameEn}
                      </span>

                      {/* Main Persian Title */}
                      <h3 className="text-base font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                        {product.nameFa}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2 mb-4">
                        {product.shortDesc}
                      </p>

                      {/* Key Specs Table / Pill List */}
                      <div className="bg-slate-100/80 rounded-2xl p-3 border border-slate-200/60 mb-5 space-y-1.5">
                        {product.keySpecs.slice(0, 3).map((spec, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-500 font-medium">{spec.label}:</span>
                            <span className="text-slate-900 font-bold text-left font-sans">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t border-slate-200/70 flex items-center gap-2.5">
                      {/* Specs Modal Trigger */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-blue-300" />
                        <span>مشخصات فنی و دیتاشیت</span>
                      </button>

                      {/* Quick Inquiry Trigger */}
                      <button
                        onClick={() => handleOpenInquiry(product.nameFa)}
                        title="استعلام قیمت و موجودی"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/70 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================
            4. BOTTOM CTA BANNER: SPECIALIZED CONSULTATION
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="frosted-glass-card rounded-3xl p-6 sm:p-10 border border-white/90 shadow-md relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white"
          >
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-center lg:text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-3 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>تأمین متریال سفارشی و پروژه‌ای</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                  قطعه خاصی مد نظر شماست یا به ابعاد مهندسی سفارشی نیاز دارید؟
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  تیم مهندسی و انبار مرکزی درنا درب آماده تأمین انواع موتورهای دانکر سفارشی، شیشه‌های ضدگلوله و لمینت‌های خاص، ریل‌های فولادی طویل و سنسورهای ویژه برای پروژه‌های بزرگ ساختمانی در سراسر ایران است.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenInquiry()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-950/50 border border-blue-400/40 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>درخواست استعلام قطعه و پیش‌فاکتور</span>
                </button>
                <a
                  href="tel:02166000000"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-300" />
                  <span>مشاوره با مهندس ناظر</span>
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
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-slate-50/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/90 overflow-hidden my-6"
            >
              {/* Modal Header */}
              <div className="bg-slate-950 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800 relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">
                        {selectedProduct.originBadge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
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
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-6">
                
                {/* Image & Main Description */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-sm relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.nameFa}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 left-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold text-center">
                      {selectedProduct.highlightBadge}
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">شرح تخصصی و کاربرد مهندسی</h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-4">
                      {selectedProduct.fullDesc}
                    </p>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-800 text-xs font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{selectedProduct.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Full Specs Table */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                    <span>جدول مشخصات فنی و دیتاشیت (Technical Specifications)</span>
                  </h4>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-xs text-right">
                      <tbody>
                        {selectedProduct.detailedSpecs.map((spec, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}>
                            <td className="p-3 font-semibold text-slate-600 border-b border-slate-100 w-2/5">{spec.label}</td>
                            <td className="p-3 font-bold text-slate-950 border-b border-slate-100 font-sans">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Features & Applications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <h5 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>مزایای رقابتی و ویژگی‌ها</span>
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <h5 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>کاربری‌های توصیه شده</span>
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedProduct.applications.map((app, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="bg-slate-100 p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>وضعیت تحویل: <strong className="text-slate-900">{selectedProduct.statusText}</strong></span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-colors cursor-pointer"
                  >
                    بستن
                  </button>
                  <button
                    onClick={() => {
                      const name = selectedProduct.nameFa;
                      setSelectedProduct(null);
                      handleOpenInquiry(name);
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-md shadow-blue-900/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>استعلام قیمت و موجودی این قطعه</span>
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
          title: 'استعلام قیمت و موجودی قطعات تخصصی',
          projectType: 'استعلام قطعه و تجهیزات مهندسی',
          details: prefilledProject,
          source: 'catalog',
        }}
      />

      {/* Page Footer */}
      <Footer />
    </div>
  );
};
