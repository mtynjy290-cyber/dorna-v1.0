import React from 'react';
import { MapPin, Clock, ChevronLeft } from 'lucide-react';

export const TehranDistrictsCoverage: React.FC<{ onOpenInquiry: () => void }> = ({ onOpenInquiry }) => {
  const sectors = [
    {
      name: 'برج‌ها و مجتمع‌های مسکونی فاخر',
      nameEn: 'Luxury Residential & High-Rise Towers',
      category: 'پروژه‌های مسکونی لوکس',
      responseTime: 'کمتر از ۴۵ دقیقه',
      description: 'دفتر مرکزی درنا درب در تهران، اعزام فوری مهندس ناظر و بازدید ابعادبرداری لیزری دقیق و رایگان.',
      activeProjects: '۳۴۰+ پروژه مسکونی شاخص',
      tags: ['درب‌های اسلایدینگ لابی', 'پارتیشن فریم‌لس', 'شیشه سوپرکلیر']
    },
    {
      name: 'مراکز تجاری، مال‌ها و فضاهای اداری مدرن',
      nameEn: 'Commercial Malls & Modern Corporate',
      category: 'پروژه‌های تجاری و اداری',
      responseTime: 'کمتر از ۱ ساعت',
      description: 'تامین و نصب انواع درب‌های اتوماتیک اسلایدینگ، سیستم‌های تلسکوپی و پارتیشن‌های عایق صوت اداری.',
      activeProjects: '۲۸۰+ پروژه تجاری مدرن',
      tags: ['ورودی‌های پرتردد', 'پارتیشن دوجداره', 'موتور دانکر آلمان']
    },
    {
      name: 'پنت‌هاوس‌ها و ویلاهای اختصاصی مدرن',
      nameEn: 'Penthouses & Private Luxury Villas',
      category: 'معماری اختصاصی و ویلایی',
      responseTime: 'کمتر از ۱ ساعت',
      description: 'تخصصی‌ترین مجری درب‌های اسلایدینگ اتوماتیک، شیشه‌های هوشمند مات‌شونده و سیستم‌های سفارشی.',
      activeProjects: '۲۱۰+ پروژه اختصاصی',
      tags: ['شیشه هوشمند مات‌شونده', 'اسلایدینگ اتوماتیک', 'حریم خصوصی آنی']
    },
    {
      name: 'هتل‌ها، مراکز اقامتی و دیپلماتیک',
      nameEn: 'Hotels, Hospitality & Diplomatic',
      category: 'هتل‌ها و اماکن بین‌المللی',
      responseTime: 'کمتر از ۱ ساعت',
      description: 'طراحی و اجرای درب‌های گردان لوکس، ورودی‌های تشریفاتی و کرکره‌های برقی شفاف ضدسرقت پلی‌کربنات.',
      activeProjects: '۱۷۰+ پروژه بین‌المللی',
      tags: ['درب گردان هتلی', 'کنترل تردد هوشمند', 'امنیت کلاس ۴']
    },
    {
      name: 'مراکز درمانی، بیمارستان‌ها و کلینیک‌های لوکس',
      nameEn: 'Hospitals & Specialized Medical Centers',
      category: 'پروژه‌های درمانی و بهداشتی',
      responseTime: 'کمتر از ۱ ساعت',
      description: 'نصب سیستم‌های بدون لمس (Touchless)، درب‌های هرمتیک بیمارستانی و اتوماسیون دقیق بهداشتی.',
      activeProjects: '۲۲۰+ پروژه درمانی',
      tags: ['سنسور بدون لمس', 'عایق کامل هوا', 'سیستم آنتی‌باکتریال']
    },
    {
      name: 'شوروم‌ها، گالری‌ها و فضاهای نمایشگاهی',
      nameEn: 'Luxury Showrooms & Retail Galleries',
      category: 'شوروم و فضاهای لوکس',
      responseTime: 'کمتر از ۱ ساعت',
      description: 'ارائه سیستم‌های شفاف ماکزیمم دید، درب‌های تلسکوپی بازشوی وسیع و شیشه‌های ضدخش کریستال.',
      activeProjects: '۱۵۰+ پروژه نمایشگاهی',
      tags: ['حداکثر دید بصری', 'پروفیل اسلیم آنودایز', 'پوشش سراسری تهران']
    }
  ];

  return (
    <section id="districts" className="py-28 sm:py-36 bg-[#E4EBF1] backdrop-blur-md border-t border-white/60">
      <div className="grid-container-12">
        
        {/* Header (12 Columns) */}
        <div className="grid grid-cols-12 gap-6 mb-16 sm:mb-20">
          <div className="col-span-12 text-center max-w-3xl mx-auto">
            <div 
              style={{ paddingLeft: '21px' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 pl-[21px] rounded-full bg-[#CBD8E2]/80 border border-white/80 text-[#11172C] text-xs font-bold mb-4 shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#06080F]" />
              پوشش سراسری پروژه‌های فاخر تهران
            </div>
            <h2 
              style={{ fontSize: '34px' }}
              className="text-[34px] font-black text-[#06080F] tracking-tight"
            >
              پوشش سراسری پروژه‌های فاخر تهران
            </h2>
            <p 
              style={{ fontSize: '15px' }}
              className="mt-3 text-[15px] text-[#11172C]/80 leading-relaxed"
            >
              تیم‌های مهندسی مقیم درنا درب با همراه داشتن تجهیزات نقشه‌برداری لیزری سه‌بعدی و سمپل‌های پروفیل، در سریع‌ترین زمان ممکن در محل پروژه شما حضور می‌یابند.
            </p>
          </div>
        </div>

        {/* Sectors Grid with 12 Columns (3 cards x 4 cols = 12 cols, 24px gutter) */}
        <div className="grid grid-cols-12 gap-6">
          {sectors.map((item, idx) => (
            <div
              key={idx}
              className="col-span-12 md:col-span-6 lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-[#CBD8E2]/60 backdrop-blur-xl border border-white/80 hover:bg-[#CBD8E2]/90 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-[#00F090] bg-[#06080F] px-3.5 py-1 rounded-full border border-white/10 shadow-xs">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#06080F] bg-[#00F090]/25 border border-[#00F090]/50 px-3 py-0.5 rounded-full font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#06080F]" />
                    <span>اعزام: {item.responseTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#06080F] transition-colors">
                  {item.name}
                </h3>
                <span className="text-[11px] text-[#11172C]/60 font-sans block mb-3">
                  {item.nameEn}
                </span>

                <p className="text-xs sm:text-sm text-[#11172C] leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Popular tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-white/80 text-[#11172C] font-semibold px-3 py-1 rounded-full border border-white/80 shadow-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-3 border-t border-white/50 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#06080F]">
                  {item.activeProjects}
                </span>

                <button
                  onClick={onOpenInquiry}
                  className="text-xs font-black text-[#06080F] flex items-center gap-1.5 group-hover:translate-x-[-3px] transition-transform cursor-pointer"
                >
                  <span>درخواست بازدید فوری</span>
                  <ChevronLeft className="w-3.5 h-3.5 text-[#06080F]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
