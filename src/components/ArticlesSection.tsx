import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowLeft, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { ARTICLES_DATA } from '../data/articlesData';

export const ArticlesSection: React.FC = () => {
  const articles = ARTICLES_DATA;

  return (
    <section id="articles" className="py-28 sm:py-36 bg-[#E4EBF1] backdrop-blur-md border-b border-white/60">
      <div className="grid-container-12">
        
        {/* Section Header (12 Columns) with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-6 items-end mb-16 sm:mb-20"
        >
          <div className="col-span-12 md:col-span-8">
            <span className="text-xs font-bold text-[#11172C] bg-[#CBD8E2]/80 border border-white/80 px-3.5 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5 mb-3.5">
              <BookOpen className="w-3.5 h-3.5 text-[#06080F]" />
              دانشنامه و مقالات تخصصی
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06080F] mt-2 tracking-tight">
              مقالات و راهنماهای مهندسی
            </h2>
            <p className="text-xs sm:text-sm text-[#11172C]/80 mt-3 max-w-2xl leading-relaxed">
              جدیدترین مطالب آموزشی، استانداردهای روز دنیا و تحلیل‌های فنی درب‌های اتوماتیک و سازه‌های شیشه‌ای.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 flex md:justify-end items-center gap-2">
            <span className="text-xs font-bold text-[#11172C]/70">
              ۵ راهنمای مرجع تخصصی سازه‌های شیشه‌ای و درب اتوماتیک
            </span>
          </div>
        </motion.div>

        {/* 12-Column Articles Grid (3 x 4 cols = 12 cols, 24px gutter) */}
        <div className="grid grid-cols-12 gap-6">
          {articles.slice(0, 2).map((article, idx) => (
            <div key={article.id} className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col">
              <motion.a
                href={`/blog?id=${article.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 rounded-3xl bg-[#CBD8E2]/60 backdrop-blur-xl border border-white/80 hover:bg-[#CBD8E2]/90 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between cursor-pointer h-full"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={article.image.includes('unsplash.com') ? `${article.image.split('?')[0]}?auto=format&fit=crop&w=600&q=75` : article.image}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 bg-[#06080F]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#00F090] border border-white/15">
                      {article.category}
                    </span>
                  </div>

                  {/* Article Meta */}
                  <div className="flex items-center gap-4 text-[11px] text-[#11172C]/70 mb-2.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#11172C]/60" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#11172C]/60" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-base font-extrabold text-[#06080F] group-hover:text-[#06080F] transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#11172C] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="mt-5 pt-3.5 border-t border-white/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#06080F] flex items-center gap-1 transition-colors">
                    مطالعه کامل در صفحه اختصاصی
                    <ArrowLeft className="w-3.5 h-3.5 text-[#06080F] group-hover:-translate-x-1 transition-transform" />
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-[#06080F] group-hover:bg-[#00F090] group-hover:text-[#06080F] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.a>
            </div>
          ))}

          {/* 3rd Card: Premium Architectural Photo Knowledge Archive Card (4 cols) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col">
            <motion.a
              href="/blog"
              id="card-blog-archive-preview"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-white/80 hover:border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer min-h-[380px] h-full flex flex-col justify-between p-6 sm:p-7"
            >
              {/* Background architectural/technical library photography */}
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=75"
                alt="پایگاه دانش معماری درنا درب"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-[0.80]"
              />

              {/* 25% Overlay so photography is clearly visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-slate-900/10 pointer-events-none" />

              {/* Top Bar with Badge & Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F090] text-[#06080F] text-[11px] font-black shadow-xs backdrop-blur-md border border-white/60">
                  <BookOpen className="w-3 h-3 text-[#06080F]" />
                  <span>پایگاه دانش معماری</span>
                </span>
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center group-hover:bg-[#00F090] group-hover:text-[#06080F] group-hover:border-white transition-all duration-300 shadow-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>

              {/* Center / Bottom Content with bold white typography */}
              <div className="relative z-10 mt-auto">
                <span className="text-[11px] font-bold text-[#00F090] uppercase tracking-wider block mb-1">
                  مجله تخصصی درنا درب
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] group-hover:text-[#00F090] transition-colors">
                  آرشیو مقالات و تحلیل‌های فنی
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
                  راهنمای شیشه‌های سوپرکلیر و لمینت، موتورهای دانکر آلمان، پارتیشن‌های آکوستیک، ترمال‌بریک و فریم‌های آنودایز
                </p>

                {/* Accent High-Contrast CTA Button */}
                <div className="mt-5 pt-3.5 border-t border-white/20 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00F090] group-hover:bg-[#00D882] text-[#06080F] text-xs font-black shadow-md border border-white/60 transition-all duration-300">
                    <span>مشاهده هر ۵ مقاله تخصصی</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-[#06080F] transition-transform duration-300 group-hover:-translate-x-1.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">
                    ۵ مقاله تخصصی
                  </span>
                </div>
              </div>
            </motion.a>
          </div>

        </div>

        {/* Bottom Blog CTA Link (12 Columns) */}
        <div className="grid grid-cols-12 gap-6 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 text-center"
          >
            <a
              href="/blog"
              id="btn-blog-archive"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#06080F] hover:bg-[#11172C] text-[#00F090] font-bold text-xs sm:text-sm border border-[#00F090]/40 hover:border-[#00F090] shadow-[0_0_12px_rgba(0,240,144,0.12)] hover:shadow-[0_0_16px_rgba(0,240,144,0.25)] transition-all active:scale-[0.98] cursor-pointer group"
            >
              <BookOpen className="w-4 h-4 text-[#00F090]" />
              <span>مشاهده دانشنامه و مقالات تخصصی</span>
              <ArrowLeft className="w-4 h-4 text-[#00F090] group-hover:-translate-x-1.5 transition-transform" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
