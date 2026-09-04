import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Maximize2, 
  Building2
} from 'lucide-react';
import { useSiteContentStore } from '../lib/siteContentStore';

export const LuxuryProjectsShowcase: React.FC<{ onOpenInquiry: () => void }> = ({ onOpenInquiry }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'villa'>('all');
  
  // Selector for memoized projects store
  const storeProjects = useSiteContentStore((state) => state.projects);

  const filters = [
    { id: 'all', label: 'همه پروژه‌ها' },
    { id: 'residential', label: 'برج‌ها و مسکونی' },
    { id: 'commercial', label: 'اداری و تجاری' },
    { id: 'villa', label: 'ویلا و خصوصی' },
  ];

  return (
    <section id="projects" className="py-28 sm:py-36 bg-[#E4EBF1] relative overflow-hidden border-t border-white/60">
      <div className="grid-container-12">
        
        {/* Section Header (12 Columns: 7 col Title + 5 col Filter) */}
        <div className="grid grid-cols-12 gap-6 items-end mb-16 sm:mb-20">
          
          {/* Title & Subtitle with Scroll-Triggered Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CBD8E2]/80 border border-white/80 text-[#11172C] text-xs font-bold shadow-xs backdrop-blur-md mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
              <span>نمونه کارهای شاخص درنا درب</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06080F] tracking-tight">
              پروژه‌ها
            </h2>

            <p className="text-xs sm:text-sm text-[#11172C]/80 font-medium mt-3 max-w-xl leading-relaxed">
              طراحی و اجرای سیستم‌های درب اتوماتیک و سازه‌های شیشه‌ای در پروژه‌های مسکونی، تجاری و اداری
            </p>
          </motion.div>

          {/* Minimalist Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 flex flex-wrap lg:justify-end items-center"
          >
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#CBD8E2]/80 backdrop-blur-md rounded-2xl border border-white/80 shadow-xs">
              {filters.map((tab) => {
                const isSelected = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#06080F] text-[#E4EBF1] shadow-xs'
                        : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* 12-Column Architectural Project Gallery Layout (3 x 4 cols = 12 cols, 24px gutter) */}
        <div className="grid grid-cols-12 gap-6">
          {storeProjects.slice(0, 2).map((project, index) => (
            <div key={project.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/80 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[16/12] h-full"
                onClick={onOpenInquiry}
              >
                {/* High-Resolution Architectural Photography Preview */}
                <img
                  src={project.imageUrl.includes('unsplash.com') ? `${project.imageUrl.split('?')[0]}?auto=format&fit=crop&w=700&q=75` : project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-75"
                />

                {/* Permanent Subtle Gradient for Baseline Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Static Minimalist Location Tag on Top-Right */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                    <MapPin className="w-3 h-3 text-[#00F090]" />
                    <span>{project.district}</span>
                  </span>
                </div>

                {/* Clean Text Overlay on Bottom / On Hover */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  
                  {/* System Type Tag */}
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#06080F] bg-[#00F090] backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/40 shadow-xs">
                      <Layers className="w-3 h-3 text-[#06080F]" />
                      <span>{project.systemType}</span>
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow-sm group-hover:text-[#00F090] transition-colors">
                    {project.title}
                  </h3>

                  {/* Location Subtext */}
                  <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1.5">
                    <span>{project.district}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{project.specs}</span>
                  </p>

                  {/* Extended Details Revealed on Hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden pt-0 group-hover:pt-3">
                    <div className="flex items-center justify-between border-t border-white/20 pt-2.5">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <span>درخواست بازدید و استعلام پروژه مشابه</span>
                        <ArrowLeft className="w-3.5 h-3.5 text-[#00F090] transition-transform group-hover:-translate-x-1" />
                      </span>
                      <span className="text-[10px] text-[#06080F] font-bold bg-[#00F090] px-2 py-0.5 rounded">
                        کیفیت درنا درب
                      </span>
                    </div>
                  </div>

                </div>

                {/* Top-Left Action Corner Icon */}
                <div className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                  <Maximize2 className="w-4 h-4" />
                </div>

              </motion.div>
            </div>
          ))}

          {/* 3rd Card: Premium Architectural Photo Showcase Gateway Card (4 cols) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <motion.a
              href="/projects"
              id="card-projects-archive-link"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-white/80 hover:border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer aspect-[16/12] h-full flex flex-col justify-between p-6 sm:p-7"
            >
              {/* Background luxury architectural photography */}
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=75"
                alt="آرشیو کامل پروژه‌ها"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-[0.80]"
              />

              {/* 25% Overlay so image is vivid and crisp */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-slate-900/10 pointer-events-none" />

              {/* Top Bar with Badge & Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F090] text-[#06080F] text-[11px] font-black shadow-xs backdrop-blur-md border border-white/60">
                  <Sparkles className="w-3 h-3 text-[#06080F]" />
                  <span>+۸۵۰ پروژه اجرایی</span>
                </span>
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center group-hover:bg-[#00F090] group-hover:text-[#06080F] group-hover:border-white transition-all duration-300 shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>

              {/* Center / Bottom Content with bold white typography */}
              <div className="relative z-10 mt-auto">
                <span className="text-[11px] font-bold text-[#00F090] uppercase tracking-wider block mb-1">
                  رزومه و گالری اجرا
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] group-hover:text-[#00F090] transition-colors">
                  +۸۵۰ پروژه لوکس دیگر
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-1.5 leading-relaxed line-clamp-2">
                  مشاهده گالری کامل پروژه‌ها در مجتمع‌های تجاری، بیمارستان‌ها، هتل‌ها و ساختمان‌های اداری و مسکونی
                </p>

                {/* Accent High-Contrast CTA Button */}
                <div className="mt-4 pt-3.5 border-t border-white/20 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00F090] group-hover:bg-[#00D882] text-[#06080F] text-xs font-black shadow-md border border-white/60 transition-all duration-300">
                    <span>مشاهده آرشیو</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-[#06080F] transition-transform duration-300 group-hover:-translate-x-1.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">
                    گالری تصاویر
                  </span>
                </div>
              </div>
            </motion.a>
          </div>

        </div>

        {/* Bottom Showcase CTA (12 Columns) */}
        <div className="grid grid-cols-12 gap-6 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-3xl bg-[#CBD8E2]/80 backdrop-blur-md border border-white/80 shadow-xs">
              <span className="text-xs sm:text-sm font-bold text-[#06080F] px-3">
                بیش از ۸۵۰ پروژه اجرایی موفق در مراکز اداری، تجاری، دانشگاه‌ها، بیمارستان‌ها و پروژه‌های مسکونی
              </span>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onOpenInquiry}
                  id="btn-projects-inquiry"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md shadow-[#00F090]/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>درخواست مشاوره و استعلام</span>
                </button>
                <a
                  href="/projects"
                  id="btn-projects-gallery"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#06080F] hover:bg-[#11172C] text-[#00F090] border border-[#00F090]/40 hover:border-[#00F090] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>مشاهده آرشیو پروژه‌ها</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#00F090]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
