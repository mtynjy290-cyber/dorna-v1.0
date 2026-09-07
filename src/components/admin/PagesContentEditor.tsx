import React, { useState } from 'react';
import {
  Home,
  Briefcase,
  FileText,
  Layers,
  Sliders,
  Calculator,
  Building2,
  ShieldCheck,
  Save,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Sparkles,
  Info,
  Phone,
  Clock,
  MapPin,
  Mail,
  MessageCircle,
  Video,
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';
import { useSiteContentStore, ServiceContentItem, DEFAULT_ABOUT_CONTENT } from '../../lib/siteContentStore';
import { ImageDropUploader } from './ImageDropUploader';
import { GlassLabManager } from './GlassLabManager';
import { ProjectRecord, ArticleRecord } from '../../lib/supabase';

export type PageSubTab =
  | 'home'
  | 'projects'
  | 'blog'
  | 'products'
  | 'services'
  | 'calculator'
  | 'about'
  | 'standards';

interface SubTabItem {
  id: PageSubTab;
  title: string;
  badge: string;
  icon: React.ElementType;
  pageUrl: string;
}

const SUB_TABS: SubTabItem[] = [
  { id: 'home', title: 'صفحه اصلی', badge: 'Home', icon: Home, pageUrl: '/' },
  { id: 'projects', title: 'پروژه‌ها و رزومه', badge: 'Projects', icon: Briefcase, pageUrl: '/projects.html' },
  { id: 'blog', title: 'وبلاگ و مقالات', badge: 'Blog', icon: FileText, pageUrl: '/blog.html' },
  { id: 'products', title: 'محصولات و سیستم‌ها', badge: 'Products', icon: Layers, pageUrl: '/products.html' },
  { id: 'services', title: 'خدمات مهندسی', badge: 'Services', icon: Sliders, pageUrl: '/services.html' },
  { id: 'calculator', title: 'محاسبه‌گر قیمت', badge: 'Calculator', icon: Calculator, pageUrl: '/calculator.html' },
  { id: 'about', title: 'درباره ما و کارخانه', badge: 'About', icon: Building2, pageUrl: '/about.html' },
  { id: 'standards', title: 'استانداردها و متریال', badge: 'Standards', icon: ShieldCheck, pageUrl: '/standards.html' },
];

export const PagesContentEditor: React.FC<{ initialSubTab?: PageSubTab }> = ({ initialSubTab = 'home' }) => {
  const [activeSubTab, setActiveSubTab] = useState<PageSubTab>(initialSubTab);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    articles,
    projects,
    openArticleEditor,
    deleteArticle,
    toggleArticleFeatured,
    saveProject,
    deleteProject,
    toggleProjectFeatured,
    addAuditLog,
    setStatusMessage,
  } = useAdminStore();

  const siteContent = useSiteContentStore();

  // Local draft states for snappy editing
  const [heroDraft, setHeroDraft] = useState(siteContent.hero);
  const [brandDraft, setBrandDraft] = useState(siteContent.brand);
  const [contactDraft, setContactDraft] = useState(siteContent.contact);
  const [servicesDraft, setServicesDraft] = useState(siteContent.services);
  const [pricingDraft, setPricingDraft] = useState(siteContent.pricing);
  const [aboutDraft, setAboutDraft] = useState(siteContent.about || DEFAULT_ABOUT_CONTENT);

  // Project Modal State
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Save Home Page changes
  const handleSaveHome = () => {
    siteContent.updateHero(heroDraft);
    siteContent.updateBrand(brandDraft);
    siteContent.updateContact(contactDraft);
    siteContent.updateServices(servicesDraft);
    addAuditLog('cms_update', 'صفحه اصلی', 'به‌روزرسانی هیرو، کاتالوگ خدمات و تماس');
    showToast('تغییرات صفحه اصلی با موفقیت ذخیره و در سایت منتشر شد.');
  };

  // 2. Save About Page changes
  const handleSaveAbout = () => {
    siteContent.updateAbout(aboutDraft);
    addAuditLog('cms_update', 'صفحه درباره ما', 'به‌روزرسانی تاریخچه و آمار کارخانه');
    showToast('تغییرات صفحه درباره ما با موفقیت ذخیره شد.');
  };

  // 3. Save Calculator Page changes
  const handleSaveCalculator = () => {
    siteContent.updatePricing(pricingDraft);
    addAuditLog('pricing_update', 'محاسبه‌گر آنلاین', 'به‌روزرسانی نرخ‌های پایه و ضرایب متراژ');
    showToast('فرمول‌ها و تعرفه‌های محاسبه‌گر ذخیره شدند.');
  };

  // 4. Save Services Page changes
  const handleSaveServices = () => {
    siteContent.updateServices(servicesDraft);
    addAuditLog('cms_update', 'صفحه خدمات', 'به‌روزرسانی مشخصات خدمات و مراحل مهندسی');
    showToast('مشخصات خدمات مهندسی با موفقیت ذخیره شد.');
  };

  // Project Save Handler
  const handleSaveProjectModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    await saveProject(editingProject);
    setIsProjectModalOpen(false);
    setEditingProject(null);
    showToast('پروژه با موفقیت در سیستم ثبت و ذخیره شد.');
  };

  const activeTabMeta = SUB_TABS.find((t) => t.id === activeSubTab) || SUB_TABS[0];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-[#06080F] text-[#00F090] border-2 border-[#00F090]/60 px-6 py-3 rounded-2xl shadow-2xl text-xs font-black flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#00F090]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header Card */}
      <div className="bg-[#06080F] text-white rounded-3xl p-6 lg:p-7 shadow-xl border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-[#00F090] text-[#06080F] flex items-center gap-1.5 shadow-md">
                <Layers className="w-3.5 h-3.5" />
                <span>ویرایشگر محتوای صفحات وب‌سایت (Pages Content Editor)</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                {activeTabMeta.pageUrl}
              </span>
            </div>
            <h2 className="text-lg lg:text-xl font-black text-white flex items-center gap-2 pt-1">
              <span>ادیتور زیربرگ:</span>
              <span className="text-[#00F090]">{activeTabMeta.title}</span>
            </h2>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={activeTabMeta.pageUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#00F090]" />
              <span>مشاهده صفحه زنده در سایت</span>
            </a>

            {activeSubTab === 'home' && (
              <button
                onClick={handleSaveHome}
                className="px-5 py-2.5 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره صفحه اصلی</span>
              </button>
            )}

            {activeSubTab === 'about' && (
              <button
                onClick={handleSaveAbout}
                className="px-5 py-2.5 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره درباره ما</span>
              </button>
            )}

            {activeSubTab === 'calculator' && (
              <button
                onClick={handleSaveCalculator}
                className="px-5 py-2.5 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره فرمول قیمت</span>
              </button>
            )}

            {activeSubTab === 'services' && (
              <button
                onClick={handleSaveServices}
                className="px-5 py-2.5 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره خدمات مهندسی</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tabs (زیر برگ‌های صفحات) Navigation */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUB_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shrink-0 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#00F090] text-[#06080F] border-[#00F090] shadow-md scale-102'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#06080F]' : 'text-[#00F090]'}`} />
                <span>{tab.title}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-[#06080F]/15 text-[#06080F]' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SUB-TAB: HOME PAGE (صفحه اصلی) */}
      {/* ========================================================================= */}
      {activeSubTab === 'home' && (
        <div className="space-y-6">
          {/* Hero Section Card */}
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <div className="flex items-center gap-2 font-black text-[#06080F]">
                <Sparkles className="w-5 h-5 text-[#06080F]" />
                <h3 className="text-sm font-black">۱. بخش هیرو ویدیویی و عناوین بالای صفحه</h3>
              </div>
              <span className="text-[11px] text-[#11172C] font-semibold">مهم‌ترین ویترین بصری سایت</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">تیتر اصلی هیرو (Headline):</label>
                <input
                  type="text"
                  value={heroDraft.headline}
                  onChange={(e) => setHeroDraft({ ...heroDraft, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">متن نشان بالای تیتر (Badge):</label>
                <input
                  type="text"
                  value={heroDraft.badgeText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, badgeText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">وضعیت اپراتور (Operator Status):</label>
                <input
                  type="text"
                  value={heroDraft.operatorStatus}
                  onChange={(e) => setHeroDraft({ ...heroDraft, operatorStatus: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-mono focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">استاندارد ایمنی (Standard):</label>
                <input
                  type="text"
                  value={heroDraft.operatorStandard}
                  onChange={(e) => setHeroDraft({ ...heroDraft, operatorStandard: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-mono focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">متن دکمه اول (CTA 1):</label>
                <input
                  type="text"
                  value={heroDraft.ctaPrimaryText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, ctaPrimaryText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">متن دکمه دوم (CTA 2):</label>
                <input
                  type="text"
                  value={heroDraft.ctaSecondaryText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, ctaSecondaryText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
                />
              </div>
            </div>

            {/* Video & Poster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">آدرس ویدیو پس‌زمینه هیرو (Video URL):</label>
                <input
                  type="url"
                  dir="ltr"
                  value={heroDraft.videoUrl}
                  onChange={(e) => setHeroDraft({ ...heroDraft, videoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-mono focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <ImageDropUploader
                  label="تصویر پوستر هیرو (Poster Image)"
                  value={heroDraft.posterUrl}
                  onChange={(url) => setHeroDraft({ ...heroDraft, posterUrl: url })}
                />
              </div>
            </div>
          </div>

          {/* Featured 4 Core Services in Home Page */}
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <div className="flex items-center gap-2 font-black text-[#06080F]">
                <Layers className="w-5 h-5 text-[#06080F]" />
                <h3 className="text-sm font-black">۲. کاتالوگ خدمات و سیستم‌های شاخص در صفحه اصلی</h3>
              </div>
              <span className="text-[11px] text-[#11172C] font-semibold">۴ سیستم کلیدی</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesDraft.map((svc, index) => (
                <div key={svc.id} className="bg-[#E4EBF1] border border-[#06080F]/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#06080F]">سیستم #{index + 1}: {svc.titleFa}</span>
                    <span className="text-[10px] font-mono text-slate-600 bg-white/50 px-2 py-0.5 rounded">{svc.titleEn}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">عنوان فارسی:</label>
                    <input
                      type="text"
                      value={svc.titleFa}
                      onChange={(e) => {
                        const next = [...servicesDraft];
                        next[index] = { ...next[index], titleFa: e.target.value };
                        setServicesDraft(next);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">توضیحات کوتاه فنی:</label>
                    <textarea
                      rows={2}
                      value={svc.description}
                      onChange={(e) => {
                        const next = [...servicesDraft];
                        next[index] = { ...next[index], description: e.target.value };
                        setServicesDraft(next);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information & Footer */}
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <div className="flex items-center gap-2 font-black text-[#06080F]">
                <Phone className="w-5 h-5 text-[#06080F]" />
                <h3 className="text-sm font-black">۳. اطلاعات تماس و آدرس در فوتر و هدر</h3>
              </div>
              <span className="text-[11px] text-[#11172C] font-semibold">تماس مستقیم مشتریان</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F]">تلفن دفتر مرکزی:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={contactDraft.centralPhone}
                  onChange={(e) => setContactDraft({ ...contactDraft, centralPhone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F]">موبایل مهندسی مستقیم:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={contactDraft.directMobile}
                  onChange={(e) => setContactDraft({ ...contactDraft, directMobile: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F]">شماره واتس‌اپ استعلام:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={contactDraft.whatsappNumber}
                  onChange={(e) => setContactDraft({ ...contactDraft, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#06080F]">آدرس رسمی دفتر مهندسی:</label>
                <input
                  type="text"
                  value={contactDraft.address}
                  onChange={(e) => setContactDraft({ ...contactDraft, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F]">ساعات کاری:</label>
                <input
                  type="text"
                  value={contactDraft.workingHours}
                  onChange={(e) => setContactDraft({ ...contactDraft, workingHours: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-medium"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={handleSaveHome}
                className="px-6 py-3 rounded-2xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره و اعمال کلیه تغییرات صفحه اصلی</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-TAB: PROJECTS (پروژه‌ها و رزومه) */}
      {/* ========================================================================= */}
      {activeSubTab === 'projects' && (
        <div className="space-y-6">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#06080F]/10 pb-4">
              <div>
                <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#06080F]" />
                  <span>مدیریت پروژه‌های اجرا شده در شمال تهران و کشور ({projects.length} پروژه)</span>
                </h3>
                <p className="text-xs text-[#11172C] pt-1">
                  پروژه‌های این بخش مستقیماً در صفحه پروژه‌ها (`/projects.html`) و بخش رزومه صفحه اصلی نمایش داده می‌شوند.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    id: `proj_${Date.now()}`,
                    title: '',
                    location: 'تهران - نیاوران',
                    systemType: 'درب اتوماتیک اسلایدینگ تلسکوپی',
                    completionYear: '۱۴۰۳',
                    category: 'commercial',
                    image: '',
                    specs: 'موتور دانکر آلمان • شیشه سوپرکلیر ۱۰ میل',
                    featured: true,
                  });
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#06080F] text-[#00F090] font-black text-xs hover:bg-[#11172C] transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن پروژه جدید</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-black/10 overflow-hidden">
                    {proj.image ? (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-bold">
                        فاقد تصویر
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-[#06080F]/80 text-[#00F090] text-[10px] font-bold backdrop-blur-md">
                      {proj.location}
                    </span>
                    {proj.featured && (
                      <span className="absolute top-2 left-2 p-1.5 rounded-lg bg-amber-500 text-white shadow-md">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2 flex-grow">
                    <h4 className="text-xs font-black text-[#06080F] line-clamp-1">{proj.title}</h4>
                    <p className="text-[11px] text-[#11172C] line-clamp-2">{proj.systemType}</p>
                    <p className="text-[10px] text-slate-600 line-clamp-1">⚙️ {proj.specs}</p>
                  </div>

                  <div className="p-3 border-t border-[#06080F]/10 flex items-center justify-between gap-2 bg-white/40">
                    <button
                      onClick={() => toggleProjectFeatured(proj.id)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        proj.featured ? 'text-amber-600 bg-amber-100' : 'text-slate-500 hover:bg-slate-200'
                      }`}
                      title="ویژه / ستاره‌دار"
                    >
                      <Star className={`w-4 h-4 ${proj.featured ? 'fill-current' : ''}`} />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#06080F] text-[#00F090] font-black text-xs hover:bg-[#11172C] transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>ویرایش</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('آیا از حذف این پروژه اطمینان دارید؟')) {
                            deleteProject(proj.id);
                            showToast('پروژه حذف شد.');
                          }
                        }}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-100 transition-all cursor-pointer"
                        title="حذف پروژه"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUB-TAB: BLOG & ARTICLES (وبلاگ و دانشنامه) */}
      {/* ========================================================================= */}
      {activeSubTab === 'blog' && (
        <div className="space-y-6">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#06080F]/10 pb-4">
              <div>
                <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#06080F]" />
                  <span>مقالات تخصصی و دانشنامه مهندسی شیشه ({articles.length} مقاله)</span>
                </h3>
                <p className="text-xs text-[#11172C] pt-1">
                  مقالات راهنمای خرید شیشه، استاندارد EN 16005 و بررسی اپراتورها که در `/blog.html` قرار دارند.
                </p>
              </div>

              <button
                onClick={() => openArticleEditor(null)}
                className="px-4 py-2.5 rounded-xl bg-[#06080F] text-[#00F090] font-black text-xs hover:bg-[#11172C] transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>نگارش مقاله جدید</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-40 bg-black/10 overflow-hidden">
                    {art.image ? (
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-bold">
                        بدون تصویر
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-[#06080F]/80 text-[#00F090] text-[10px] font-bold backdrop-blur-md">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-grow">
                    <h4 className="text-xs font-black text-[#06080F] line-clamp-2 leading-snug">{art.title}</h4>
                    <p className="text-[11px] text-[#11172C] line-clamp-2 leading-relaxed">{art.summary}</p>
                    <div className="text-[10px] text-slate-500 font-mono">⏱️ زمان مطالعه: {art.readTime}</div>
                  </div>

                  <div className="p-3 border-t border-[#06080F]/10 flex items-center justify-between gap-2 bg-white/40">
                    <button
                      onClick={() => toggleArticleFeatured(art.id)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        art.featured ? 'text-amber-600 bg-amber-100' : 'text-slate-500 hover:bg-slate-200'
                      }`}
                      title="مقاله شاخص / ویژه"
                    >
                      <Star className={`w-4 h-4 ${art.featured ? 'fill-current' : ''}`} />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openArticleEditor(art.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#06080F] text-[#00F090] font-black text-xs hover:bg-[#11172C] transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>ویرایش متن</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('آیا از حذف این مقاله اطمینان دارید؟')) {
                            deleteArticle(art.id);
                            showToast('مقاله حذف شد.');
                          }
                        }}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-100 transition-all cursor-pointer"
                        title="حذف مقاله"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUB-TAB: PRODUCTS & CATALOG (محصولات و سیستم‌ها) */}
      {/* ========================================================================= */}
      {activeSubTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <div>
                <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#06080F]" />
                  <span>مدیریت دسته‌بندی و معرفی محصولات در کاتالوگ جامع (`/products.html`)</span>
                </h3>
                <p className="text-xs text-[#11172C] pt-1">
                  سیستم‌های ۵ گانه: درب‌های اتوماتیک، کرکره‌های برقی، شیشه‌های دستی، پارتیشن‌ها و موتورها
                </p>
              </div>
              <a
                href="/products.html"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#06080F] text-[#00F090] font-black text-xs flex items-center gap-1.5"
              >
                <span>مشاهده صفحه محصولات</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-3">
                <div className="font-black text-xs text-[#06080F] flex items-center justify-between">
                  <span>۱. سیستم‌های درب اتوماتیک اسلایدینگ و تلسکوپی</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">پرفروش‌ترین</span>
                </div>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  مجهز به موتورهای براشلس Dunkermotoren آلمان، سنسورهای مایکروویو حرکتی BEA بلژیک، تسمه تقویت‌شده کولار و ریل آلومینیومی قابل تعویض با عایق ضدلرزش.
                </p>
              </div>

              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-3">
                <div className="font-black text-xs text-[#06080F] flex items-center justify-between">
                  <span>۲. پارتیشن‌های شیشه‌ای فریم‌لس آکوستیک</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">اداری لوکس</span>
                </div>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  پروفیل‌های آلومینیومی بسیار باریک (Slim)، شیشه ۱۰ میل سکوریت و لمینت دوجداره با عایق صوتی تا ۴۲ دسی‌بل جهت تفکیک فضاهای مدیریتی و اتاق‌های کنفرانس.
                </p>
              </div>

              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-3">
                <div className="font-black text-xs text-[#06080F] flex items-center justify-between">
                  <span>۳. درب‌های گردان ریولوینگ (Revolving Doors)</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">هتل و بیمارستان</span>
                </div>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  جلوگیری ۱۰۰٪ از تبادل هوای داخل و خارج، صرفه‌جویی چشمگیر در مصرف انرژی سرمایش و گرمایش، سنسورهای ایمنی ضدگیرپاژ و سیستم قفل الکترومغناطیسی شب.
                </p>
              </div>

              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-3">
                <div className="font-black text-xs text-[#06080F] flex items-center justify-between">
                  <span>۴. کرکره‌های برقی آلومینیومی و پلی‌کربنات</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">امنیتی و شفاف</span>
                </div>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  تیغه‌های آلومینیوم فابریک ۶۰۶۳ استاندارد بیلت، تیغه‌های نانومتری شفاف پلی‌کربنات نشکن ضدحریق و موتورهای ساید صنعتی پرقدرت با خلاص‌کن دستی.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUB-TAB: SERVICES & WORKFLOW (خدمات مهندسی نما) */}
      {/* ========================================================================= */}
      {activeSubTab === 'services' && (
        <div className="space-y-6">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <div>
                <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#06080F]" />
                  <span>فرآیند ۴ مرحله‌ای اجرای پروژه‌ها در صفحه خدمات (`/services.html`)</span>
                </h3>
                <p className="text-xs text-[#11172C] pt-1">
                  مراحل اجرایی که اعتماد کارفرما را جلب می‌کند
                </p>
              </div>

              <button
                onClick={handleSaveServices}
                className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>ذخیره خدمات</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-black text-[#06080F]">مرحله ۱: نقشه‌برداری در محل و اسکن لیزری</span>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  اعزام کارشناس ارشد به محل پروژه با دوربین‌های متر لیزری پیشرفته جهت ثبت دقیق میلی‌متری ابعاد ورودی، تراز کف و بررسی تاسیسات برقی بالاسری.
                </p>
              </div>

              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-black text-[#06080F]">مرحله ۲: مهندسی ساخت و برش شیشه در کارخانه</span>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  کوره سکوریت افقی، جاسازی دقیق سوراخ‌ها و فرزکاری قبل از سکوریت، آنودایز فریم‌های آلومینیومی و آبکاری الکترواستاتیک یا PVD تیتانیوم.
                </p>
              </div>

              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-black text-[#06080F]">مرحله ۳: نصب استاندارد مطابق الزامات EN 16005</span>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  استقرار تکنسین‌های دارای گواهینامه معتبر، رگلاژ دینامیکی لت‌ها، تنظیم سنسورهای ایمنی فتوسل و برنامه‌ریزی وضعیت‌های چندگانه کلید کنترل حالت.
                </p>
              </div>

              <div className="bg-[#E4EBF1] border border-[#06080F]/15 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-black text-[#06080F]">مرحله ۴: صدور ضمانت‌نامه ۲ ساله و خدمات ۲۴ ساعته</span>
                <p className="text-xs text-[#11172C] leading-relaxed">
                  تحویل کارت طلایی گارانتی تعویض بی قید و شرط قطعات موتور و برد الکترونیکی، سرویس‌های دوره‌ای منظم و پشتیبانی فنی ۲۴ ساعته.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SUB-TAB: CALCULATOR (محاسبه‌گر آنلاین قیمت) */}
      {/* ========================================================================= */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <div>
                <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#06080F]" />
                  <span>تنظیم نرخ پایه و تعرفه فرمول‌های استعلام قیمت (`/calculator.html`)</span>
                </h3>
                <p className="text-xs text-[#11172C] pt-1">
                  مبالغ به تومان محاسبه می‌شوند و خروجی پیش‌فاکتور و شبیه‌ساز را کنترل می‌کنند.
                </p>
              </div>

              <button
                onClick={handleSaveCalculator}
                className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>ذخیره تعرفه‌ها</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#06080F]">پایه اپراتور اسلایدینگ (تومان):</label>
                <input
                  type="number"
                  dir="ltr"
                  value={pricingDraft.slidingBase}
                  onChange={(e) => setPricingDraft({ ...pricingDraft, slidingBase: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#06080F]">نرخ هر مترمربع شیشه اسلایدینگ:</label>
                <input
                  type="number"
                  dir="ltr"
                  value={pricingDraft.slidingPerSqm}
                  onChange={(e) => setPricingDraft({ ...pricingDraft, slidingPerSqm: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#06080F]">پایه اپراتور تلسکوپی (تومان):</label>
                <input
                  type="number"
                  dir="ltr"
                  value={pricingDraft.telescopicBase}
                  onChange={(e) => setPricingDraft({ ...pricingDraft, telescopicBase: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#06080F]">نرخ هر مترمربع شیشه هوشمند PDLC:</label>
                <input
                  type="number"
                  dir="ltr"
                  value={pricingDraft.smartGlassPerSqm}
                  onChange={(e) => setPricingDraft({ ...pricingDraft, smartGlassPerSqm: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#06080F]">نرخ هر متر طول فریم طلایی PVD:</label>
                <input
                  type="number"
                  dir="ltr"
                  value={pricingDraft.goldPvdPerMeter}
                  onChange={(e) => setPricingDraft({ ...pricingDraft, goldPvdPerMeter: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#06080F]">پایه اپراتور گردان ریولوینگ:</label>
                <input
                  type="number"
                  dir="ltr"
                  value={pricingDraft.revolvingBase}
                  onChange={(e) => setPricingDraft({ ...pricingDraft, revolvingBase: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SUB-TAB: ABOUT US & FACTORY (درباره ما و تاریخچه کارخانه) */}
      {/* ========================================================================= */}
      {activeSubTab === 'about' && (
        <div className="space-y-6">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <div>
                <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#06080F]" />
                  <span>مشخصات و متون صفحه درباره ما و تاریخچه کارخانه (`/about.html`)</span>
                </h3>
                <p className="text-xs text-[#11172C] pt-1">
                  روایت اصالت برند، سال تاسیس، آمار پروژه‌ها و تصاویر کارخانه
                </p>
              </div>

              <button
                onClick={handleSaveAbout}
                className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>ذخیره درباره ما</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">تیتر اصلی صفحه درباره ما:</label>
                <input
                  type="text"
                  value={aboutDraft.headline}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">متن نشان بالای تیتر:</label>
                <input
                  type="text"
                  value={aboutDraft.badge}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, badge: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] font-bold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#06080F] block">روایت تاریخچه و هویت سازمان:</label>
                <textarea
                  rows={3}
                  value={aboutDraft.story}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, story: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs text-[#06080F] leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">سال تاسیس رسمی:</label>
                <input
                  type="number"
                  value={aboutDraft.establishedYear}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, establishedYear: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">تعداد پروژه‌های موفق (آمار):</label>
                <input
                  type="text"
                  value={aboutDraft.projectsCount}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, projectsCount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">درصد رضایت مشتریان:</label>
                <input
                  type="text"
                  value={aboutDraft.satisfactionRate}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, satisfactionRate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#06080F] block">مدت گارانتی طلایی:</label>
                <input
                  type="text"
                  value={aboutDraft.warrantyPeriod}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, warrantyPeriod: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/20 text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2 pt-2">
                <ImageDropUploader
                  label="تصویر خطوط تولید کارخانه و مهندسی"
                  value={aboutDraft.factoryImage}
                  onChange={(url) => setAboutDraft({ ...aboutDraft, factoryImage: url })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. SUB-TAB: STANDARDS & GLASS LAB (استانداردها و متریال) */}
      {/* ========================================================================= */}
      {activeSubTab === 'standards' && (
        <div className="space-y-6">
          <GlassLabManager />
        </div>
      )}

      {/* Project Modal for Add/Edit */}
      {isProjectModalOpen && editingProject && (
        <div
          onClick={() => setIsProjectModalOpen(false)}
          className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#06080F] text-white border-2 border-[#00F090]/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#00F090]" />
                <span>{editingProject.title ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}</span>
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectModal} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">عنوان پروژه / مجتمع:</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="مثال: برج اداری تجاری پارسیان"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">منطقه / موقعیت:</label>
                  <input
                    type="text"
                    required
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    placeholder="مثال: تهران - نیاوران"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">سال اجرا:</label>
                  <input
                    type="text"
                    required
                    value={editingProject.completionYear || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, completionYear: e.target.value })}
                    placeholder="۱۴۰۳"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">سیستم درب و متریال:</label>
                <input
                  type="text"
                  required
                  value={editingProject.systemType}
                  onChange={(e) => setEditingProject({ ...editingProject, systemType: e.target.value })}
                  placeholder="درب اتوماتیک اسلایدینگ تلسکوپی با فریم PVD طلایی"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">مشخصات فنی و اپراتور:</label>
                <input
                  type="text"
                  required
                  value={editingProject.specs}
                  onChange={(e) => setEditingProject({ ...editingProject, specs: e.target.value })}
                  placeholder="موتور Dunkermotoren آلمان • شیشه سوپرکلیر ۱۰ میل"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <ImageDropUploader
                  label="تصویر شاخص پروژه"
                  value={editingProject.image}
                  onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#00F090]"
                  />
                  <span>نمایش در بخش پروژه‌های ویژه و شاخص صفحه اصلی</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 shadow-md"
                >
                  ثبت و ذخیره پروژه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
