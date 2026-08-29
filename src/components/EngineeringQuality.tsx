import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
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
  FileCheck2,
  ChevronLeft,
  Zap,
  Cpu
} from 'lucide-react';

// 2026 Interactive Modern Engineering Pillar Card
const ModernPillarCard: React.FC<{
  pillar: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    specs: { label: string; val: string }[];
    icon: React.ReactNode;
    badge: string;
  };
  index: number;
}> = ({ pillar, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#06080F]/[0.03] hover:bg-[#06080F]/[0.06] backdrop-blur-xl border border-white/80 hover:border-[#00F090]/40 shadow-[0_4px_20px_rgba(6,8,15,0.03)] hover:shadow-[0_16px_36px_rgba(6,8,15,0.08)] transition-all duration-300 overflow-hidden"
    >
      {/* 2026 Interactive Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              280px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 144, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Top Ambient Edge Glow */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:via-[#00F090]/60 transition-all duration-500" />

      <div>
        {/* Top Header: Icon + Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(0,240,144,0.3)] transition-all duration-300">
            {pillar.icon}
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/80 border border-white text-[#11172C] group-hover:border-[#00F090]/30 group-hover:text-[#06080F] transition-colors shadow-2xs">
            {pillar.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-black text-[#06080F] tracking-tight leading-snug">
          {pillar.title}
        </h3>

        {/* Subtitle */}
        <p className="text-[10px] font-semibold text-[#11172C]/50 font-sans tracking-wide uppercase mt-0.5 mb-3">
          {pillar.subtitle}
        </p>

        {/* Concise High-Trust Specs */}
        <div className="space-y-1.5 py-2.5 my-1 border-y border-white/60">
          {pillar.specs.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[11px] leading-tight">
              <span className="text-[#11172C]/60 font-medium">{item.label}</span>
              <span className="font-bold text-[#06080F] text-left ltr">{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Trust Indicator */}
      <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-bold text-[#06080F]">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090]" />
          <span>پروتکل رسمی کنترل کیفیت (QC)</span>
        </div>
        <ChevronLeft className="w-3.5 h-3.5 text-[#11172C]/40 group-hover:text-[#00F090] group-hover:-translate-x-0.5 transition-all" />
      </div>

      {/* Subtle Bottom Accent Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F090] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </motion.div>
  );
};

// 2026 Interactive High-Impact Stat Card
const ModernStatCard: React.FC<{
  stat: {
    id: number;
    value: string;
    label: string;
    sublabel: string;
    tag: string;
    icon: React.ReactNode;
  };
  index: number;
}> = ({ stat, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#06080F] text-white border border-white/10 hover:border-[#00F090]/50 shadow-[0_10px_30px_rgba(6,8,15,0.25)] hover:shadow-[0_20px_45px_rgba(0,240,144,0.18)] transition-all duration-300 overflow-hidden"
    >
      {/* 2026 Spotlight Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 144, 0.2),
              transparent 80%
            )
          `,
        }}
      />

      {/* Top Subtle Ambient Light */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#00F090]/40 to-transparent group-hover:via-[#00F090] transition-all duration-500" />

      {/* Top Metric Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-[#00F090] flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-[#00F090] group-hover:text-[#06080F] transition-all duration-300 shadow-sm">
          {stat.icon}
        </div>

        <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#CBD8E2] group-hover:border-[#00F090]/40 group-hover:text-[#00F090] transition-colors backdrop-blur-md">
          {stat.tag}
        </span>
      </div>

      {/* Hero Metric Number */}
      <div className="relative z-10">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-sans group-hover:text-[#00F090] transition-colors drop-shadow-md">
          {stat.value}
        </div>

        {/* Label & Description */}
        <h4 className="text-base sm:text-lg font-black text-white mt-3 group-hover:translate-x-[-2px] transition-transform">
          {stat.label}
        </h4>

        <p className="text-xs text-[#CBD8E2]/75 font-medium mt-1.5 leading-relaxed">
          {stat.sublabel}
        </p>
      </div>

      {/* Bottom Subtle Indicator */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#CBD8E2] relative z-10">
        <span className="text-[11px] font-bold text-[#00F090] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          تضمین استاندارد و اصالت
        </span>
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00F090] group-hover:text-[#06080F] transition-all">
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        </div>
      </div>

      {/* Bottom Glowing Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00F090] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </motion.div>
  );
};

export const EngineeringQuality: React.FC = () => {
  // 4 Minimalist High-Trust Pillars with Clear Specs
  const pillars = [
    {
      id: 1,
      title: '۲۴ ماه گارانتی طلایی موتور و برد',
      subtitle: 'DORNA GOLDEN WARRANTY',
      description: 'تعویض بی‌قیدوشرط قطعات الکترونیکی و موتور اپراتور همراه با ۱۰ سال خدمات پشتیبانی.',
      specs: [
        { label: 'گارانتی', val: '۲۴ ماه تعویض قطعه' },
        { label: 'پشتیبانی', val: '۱۰ سال تأمین قطعات ۲۴/۷' },
        { label: 'اعزام', val: 'تکنسین فوری ۲ ساعته' },
      ],
      icon: <ShieldCheck className="w-5 h-5" />,
      badge: '۲۴ ماه تعویض',
    },
    {
      id: 2,
      title: 'تاییدیه ایمنی و استاندارد سازه',
      subtitle: 'SAFETY & EN 16005 NORM',
      description: 'انطباق کامل با استاندارد اروپایی EN 16005 و مجهز به رادارهای پرده نوری مادون قرمز.',
      specs: [
        { label: 'استاندارد', val: 'اروپا EN 16005' },
        { label: 'سنسور', val: 'پرده نوری دوکاره BEA بلژیک' },
        { label: 'ایمنی', val: 'سیستم ضدبرخورد هوشمند' },
      ],
      icon: <Award className="w-5 h-5" />,
      badge: 'استاندارد EN 16005',
    },
    {
      id: 3,
      title: 'عایق‌بندی کامل صوتی و حرارتی',
      subtitle: 'ACOUSTIC & THERMAL SEALING',
      description: 'کاهش هدررفت انرژی و افت صوت تا ۴۰ دسی‌بل با بهره‌گیری از درزبندهای مویی و گسکت‌های EPDM.',
      specs: [
        { label: 'عایق صوت', val: 'کاهش تا ۴۰ دسی‌بل' },
        { label: 'درزبند', val: 'مویی متراکم + EPDM آلمان' },
        { label: 'شیشه', val: 'سکوریت سوپرکلیر ۱۰ میل' },
      ],
      icon: <VolumeX className="w-5 h-5" />,
      badge: 'افت صدا تا ۴۰dB',
    },
    {
      id: 4,
      title: 'دقت میلی‌متری در تولید و نصب',
      subtitle: 'MILLIMETER PRECISION',
      description: 'شاسی‌کشی تراز بدون کوچک‌ترین لرزش و کالیبراسیون تخصصی میکروکنترلر.',
      specs: [
        { label: 'تراز', val: 'لیزری دیجیتال ۳D' },
        { label: 'شاسی', val: 'قوطی سنگین صنعتی ضدلرزش' },
        { label: 'حرکت', val: 'روان، سایلنت و بدون لرزه' },
      ],
      icon: <Ruler className="w-5 h-5" />,
      badge: 'تراز دیجیتال',
    },
  ];

  // 3 High-Impact Prestige Stats
  const stats = [
    {
      id: 1,
      value: '+۸۵۰',
      label: 'پروژه‌های فاخر اجرا شده',
      sublabel: 'در مناطق لوکس ۱ تا ۵ تهران و برج‌های نمادین',
      tag: 'PROJECTS',
      icon: <Building className="w-6 h-6" />,
    },
    {
      id: 2,
      value: '۱۶+',
      label: 'سال تجربه تخصصی',
      sublabel: 'پیشگام در مهندسی درب‌های اتوماتیک و سازه شیشه',
      tag: 'EXPERIENCE',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      id: 3,
      value: '۹۹.۴٪',
      label: 'رضایتمندی مشتریان',
      sublabel: 'شاخص رضایت کارفرمایان، معماران و سازندگان برتر',
      tag: 'SATISFACTION',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <section id="engineering" className="py-20 sm:py-24 bg-[#E4EBF1] relative overflow-hidden border-t border-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. TECHNICAL STANDARDS & GUARANTEE SECTION (۴ ستون اصلی)
        ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06080F]/[0.04] border border-white/90 text-[#06080F] text-xs font-bold shadow-2xs backdrop-blur-md mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00F090]" />
              <span>تعهد به کیفیت مهندسی پایدار</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#06080F] tracking-tight">
              استانداردها و تعهدات مهندسی
            </h2>

            <p className="text-xs sm:text-sm text-[#11172C]/70 mt-1.5 font-medium leading-relaxed">
              تلفیق قطعات تراز اول بین‌المللی، مونتاژ دقیق کارگاهی و تکنسین‌های ارشد اجرایی
            </p>
          </motion.div>
        </div>

        {/* 4 Spotlight Modern Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {pillars.map((pillar, index) => (
            <ModernPillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
            />
          ))}
        </div>

        {/* ========================================================
            2. HIGH-IMPACT PRESTIGE STATS (پروژه‌های فاخر، سابقه، رضایتمندی)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-8">
          {stats.map((stat, sIdx) => (
            <ModernStatCard
              key={stat.id}
              stat={stat}
              index={sIdx}
            />
          ))}
        </div>

        {/* Bottom Standards Page Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#06080F]/[0.03] hover:bg-[#06080F]/[0.06] backdrop-blur-xl border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
        >
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 flex items-center justify-center shrink-0 shadow-sm">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#06080F] block">
                تعهدنامه رسمی ۲۴ ماه گارانتی طلایی و ۱۰ سال پشتیبانی فنی درنا درب
              </span>
              <span className="text-[11px] sm:text-xs text-[#11172C]/70 font-medium">
                مشاهده متن کامل ضمانت‌نامه، شرایط تعویض بی‌قیدوشرط و چک‌لیست استانداردهای اروپایی EN 16005
              </span>
            </div>
          </div>

          <a
            href="standards.html"
            id="btn-standards-page"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#06080F] hover:bg-[#11172C] text-[#00F090] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-[#00F090]/40 hover:border-[#00F090] shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] transition-all active:scale-[0.98] shrink-0 cursor-pointer"
          >
            <span>بررسی استانداردها و گارانتی</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#00F090]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
