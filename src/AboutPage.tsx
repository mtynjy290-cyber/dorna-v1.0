import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Calculator, 
  ChevronLeft, 
  ExternalLink,
  Users,
  Layers,
  Cpu,
  History,
  Target,
  Compass
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { SITE_CONFIG } from './config/siteConfig';

export const AboutPage: React.FC = () => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [prefilledProject, setPrefilledProject] = useState('استعلام درباره ما و مشاوره سازه');

  const timelineMilestones = [
    {
      year: '۱۳۷۹',
      title: 'تأسیس نخستین کارگاه تخصصی شیشه میرال',
      desc: 'آغاز فعالیت رسمی در زمینه برش، تراش و سکوریت شیشه‌های ساختمانی و اجرای درب‌های دستی لولایی و ریلی در شهرری و تهران.',
    },
    {
      year: '۱۳۸۶',
      title: 'ورود به صنعت درب‌های اتوماتیک هوشمند',
      desc: 'آغاز همکاری با تأمین‌کنندگان مطرح اروپایی و مونتاژ نخستین اپراتورهای الکترومکانیکی اسلایدینگ در ایران.',
    },
    {
      year: '۱۳۹۲',
      title: 'اخذ نمایندگی و بهره‌گیری از موتورهای Dunkermotoren آلمان',
      desc: 'ارتقای استانداردهای تولید به سطح Heavy-Duty و تجهیز ده‌ها شعبه بانکی و بیمارستان‌های تخصصی کشور.',
    },
    {
      year: '۱۳۹۸',
      title: 'توسعه خطوط پارتیشن‌های فریم‌لس آکوستیک',
      desc: 'طراحی پروفیل‌های اسلیم اختصاصی و اجرای پروژه‌های مدرن اداری در پژوهشکده‌ها و برج‌های فاخر پایتخت.',
    },
    {
      year: 'اکنون (۱۴۰۴)',
      title: 'بیش از ۸۵۰ پروژه موفق و پیشگامی در فناوری شیشه‌های هوشمند',
      desc: 'ارائه ۲۴ ماه گارانتی طلایی تعویض قطعات و بهره‌گیری از هوشمندترین سیستم‌های کنترل تردد و PDLC Smart Glass.',
    },
  ];

  const handleOpenInquiry = (subject: string) => {
    setPrefilledProject(`استعلام: ${subject}`);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] flex flex-col justify-between selection:bg-[#00F090]/30 selection:text-[#06080F]">
      
      {/* Global Navbar */}
      <Navbar onOpenInquiry={() => handleOpenInquiry('مشاوره از صفحه درباره ما')} />

      {/* Main Content Area */}
      <main className="pt-28 sm:pt-32 pb-20 flex-grow">
        
        {/* ========================================================
            1. HERO HEADER SECTION
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/80 bg-[#CBD8E2]/75 backdrop-blur-[20px] shadow-xl overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00F090]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#11172C]/70 mb-6">
              <a href="/" className="hover:text-[#06080F] transition-colors">صفحه اصلی</a>
              <span>←</span>
              <span className="text-[#06080F]">درباره شرکت مهندسی درنا درب</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-white text-[#06080F] text-xs font-bold shadow-xs mb-4">
                  <Award className="w-3.5 h-3.5 text-[#00F090]" />
                  <span>اصالت، تخصص کارگاهی و اعتبار ۲۵ ساله</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06080F] tracking-tight leading-tight mb-6">
                  اصالت ۲۵ ساله در صنعت سازه‌های شیشه‌ای و درب‌های هوشمند
                </h1>

                <p className="text-sm sm:text-base text-[#11172C]/80 font-medium leading-relaxed max-w-2xl mb-8">
                  روایتی از تجربه، مهندسی دقیق و تعهد بی‌وقفه در درنا درب؛ از نخستین کارگاه تخصصی شیشه میرال در سال ۱۳۷۹ تا اجرای سامانه‌های هوشمند درب اتوماتیک و پارتیشن‌های آکوستیک در مراکز حساس و دانشگاهی کشور.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href="/projects" 
                    className="px-5 py-3 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] text-xs font-bold shadow-sm transition-all flex items-center gap-2 border border-[#00F090]/40"
                  >
                    <span>مشاهده پروژه‌ها و رزومه شاخص</span>
                    <ChevronLeft className="w-3.5 h-3.5 text-[#00F090]" />
                  </a>
                  <a 
                    href="/calculator" 
                    className="px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-[#06080F] border border-white text-xs font-bold shadow-xs transition-all"
                  >
                    استعلام آنلاین قیمت پروژه‌ها
                  </a>
                </div>
              </div>

              {/* Numbers & Identity Box */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-7 rounded-3xl bg-[#06080F] text-white border border-white/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[#00F090]/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <span className="text-xs font-bold text-[#CBD8E2]">سابقه رسمی مهندسی</span>
                    <span className="text-2xl font-black font-sans text-[#00F090]">۲۵+ سال</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <span className="text-xs font-bold text-[#CBD8E2]">پروژه‌های اجرایی موفق</span>
                    <span className="text-2xl font-black font-sans text-white">+۸۵۰</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#CBD8E2]">گارانتی طلایی تعویض</span>
                    <span className="text-2xl font-black font-sans text-amber-300">۲۴ ماه</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 border border-white shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#06080F] text-[#00F090] flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#06080F] block">پوشش سراسری پروژه‌ها</span>
                    <span className="text-[#11172C]/70">تهران، البرز و پروژه‌های شاخص سراسر ایران</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            2. TIMELINE OF EXCELLENCE
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#06080F] tracking-tight mb-3">
              مسیر ۲۵ ساله تکامل و نوآوری مهندسی
            </h2>
            <p className="text-xs sm:text-sm text-[#11172C]/80 font-medium">
              از یک کارگاه سنتی شیشه‌بری تا پیشرفته‌ترین مرکز مهندسی سیستم‌های درب اتوماتیک و شیشه‌ای مدرن.
            </p>
          </div>

          <div className="space-y-4">
            {timelineMilestones.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-white/80 bg-[#CBD8E2]/75 backdrop-blur-md shadow-xs hover:shadow-md hover:bg-white/95 transition-all flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
              >
                <div className="w-24 h-12 rounded-2xl bg-[#06080F] text-[#00F090] flex items-center justify-center font-black text-lg font-sans shrink-0 shadow-xs">
                  {item.year}
                </div>
                <div className="flex-grow">
                  <h3 className="text-base font-black text-[#06080F] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#11172C]/80 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================
            3. CORE VALUES & COMMITMENTS
        ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-7 rounded-3xl bg-[#CBD8E2]/75 border border-white/80 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] flex items-center justify-center mb-4 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#06080F] mb-2">تعهد بی‌قید و شرط به کیفیت</h3>
              <p className="text-xs text-[#11172C]/80 leading-relaxed">
                عدم استفاده از موتورهای بی‌کیفیت یا شیشه‌های نامرغوب، و پایبندی صددرصدی به کارت گارانتی طلایی صادرشده.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#CBD8E2]/75 border border-white/80 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] flex items-center justify-center mb-4 shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#06080F] mb-2">سرعت و انضباط در اجرا</h3>
              <p className="text-xs text-[#11172C]/80 leading-relaxed">
                تحویل و نصب پروژه‌های استاندارد در کمتر از ۴۸ تا ۷۲ ساعت با حضور تیم‌های آموزش‌دیده و تجهیزات تراز لیزری.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#CBD8E2]/75 border border-white/80 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] flex items-center justify-center mb-4 shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#06080F] mb-2">شفافیت کامل در قیمت‌گذاری</h3>
              <p className="text-xs text-[#11172C]/80 leading-relaxed">
                ارائه سامانه محاسبه آنلاین قیمت و فاکتور تفکیک‌شده به همراه مشخصات فنی دقیق بدون هزینه‌های پنهان.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Global Luxury Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry('استعلام از فوتر درباره ما')} />

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        prefilledProject={prefilledProject}
      />

    </div>
  );
};
