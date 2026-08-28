import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  DollarSign,
  Layers,
  Image as ImageIcon,
  Check,
  Save,
  RotateCcw,
  ExternalLink,
  Eye,
  Sliders,
  Building,
  Wrench,
  CheckCircle2,
  Info,
  ShieldAlert,
  ArrowUpRight,
  Plus,
  Trash2
} from 'lucide-react';
import {
  useSiteContentStore,
  DEFAULT_HERO_CONTENT,
  DEFAULT_BRAND_CONTENT,
  DEFAULT_CONTACT_CONTENT,
  DEFAULT_PRICING_CONTENT,
  DEFAULT_SERVICES_CONTENT,
  DEFAULT_PROJECTS_CONTENT,
  ProjectShowcaseItem
} from '../lib/siteContentStore';

export const AdminCmsView: React.FC = () => {
  const hero = useSiteContentStore((state) => state.hero);
  const updateHero = useSiteContentStore((state) => state.updateHero);

  const brand = useSiteContentStore((state) => state.brand);
  const updateBrand = useSiteContentStore((state) => state.updateBrand);

  const contact = useSiteContentStore((state) => state.contact);
  const updateContact = useSiteContentStore((state) => state.updateContact);

  const pricing = useSiteContentStore((state) => state.pricing);
  const updatePricing = useSiteContentStore((state) => state.updatePricing);

  const services = useSiteContentStore((state) => state.services);
  const updateServices = useSiteContentStore((state) => state.updateServices);
  const updateServiceItem = useSiteContentStore((state) => state.updateServiceItem);

  const projects = useSiteContentStore((state) => state.projects);
  const updateProjects = useSiteContentStore((state) => state.updateProjects);
  const updateProjectItem = useSiteContentStore((state) => state.updateProjectItem);

  const resetToDefaults = useSiteContentStore((state) => state.resetToDefaults);

  // Sub-tab selection for Live CMS
  type CmsTab = 'hero' | 'contact' | 'pricing' | 'services' | 'projects';
  const [activeTab, setActiveTab] = useState<CmsTab>('hero');

  // Save Notification Feedback
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTriggerSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('آیا از بازنشانی کلیه متون، تصاویر و فرمول‌های محتوایی سایت به مقادیر اولیه اطمینان دارید؟')) {
      resetToDefaults();
      handleTriggerSave();
    }
  };

  const handleAddNewProject = () => {
    const newProj: ProjectShowcaseItem = {
      id: `proj_${Date.now()}`,
      title: 'پروژه جدید دُرنا دَرب',
      district: 'منطقه ۱ - تهران',
      systemType: 'درب اتوماتیک اسلایدینگ تلسکوپی',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      year: '۱۴۰۴',
      specs: 'موتور دانکر آلمان • شیشه سوپرکلیر ۱۰ میل'
    };
    updateProjects([...projects, newProj]);
    handleTriggerSave();
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('آیا از حذف این پروژه از ویترین سایت اطمینان دارید؟')) {
      updateProjects(projects.filter((p) => p.id !== id));
      handleTriggerSave();
    }
  };

  // Sample quick calculation simulation for live pricing formula
  const sampleWidth = 2.4;
  const sampleHeight = 2.2;
  const sampleSqm = sampleWidth * sampleHeight;
  const slidingCalculatedSample = pricing.slidingBase + (sampleSqm * pricing.slidingPerSqm);

  return (
    <div className="space-y-6 text-slate-100 font-vazir" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>مدیریت محتوای زنده وب‌سایت (Live CMS)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>اتصال مستقیم و همگام‌سازی آنی</span>
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                تغییرات اعمال‌شده در این بخش، بلافاصله در ویترین عمومی، هیرو، کارت‌های خدمات، گالری پروژه‌ها و محاسبه‌گر قیمت منعکس می‌شود.
              </p>
            </div>
          </div>
        </div>

        {/* Global CMS Actions */}
        <div className="flex items-center gap-2.5 relative z-10 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-sm"
            title="مشاهده صفحه اصلی وب‌سایت"
          >
            <span>پیش‌نمایش سایت</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
          </a>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-red-950/40 text-slate-400 hover:text-red-300 text-xs font-semibold border border-slate-700/80 transition-all cursor-pointer"
            title="بازگردانی به مقادیر پیش‌فرض"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">بازنشانی پیش‌فرض</span>
          </button>

          <button
            onClick={handleTriggerSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold shadow-lg shadow-indigo-900/30 transition-all cursor-pointer active:scale-95"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>ذخیره شد!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>ذخیره تغییرات</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'hero'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>هیرو و تیتر اصلی سایت</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'contact'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
          }`}
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>اطلاعات برند و شماره‌های تماس</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'pricing'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
          }`}
        >
          <DollarSign className="w-4 h-4 shrink-0" />
          <span>فرمول و ضرایب زنده قیمت</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'services'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>کارت‌های خدمات ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
          }`}
        >
          <ImageIcon className="w-4 h-4 shrink-0" />
          <span>ویترین پروژه‌ها و تصاویر ({projects.length})</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* 1. HERO CMS TAB */}
      {/* ==================================================================== */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Edit Form (2 cols) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>تنظیمات تیتر، بج و دکمه‌های فراخوان بخش هیرو (Hero)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                تیتر اصلی نخستین عبارتی است که کارفرمایان و معماران هنگام ورود به وب‌سایت مشاهده می‌نمایند.
              </p>
            </div>

            <div className="space-y-4">
              {/* Main Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  تیتر اصلی بخش هیرو (Headline)
                </label>
                <input
                  type="text"
                  value={hero.headline}
                  onChange={(e) => updateHero({ headline: e.target.value })}
                  placeholder="تلاقی شیشه، نور و مهندسی مدرن"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  پیشنهاد معمارانه: «تلاقی شیشه، نور و مهندسی مدرن»
                </span>
              </div>

              {/* Badge and Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    متن بج شناور بالای تیتر (Badge)
                  </label>
                  <input
                    type="text"
                    value={hero.badgeText}
                    onChange={(e) => updateHero({ badgeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    وضعیت فنی اپراتور روی کاور
                  </label>
                  <input
                    type="text"
                    value={hero.operatorStatus}
                    onChange={(e) => updateHero({ operatorStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* CTA 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    متن دکمه اصلی (Primary CTA)
                  </label>
                  <input
                    type="text"
                    value={hero.ctaPrimaryText}
                    onChange={(e) => updateHero({ ctaPrimaryText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    لینک دکمه اصلی
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={hero.ctaPrimaryLink}
                    onChange={(e) => updateHero({ ctaPrimaryLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* CTA 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    متن دکمه ثانویه (Secondary CTA)
                  </label>
                  <input
                    type="text"
                    value={hero.ctaSecondaryText}
                    onChange={(e) => updateHero({ ctaSecondaryText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    لینک دکمه ثانویه
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={hero.ctaSecondaryLink}
                    onChange={(e) => updateHero({ ctaSecondaryLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Poster Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  آدرس تصویر پس‌زمینه داخل لابی (Poster / Foyer Image URL)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={hero.posterUrl}
                  onChange={(e) => updateHero({ posterUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  آدرس فایل ویدیویی اسکرول درب (اختیاری: Video MP4 URL)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="assets/door-scroll.mp4 (در صورت خالی بودن، موتور شبیه‌ساز Canvas GPU فعال می‌ماند)"
                  value={hero.videoUrl}
                  onChange={(e) => updateHero({ videoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  موتور وب‌سایت در نبود ویدیو با شتاب سخت‌افزاری ۶۰ فریم بر ثانیه شبیه‌سازی اپراتور را نمایش می‌دهد.
                </span>
              </div>
            </div>
          </div>

          {/* Live Hero Mini Preview (1 col) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>پیش‌نمایش زنده نمای هیرو</span>
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Glassmorphic</span>
              </div>

              {/* Glass Card Simulation */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950/80 p-5 space-y-4 shadow-inner">
                {/* Background image preview if available */}
                {hero.posterUrl && (
                  <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${hero.posterUrl})` }}
                  />
                )}

                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>{hero.badgeText || 'سیستم‌های هوشمند درب اتوماتیک'}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    {hero.headline || 'تلاقی شیشه، نور و مهندسی مدرن'}
                  </h3>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-[11px] font-bold shadow-sm">
                      {hero.ctaPrimaryText}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700 text-[11px] font-medium">
                      {hero.ctaSecondaryText}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>STATUS:</span>
                    <span className="text-emerald-400 font-bold">{hero.operatorStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-slate-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>حفاظت از ساختار (Layout Lock)</span>
              </div>
              <p>
                ویرایش متون و رسانه‌ها بدون هرگونه تداخل در چیدمان و ریسپانسیو موبایل انجام می‌گیرد.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. CONTACT & BRAND CMS TAB */}
      {/* ==================================================================== */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Brand Identity */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                <span>هویت و مشخصات برند {brand.name}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                این مقادیر در هدر، فوتر، متادیتا و اسناد رسمی پیش‌فاکتور استفاده می‌شوند.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    نام تجاری فارسی
                  </label>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => updateBrand({ name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    نام لاتین برند (English)
                  </label>
                  <input
                    type="text"
                    value={brand.nameEn}
                    onChange={(e) => updateBrand({ nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  شعار مهندسی برند (Tagline)
                </label>
                <input
                  type="text"
                  value={brand.tagline}
                  onChange={(e) => updateBrand({ tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  سال تأسیس مجموعه
                </label>
                <input
                  type="number"
                  value={brand.establishedYear}
                  onChange={(e) => updateBrand({ establishedYear: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Numbers & Channels */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>شماره‌های تماس و آدرس دفتر مرکزی</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                لینک‌های مستقیم تماس، دکمه‌های شناور واتس‌اپ و اطلاعات فوتر با این مقادیر فعال هستند.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    تلفن ثابت دفتر مرکزی
                  </label>
                  <input
                    type="text"
                    value={contact.centralPhone}
                    onChange={(e) => updateContact({ centralPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    موبایل مستقیم کارشناس ارشد
                  </label>
                  <input
                    type="text"
                    value={contact.directMobile}
                    onChange={(e) => updateContact({ directMobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  شماره واتس‌اپ استعلام (بدون صفر اول و با کد کشور)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={contact.whatsappNumber}
                  onChange={(e) => updateContact({ whatsappNumber: e.target.value })}
                  placeholder="989122009876"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs text-left focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  آدرس دفتر مرکزی و شوروم
                </label>
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) => updateContact({ address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  ساعات کاری و پاسخگویی
                </label>
                <input
                  type="text"
                  value={contact.workingHours}
                  onChange={(e) => updateContact({ workingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. DYNAMIC PRICING FORMULA CMS TAB */}
      {/* ==================================================================== */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Rate Sliders and Inputs (2 cols) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-400" />
                <span>نرخ‌های پایه و ضرایب فرمول محاسبه‌گر آنلاین قیمت</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                تغییر ارقام ذیل بلافاصله بر ماشین‌حساب آنلاین قیمت سایت و استعلام‌های هوشمند لحظه‌ای اعمال خواهد شد.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Sliding Door Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>سیستم درب اتوماتیک اسلایدینگ (Sliding)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      هزینه پایه پکیج اپراتور اسلایدینگ (تومان)
                    </label>
                    <input
                      type="number"
                      value={pricing.slidingBase}
                      onChange={(e) => updatePricing({ slidingBase: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      معادل: {(pricing.slidingBase / 1000000).toLocaleString('fa-IR')} میلیون تومان
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      نرخ هر مترمربع شیشه و فریم اسلایدینگ (تومان)
                    </label>
                    <input
                      type="number"
                      value={pricing.slidingPerSqm}
                      onChange={(e) => updatePricing({ slidingPerSqm: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      معادل: {(pricing.slidingPerSqm / 1000000).toLocaleString('fa-IR')} میلیون تومان / مترمربع
                    </span>
                  </div>
                </div>
              </div>

              {/* Telescopic Door Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>سیستم درب اتوماتیک تلسکوپی (Telescopic)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      هزینه پایه پکیج اپراتور تلسکوپی (تومان)
                    </label>
                    <input
                      type="number"
                      value={pricing.telescopicBase}
                      onChange={(e) => updatePricing({ telescopicBase: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      معادل: {(pricing.telescopicBase / 1000000).toLocaleString('fa-IR')} میلیون تومان
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      نرخ هر مترمربع شیشه و فریم تلسکوپی (تومان)
                    </label>
                    <input
                      type="number"
                      value={pricing.telescopicPerSqm}
                      onChange={(e) => updatePricing({ telescopicPerSqm: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      معادل: {(pricing.telescopicPerSqm / 1000000).toLocaleString('fa-IR')} میلیون تومان / مترمربع
                    </span>
                  </div>
                </div>
              </div>

              {/* Frameless Partition & Luxury Add-ons */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>پارتیشن فریم‌لس و آپشن‌های لوکس</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      پایه یراق‌آلات پارتیشن فریم‌لس (تومان)
                    </label>
                    <input
                      type="number"
                      value={pricing.framelessBase}
                      onChange={(e) => updatePricing({ framelessBase: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      نرخ هر مترمربع شیشه پارتیشن (تومان)
                    </label>
                    <input
                      type="number"
                      value={pricing.framelessPerSqm}
                      onChange={(e) => updatePricing({ framelessPerSqm: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-800/60">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      افزونه شیشه هوشمند PDLC (مترمربع)
                    </label>
                    <input
                      type="number"
                      value={pricing.smartGlassPerSqm}
                      onChange={(e) => updatePricing({ smartGlassPerSqm: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      افزونه روکش فریم PVD طلایی / تیتانیوم (مترطول)
                    </label>
                    <input
                      type="number"
                      value={pricing.goldPvdPerMeter}
                      onChange={(e) => updatePricing({ goldPvdPerMeter: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Real-time Calculation Check (1 col) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تست زنده فرمول محاسبه‌گر</span>
                </span>
                <span className="text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs text-slate-300 font-semibold">
                  شبیه‌سازی یک درب اسلایدینگ استاندارد:
                </div>
                <div className="text-[11px] text-slate-400 space-y-1.5">
                  <div className="flex justify-between">
                    <span>عرض ورودی:</span>
                    <span className="text-white font-mono">{sampleWidth} متر</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ارتفاع بازشو:</span>
                    <span className="text-white font-mono">{sampleHeight} متر</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مساحت شیشه و فریم:</span>
                    <span className="text-white font-mono">{sampleSqm.toFixed(2)} مترمربع</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800">
                    <span>پایه اپراتور:</span>
                    <span className="text-indigo-300 font-mono">{(pricing.slidingBase).toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span>هزینه شیشه و فریم:</span>
                    <span className="text-indigo-300 font-mono">{Math.round(sampleSqm * pricing.slidingPerSqm).toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/50 mt-3">
                  <div className="text-[11px] text-slate-400">برآورد کل پروژه نمونه:</div>
                  <div className="text-lg font-black text-indigo-400 font-mono mt-0.5">
                    {Math.round(slidingCalculatedSample).toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-300">تومان</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              با تغییر اعداد سمت راست، مبالغ بالا و تمام محاسبه‌گرهای وب‌سایت همزمان به‌روزرسانی می‌شوند.
            </div>
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. SERVICES CARDS CMS TAB */}
      {/* ==================================================================== */}
      {activeTab === 'services' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>مدیریت کارت‌های خدمات و سیستم‌های مهندسی</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                عناوین، توضیحات و مشخصات کلیدی کارت‌های نوار خدمات اصلی سایت
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
              {services.length} کارت فعال
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <span>{item.titleFa}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{item.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">عنوان فارسی</label>
                    <input
                      type="text"
                      value={item.titleFa}
                      onChange={(e) => updateServiceItem(item.id, { titleFa: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">عنوان لاتین</label>
                    <input
                      type="text"
                      value={item.titleEn}
                      onChange={(e) => updateServiceItem(item.id, { titleEn: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">توضیحات کوتاه مهندسی</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => updateServiceItem(item.id, { description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. PROJECTS & SHOWCASE CMS TAB */}
      {/* ==================================================================== */}
      {activeTab === 'projects' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                <span>مدیریت گالری پروژه‌ها، تصاویر و ویترین رزومه سایت</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                پروژه‌های شاخص در بخش نمونه‌کارهای مناطق ۱ تا ۵ تهران با تصاویر و مشخصات فنی کامل
              </p>
            </div>

            <button
              onClick={handleAddNewProject}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن پروژه جدید به ویترین</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors relative"
              >
                {/* Top bar with image thumbnail */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {proj.imageUrl && (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                      />
                    )}
                    <div>
                      <span className="text-xs font-bold text-white block truncate">{proj.title}</span>
                      <span className="text-[10px] text-indigo-400">{proj.district}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="حذف این پروژه از ویترین"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-400 mb-1">نام پروژه / ساختمان</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProjectItem(proj.id, { title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">منطقه / موقعیت</label>
                    <input
                      type="text"
                      value={proj.district}
                      onChange={(e) => updateProjectItem(proj.id, { district: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">نوع سیستم نصب‌شده</label>
                  <input
                    type="text"
                    value={proj.systemType}
                    onChange={(e) => updateProjectItem(proj.id, { systemType: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">آدرس تصویر پروژه (Image URL)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={proj.imageUrl}
                    onChange={(e) => updateProjectItem(proj.id, { imageUrl: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono text-left focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] text-slate-400 mb-1">مشخصات فنی شیشه و موتور</label>
                    <input
                      type="text"
                      value={proj.specs}
                      onChange={(e) => updateProjectItem(proj.id, { specs: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">سال اجرا</label>
                    <input
                      type="text"
                      value={proj.year}
                      onChange={(e) => updateProjectItem(proj.id, { year: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono text-center focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
