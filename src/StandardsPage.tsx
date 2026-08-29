import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Layers, 
  FileText, 
  Phone, 
  MessageCircle, 
  Calculator, 
  ChevronLeft, 
  ExternalLink,
  Clock,
  AlertTriangle,
  FileCheck,
  Shield,
  HelpCircle,
  Eye,
  Check,
  X
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { SITE_CONFIG } from './config/siteConfig';

export const StandardsPage: React.FC = () => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [warrantyModalOpen, setWarrantyModalOpen] = useState(false);
  const [prefilledProject, setPrefilledProject] = useState('استعلام استانداردهای فنی و گارانتی');

  const standardsPillars = [
    {
      id: 'golden_warranty',
      title: '۲۴ ماه گارانتی طلایی تعویض قطعات',
      subtitle: 'تعهد کتبی و بی قید و شرط برد و موتور',
      icon: Award,
      badge: 'تعهد ۲ ساله رسمی',
      badgeColor: 'bg-amber-500/20 text-[#06080F] border-amber-400/40',
      description: 'در صورت بروز هرگونه نقص فنی در موتورهای براش‌لس، بردهای میکروپروسسوری یا منبع تغذیه، قطعه بدون اتلاف وقت و بدون تعمیرات مقطعی، با قطعه نو تعویض می‌گردد.',
      points: [
        'تعویض کامل موتور Dunkermotoren آلمان در صورت نقص فنی',
        'پوشش نوسانات ولتاژ شهری تحت پشتیبانی برد هوشمند',
        'اعزام کارشناس در کمتر از ۲ ساعت برای موارد اضطراری',
        '۱۰ سال پشتیبانی و تضمین تأمین قطعات یدکی',
      ],
    },
    {
      id: 'german_components',
      title: 'اصالت قطعات و موتور دانکر آلمان',
      subtitle: 'Dunkermotoren & BEA Sensors',
      icon: Cpu,
      badge: 'استاندارد EN 16005',
      badgeColor: 'bg-blue-500/20 text-[#06080F] border-blue-400/40',
      description: 'تمامی سیستم‌های اتوماتیک درنا درب به موتورهای براش‌لس اصیل دانکر با عمر کاری بیش از ۳ میلیون سیکل تردد و سنسورهای ترکیبی پرده نوری BEA بلژیک مجهز هستند.',
      points: [
        'دارای هولوگرام و سرتیفیکیت اصالت واردات',
        'تردد نامحدود (Heavy-Duty) بدون افزایش دمای سیم‌پیچ',
        'سنسورهای نوری ایمنی با پوشش ۱۰۰٪ محدوده بازشو',
        'سیستم انکودر دیجیتال و ریست خودکار وضعیت',
      ],
    },
    {
      id: 'superclear_glass',
      title: 'شیشه‌های سکوریت سوپرکلیر وین‌لایت',
      subtitle: 'تست غوطه‌وری حرارتی و سندبلاست اختصاصی',
      icon: Layers,
      badge: 'سکوریت صنعتی درجه ۱',
      badgeColor: 'bg-emerald-500/20 text-[#06080F] border-emerald-400/40',
      description: 'تولید شیشه‌های ۱۰ و ۱۲ میل سکوریت صنعتی با کمترین درصد اکسید آهن (بدون هاله سبز رنگ لبه‌ها)، تراش دیاموند مات و براق و تست حرارتی استاندارد جهت جلوگیری از شکست خودبه‌خودی.',
      points: [
        'مقاومت ۵ برابری در برابر ضربه و تنش حرارتی',
        'شفافیت کریستالی ۹۲٪ عبور نور طبیعی',
        'امکان اجرای طرح‌های سندبلاست لوگو و مات‌کاری هندسی',
        'ارائه گواهی استاندارد ملی ایران و ایزو ۹۰۰۱',
      ],
    },
    {
      id: 'laser_level_checklist',
      title: 'چک‌لیست نصب تراز لیزری و رگلاژ',
      subtitle: 'نصب با استانداردهای میلی‌متری مهندسی',
      icon: ShieldCheck,
      badge: 'چک‌لیست ۱۰ مرحله‌ای',
      badgeColor: 'bg-purple-500/20 text-[#06080F] border-purple-400/40',
      description: 'تمامی پروژه‌ها توسط تیم‌های تخصصی دوره‌دیده با ابزارهای تراز لیزری سه‌بعدی شاسی‌کشی و پس از ۴۸ ساعت تست زیر بار، همراه با فرم تحویل رسمی به کارفرما تحویل می‌شوند.',
      points: [
        'شاسی‌کشی با قوطی‌های استاندارد سنگین صنعتی',
        'رگلاژ میکرومتری چرخ‌های پلی‌آمیدی دوبل',
        'عایق‌بندی کامل با لاستیک‌های EPDM نسوز',
        'تست سنکرونیزاسیون تسمه و ترمز اضطراری',
      ],
    },
  ];

  const handleOpenInquiry = (subject: string) => {
    setPrefilledProject(`استعلام: ${subject}`);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] flex flex-col justify-between selection:bg-[#00F090]/30 selection:text-[#06080F]">
      
      {/* Global Navbar */}
      <Navbar onOpenInquiry={() => handleOpenInquiry('استعلام استانداردهای مهندسی')} />

      {/* Main Content */}
      <main className="pt-28 sm:pt-32 pb-20 flex-grow">
        
        {/* ========================================================
            1. HERO SECTION
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/80 bg-[#CBD8E2]/75 backdrop-blur-[20px] shadow-xl overflow-hidden">
            
            {/* Background Accent Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00F090]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#11172C]/70 mb-6">
              <a href="index.html" className="hover:text-[#06080F] transition-colors">صفحه اصلی</a>
              <span>←</span>
              <span className="text-[#06080F]">استانداردها و تعهدات کیفیت مهندسی</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-white text-[#06080F] text-xs font-bold shadow-xs mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#00F090]" />
                  <span>تعهد کتبی و بی قیدوشرط کیفیت قطعات و نصب</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06080F] tracking-tight leading-tight mb-6">
                  استانداردها و تعهدات مهندسی درنا درب
                </h1>

                <p className="text-sm sm:text-base text-[#11172C]/80 font-medium leading-relaxed max-w-2xl mb-8">
                  شفافیت در کیفیت، ۲۴ ماه گارانتی طلایی قطعات و ۱۰ سال پشتیبانی فنی؛ تفاوت مهندسی دقیق و قطعات اصیل آلمانی در ایمنی، بی‌صدایی و دوام سازه‌های شیشه‌ای و ورودی‌های هوشمند.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => setWarrantyModalOpen(true)}
                    className="px-5 py-3 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer border border-[#00F090]/40"
                  >
                    <FileText className="w-4 h-4 text-[#00F090]" />
                    <span>مشاهده نمونه ضمانت‌نامه رسمی و سربرگ‌دار</span>
                  </button>

                  <a 
                    href="calculator.html" 
                    className="px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-[#06080F] border border-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
                  >
                    <span>محاسبه هزینه پروژه بر اساس استانداردها</span>
                    <ChevronLeft className="w-3.5 h-3.5 text-[#06080F]" />
                  </a>
                </div>

              </div>

              {/* Official Guarantee Seal Card */}
              <div className="lg:col-span-4">
                <div className="rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden bg-[#06080F] border border-white/20">
                  
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#00F090]/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#00F090]/20 text-[#00F090] flex items-center justify-center font-bold">
                        ★
                      </div>
                      <span className="text-xs font-black tracking-tight text-[#00F090]">Dorna Door Quality Seal</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#CBD8E2] font-sans">EN 16005 / ISO 9001</span>
                  </div>

                  <div className="text-center py-4 space-y-2">
                    <span className="text-4xl sm:text-5xl font-black text-white block tracking-tight">
                      ۲۴ <span className="text-2xl font-bold text-[#00F090]">ماهه</span>
                    </span>
                    <span className="text-sm font-extrabold text-amber-300 block">گارانتی طلایی تعویض قطعات</span>
                    <p className="text-[11px] text-[#CBD8E2]/80 leading-relaxed pt-2">
                      تعویض کامل برد و موتور بدون قید و شرط همراه با ۱۰ سال خدمات پس از فروش و تأمین قطعات اورجینال در سراسر ایران.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#CBD8E2]/80">
                    <span>شماره ثبت مهندسی:</span>
                    <span className="font-bold text-white font-sans">DORNA-QC-2026</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            2. STANDARDS PILLARS GRID
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#06080F] tracking-tight mb-3">
              ۴ اصل بنیادین کیفیت و ایمنی درنا درب
            </h2>
            <p className="text-xs sm:text-sm text-[#11172C]/80 font-medium">
              تفاوت سازه‌های درنا درب در جزئیات مهندسی و انطباق کامل با پروتکل‌های ایمنی ساختمانی اروپا نهفته است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standardsPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="rounded-3xl p-7 border border-white/80 bg-[#CBD8E2]/75 backdrop-blur-md shadow-sm hover:shadow-xl hover:bg-white/95 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] flex items-center justify-center shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-black px-3 py-1 rounded-full border ${pillar.badgeColor}`}>
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#06080F] tracking-tight mb-1">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-bold text-[#11172C]/60 block mb-3 font-sans">
                      {pillar.subtitle}
                    </span>

                    <p className="text-xs text-[#11172C]/80 leading-relaxed mb-6 font-normal">
                      {pillar.description}
                    </p>

                    <div className="space-y-2 bg-white/70 p-4 rounded-2xl border border-white/90 mb-6">
                      {pillar.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-[#11172C]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenInquiry(pillar.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/80 hover:bg-white text-[#06080F] border border-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>استعلام و مشاوره فنی این استاندارد</span>
                    <ChevronLeft className="w-3.5 h-3.5 text-[#06080F]" />
                  </button>
                </div>
              );
            })}
          </div>

        </section>

        {/* ========================================================
            3. INSTALLATION CHECKLIST
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-3xl p-8 sm:p-12 border border-white/80 bg-[#CBD8E2]/75 backdrop-blur-md shadow-md">
            
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#06080F] text-xs font-bold shadow-xs mb-3">
                <FileCheck className="w-3.5 h-3.5 text-[#00F090]" />
                <span>پروتکل کنترل کیفیت کارگاهی و میدانی</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#06080F] tracking-tight">
                چک‌لیست ۱۰ مرحله‌ای تحویل قطعی به کارفرما
              </h3>
              <p className="text-xs sm:text-sm text-[#11172C]/80 font-medium mt-2">
                پیش از امضای صورت‌جلسه تحویل نهایی، تمامی موارد زیر توسط سرپرست کارگاه درنا درب بازرسی و تایید می‌گردد:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {[
                'تراز لیزری سه‌بعدی شاسی و پروفیل با تلرانس کمتر از ۱ میلی‌متر',
                'تست سنسورهای ایمنی پرده نوری در برابر موانع ناگهانی',
                'تنظیم سرعت بازشو و ترمز میکروسوییچی ضدبرخورد',
                'تست باتری بک‌آپ اضطراری در شرایط قطع برق شهری',
                'آچارکشی و گشتاورسنجی یراق‌آلات و هنگرهای استیل',
                'درزگیری کامل گسکت‌های سیلیکونی EPDM هوابند',
                'سنگ‌ابزار دیاموند شیشه‌ها و عدم وجود پلیسه یا ترک میکروسکوپی',
                'تست عملکرد قفل الکترومکانیکی شبانه و کلید چندحالته',
                'ارائه کارت گارانتی ۲۴ ماهه ممهور به مهر رسمی شرکت',
              ].map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-white">
                  <div className="w-6 h-6 rounded-lg bg-[#06080F] text-[#00F090] flex items-center justify-center font-bold shrink-0 text-xs font-sans">
                    {sIdx + 1}
                  </div>
                  <span className="text-[#11172C] font-medium leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Warranty Certificate Sample Modal */}
      <AnimatePresence>
        {warrantyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWarrantyModalOpen(false)}
              className="absolute inset-0 bg-[#06080F]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#E4EBF1] rounded-3xl p-6 sm:p-8 border border-white shadow-2xl z-10"
            >
              <button
                onClick={() => setWarrantyModalOpen(false)}
                className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white text-[#06080F] flex items-center justify-center transition-colors cursor-pointer border border-white shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#06080F]">ضمانت‌نامه رسمی و طلایی ۲۴ ماهه</h3>
                <span className="text-xs text-[#11172C]/70 block font-sans">DORNA DOOR OFFICIAL WARRANTY</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#11172C]/10 text-xs text-[#11172C] space-y-3 mb-6">
                <div className="flex justify-between border-b border-[#11172C]/10 pb-2">
                  <span className="text-[#11172C]/70">مدت پوشش قطعات:</span>
                  <span className="font-bold text-[#06080F]">۲۴ ماه کامل تعویض بی قید و شرط</span>
                </div>
                <div className="flex justify-between border-b border-[#11172C]/10 pb-2">
                  <span className="text-[#11172C]/70">تأمین قطعات و پشتیبانی:</span>
                  <span className="font-bold text-[#06080F]">۱۰ سال خدمات پس از فروش</span>
                </div>
                <div className="flex justify-between border-b border-[#11172C]/10 pb-2">
                  <span className="text-[#11172C]/70">شماره سریال دستگاه:</span>
                  <span className="font-bold text-[#06080F] font-sans">DN-2026-X8914</span>
                </div>
                <p className="text-[11px] text-[#11172C]/80 leading-relaxed pt-2">
                  این ضمانت‌نامه شامل تعویض کلیه قطعات الکترونیکی، موتور براش‌لس، کنترل‌باکس و سنسورهای حرکتی در سراسر کشور می‌باشد.
                </p>
              </div>

              <button
                onClick={() => {
                  setWarrantyModalOpen(false);
                  handleOpenInquiry('درخواست صدور گارانتی و استعلام پروژه');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#06080F]" />
                <span>ثبت پروژه با گارانتی طلایی درنا درب</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Luxury Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry('استعلام از فوتر استانداردها')} />

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        prefilledProject={prefilledProject}
      />

    </div>
  );
};
