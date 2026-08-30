import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Wrench, 
  ShieldCheck, 
  Award, 
  Phone, 
  MessageCircle, 
  Calculator, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Upload, 
  Building2, 
  Cpu, 
  Maximize2, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X,
  ExternalLink,
  ChevronLeft,
  Settings,
  Zap,
  Sliders,
  Shield,
  HelpCircle,
  FileCheck,
  Building,
  GraduationCap,
  Landmark,
  Activity,
  Lock,
  Compass,
  CheckCircle
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal, InquiryModalData } from './components/QuickInquiryModal';

interface InstallationService {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  badge: string;
  description: string;
  motorSpecs: string;
  profileSpecs: string;
  glassSpecs: string;
  keyFeatures: string[];
  applications: string[];
  image: string;
}

export const ServicesPage: React.FC = () => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState<InquiryModalData | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<InstallationService | null>(null);
  
  // Repair request helper interactive state
  const [repairCategory, setRepairCategory] = useState<'automatic' | 'manual_miral'>('automatic');
  const [issueDescription, setIssueDescription] = useState('');
  const [clientDistrict, setClientDistrict] = useState('منطقه ۱ تا ۵ (شمال و غرب تهران)');
  const [clientPhone, setClientPhone] = useState('');
  const [repairSubmitted, setRepairSubmitted] = useState(false);

  // 1. Installation Services Data (5 Pillars)
  const installationServices: InstallationService[] = [
    {
      id: 'automatic_sliding_telescopic',
      title: 'درب‌های اتوماتیک اسلایدینگ و تلسکوپی',
      titleEn: 'Automatic Sliding & Telescopic Systems',
      subtitle: 'مجهز به اپراتور دانکر آلمان (Dunkermotoren) و کنترل‌باکس‌های هوشمند درنا',
      badge: 'پرفروش‌ترین سیستم ورودی',
      description: 'طراحی، شاسی‌کشی صنعتی و اجرای انواع درب‌های کشویی خطی و تلسکوپی ۲ و ۴ لنگه با تردد نامحدود، حرکت کاملاً بی‌صدا و حداکثر بهینه‌سازی عرض بازشو در ورودی‌های لوکس مسکونی، تجاری و بیمارستانی.',
      motorSpecs: 'موتور براشلس Dunkermotoren آلمان با سیستم انکودر نوری و کنترل‌باکس میکروپروسسوری ۳۲ بیتی با سامانه ضدبرخورد هوشمند.',
      profileSpecs: 'فریم‌های آلومینیوم مقطع سنگین ۶۰۶۳ فابریک با پوشش آنودایز مات، براق و استیل طلایی و شامپاینی مقاوم در برابر سایش.',
      glassSpecs: 'شیشه سکوریت ۱۰ و ۱۲ میل سوپرکلیر وین‌لایت و شیشه‌های لمینت دوجداره ضدضربه.',
      keyFeatures: [
        'سیستم تردد نامحدود بدون داغ کردن موتور در ساعات اوج رفت‌وآمد',
        'مجهز به باتری بک‌آپ اضطراری جهت بیش از ۳۰۰ بار باز و بسته شدن هنگام قطعی برق',
        'سنسورهای پرده نوری ترکیبی ماکروویو و مادون‌قرمز BEA بلژیک',
        'قابلیت افزایش عرض بازشوی مفید تا ۳۵٪ در مدل‌های تلسکوپی همگام',
        'دارای سیستم قفل الکترومکانیکی ضدسرقت و اتصال به سیستم اعلان حریق',
      ],
      applications: ['لابی برج‌های مسکونی لوکس', 'مجتمع‌های اداری و تجاری', 'بیمارستان‌ها و کلینیک‌های درمانی', 'هتل‌ها و تالارهای بین‌المللی'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 'glass_partitions',
      title: 'پارتیشن‌های شیشه‌ای فریم‌لس و دوجداره',
      titleEn: 'Frameless & Double-Glazed Partitions',
      subtitle: 'تفکیک مدرن و آکوستیک فضاهای سازمانی، دفاتر اداری و شوروم‌های تجاری',
      badge: 'عایق صوتی تا ۴۲dB',
      description: 'ایجاد فضاهای کاری شفاف، لوکس و آرام با سیستم‌های پارتیشن شیشه‌ای تک‌جداره فریم‌لس با کمترین دید پروفیل و دوجداره آکوستیک با عایق‌بندی صوتی حرفه‌ای و امکان تعبیه پرده‌های کرکره ولومی داخلی.',
      motorSpecs: 'سیستم‌های لولایی توکار هیدرولیک و کشویی روان با هنگرهای استیل توکار بیصدا.',
      profileSpecs: 'پروفیل‌های آلومینیومی اسلیم اختصاصی با رنگ‌های پودری الکترواستاتیک مشکی مات، نوک‌مدادی و آنودایز سیلور.',
      glassSpecs: 'شیشه ۱۰ و ۱۲ میل سکوریت درجه یک، شیشه لمینت آکوستیک PVB و شیشه‌های هوشمند مات‌شونده (PDLC Smart Glass).',
      keyFeatures: [
        'افت صوتی استاندارد تا ۴۲ دسی‌بل جهت حفظ محرمانگی جلسات سازمانی',
        'امکان اجرای درب‌های لولایی تمام شیشه یا درب‌های فریم‌دار هم‌باد',
        'امکان مات‌کاری خطی، لوگوی سازمانی و سندبلاست طرح‌دار اختصاصی',
        'تعبیه پرده کرکره ولومی ۱۶ میلی‌متری مگنتی بدون نیاز به نظافت',
        'نصب سریع و بدون تخریب سازه اصلی با اتصالات دقیق مهندسی',
      ],
      applications: ['اتاق‌های جلسات و مدیریت سازمان‌ها', 'دفاتر معماری و استارتاپ‌های نوین', 'مراکز درمانی و آزمایشگاهی', 'شوروم‌ها و فضاهای نمایشگاهی'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 'manual_miral_doors',
      title: 'درب‌های شیشه‌ای میرال (استوپی، کشویی و پینی)',
      titleEn: 'Architectural Mirral Glass Systems',
      subtitle: 'یراق‌آلات استیل ۳۰۴ ضدزنگ، استوپ‌های هیدرولیک توکار و شیشه سوپرکلیر',
      badge: 'دوام مادام‌العمر یراق‌آلات',
      description: 'تأمین و اجرای انواع درب‌های شیشه‌ای سکوریت نشکن به صورت استوپ کف با پمپ‌های روغنی تنظیم دو سرعته، لولاهای پینی پاشنه‌ای و سیستم‌های کشویی ریلی دستی لوکس با هنگرهای اسپایدری استیل.',
      motorSpecs: 'پمپ‌های هیدرولیک روغنی استیل ضدزنگ با سوپاپ تنظیم سرعت اول (بسته شدن) و سرعت دوم (قفل نهایی).',
      profileSpecs: 'جاسازهای دقیق یراق‌آلات ۱۰۱، ۱۰۲، ۱۰۳ و قفل‌های ۱۰۵۲ فرانسوی به همراه فریم‌های استیل و آلومینیوم آنودایز.',
      glassSpecs: 'شیشه‌های ۱۰ و ۱۲ میل سکوریت صادراتی با دیاموند براق لبه‌ها و برش CNC دقیق بدون پلیسه.',
      keyFeatures: [
        'استفاده از پمپ‌های استوپ کف سنگین با ضمانت عدم روغن‌ریزی و تثبیت در زاویه ۹۰ درجه',
        'یراق‌آلات استیل نگیر ۳۰۴ مقاوم در برابر رطوبت، زنگ‌زدگی و خط‌وخش',
        'امکان نصب دستگیره‌های بلند استیل مات، مشکی PVD و چوبی لوکس',
        'رگلاژ میلی‌متری و گونیاسازی دقیق بدون کوچک‌ترین لنگی یا افتادگی شیشه',
        'امکان تلفیق با سیستم‌های قفل برقی و کنترل تردد دیجیتال',
      ],
      applications: ['ورودی فروشگاه‌ها و مجتمع‌های تجاری', 'درب‌های داخلی دفاتر شرکت‌ها', 'ورودی لابی‌ها و راهروهای ارتباطی', 'ویلاها و استخرهای لوکس'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 'modern_electric_shutters',
      title: 'سیستم‌های کرکره برقی مدرن',
      titleEn: 'Modern Electric Roller Shutters',
      subtitle: 'تیغه‌های آلومینیوم سنگین ۶۰۶۳، پلی‌کربنات شفاف ضدسرقت و موتورهای صنعتی ساید',
      badge: 'امنیت و زیبایی معماری',
      description: 'ساخت و نصب انواع کرکره‌های برقی هوشمند با بالاترین ضریب امنیت و عایق‌بندی، شامل تیغه‌های آلومینیوم فابریک دوجداره بی‌صدا، تیغه‌های غضروف‌دار لوکس و تیغه‌های شفاف نشکن پلی‌کربنات مناسب ویترین‌ها و اماکن حساس.',
      motorSpecs: 'موتورهای ساید زنجیردار صنعتی با سیم‌پیچ ۱۰۰٪ مس و موتورهای توبولار پرقدرت داخل شفت با سیستم خلاص‌کن دستی.',
      profileSpecs: 'ریل‌های فولادی و آلومینیومی ضخیم مجهز به نوار مویی و لاستیک ضربه‌گیر ضد سایش و لرزش.',
      glassSpecs: 'تیغه‌های پلی‌کربنات آلمانی شفاف با لوله‌های آلومینیومی یا استیل ضدبرش.',
      keyFeatures: [
        'تیغه‌های آلومینیوم اکسترود با رنگ الکترواستاتیک ضدخش و اشعه UV',
        'تیغه‌های شفاف پلی‌کربنات با مقاومت در برابر ضربه چکش و شعله آتش (ضدسرقت واقعی)',
        'مجهز به دستگاه UPS با قابلیت ذخیره برق و فعال‌سازی در زمان قطع شبکه',
        'میکروسوئیچ‌های دقیق جهت توقف نرم و بدون کوبش در ابتدا و انتهای کورس حرکت',
        'سنسورهای ایمنی فتوسل مادون قرمز جهت توقف خودکار هنگام تشخیص مانع زیر کرکره',
      ],
      applications: ['پارکینگ برج‌های مسکونی', 'ویترین طلافروشی‌ها و صرافی‌ها', 'بانک‌ها و مراکز حساس مالی', 'ورودی سوله‌ها و کارخانجات صنعتی'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 'high_security_institutional',
      title: 'ورودی‌های امنیتی و خاص سازمانی',
      titleEn: 'High-Security & Institutional Entrances',
      subtitle: 'درب‌های گردان ریوالوینگ، اینترلاک اتاق‌های تمیز و درب‌های بیمارستانی هرمتیک',
      badge: 'استاندارد ملی و سازمانی',
      description: 'طراحی سیستم‌های ورودی با الزامات سخت‌گیرانه مهندسی برای ارگان‌های دولتی، بیمارستان‌ها، آزمایشگاه‌ها و مراکز داده؛ شامل درب‌های گردان تمام اتوماتیک جهت صرفه‌جویی انرژی، سیستم‌های هوابند هرمتیک و اینترلاک‌های امنیتی دومرحله‌ای.',
      motorSpecs: 'کنترلرهای پیشرفته صنعتی با قابلیت برنامه‌ریزی سناریوهای بحران و اتصال به BMS و سامانه‌های کنترل تردد بیومتریک.',
      profileSpecs: 'شاسی‌های فولادی سنگین، استیل‌های ضدانفجار و اتصالات تقویت‌شده مقاوم در برابر نفوذ فیزیکی.',
      glassSpecs: 'شیشه‌های لمینت چندلایه ضدگلوله، شیشه‌های سربی ضد اشعه X و شیشه‌های هوشمند مات‌شونده.',
      keyFeatures: [
        'درب‌های گردان اتوماتیک (Revolving Doors) ۳ و ۴ باله با موتور مرکزی و سنسورهای ایمنی لیزری کف و دیواره',
        'درب‌های هوابند کلین‌روم (Hermetic) با افت فشار صفر جهت ایزولاسیون کامل اتاق‌های جراحی',
        'سیستم اینترلاک (قفل متقابل) مانع باز شدن همزمان دو درب در ورودی‌های حساس',
        'قابلیت اتصال مستقیم به گیت‌های تشخیص چهره، پلاک‌خوان و اسکنرهای اثر انگشت',
        'سیستم بازشوی اضطراری Break-Out در زمان حریق و تخلیه سریع ساختمان',
      ],
      applications: ['مراکز داده و اتاق‌های سرور', 'اتاق‌های عمل و بخش‌های ایزوله بیمارستان‌ها', 'مراکز تحقیقاتی و دانشگاهی', 'سفارتخانه‌ها و نهادهای امنیتی'],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85',
    },
  ];

  // Handle direct WhatsApp repair routing
  const handleSendRepairWhatsApp = () => {
    const message = `سلام، درخواست پشتیبانی و تعمیرات تخصصی دارم:
نوع خدمات: ${repairCategory === 'automatic' ? 'سرویس و تعویض اپراتور/برد درب اتوماتیک' : 'تعویض استوپ و رگلاژ درب شیشه‌ای میرال'}
منطقه: ${clientDistrict}
توضیح مشکل: ${issueDescription || 'درخواست اعزام کارشناس جهت عیب‌یابی و تعمیر'}
شماره تماس: ${clientPhone || 'ارسال در چت'}
(تصویر یا ویدئوی مشکل را نیز جهت تسریع در فرآیند ارسال می‌نمایم)`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/989121234567?text=${encoded}`, '_blank');
  };

  const handleRepairFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRepairSubmitted(true);
  };

  const openInquiryForService = (service: InstallationService) => {
    setInquiryData({
      title: service.title,
      projectType: service.title,
      details: `استعلام سیستم ${service.title} (${service.titleEn}) - متریال و برآورد هزینه`,
      source: 'catalog'
    });
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] flex flex-col justify-between selection:bg-[#00F090]/30 selection:text-[#06080F]">
      
      {/* Top Main Frosted Glass Navbar */}
      <Navbar onOpenInquiry={() => {
        setInquiryData(null);
        setInquiryModalOpen(true);
      }} />

      {/* Main Page Container with Top Padding for Fixed Navbar */}
      <main className="pt-24 sm:pt-28 pb-20 flex-grow">
        
        {/* ========================================================
            PAGE HERO / HEADER SECTION
        ======================================================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="relative rounded-3xl bg-[#CBD8E2]/75 backdrop-blur-[20px] border border-white/80 p-8 sm:p-12 lg:p-14 shadow-xl overflow-hidden">
            
            {/* Ambient Background Lights */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00F090]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#06080F]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#11172C]/70 mb-6">
              <a href="/" className="hover:text-[#06080F] transition-colors">صفحه اصلی</a>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[#06080F] font-black">خدمات مهندسی و اجرایی</span>
            </div>

            <div className="max-w-3xl">
              {/* Top Category Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06080F] border border-[#00F090]/30 text-[#00F090] text-xs font-bold shadow-xs mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#00F090]" />
                <span>دپارتمان جامع مهندسی و خدمات تخصصی</span>
              </div>

              {/* Main Page Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06080F] tracking-tight leading-tight mb-4">
                خدمات مهندسی و اجرایی درنا درب
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#11172C]/80 font-medium leading-relaxed mb-8">
                طراحی صنعتی، اجرای پروژه‌های ساختمانی لوکس و سازمانی، و خدمات تخصصی پشتیبانی و تعمیرات با ۲۵ سال سابقه درخشان در سراسر تهران.
              </p>

              {/* Quick Jump Action Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#installation-services"
                  className="px-4 py-2.5 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-[0.98]"
                >
                  <Layers className="w-3.5 h-3.5 text-[#00F090]" />
                  <span>پروژه‌های اجرایی و نو</span>
                </a>

                <a
                  href="#maintenance-services"
                  className="px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#06080F] border border-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-[0.98]"
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-600" />
                  <span>پشتیبانی و تعمیرات تخصصی</span>
                </a>

                <a
                  href="#trust-portfolio"
                  className="px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#06080F] border border-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-[0.98]"
                >
                  <Award className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>رزومه و اعتبار ۲۵ ساله</span>
                </a>

                <a
                  href="/calculator"
                  className="px-4 py-2.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center gap-2 shadow-xs transition-all active:scale-[0.98]"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>محاسبه آنلاین قیمت</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 1: CORE INSTALLATION SERVICES (پروژه‌های اجرایی و نو)
        ======================================================== */}
        <section id="installation-services" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 scroll-mt-28">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06080F]/[0.04] border border-white/90 text-[#06080F] text-xs font-bold shadow-2xs backdrop-blur-md mb-3">
                <Layers className="w-3.5 h-3.5 text-[#00F090]" />
                <span>پروژه‌های ساختمانی جدید و نوسازی</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06080F] tracking-tight">
                پروژه‌های اجرایی و نو
              </h2>
              <p className="text-xs sm:text-sm text-[#11172C]/70 font-medium mt-2 max-w-2xl leading-relaxed">
                طراحی دقیق، تأمین بدون‌واسطه متریال وارداتی و نصب استاندارد انواع سیستم‌های مدرن درب‌های اتوماتیک و سازه‌های شیشه‌ای معماری.
              </p>
            </div>

            <button
              onClick={() => {
                setInquiryData(null);
                setInquiryModalOpen(true);
              }}
              className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 text-xs font-bold flex items-center gap-2 shadow-xs hover:shadow-[0_0_20px_rgba(0,240,144,0.2)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F090]" />
              <span>درخواست بازدید حضوری و کارشناسی رایگان</span>
            </button>
          </div>

          {/* 5 Core Installation Service Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {installationServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative rounded-3xl bg-white/80 backdrop-blur-[16px] border border-white/90 hover:border-[#00F090]/40 shadow-sm hover:shadow-xl hover:bg-white/95 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div>
                  
                  {/* Top Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#06080F] text-[#00F090] border border-[#00F090]/30 shadow-2xs">
                      {service.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#11172C]/40 uppercase tracking-wider font-sans">
                      {service.titleEn}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#06080F] tracking-tight group-hover:text-[#06080F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-bold text-[#11172C]/80 mt-1 mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F090]" />
                    {service.subtitle}
                  </p>

                  {/* Main Description */}
                  <p className="text-xs sm:text-sm text-[#11172C]/80 font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Technical Specs Bento-Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-[#06080F]/[0.03] border border-white/80">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#11172C]/60 uppercase flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-[#06080F]" />
                        سیستم موتور و محرکه:
                      </span>
                      <p className="text-xs font-medium text-[#06080F] leading-snug">
                        {service.motorSpecs}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#11172C]/60 uppercase flex items-center gap-1">
                        <Sliders className="w-3 h-3 text-[#06080F]" />
                        فریم و پروفیل:
                      </span>
                      <p className="text-xs font-medium text-[#06080F] leading-snug">
                        {service.profileSpecs}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#11172C]/60 uppercase flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#06080F]" />
                        نوع شیشه و سازه:
                      </span>
                      <p className="text-xs font-medium text-[#06080F] leading-snug">
                        {service.glassSpecs}
                      </p>
                    </div>
                  </div>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-black text-[#06080F] block mb-2.5">
                      مزایای برجسته فنی و مهندسی:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.keyFeatures.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#11172C]/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Areas Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    <span className="text-[11px] font-bold text-[#11172C]/60 ml-1">کاربردها:</span>
                    {service.applications.map((app, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-white/90 text-[#06080F] border border-white shadow-2xs"
                      >
                        {app}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-white/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openInquiryForService(service)}
                      className="px-5 py-2.5 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>درخواست استعلام / مشاوره فنی</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedServiceDetail(service)}
                      className="px-3.5 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#06080F] border border-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      title="مشاهده جزئیات کامل"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">مشخصات کامل</span>
                    </button>
                  </div>

                  <a
                    href="/calculator"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06080F] hover:text-[#00D882] transition-colors"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#00F090]" />
                    <span>محاسبه آنلاین قیمت این سیستم</span>
                  </a>
                </div>

                {/* Bottom Accent Hover Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00F090] to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
              </motion.div>
            ))}
          </div>

        </section>


        {/* ========================================================
            SECTION 2: REPAIR & MAINTENANCE (مدیریت هوشمند خدمات تعمیرات)
        ======================================================== */}
        <section id="maintenance-services" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 scroll-mt-28">
          
          <div className="rounded-3xl bg-[#06080F] text-white p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            
            {/* Background Ambient Accents */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#00F090]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Section Header */}
            <div className="max-w-3xl mb-10 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 text-xs font-bold mb-3.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>مرکز تخصصی پشتیبانی، رگلاژ و بازسازی</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                پشتیبانی و تعمیرات تخصصی
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-2.5 leading-relaxed">
                عیب‌یابی مهندسی با تجهیزات دیاگ الکترونیک، تعویض قطعات مستهلک با نمونه‌های اورجینال دانکر و دورماکابا، و اعزام فوری تکنسین‌های ارشد در سراسر تهران.
              </p>
            </div>

            {/* CRITICAL MANDATORY NOTICE BOX */}
            <div className="relative z-10 mb-10 p-5 sm:p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 text-amber-200 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-white block">
                      شرط تسریع در پذیرش خدمات تعمیرات و اعزام کارشناس:
                    </span>
                    <span className="text-xs text-amber-200/90 font-medium mt-0.5 block">
                      جهت بررسی و اعزام سریع کارشناس، تایید اولیه تصویر یا ویدئوی مشکل الزامی است.
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSendRepairWhatsApp}
                  className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  <Upload className="w-4 h-4" />
                  <span>ارسال فیلم یا عکس مشکل در واتس‌اپ</span>
                </button>
              </div>
            </div>

            {/* 2 Distinct Service Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mb-10">
              
              {/* Category 1: Automatic Doors */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F090]/40 backdrop-blur-md flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#00F090]/20 text-[#00F090] border border-[#00F090]/40">
                      پوشش تمام مناطق ۲۲ گانه تهران
                    </span>
                    <span className="text-xs text-slate-400 font-sans">Automatic Operators</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#00F090]" />
                    <span>سرویس و تعویض اپراتور/برد درب‌های اتوماتیک</span>
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    عیب‌یابی، رفع خطاهای بردهای کنترل‌باکس، تعویض موتورهای سوخته با موتورهای فابریک دانکر آلمان و رگلاژ دقیق هنگرها و کشش تسمه.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>تست و عیب‌یابی بردهای دیجیتال با تستر اختصاصی</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>تعویض هنگرهای مستهلک و غلتک‌های پلی‌آمید بدون لرزش</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>تنظیم و کالیبراسیون سنسورهای فتوسل و پرده‌های مادون‌قرمز</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>تعویض تسمه‌های تقویتی فابریک و رگلاژ هرزگرد انتهایی</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#00F090] font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>حداکثر زمان اعزام: ۲ الی ۴ ساعت کاری</span>
                  </span>
                  <button
                    onClick={() => {
                      setRepairCategory('automatic');
                      handleSendRepairWhatsApp();
                    }}
                    className="text-xs font-bold text-white hover:text-[#00F090] flex items-center gap-1 transition-colors"
                  >
                    <span>ثبت درخواست</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Category 2: Manual Glass Miral Doors */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 backdrop-blur-md flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      مرکز، جنوب تهران و پروژه‌های خاص
                    </span>
                    <span className="text-xs text-slate-400 font-sans">Miral Glass Adjustments</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-amber-400" />
                    <span>تعویض استوپ، تنظیم لولا و رفع افتادگی درب‌های میرال</span>
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    تعویض پمپ‌های روغنی کف مستهلک با استوپ‌های سنگین ضد روغن‌ریزی، رفع اصطکاک لبه شیشه با سنگ کف، تنظیم سرعت بازوبسته شدن و تعویض قفل‌های کف.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>تعویض پمپ هیدرولیک کف با استوپ‌های روغنی درجه یک استیل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>تنظیم سوپاپ‌های دوگانه سرعت جهت مهار کوبیده شدن درب</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>رفع کامل گیرکردن و صدای ناهنجار در لولاهای پاشنه‌ای ۱۰۱ و ۱۰۲</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                      <span>سنگ‌بری و جایگذاری محفظه استوپ بدون شکستگی سنگ لابی</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>همراه با ۲ سال ضمانت کتبی عملکرد استوپ</span>
                  </span>
                  <button
                    onClick={() => {
                      setRepairCategory('manual_miral');
                      handleSendRepairWhatsApp();
                    }}
                    className="text-xs font-bold text-white hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <span>ثبت درخواست</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Interactive Repair Dispatch Form */}
            <div className="relative z-10 p-6 rounded-2xl bg-[#06080F]/90 border border-white/15">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#00F090]" />
                <span>ثبت سریع مشخصات و اعزام کارشناس تعمیرات:</span>
              </h4>

              {repairSubmitted ? (
                <div className="p-5 rounded-xl bg-[#00F090]/10 border border-[#00F090]/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#00F090] mx-auto" />
                  <p className="text-sm font-bold text-white">درخواست تعمیرات شما با کد رهگیری ثبت گردید</p>
                  <p className="text-xs text-slate-300">
                    کارشناس ارشد بخش فنی جهت هماهنگی ساعت اعزام و بررسی فیلم ارسالی با شما تماس خواهد گرفت.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRepairFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      نوع سیستم نیازمند تعمیر:
                    </label>
                    <select
                      value={repairCategory}
                      onChange={(e) => setRepairCategory(e.target.value as 'automatic' | 'manual_miral')}
                      className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-[#00F090]"
                    >
                      <option value="automatic" className="bg-[#06080F] text-white">درب اتوماتیک اسلایدینگ / تلسکوپی</option>
                      <option value="manual_miral" className="bg-[#06080F] text-white">درب میرال شیشه‌ای (استوپ / لولا)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      منطقه / موقعیت پروژه:
                    </label>
                    <select
                      value={clientDistrict}
                      onChange={(e) => setClientDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-[#00F090]"
                    >
                      <option value="منطقه ۱ تا ۵ (شمال و غرب تهران)" className="bg-[#06080F] text-white">مناطق ۱ تا ۵ (شمال و غرب)</option>
                      <option value="مناطق ۶ تا ۱۲ (مرکز تهران)" className="bg-[#06080F] text-white">مناطق ۶ تا ۱۲ (مرکز تهران)</option>
                      <option value="مناطق ۱۳ تا ۲۲ (شرق و جنوب)" className="bg-[#06080F] text-white">مناطق ۱۳ تا ۲۲ و حومه</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      شماره تماس مستقیم:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲..."
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00F090]"
                    />
                  </div>

                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <span>ثبت درخواست اعزام</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSendRepairWhatsApp}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#00F090] transition-colors cursor-pointer shrink-0"
                      title="ارسال در واتس‌اپ"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </section>


        {/* ========================================================
            SECTION 3: TRUST & EXPERIENCE HIGHLIGHT (رزومه و اعتبار ۲۵ ساله)
        ======================================================== */}
        <section id="trust-portfolio" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 scroll-mt-28">
          
          <div className="relative rounded-3xl bg-white/80 backdrop-blur-[20px] border border-white p-8 sm:p-12 lg:p-14 shadow-lg overflow-hidden">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06080F] border border-[#00F090]/30 text-[#00F090] text-xs font-bold shadow-2xs mb-3.5">
                <Award className="w-3.5 h-3.5 text-[#00F090]" />
                <span>۲۵ سال تجربه مهندسی و اعتماد ملی</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06080F] tracking-tight">
                رزومه و اعتبار ۲۵ ساله درنا درب
              </h2>

              <p className="text-xs sm:text-sm text-[#11172C]/70 font-medium mt-2.5 leading-relaxed max-w-2xl mx-auto">
                از سال ۱۳۸۰ تا کنون، با افتخار مجری حساس‌ترین پروژه‌های ساختمانی، نهادهای علمی و بانک‌های کشور بوده‌ایم.
              </p>
            </div>

            {/* 4 Sleek Badges of Executive Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              
              {/* Badge 1 */}
              <div className="p-6 rounded-2xl bg-[#06080F]/[0.03] border border-white/80 flex flex-col justify-between hover:bg-white hover:border-[#00F090]/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 flex items-center justify-center mb-4 shadow-2xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#06080F] uppercase tracking-wider block mb-1">
                    پروژه‌های آکادمیک و ملی
                  </span>
                  <h3 className="text-sm font-black text-[#06080F] leading-snug">
                    اجرای پروژه‌های دانشگاهی و تحقیقاتی
                  </h3>
                  <p className="text-xs text-[#11172C]/70 font-medium mt-2 leading-relaxed">
                    طراحی و اجرای درب‌های اتوماتیک و پارتیشن‌های پژوهشکده‌ها از جمله <strong className="text-[#06080F] font-bold">دانشگاه صنعتی شریف</strong>.
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="p-6 rounded-2xl bg-[#06080F]/[0.03] border border-white/80 flex flex-col justify-between hover:bg-white hover:border-[#00F090]/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 flex items-center justify-center mb-4 shadow-2xs">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#06080F] uppercase tracking-wider block mb-1">
                    سطح امنیتی فوق‌العاده
                  </span>
                  <h3 className="text-sm font-black text-[#06080F] leading-snug">
                    همکاری با مراکز حسّاس و امنیتی
                  </h3>
                  <p className="text-xs text-[#11172C]/70 font-medium mt-2 leading-relaxed">
                    سیستم‌های اینترلاک هوشمند، درب‌های ضدانفجار و گیت‌های کنترل تردد در ارگان‌ها و نهادهای راهبردی.
                  </p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="p-6 rounded-2xl bg-[#06080F]/[0.03] border border-white/80 flex flex-col justify-between hover:bg-white hover:border-[#00F090]/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 flex items-center justify-center mb-4 shadow-2xs">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#06080F] uppercase tracking-wider block mb-1">
                    درمان و سلامت
                  </span>
                  <h3 className="text-sm font-black text-[#06080F] leading-snug">
                    پروژه‌های بیمارستانی و درمانی
                  </h3>
                  <p className="text-xs text-[#11172C]/70 font-medium mt-2 leading-relaxed">
                    درب‌های اتوماتیک هرمتیک اتاق عمل، اورژانس و کلینیک‌های فوق تخصصی در <strong className="text-[#06080F] font-bold">غرب و شمال تهران</strong>.
                  </p>
                </div>
              </div>

              {/* Badge 4 */}
              <div className="p-6 rounded-2xl bg-[#06080F]/[0.03] border border-white/80 flex flex-col justify-between hover:bg-white hover:border-[#00F090]/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 flex items-center justify-center mb-4 shadow-2xs">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#06080F] uppercase tracking-wider block mb-1">
                    شبکه بانکی و مالی
                  </span>
                  <h3 className="text-sm font-black text-[#06080F] leading-snug">
                    پروژه‌های شعب بانکی و اداری
                  </h3>
                  <p className="text-xs text-[#11172C]/70 font-medium mt-2 leading-relaxed">
                    تجهیز ورودی‌ها و کرکره‌های برقی ضدسرقت شعب مرکزی <strong className="text-[#06080F] font-bold">بانک حکمت</strong> و موسسات مالی.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Executive Statistics Bar */}
            <div className="p-6 rounded-2xl bg-[#06080F] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#00F090]/30">
              <div className="flex items-center gap-4 text-right">
                <div className="w-14 h-14 rounded-2xl bg-[#06080F] text-[#00F090] border border-[#00F090] flex items-center justify-center shrink-0 font-sans font-black text-2xl shadow-[0_0_15px_rgba(0,240,144,0.3)]">
                  ۲۵
                </div>
                <div>
                  <span className="text-sm font-black text-white block">
                    ربع قرن استمرار در بالاترین استاندارد مهندسی کشور
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    بیش از ۸۵۰ پروژه لوکس اجرا شده و پشتیبانی فعال بیش از ۱۲۰۰ سیستم ورودی در تهران
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="tel:02122009876"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all border border-white/20"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00F090]" />
                  <span>تماس با دفتر: ۰۲۱-۲۲۰۰۹۸۷۶</span>
                </a>
                <button
                  onClick={() => {
                    setInquiryData({
                      title: 'پروژه سازمانی و کلان',
                      projectType: 'سازمانی / برج‌های لوکس',
                      details: 'درخواست جلسه مشاوره فنی و استعلام پروژه سازمانی',
                      source: 'direct'
                    });
                    setInquiryModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>استعلام پروژه سازمانی</span>
                </button>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Technical Detail Sheet / Modal */}
      <AnimatePresence>
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedServiceDetail(null)}
              className="fixed inset-0 bg-[#06080F]/70 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white z-10"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#06080F] text-[#00F090] border border-[#00F090]/30 shadow-2xs mb-2 inline-block">
                    {selectedServiceDetail.badge}
                  </span>
                  <h3 className="text-xl font-black text-[#06080F]">
                    {selectedServiceDetail.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#11172C]/60 font-sans mt-0.5">
                    {selectedServiceDetail.titleEn}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedServiceDetail(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 text-xs text-[#11172C]/80">
                <p className="leading-relaxed bg-[#06080F]/[0.03] p-4 rounded-2xl border border-slate-100 text-sm">
                  {selectedServiceDetail.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-black text-[#06080F] text-sm flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#00F090]" />
                    <span>مشخصات فنی و استانداردهای قطعات:</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <div>
                      <span className="font-bold text-[#06080F] block">موتور و سیستم محرکه:</span>
                      <span className="text-slate-600">{selectedServiceDetail.motorSpecs}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#06080F] block">پروفیل و فریم:</span>
                      <span className="text-slate-600">{selectedServiceDetail.profileSpecs}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#06080F] block">شیشه و سازه معماری:</span>
                      <span className="text-slate-600">{selectedServiceDetail.glassSpecs}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-[#06080F] text-sm mb-2.5">مزایای انحصاری درنا درب:</h4>
                  <ul className="space-y-2">
                    {selectedServiceDetail.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00F090] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const serv = selectedServiceDetail;
                    setSelectedServiceDetail(null);
                    openInquiryForService(serv);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 text-xs font-black flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#00F090]" />
                  <span>ثبت استعلام و مشاوره فنی برای این سیستم</span>
                </button>

                <a
                  href="/calculator"
                  className="px-4 py-3 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center gap-1.5 transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  <span>محاسبه آنلاین قیمت</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialData={inquiryData}
      />

      {/* Dark Luxury Glassmorphic Footer */}
      <Footer onOpenInquiry={() => {
        setInquiryData(null);
        setInquiryModalOpen(true);
      }} />

    </div>
  );
};
