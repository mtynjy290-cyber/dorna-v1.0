import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Save,
  Check,
  Star,
  ExternalLink,
  BookOpen,
  Briefcase,
  Layers,
  Phone,
  Building,
  RefreshCw,
  X,
} from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';
import { useSiteContentStore } from '../../lib/siteContentStore';
import { ArticleRecord, ProjectRecord } from '../../lib/supabase';
import { ImageDropUploader } from './ImageDropUploader';

export const CMSContentEditor: React.FC = () => {
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
    isLoading,
  } = useAdminStore();

  const siteContent = useSiteContentStore();

  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'articles' | 'projects' | 'contact'>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Project Modal State
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Local draft state for Hero and Contact
  const [heroDraft, setHeroDraft] = useState(siteContent.hero);
  const [contactDraft, setContactDraft] = useState(siteContent.contact);
  const [brandDraft, setBrandDraft] = useState(siteContent.brand);

  const handleSaveHeroAndBrand = () => {
    siteContent.updateHero(heroDraft);
    siteContent.updateBrand(brandDraft);
    addAuditLog('cms_update', 'متون هدر و هویت برند', 'به‌روزرسانی شعار، تیتر اصلی و وضعیت اپراتور');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    setStatusMessage({ text: 'اطلاعات هدر و برند با موفقیت ذخیره و در سایت اعمال شد.', type: 'success' });
  };

  const handleSaveContact = () => {
    siteContent.updateContact(contactDraft);
    addAuditLog('cms_update', 'اطلاعات تماس و آدرس', 'به‌روزرسانی شماره تلفن‌ها، واتس‌اپ و ساعات کاری');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    setStatusMessage({ text: 'اطلاعات تماس با موفقیت به‌روزرسانی شد.', type: 'success' });
  };

  const handleSaveProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const recordToSave: ProjectRecord = {
      ...editingProject,
      location: editingProject.location || 'تهران',
      district: editingProject.district || 'منطقه ۱',
      systemType: editingProject.systemType || 'درب اتوماتیک اسلایدینگ',
      specs: editingProject.specs || 'موتور دانکر آلمان • شیشه سوپرکلیر',
      category: editingProject.category || 'residential',
      featured: Boolean(editingProject.featured),
    };

    const success = await saveProject(recordToSave);
    if (success) {
      setIsProjectModalOpen(false);
      setEditingProject(null);
      setStatusMessage({ text: 'پروژه با موفقیت در بخش نمونه‌کارها ثبت گردید.', type: 'success' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tabs */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-[#06080F] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#06080F]" />
              <span>سیستم مدیریت محتوا (Live CMS) و چندرسانه‌ای</span>
            </h2>
            <p className="text-xs text-[#11172C] mt-1 font-medium">
              ویرایش زنده متون اصلی، مقالات وبلاگ مهندسی و نمونه‌کارهای اجراشده با آپلودر درگ‌اند‌دراپ
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(activeSubTab === 'hero' || activeSubTab === 'contact') && (
              <button
                onClick={activeSubTab === 'hero' ? handleSaveHeroAndBrand : handleSaveContact}
                disabled={isLoading}
                className="px-5 py-2 rounded-xl bg-[#00F090] hover:bg-[#00F090]/90 text-[#06080F] font-black text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{saveSuccess ? 'ذخیره شد!' : 'ذخیره و اعمال تغییرات'}</span>
              </button>
            )}

            {activeSubTab === 'articles' && (
              <div className="flex items-center gap-2">
                <a
                  href="/blog?id=1001&edit=true"
                  className="px-4 py-2 rounded-xl bg-[#06080F] hover:bg-black text-[#00F090] border border-[#00F090]/40 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  title="ورود به ویرایشگر زنده درون‌صفحه‌ای"
                >
                  <Sparkles className="w-4 h-4 text-[#00F090]" />
                  <span>ویرایشگر زنده روی صفحه</span>
                </a>
                <button
                  onClick={() => openArticleEditor('new')}
                  className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs flex items-center gap-1.5 shadow-md hover:bg-[#00D882] transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن مقاله جدید</span>
                </button>
              </div>
            )}

            {activeSubTab === 'projects' && (
              <button
                onClick={() => {
                  setEditingProject({
                    id: '',
                    title: '',
                    location: 'تهران، نیاوران',
                    district: 'منطقه ۱',
                    systemType: 'درب اتوماتیک اسلایدینگ تلسکوپی',
                    specs: 'موتور دانکر BG75 آلمان • شیشه سوپرکلیر ۱۰ میل',
                    category: 'residential',
                    image: '',
                    clientName: 'مهندس ناظر',
                    completionYear: '۱۴۰۴',
                    featured: true,
                  });
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs flex items-center gap-1.5 shadow-md hover:bg-[#00F090]/90 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن پروژه جدید</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tabs Switcher */}
        <div className="flex items-center gap-2 pt-1 border-t border-[#06080F]/10">
          <button
            onClick={() => setActiveSubTab('hero')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'hero'
                ? 'bg-[#06080F] text-[#00F090] shadow-md'
                : 'bg-[#E4EBF1] text-[#06080F] hover:bg-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>متون اصلی هدر و برند</span>
          </button>

          <button
            onClick={() => setActiveSubTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'articles'
                ? 'bg-[#06080F] text-[#00F090] shadow-md'
                : 'bg-[#E4EBF1] text-[#06080F] hover:bg-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>مقالات و وبلاگ ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'projects'
                ? 'bg-[#06080F] text-[#00F090] shadow-md'
                : 'bg-[#E4EBF1] text-[#06080F] hover:bg-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>پروژه‌ها و نمونه‌کارها ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'contact'
                ? 'bg-[#06080F] text-[#00F090] shadow-md'
                : 'bg-[#E4EBF1] text-[#06080F] hover:bg-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>اطلاعات تماس و دفتر مرکزی</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 1. HERO & BRAND TAB */}
      {/* ================================================================ */}
      {activeSubTab === 'hero' && (
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">
          {/* Main Hero Texts */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <Sparkles className="w-4 h-4 text-[#06080F]" />
              <span>تیترها و نشان شاخص بخش نخست (Hero)</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">تیتر اصلی صفحه اول (Headline):</label>
                <input
                  type="text"
                  value={heroDraft.headline}
                  onChange={(e) => setHeroDraft({ ...heroDraft, headline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">متن نشان بالای تیتر (Badge):</label>
                <input
                  type="text"
                  value={heroDraft.badgeText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, badgeText: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">متن دکمه اکشن اصلی:</label>
                  <input
                    type="text"
                    value={heroDraft.ctaPrimaryText}
                    onChange={(e) => setHeroDraft({ ...heroDraft, ctaPrimaryText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">متن دکمه ثانویه:</label>
                  <input
                    type="text"
                    value={heroDraft.ctaSecondaryText}
                    onChange={(e) => setHeroDraft({ ...heroDraft, ctaSecondaryText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">وضعیت مانیتورینگ موتور:</label>
                  <input
                    type="text"
                    value={heroDraft.operatorStatus}
                    onChange={(e) => setHeroDraft({ ...heroDraft, operatorStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-mono font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">استاندارد ایمنی:</label>
                  <input
                    type="text"
                    value={heroDraft.operatorStandard}
                    onChange={(e) => setHeroDraft({ ...heroDraft, operatorStandard: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-mono font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Media & Poster with Drag and Drop */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <ImageIcon className="w-4 h-4 text-[#06080F]" />
              <span>تصویر پس‌زمینه و پوستر هدر (Drag & Drop Uploader)</span>
            </h3>

            <ImageDropUploader
              value={heroDraft.posterUrl}
              onChange={(url) => setHeroDraft({ ...heroDraft, posterUrl: url })}
              label="تصویر پوستر هدر اصلی"
              aspectRatioHint="سایز پیشنهادی: 2400x1350 (عریض ۱۶:۹)"
            />

            {/* Brand Information */}
            <div className="pt-2 border-t border-[#06080F]/10 space-y-3">
              <h4 className="text-xs font-black text-[#06080F]">اطلاعات برند سازمانی:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#06080F] block mb-1">نام برند (فارسی):</label>
                  <input
                    type="text"
                    value={brandDraft.name}
                    onChange={(e) => setBrandDraft({ ...brandDraft, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#06080F] block mb-1">نام برند (انگلیسی):</label>
                  <input
                    type="text"
                    value={brandDraft.nameEn}
                    onChange={(e) => setBrandDraft({ ...brandDraft, nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-mono font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 2. ARTICLES TAB */}
      {/* ================================================================ */}
      {activeSubTab === 'articles' && (
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {articles.map((art) => (
            <div
              key={art.id}
              className="col-span-4 md:col-span-4 lg:col-span-4 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-36 bg-[#E4EBF1] relative overflow-hidden">
                  <img
                    src={art.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#06080F]/90 text-white font-bold text-[10px]">
                      {art.category}
                    </span>
                    {art.status === 'draft' ? (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px]">
                        پیش‌نویس
                      </span>
                    ) : art.status === 'scheduled' ? (
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-300 font-bold text-[10px]">
                        زمان‌بندی
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px]">
                        منتشر شده
                      </span>
                    )}
                    {art.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-[#00F090] text-[#06080F] font-black text-[10px] flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        ویژه
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-black text-xs text-[#06080F] leading-snug line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-[#11172C] leading-relaxed line-clamp-2">
                    {art.summary}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#11172C]/70 pt-1 font-mono">
                    <span>{art.author || art.date}</span>
                    <span>زمان مطالعه: {art.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#E4EBF1]/60 border-t border-[#06080F]/10 flex items-center justify-between">
                <button
                  onClick={() => toggleArticleFeatured(art.id)}
                  className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                    art.featured
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                  title="تغییر وضعیت نمایش در صفحه اصلی"
                >
                  <Star className={`w-3 h-3 ${art.featured ? 'fill-current' : ''}`} />
                  <span>{art.featured ? 'مقاله ویژه' : 'عادی'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`/blog?id=${art.id}&edit=true`}
                    className="px-2.5 py-1.5 rounded-lg bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs"
                    title="ویرایش زنده روی صفحه اصلی مقاله (WYSIWYG)"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                    <span>ادیتور زنده</span>
                  </a>
                  <button
                    onClick={() => openArticleEditor(art.id)}
                    className="px-2 py-1.5 rounded-lg bg-[#06080F] hover:bg-black text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                    title="ویرایش در فرم تفصیلی CMS"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#00F090]" />
                    <span>فرم</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`آیا از حذف مقاله "${art.title}" اطمینان دارید؟`)) {
                        deleteArticle(art.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 cursor-pointer"
                    title="حذف مقاله"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================================================ */}
      {/* 3. PROJECTS TAB */}
      {/* ================================================================ */}
      {activeSubTab === 'projects' && (
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="col-span-4 md:col-span-4 lg:col-span-4 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-36 bg-[#E4EBF1] relative overflow-hidden">
                  <img
                    src={proj.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#06080F]/90 text-white font-bold text-[10px]">
                      {proj.district || proj.location}
                    </span>
                    {proj.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-[#00F090] text-[#06080F] font-black text-[10px] flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        شاخص
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-black text-xs text-[#06080F] leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] font-bold text-[#06080F]/90">
                    سیستم: {proj.systemType}
                  </p>
                  <p className="text-[11px] text-[#11172C] leading-relaxed line-clamp-2">
                    {proj.specs}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#11172C]/70 pt-1">
                    <span>کارفرما: {proj.clientName || 'شخصی'}</span>
                    <span>سال اجرا: {proj.completionYear || '۱۴۰۳'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#E4EBF1]/60 border-t border-[#06080F]/10 flex items-center justify-between">
                <button
                  onClick={() => toggleProjectFeatured(proj.id)}
                  className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                    proj.featured
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                  title="تغییر وضعیت پروژه شاخص"
                >
                  <Star className={`w-3 h-3 ${proj.featured ? 'fill-current' : ''}`} />
                  <span>{proj.featured ? 'پروژه شاخص' : 'عادی'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setIsProjectModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] border border-[#06080F]/10 cursor-pointer"
                    title="ویرایش پروژه"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`آیا از حذف پروژه "${proj.title}" اطمینان دارید؟`)) {
                        deleteProject(proj.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 cursor-pointer"
                    title="حذف پروژه"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================================================ */}
      {/* 4. CONTACT & HEADQUARTERS TAB */}
      {/* ================================================================ */}
      {activeSubTab === 'contact' && (
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">
          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <Phone className="w-4 h-4 text-[#06080F]" />
              <span>خطوط ارتباطی و پشتیبانی ۲۴/۷</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">تلفن دفتر مرکزی:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={contactDraft.centralPhone}
                  onChange={(e) => setContactDraft({ ...contactDraft, centralPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">موبایل مشاوره فنی مهندسی:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={contactDraft.directMobile}
                  onChange={(e) => setContactDraft({ ...contactDraft, directMobile: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">شماره واتس‌اپ رسمی:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={contactDraft.whatsappNumber}
                  onChange={(e) => setContactDraft({ ...contactDraft, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">ایمیل سازمانی:</label>
                <input
                  type="email"
                  dir="ltr"
                  value={contactDraft.email}
                  onChange={(e) => setContactDraft({ ...contactDraft, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <Building className="w-4 h-4 text-[#06080F]" />
              <span>موقعیت جغرافیایی و ساعات کاری</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">آدرس دفتر مرکزی تهران:</label>
                <textarea
                  value={contactDraft.address}
                  onChange={(e) => setContactDraft({ ...contactDraft, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">ساعات کاری و پاسخگویی:</label>
                <input
                  type="text"
                  value={contactDraft.workingHours}
                  onChange={(e) => setContactDraft({ ...contactDraft, workingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* PROJECT EDIT / CREATE MODAL WITH DRAG & DROP UPLOADER */}
      {/* ================================================================ */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-2xl w-full max-w-2xl p-5 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <h3 className="text-sm font-black text-[#06080F]">
                {editingProject.id ? 'ویرایش پروژه اجراشده' : 'ثبت نمونه‌کار جدید'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-[#06080F] hover:bg-[#E4EBF1] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">نام پروژه / ساختمان:</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                    placeholder="برج مسکونی رویال پالاس"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">منطقه / موقعیت:</label>
                  <input
                    type="text"
                    value={editingProject.district}
                    onChange={(e) => setEditingProject({ ...editingProject, district: e.target.value })}
                    placeholder="منطقه ۱ - الهیه"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">نوع سیستم اجراشده:</label>
                  <input
                    type="text"
                    value={editingProject.systemType}
                    onChange={(e) => setEditingProject({ ...editingProject, systemType: e.target.value })}
                    placeholder="درب اتوماتیک اسلایدینگ تلسکوپی"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">دسته‌بندی کاربری:</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  >
                    <option value="residential">مسکونی لوکس</option>
                    <option value="commercial">تجاری و اداری</option>
                    <option value="villa">ویلایی مدرن</option>
                  </select>
                </div>
              </div>

              {/* Drag and Drop Uploader for Project Photo */}
              <ImageDropUploader
                value={editingProject.image}
                onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                label="تصویر اصلی پروژه (Drag & Drop)"
                aspectRatioHint="کیفیت بالا و عریض ۱۶:۹ یا ۴:۳"
              />

              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">مشخصات فنی و یراق‌آلات اجراشده:</label>
                <textarea
                  value={editingProject.specs}
                  onChange={(e) => setEditingProject({ ...editingProject, specs: e.target.value })}
                  rows={2}
                  required
                  placeholder="موتور دانکر BG75 آلمان • شیشه سوپرکلیر وین‌لایت ۱۰ میل • فریم آنودایز طلایی..."
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">نام کارفرما / آرشیتکت:</label>
                  <input
                    type="text"
                    value={editingProject.clientName || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                    placeholder="مهندس پیروزان"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">سال تکمیل پروژه:</label>
                  <input
                    type="text"
                    value={editingProject.completionYear || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, completionYear: e.target.value })}
                    placeholder="۱۴۰۴"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-[#06080F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#06080F]"
                  />
                  <span>نمایش در پروژه‌های شاخص صفحه اصلی</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#06080F]/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-xs font-bold text-[#06080F] border border-[#06080F]/10 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all cursor-pointer"
                >
                  ذخیره پروژه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
