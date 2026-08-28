import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Award, 
  VolumeX, 
  Ruler, 
  CheckCircle2,
  Sparkles,
  Building,
  Calendar,
  Users,
  ArrowLeft,
  FileCheck2
} from 'lucide-react';

export const EngineeringQuality: React.FC = () => {
  // 4 Key Pillars
  const pillars = [
    {
      id: 1,
      title: '۲۴ ماه گارانتی طلایی موتور و برد',
      subtitle: 'Dorna Golden Warranty',
      description: 'تعویض بی‌قیدوشرط قطعات الکترونیکی، موتور اپراتور و مدار فرمان همراه با ۱۰ سال خدمات پشتیبانی و تأمین قطعات ۲۴/۷ در سراسر کشور.',
      icon: <ShieldCheck className="w-6 h-6 text-[#00F090]" />,
      badge: '۲۴ ماه تعویض بی‌قیدوشرط',
    },
    {
      id: 2,
      title: 'تاییدیه ایمنی و استاندارد سازه',
      subtitle: 'Safety & Structural Standards',
      description: 'انطباق کامل با استاندارد اروپایی EN 16005 و مجهز به رادارهای پرده نوری مادون قرمز جهت تشخیص دقیق عابران و سیستم ضدبرخورد.',
      icon: <Award className="w-6 h-6 text-[#00F090]" />,
      badge: 'استاندارد EN 16005',
    },
    {
      id: 3,
      title: 'عایق‌بندی کامل صوتی و حرارتی',
      subtitle: 'Acoustic & Thermal Insulation',
      description: 'کاهش هدررفت انرژی و افت صوت تا ۴۰ دسی‌بل با بهره‌گیری از درزبندهای مویی متراکم، گسکت‌های EPDM و شیشه‌های سوپرکلیر سکوریت.',
      icon: <VolumeX className="w-6 h-6 text-[#00F090]" />,
      badge: 'افت صدا تا ۴۰dB',
    },
    {
      id: 4,
      title: 'دقت میلی‌متری در تولید و نصب',
      subtitle: 'Millimeter Precision Engineering',
      description: 'شاسی‌کشی تراز بدون کوچک‌ترین لرزش و کالیبراسیون تخصصی میکروکنترلر جهت حرکتی کاملاً روان، بی‌صدا و بدون اصطکاک.',
      icon: <Ruler className="w-6 h-6 text-[#00F090]" />,
      badge: 'تراز لیزری دیجیتال',
    },
  ];

  // 3 Key Stats
  const stats = [
    {
      id: 1,
      value: '+۸۵۰',
      label: 'پروژه‌های فاخر اجرا شده',
      sublabel: 'در مناطق لوکس ۱ تا ۵ تهران و برج‌های نمادین',
      icon: <Building className="w-5 h-5 text-[#06080F]" />,
    },
    {
      id: 2,
      value: '۱۶+',
      label: 'سال تجربه تخصصی',
      sublabel: 'پیشگام در مهندسی درب‌های اتوماتیک و سازه شیشه',
      icon: <Calendar className="w-5 h-5 text-[#06080F]" />,
    },
    {
      id: 3,
      value: '۹۹.۴٪',
      label: 'رضایتمندی مشتریان',
      sublabel: 'شاخص رضایت کارفرمایان، معماران و سازندگان برتر',
      icon: <Users className="w-5 h-5 text-[#06080F]" />,
    },
  ];

  return (
    <section id="engineering" className="py-20 sm:py-24 bg-[#E4EBF1] relative overflow-hidden border-t border-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. TECHNICAL STANDARDS & GUARANTEE SECTION (۴ ستون اصلی)
        ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CBD8E2]/80 border border-white/80 text-[#11172C] text-xs font-bold shadow-xs backdrop-blur-md mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
              <span>تعهد به کیفیت مهندسی پایدار</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06080F] tracking-tight">
              استانداردها و تعهدات مهندسی
            </h2>

            <p className="text-xs sm:text-sm text-[#11172C]/80 font-medium mt-2.5 max-w-2xl mx-auto leading-relaxed">
              تلفیق قطعات تراز اول بین‌المللی، مونتاژ دقیق کارگاهی و تکنسین‌های ارشد اجرایی ضامن دوام مادام‌العمر سازه‌های درنا درب است.
            </p>
          </motion.div>
        </div>

        {/* 4 Glassmorphic Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#CBD8E2]/60 backdrop-blur-[16px] border border-white/80 shadow-xs hover:shadow-md hover:bg-[#CBD8E2]/90 transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/70 border border-white/90 flex items-center justify-center shadow-xs text-[#06080F] group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/70 text-[#06080F] border border-white/80">
                    {pillar.badge}
                  </span>
                </div>

                {/* Pillar Title */}
                <h3 className="text-base font-extrabold text-[#06080F] tracking-tight transition-colors">
                  {pillar.title}
                </h3>

                {/* English Subtitle */}
                <p className="text-[11px] font-bold text-[#11172C]/60 tracking-wide mt-1 uppercase font-sans">
                  {pillar.subtitle}
                </p>

                {/* Pillar Description */}
                <p className="text-xs text-[#11172C] font-normal leading-relaxed mt-3.5">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Verification Label */}
              <div className="mt-6 pt-4 border-t border-white/50 flex items-center gap-1.5 text-[11px] font-bold text-[#11172C]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#06080F]" />
                <span>دارای پروتکل کنترل کیفی (QC)</span>
              </div>

              {/* Subtle Bottom Accent Bar on Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00F090] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
            </motion.div>
          ))}
        </div>

        {/* ========================================================
            2. BRAND CREDENTIALS & STATS (آمار و پرستیژ برند)
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#CBD8E2]/75 backdrop-blur-[20px] border border-white/80 p-6 sm:p-8 lg:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/60">
            {stats.map((stat, sIdx) => (
              <div 
                key={stat.id} 
                className={`flex flex-col items-center text-center ${sIdx !== 0 ? 'pt-6 md:pt-0' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/90 flex items-center justify-center mb-3 shadow-xs text-[#06080F]">
                  {stat.icon}
                </div>
                
                {/* Count-Up Metric Number */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06080F] tracking-tight font-sans">
                  {stat.value}
                </div>

                {/* Metric Label */}
                <h4 className="text-sm sm:text-base font-extrabold text-[#06080F] mt-2">
                  {stat.label}
                </h4>

                {/* Subtitle */}
                <p className="text-xs text-[#11172C]/70 font-medium mt-1 max-w-[240px]">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Standards Page Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#CBD8E2]/80 backdrop-blur-md border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/90 flex items-center justify-center shrink-0 text-[#06080F]">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#06080F] block">
                تعهدنامه رسمی ۲۴ ماه گارانتی طلایی و ۱۰ سال پشتیبانی فنی درنا درب
              </span>
              <span className="text-[11px] sm:text-xs text-[#11172C]/80 font-medium">
                مشاهده متن کامل ضمانت‌نامه، شرایط تعویض بی‌قیدوشرط و چک‌لیست استانداردهای اروپایی EN 16005
              </span>
            </div>
          </div>

          <a
            href="standards.html"
            id="btn-standards-page"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#06080F] hover:bg-[#11172C] text-[#00F090] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-[#00F090]/40 hover:border-[#00F090] shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] transition-all active:scale-[0.98] shrink-0 cursor-pointer"
          >
            <span>بررسی استانداردها و گارانتی</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#00F090]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
