import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Building2, 
  DoorClosed, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sliders, 
  Phone, 
  MessageCircle, 
  Calculator, 
  ChevronLeft, 
  ExternalLink,
  Cpu,
  Search,
  Filter,
  Eye,
  ArrowLeft,
  X
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal } from './components/QuickInquiryModal';

export type ProjectCategory = 'all' | 'institutional' | 'commercial' | 'luxury_entrance';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  client: string;
  location: string;
  image: string;
  badge: string;
  badgeColor: string;
  metricBadge: string;
  shortDesc: string;
  fullDesc: string;
  specs: { label: string; value: string }[];
  highlightTag: string;
}

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [prefilledProject, setPrefilledProject] = useState('استعلام پروژه شاخص');

  const categories = [
    { id: 'all', label: 'همه پروژه‌ها', count: 6 },
    { id: 'institutional', label: 'سازمانی و حساس', count: 3 },
    { id: 'commercial', label: 'تجاری و اداری', count: 3 },
    { id: 'luxury_entrance', label: 'ورودی‌های لوکس و میرال', count: 2 },
  ];

  const projectsData: ProjectItem[] = [
    {
      id: 'sharif-univ',
      title: 'پارتیشن‌بندی دوجداره آکوستیک - دانشگاه صنعتی شریف',
      category: 'institutional',
      categoryLabel: 'سازمانی و دانشگاهی',
      client: 'دانشگاه صنعتی شریف',
      location: 'تهران، خیابان آزادی - پژوهشکده فناوری',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      badge: 'سازمانی و دانشگاهی',
      badgeColor: 'bg-blue-600/90 text-white',
      metricBadge: '۶۰ متر طول پارتیشن',
      highlightTag: 'عایق آکوستیک ۴۲dB',
      shortDesc: 'طراحی و اجرای ۶۰ متر طول پارتیشن شیشه‌ای دوجداره اسلیم با پرده کرکره ولومی توکار مگنتی، شیشه سکوریت ۱۰ میل فلوت سوپرکلیر و درب‌های فریم‌دار آکوستیک جهت تفکیک آزمایشگاه‌ها و دفاتر اساتید.',
      fullDesc: 'پروژه پژوهشکده فناوری دانشگاه شریف با هدف تفکیک بهینه فضاهای تحقیقاتی و حفظ حداکثر نور طبیعی همراه با عایق صوتی استاندارد ۴۲ دسی‌بل اجرا شد. سیستم استفاده‌شده مجهز به پروفیل‌های آلومینیومی آنودایز مات فابریک و درب‌های بازشوی لولایی هیدرولیک توکار با آرام‌بند اختصاصی است.',
      specs: [
        { label: 'نوع سیستم', value: 'پارتیشن دوجداره با پروفیل اسلیم' },
        { label: 'پوشش پروفیل', value: 'آنودایز نقره‌ای مات فابریک' },
        { label: 'نوع شیشه', value: 'دوجداره سکوریت ۱۰+۱۰ با گاز آرگون' },
        { label: 'مکانیزم درب‌ها', value: 'لولایی هیدرولیک مخفی ضدصدا' },
        { label: 'مدت اجرا', value: '۱۴ روز کاری' },
      ]
    },
    {
      id: 'security-center',
      title: 'سیستم ورودی امنیتی و درب اتوماتیک - مرکز اداری و امنیتی',
      category: 'institutional',
      categoryLabel: 'سطح امنیتی فوق‌العاده',
      client: 'نهاد راهبردی و مرکز اداری',
      location: 'تهران، منطقه ۳ - مرکز داده و کنترل تردد',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      badge: 'سطح امنیتی فوق‌العاده',
      badgeColor: 'bg-indigo-600/90 text-white',
      metricBadge: 'اینترلاک دومرحله‌ای',
      highlightTag: 'ضدگلوله و هوابند',
      shortDesc: 'طراحی سامانه ورودی دومرحله‌ای هوشمند (Airlock / Interlock) با اپراتور پرقدرت دانکر آلمان، قفل الکترومغناطیسی ضدانفجار و ارتباط مستقیم با گیت‌های بیومتریک و اتاق مانیتورینگ مرکزی.',
      fullDesc: 'سیستم ورود و خروج هوشمند ضدتعقیب مجهز به سیستم سنسورهای حجمی تشخیص نفر منفرد، شیشه‌های چندلایه لمینت ضدگلوله کلاس BR3 و اتصال بلادرنگ به سیستم اعلام و اطفای حریق ساختمان.',
      specs: [
        { label: 'نوع سیستم', value: 'درب اتوماتیک کشویی اینترلاک هوشمند' },
        { label: 'موتور و محرکه', value: 'موتور براشلس Dunkermotoren آلمان' },
        { label: 'نوع شیشه', value: 'لمینت چندلایه ضدگلوله و ضدضربه' },
        { label: 'سیستم قفل', value: 'مگنت‌لاک ۶۰۰ پوندی Fail-Safe' },
        { label: 'گارانتی', value: '۲۴ ماه گارانتی طلایی تعویض' },
      ]
    },
    {
      id: 'hospital-west',
      title: 'درب‌های اتوماتیک بیمارستانی و هرمتیک - مرکز جراحی غرب تهران',
      category: 'institutional',
      categoryLabel: 'درمان و سلامت',
      client: 'بیمارستان تخصصی و فوق‌تخصصی',
      location: 'تهران، منطقه ۵ (غرب تهران) - بخش اورژانس و اتاق عمل',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      badge: 'درمان و سلامت',
      badgeColor: 'bg-emerald-600/90 text-white',
      metricBadge: 'سیستم هوابند هرمتیک',
      highlightTag: 'آنتی‌باکتریال و بی‌صدا',
      shortDesc: 'نصب ۸ دستگاه درب اتوماتیک اسلایدینگ تلسکوپی هرمتیک در راهروهای اورژانس و ورودی بخش‌های بستری با استانداردهای سخت‌گیرانه بهداشتی و سنسورهای مادون‌قرمز فوتوسل بدون لمس دستی.',
      fullDesc: 'این سیستم با درزگیری کامل گسکت‌های سیلیکونی فشاری EPDM و کنترل‌باکس بدون نویز، جریان هوای استریل را در اتاق‌های عمل و بستری کنترل کرده و بازشوی کاملاً بی‌صدا و سریع را فراهم می‌آورد.',
      specs: [
        { label: 'نوع سیستم', value: 'درب اتوماتیک هرمتیک هوابند بیمارستانی' },
        { label: 'سنسورها', value: 'سنسورهای نوری چشمی و کلیدهای پایی تماسی' },
        { label: 'پوشش بدنه', value: 'استنلس استیل ۳۰۴ ضدزنگ مات' },
        { label: 'تعداد ورودی‌ها', value: '۸ دستگاه درب اتوماتیک' },
        { label: 'پشتیبانی', value: 'سرویس دوره‌ای ماهانه و ۲۴ ساعته' },
      ]
    },
    {
      id: 'tower-fereshteh',
      title: 'ورودی لوکس لابی و شیشه‌های اسلایدینگ - برج مسکونی فرشته',
      category: 'luxury_entrance',
      categoryLabel: 'مسکونی لوکس',
      client: 'سرمایه‌گذار و مالک برج مسکونی',
      location: 'تهران، منطقه ۱ - خیابان فرشته (الهیه)',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: 'لوکس و معماری',
      badgeColor: 'bg-amber-600/90 text-white',
      metricBadge: 'ارتفاع ۳.۴ متر بازشو',
      highlightTag: 'پروفیل استیل طلایی PVD',
      shortDesc: 'اجرای ورودی تمام‌قد لابی اصلی با شاسی‌کشی مستحکم مخفی، شیشه‌های کریستال سوپرکلیر کم‌آهن، اپراتور با وقار دانکر آلمان و کاور استیل طلایی میرور ضدخش.',
      fullDesc: 'طراحی اختصاصی متناسب با معماری نئوکلاسیک لابی، ترکیب شیشه‌های سندبلاست طرح‌دار اختصاصی با موتور بی‌صدای دانکر آلمان و سنسورهای مخفی در سقف کاذب.',
      specs: [
        { label: 'نوع سیستم', value: 'درب اتوماتیک اسلایدینگ فوق‌عریض لابی' },
        { label: 'پوشش پروفیل', value: 'استیل طلایی تیتانیوم میرور PVD' },
        { label: 'شیشه', value: '۱۲ میل سکوریت سوپرکلیر وین‌لایت' },
        { label: 'عرض دهانه', value: '۴.۸ متر بازشوی دوطرفه' },
        { label: 'تردد', value: 'نامحدود (Heavy Duty)' },
      ]
    },
    {
      id: 'commercial-saadatabad',
      title: 'پارتیشن‌های فریم‌لس تجاری و درب‌های میرال - مجتمع تجاری سعادت‌آباد',
      category: 'commercial',
      categoryLabel: 'تجاری و اداری',
      client: 'شرکت سرمایه‌گذاری املاک',
      location: 'تهران، سعادت‌آباد - میدان کاج',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      badge: 'تجاری و اداری',
      badgeColor: 'bg-blue-600/90 text-white',
      metricBadge: '۱۲۰ واحد تجاری',
      highlightTag: 'شیشه ۱۰ میل سکوریت درجه ۱',
      shortDesc: 'طراحی، تولید و نصب جامع سیستم‌های تفکیک واحدهای تجاری، پارتیشن‌های فریم‌لس شیشه‌ای و درب‌های میرال ضدسرقت با یراق‌آلات استنلس استیل ۳۰۴ ضدسایش.',
      fullDesc: 'تأمین و اجرای شیشه‌های سکوریت ۱۰ میل با سنگ‌ابزار دیاموند براق، دستگیره‌های استیل ۶۰ سانتی‌متری لوکس و استوپ‌های هیدرولیک گازی سنگین برای تمامی واحدهای مجتمع.',
      specs: [
        { label: 'نوع سیستم', value: 'پارتیشن تک‌جداره فریم‌لس و درب میرال' },
        { label: 'متراژ کل شیشه', value: 'بیش از ۱,۴۰۰ متر مربع' },
        { label: 'یراق‌آلات', value: 'استیل ۳۰۴ وارداتی با آبکاری مات' },
        { label: 'استوپ کف', value: 'استوپ روغنی دورماکابا سنگین' },
        { label: 'تحویل', value: 'فازبندی شده در ۳ ماه' },
      ]
    },
    {
      id: 'bank-hekmat',
      title: 'درب‌های ضدسرقت و ورودی اتوماتیک شعب - بانک حکمت ایرانیان',
      category: 'commercial',
      categoryLabel: 'بانکی و مالی',
      client: 'مدیریت امور شعب بانک',
      location: 'تهران و شعب سراسر استان البرز',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80',
      badge: 'سازمانی و بانکی',
      badgeColor: 'bg-slate-900/90 text-white',
      metricBadge: '۱۸ شعبه سراسری',
      highlightTag: 'سیستم هوشمند ضدسرقت',
      shortDesc: 'تجهیز شعب به درب‌های اتوماتیک کشویی شیشه‌ای مجهز به باتری بک‌آپ اضطراری، کرکره‌های برقی امنیتی تیغه فولادی ضدبرش و قفل‌های اتوماتیک الکترومکانیکی شبانه.',
      fullDesc: 'یکپارچه‌سازی سامانه‌های امنیتی ورودی شعب با سیستم اعلام هشدار مرکزی بانک، عملکرد بدون وقفه تا ۵ ساعت هنگام قطعی سراسری شبکه برق و تعویض قطعات تحت گارانتی طلایی.',
      specs: [
        { label: 'نوع سیستم', value: 'درب اتوماتیک اسلایدینگ + کرکره امنیتی' },
        { label: 'سیستم تغذیه', value: 'باتری لیتیومی اضطراری با مدار شارژ هوشمند' },
        { label: 'تعداد شعب', value: '۱۸ شعبه فعال' },
        { label: 'زمان پاسخگویی', value: 'کمتر از ۲ ساعت برای خدمات اضطراری' },
        { label: 'مدت پشتیبانی', value: 'قرارداد نگهداری سالانه فعال' },
      ]
    },
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenInquiry = (projectName: string) => {
    setPrefilledProject(`استعلام پروژه: ${projectName}`);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] flex flex-col justify-between selection:bg-[#00F090]/30 selection:text-[#06080F]">
      
      {/* Global Navbar */}
      <Navbar onOpenInquiry={() => handleOpenInquiry('استعلام پروژه‌ها')} />

      {/* Main Content Area */}
      <main className="pt-28 sm:pt-32 pb-20 flex-grow">
        
        {/* ========================================================
            1. HERO HEADER SECTION
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/80 bg-[#CBD8E2]/75 backdrop-blur-[20px] shadow-xl overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00F090]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#11172C]/70 mb-6">
              <a href="index.html" className="hover:text-[#06080F] transition-colors">صفحه اصلی</a>
              <span>←</span>
              <span className="text-[#06080F]">پروژه‌ها و نمونه‌کارهای اجرایی</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-white text-[#06080F] text-xs font-bold shadow-xs mb-4">
                  <Briefcase className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>آرشیو جامع پروژه‌های معماری و سازمانی</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06080F] tracking-tight leading-tight mb-4">
                  پروژه‌ها و رزومه اجرایی درنا درب
                </h1>

                <p className="text-sm sm:text-base text-[#11172C]/80 font-medium leading-relaxed max-w-2xl">
                  ۲۵ سال اجرای سازه‌های شیشه‌ای، درب‌های اتوماتیک هوشمند و پارتیشن‌های آکوستیک در دانشگاه‌ها، برج‌های لوکس و نهادهای ملی با اتکا به استانداردهای سخت‌گیرانه مهندسی.
                </p>
              </div>

              {/* Quick Stat Badge */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 border border-white shadow-sm shrink-0">
                <div className="w-12 h-12 rounded-xl bg-[#06080F] text-[#00F090] flex items-center justify-center font-black text-xl shadow-xs">
                  +۸۵۰
                </div>
                <div>
                  <span className="text-xs font-black text-[#06080F] block">پروژه موفق در سراسر ایران</span>
                  <span className="text-[11px] font-medium text-[#11172C]/70">پوشش پروژه‌های ملی، درمانی و مسکونی</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            2. FILTERING & SEARCH CONTROLS
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-2xl bg-[#CBD8E2]/60 border border-white/70 backdrop-blur-md shadow-xs">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as ProjectCategory)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#06080F] text-[#00F090] shadow-sm'
                      : 'bg-white/60 hover:bg-white text-[#11172C] hover:text-[#06080F]'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در پروژه‌ها، کارفرما یا منطقه..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/90 border border-white text-xs text-[#06080F] placeholder-[#11172C]/50 focus:outline-none focus:ring-2 focus:ring-[#00F090]"
              />
              <Search className="w-4 h-4 text-[#11172C]/50 absolute left-3 top-2.5 pointer-events-none" />
            </div>

          </div>
        </section>

        {/* ========================================================
            3. PROJECTS GRID
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl overflow-hidden flex flex-col justify-between border border-white/80 bg-[#CBD8E2]/75 backdrop-blur-md shadow-sm hover:shadow-xl hover:bg-white/90 transition-all duration-300"
              >
                <div>
                  {/* Image Area with Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080F]/90 via-[#06080F]/30 to-transparent" />
                    
                    {/* Category Pill */}
                    <span className="absolute top-3.5 right-3.5 text-[11px] font-black px-3 py-1 rounded-full bg-[#06080F]/80 text-[#00F090] border border-[#00F090]/40 backdrop-blur-md shadow-sm">
                      {project.badge}
                    </span>
                    
                    {/* Client & Location */}
                    <div className="absolute bottom-3 right-3.5 left-3.5 text-white">
                      <span className="text-[11px] font-bold text-[#00F090] block">کارفرما: {project.client}</span>
                      <span className="text-xs font-medium opacity-90">{project.location}</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-bold text-[#11172C]/70">{project.metricBadge}</span>
                      <span className="text-[11px] font-black text-[#06080F] bg-[#00F090]/20 border border-[#00F090]/40 px-2.5 py-0.5 rounded-md">
                        {project.highlightTag}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#06080F] tracking-tight mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#11172C]/80 leading-relaxed font-normal mb-5 line-clamp-3">
                      {project.shortDesc}
                    </p>

                    {/* Technical Specs List */}
                    <div className="space-y-1.5 text-xs text-[#11172C] bg-white/70 p-3.5 rounded-2xl border border-white/90 mb-5">
                      {project.specs.slice(0, 3).map((spec, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-center text-[11px]">
                          <span className="text-[#11172C]/70 font-medium">{spec.label}:</span>
                          <span className="font-bold text-[#06080F]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/80 hover:bg-white text-[#06080F] border border-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#06080F]" />
                    <span>مشاهده جزئیات کامل مهندسی</span>
                  </button>

                  <button 
                    onClick={() => handleOpenInquiry(project.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] text-xs font-black transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-[#00F090]/30"
                  >
                    <span>استعلام هزینه پروژه مشابه</span>
                    <ChevronLeft className="w-3.5 h-3.5 text-[#00F090]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 p-8 rounded-3xl bg-[#CBD8E2]/60 border border-white/80">
              <Building2 className="w-12 h-12 text-[#11172C]/40 mx-auto mb-3" />
              <h4 className="text-base font-black text-[#06080F] mb-1">پروژه‌ای با این مشخصات یافت نشد</h4>
              <p className="text-xs text-[#11172C]/70 mb-4">می‌توانید کلمه جستجو را تغییر دهید یا مستقیماً با کارشناسان تماس بگیرید.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-[#06080F] text-[#00F090] text-xs font-bold cursor-pointer"
              >
                نمایش همه پروژه‌ها
              </button>
            </div>
          )}
        </section>

        {/* ========================================================
            4. PROJECT DETAIL MODAL
        ======================================================== */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#06080F]/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-[#E4EBF1] rounded-3xl p-6 sm:p-8 border border-white shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#06080F] flex items-center justify-center transition-colors cursor-pointer border border-white shadow-xs"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                  <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#00F090]/20 text-[#06080F] border border-[#00F090]/40 inline-block mb-2">
                    {selectedProject.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#06080F] tracking-tight leading-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#11172C]/70 mt-2">
                    <span className="font-bold text-[#06080F]">کارفرما: {selectedProject.client}</span>
                    <span>•</span>
                    <span>{selectedProject.location}</span>
                  </div>
                </div>

                {/* Modal Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-white shadow-sm">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 right-3 text-xs font-black px-3 py-1 rounded-full bg-[#06080F]/80 text-[#00F090] border border-[#00F090]/30 backdrop-blur-md">
                    {selectedProject.highlightTag}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3 mb-6 text-xs sm:text-sm text-[#11172C] leading-relaxed">
                  <p className="font-medium">{selectedProject.fullDesc}</p>
                </div>

                {/* Technical Specifications */}
                <div className="bg-white/80 rounded-2xl p-4 border border-white mb-6 space-y-2">
                  <h4 className="text-xs font-black text-[#06080F] border-r-2 border-[#00F090] pr-2 mb-3">
                    مشخصات فنی و اجرایی سازه
                  </h4>
                  {selectedProject.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-[#11172C]/5 last:border-0">
                      <span className="text-[#11172C]/70">{spec.label}</span>
                      <span className="font-bold text-[#06080F]">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const title = selectedProject.title;
                      setSelectedProject(null);
                      handleOpenInquiry(title);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#06080F]" />
                    <span>درخواست استعلام برای پروژه مشابه</span>
                  </button>

                  <a
                    href="calculator.html"
                    className="py-3 px-4 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Calculator className="w-4 h-4 text-[#00F090]" />
                    <span>محاسبه آنلاین قیمت</span>
                  </a>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>

      {/* Global Luxury Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry('استعلام از فوتر پروژه‌ها')} />

      {/* Quick Lead Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        prefilledProject={prefilledProject}
      />

    </div>
  );
};
