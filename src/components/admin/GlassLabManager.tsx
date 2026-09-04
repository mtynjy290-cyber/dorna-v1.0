import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Sun,
  Eye,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Sliders,
  Plus,
  Trash2,
  Award,
  Info,
  Layers,
  ArrowRightLeft,
  Check,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  useSiteContentStore,
  DEFAULT_GLASS_LAB_CONTENT,
  ComparisonCategoryKey,
  GlassLabContent,
  GlassComparisonCategoryData,
} from '../../lib/siteContentStore';
import { useAdminStore } from '../../stores/adminStore';
import { ImageDropUploader } from './ImageDropUploader';

// Category Definitions with Icons
const CATEGORIES: { key: ComparisonCategoryKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'clarity', label: 'شفافیت و خلوص رنگ', icon: Sparkles },
  { key: 'safety', label: 'ایمنی سازه و ضد ضربه', icon: ShieldCheck },
  { key: 'thermal', label: 'عایق انرژی و Low-E', icon: Sun },
  { key: 'privacy', label: 'پارتیشن و حریم خصوصی', icon: Eye },
];

export const GlassLabManager: React.FC = () => {
  const { addAuditLog, setStatusMessage, isLoading } = useAdminStore();
  const siteContentStore = useSiteContentStore();

  const [glassLabDraft, setGlassLabDraft] = useState<GlassLabContent>(
    siteContentStore.glassLab || DEFAULT_GLASS_LAB_CONTENT
  );
  const [activeCategory, setActiveCategory] = useState<ComparisonCategoryKey>('clarity');
  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mini live preview slider state inside admin
  const [previewPosition, setPreviewPosition] = useState(50);
  const [previewDragging, setPreviewDragging] = useState(false);

  const currentCategoryData = glassLabDraft.categories[activeCategory] || DEFAULT_GLASS_LAB_CONTENT.categories[activeCategory];

  // Save changes to Zustand and LocalStorage
  const handleSaveChanges = () => {
    siteContentStore.updateGlassLab(glassLabDraft);
    addAuditLog(
      'cms_update',
      'آزمایشگاه متریال و آزمون شیشه',
      `به‌روزرسانی تصاویر، متون مقایسه و مشخصات فنی دسته "${currentCategoryData.tabLabel}"`
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setStatusMessage({
      text: 'تنظیمات آزمایشگاه متریال و تصاویر آزمون شیشه با موفقیت ذخیره و در سایت منتشر شد.',
      type: 'success',
    });
  };

  // Reset to default laboratory settings
  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'آیا از بازنشانی کلیه تصاویر آزمایشگاهی، متون، ضرایب عبور نور و مشخصات فنی به حالت پیش‌فرض کارخانه اطمینان دارید؟'
      )
    ) {
      siteContentStore.resetGlassLabToDefaults();
      setGlassLabDraft(DEFAULT_GLASS_LAB_CONTENT);
      addAuditLog(
        'cms_update',
        'آزمایشگاه متریال و شیشه',
        'بازنشانی متون و تصاویر به تنظیمات پیش‌فرض کارخانه'
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setStatusMessage({
        text: 'داده‌های آزمایشگاه متریال به مقادیر اولیه کارخانه بازگردانده شد.',
        type: 'info',
      });
    }
  };

  // Update Category Top Level Field
  const handleCategoryFieldChange = (field: keyof GlassComparisonCategoryData, value: any) => {
    setGlassLabDraft((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [activeCategory]: {
          ...prev.categories[activeCategory],
          [field]: value,
        },
      },
    }));
  };

  // Update Side (left or right) Field
  const handleSideFieldChange = (side: 'left' | 'right', field: string, value: any) => {
    setGlassLabDraft((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [activeCategory]: {
          ...prev.categories[activeCategory],
          [side]: {
            ...prev.categories[activeCategory][side],
            [field]: value,
          },
        },
      },
    }));
  };

  // Update specific spec row
  const handleSpecChange = (side: 'left' | 'right', index: number, field: 'label' | 'value', value: string) => {
    const specs = [...currentCategoryData[side].specs];
    specs[index] = { ...specs[index], [field]: value };
    handleSideFieldChange(side, 'specs', specs);
  };

  // Add a new spec row
  const handleAddSpecRow = (side: 'left' | 'right') => {
    const specs = [...currentCategoryData[side].specs, { label: 'مشخصه فنی جدید', value: 'مقدار استاندارد' }];
    handleSideFieldChange(side, 'specs', specs);
  };

  // Delete a spec row
  const handleDeleteSpecRow = (side: 'left' | 'right', index: number) => {
    const specs = currentCategoryData[side].specs.filter((_, i) => i !== index);
    handleSideFieldChange(side, 'specs', specs);
  };

  return (
    <div className="space-y-6 text-[#06080F] font-vazir" dir="rtl">
      {/* 1. Header Banner & Main Actions */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#06080F] text-[#00F090] border border-white/20 flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-[#06080F] flex items-center gap-2">
                <span>مدیریت آزمایشگاه متریال و آزمون شیشه</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00F090] text-[#06080F]">
                  سنجش زنده متریال
                </span>
              </h1>
              <p className="text-xs text-[#11172C] mt-0.5 font-medium">
                کنترل متون علمی، تصاویر مقایسه‌ای با درگ‌اند‌دراپ، ضرایب نوری (VLT/Low-E) و مشخصات فنی اسلایدر
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/#glass-lab"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white text-[#06080F] text-xs font-bold border border-[#06080F]/10 transition-all flex items-center gap-1.5 shadow-xs"
              title="مشاهده بخش آزمایشگاه در سایت اصلی"
            >
              <span>مشاهده در سایت</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#06080F]" />
            </a>

            <button
              onClick={handleResetToDefaults}
              className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-red-100 text-slate-700 hover:text-red-700 text-xs font-bold border border-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
              title="بازگردانی به مقادیر اولیه کارخانه"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی پیش‌فرض</span>
            </button>

            <button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] font-black text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? 'ذخیره شد!' : 'ذخیره و انتشار در سایت'}</span>
            </button>
          </div>
        </div>

        {/* Global Section Titles Accordion Toggle */}
        <div className="pt-2 border-t border-[#06080F]/10">
          <button
            onClick={() => setIsGlobalSettingsOpen(!isGlobalSettingsOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-[#06080F] hover:text-black py-1 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#06080F]" />
              <span>تنظیمات عمومی و تیترهای سراسری بخش آزمایشگاه</span>
            </div>
            {isGlobalSettingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isGlobalSettingsOpen && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/70 border border-white/80">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#06080F]">بج بالای تیتر:</label>
                <input
                  type="text"
                  value={glassLabDraft.sectionBadge}
                  onChange={(e) => setGlassLabDraft((prev) => ({ ...prev, sectionBadge: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-[#06080F]">تیتر اصلی بخش:</label>
                <input
                  type="text"
                  value={glassLabDraft.sectionTitle}
                  onChange={(e) => setGlassLabDraft((prev) => ({ ...prev, sectionTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="text-[11px] font-bold text-[#06080F]">توضیحات معرفی بخش (زیر تیتر):</label>
                <textarea
                  rows={2}
                  value={glassLabDraft.sectionSubtitle}
                  onChange={(e) => setGlassLabDraft((prev) => ({ ...prev, sectionSubtitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#06080F]">متن دکمه مشاوره (CTA ۱):</label>
                <input
                  type="text"
                  value={glassLabDraft.ctaConsultationText}
                  onChange={(e) => setGlassLabDraft((prev) => ({ ...prev, ctaConsultationText: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-[#06080F]">متن دکمه محاسبه‌گر آنلاین (CTA ۲):</label>
                <input
                  type="text"
                  value={glassLabDraft.ctaCalculatorText}
                  onChange={(e) => setGlassLabDraft((prev) => ({ ...prev, ctaCalculatorText: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Category Selector Tabs */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-2 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#06080F] text-[#00F090] shadow-md'
                    : 'bg-white/60 hover:bg-white text-[#11172C] hover:text-[#06080F]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00F090]' : 'text-[#06080F]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category Header & Description Editor */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#06080F]/10">
          <Info className="w-4 h-4 text-[#06080F]" />
          <h2 className="text-sm font-black text-[#06080F]">
            اطلاعات سربرگ دسته: {currentCategoryData.tabLabel}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#06080F]">عنوان تب در اسلایدر:</label>
            <input
              type="text"
              value={currentCategoryData.tabLabel}
              onChange={(e) => handleCategoryFieldChange('tabLabel', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-[#06080F]">تیتر کامل آزمون مقایسه‌ای:</label>
            <input
              type="text"
              value={currentCategoryData.title}
              onChange={(e) => handleCategoryFieldChange('title', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#06080F]">برچسب فنی بالای کادر:</label>
            <input
              type="text"
              value={currentCategoryData.badge}
              onChange={(e) => handleCategoryFieldChange('badge', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-[#06080F]">توضیح علمی و تحلیلی مقایسه:</label>
            <textarea
              rows={2}
              value={currentCategoryData.description}
              onChange={(e) => handleCategoryFieldChange('description', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Dual Side-by-Side Glass Profile Editors (Right = Ultra Premium, Left = Standard) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RIGHT SIDE (Ultra Premium / Engineering Selection) */}
        <div className="bg-[#CBD8E2] border-2 border-[#00F090]/60 rounded-3xl p-5 shadow-md space-y-4 relative">
          <div className="flex items-center justify-between pb-3 border-b border-[#00F090]/40">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#00F090] text-[#06080F] flex items-center justify-center font-black">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-[#06080F]">
                  طرف راست: شیشه ارتقایافته / تخصصی
                </h3>
                <span className="text-[10px] text-emerald-800 font-bold">Ultra Premium Glass</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#00F090] text-[#06080F] text-[10px] font-black">
              سمت پیش‌فرض راست
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#06080F]">نام شیشه (طرف راست):</label>
              <input
                type="text"
                value={currentCategoryData.right.label}
                onChange={(e) => handleSideFieldChange('right', 'label', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#06080F]">برچسب بج روی تصویر:</label>
                <input
                  type="text"
                  value={currentCategoryData.right.badgeText}
                  onChange={(e) => handleSideFieldChange('right', 'badgeText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#06080F]">برچسب هایلایت طلایی:</label>
                <input
                  type="text"
                  value={currentCategoryData.right.highlight}
                  onChange={(e) => handleSideFieldChange('right', 'highlight', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#06080F]">زیرنویس و مشخصه اصلی:</label>
              <input
                type="text"
                value={currentCategoryData.right.sublabel}
                onChange={(e) => handleSideFieldChange('right', 'sublabel', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
              />
            </div>

            {/* Image Uploader for Right Side */}
            <div className="pt-2">
              <ImageDropUploader
                value={currentCategoryData.right.image}
                onChange={(url) => handleSideFieldChange('right', 'image', url)}
                label="تصویر شیشه تخصصی (سمت راست اسلایدر)"
                hint="درگ‌اند‌دراپ فایل باکیفیت آزمایشگاهی یا درج آدرس اینترنتی"
                aspectRatioHint="نسبت ۱۶:۹ یا ۴:۳ برای هماهنگی با اهرم مقایسه"
              />
            </div>

            {/* Specs Row Manager */}
            <div className="pt-3 border-t border-[#00F090]/30 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#06080F] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>جدول مشخصات فنی (طرف راست):</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleAddSpecRow('right')}
                  className="text-[11px] font-bold text-[#06080F] hover:text-black flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00F090] cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>افزودن ردیف</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
                {currentCategoryData.right.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded-xl bg-white/70 border border-white/80">
                    <input
                      type="text"
                      placeholder="عنوان مشخصه"
                      value={spec.label}
                      onChange={(e) => handleSpecChange('right', idx, 'label', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-white border border-[#06080F]/15 text-[11px] text-[#06080F] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="مقدار"
                      value={spec.value}
                      onChange={(e) => handleSpecChange('right', idx, 'value', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-white border border-[#06080F]/15 text-[11px] font-bold text-[#06080F] focus:outline-none"
                    />
                    {currentCategoryData.right.specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSpecRow('right', idx)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                        title="حذف این ردیف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LEFT SIDE (Standard / Base Glass) */}
        <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#06080F]/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#06080F] text-white flex items-center justify-center font-black">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-[#06080F]">
                  طرف چپ: شیشه استاندارد / سنتی
                </h3>
                <span className="text-[10px] text-slate-600 font-bold">Standard Glass Baseline</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white text-[#06080F] text-[10px] font-black border border-[#06080F]/10">
              سمت چپ اسلایدر
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#06080F]">نام شیشه (طرف چپ):</label>
              <input
                type="text"
                value={currentCategoryData.left.label}
                onChange={(e) => handleSideFieldChange('left', 'label', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#06080F]">برچسب بج روی تصویر:</label>
                <input
                  type="text"
                  value={currentCategoryData.left.badgeText}
                  onChange={(e) => handleSideFieldChange('left', 'badgeText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#06080F]">برچسب هایلایت فنی:</label>
                <input
                  type="text"
                  value={currentCategoryData.left.highlight}
                  onChange={(e) => handleSideFieldChange('left', 'highlight', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#06080F]">زیرنویس و مشخصه اصلی:</label>
              <input
                type="text"
                value={currentCategoryData.left.sublabel}
                onChange={(e) => handleSideFieldChange('left', 'sublabel', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:outline-none"
              />
            </div>

            {/* Image Uploader for Left Side */}
            <div className="pt-2">
              <ImageDropUploader
                value={currentCategoryData.left.image}
                onChange={(url) => handleSideFieldChange('left', 'image', url)}
                label="تصویر شیشه پایه (سمت چپ اسلایدر)"
                hint="درگ‌اند‌دراپ فایل یا وارد کردن لینک تصویر پایه"
                aspectRatioHint="نسبت ۱۶:۹ یا ۴:۳ برای هماهنگی با طرف راست"
              />
            </div>

            {/* Specs Row Manager */}
            <div className="pt-3 border-t border-[#06080F]/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#06080F] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>جدول مشخصات فنی (طرف چپ):</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleAddSpecRow('left')}
                  className="text-[11px] font-bold text-[#06080F] hover:text-black flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#06080F]/15 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>افزودن ردیف</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
                {currentCategoryData.left.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded-xl bg-white/70 border border-white/80">
                    <input
                      type="text"
                      placeholder="عنوان مشخصه"
                      value={spec.label}
                      onChange={(e) => handleSpecChange('left', idx, 'label', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-white border border-[#06080F]/15 text-[11px] text-[#06080F] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="مقدار"
                      value={spec.value}
                      onChange={(e) => handleSpecChange('left', idx, 'value', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-white border border-[#06080F]/15 text-[11px] font-bold text-[#06080F] focus:outline-none"
                    />
                    {currentCategoryData.left.specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSpecRow('left', idx)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                        title="حذف این ردیف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Live Interactive Preview Simulator Directly Inside the Admin */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#06080F]/10">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#06080F]" />
            <h3 className="text-sm font-black text-[#06080F]">
              پیش‌نمایش زنده و تعاملی اسلایدر (Live Interactive Sandbox)
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-[#11172C]">موقعیت اهرم: {Math.round(previewPosition)}٪</span>
            <button
              onClick={() => setPreviewPosition(50)}
              className="px-2.5 py-1 rounded-lg bg-white text-[#06080F] border border-[#06080F]/15 text-[11px] cursor-pointer"
            >
              تنظیم ۵۰/۵۰
            </button>
          </div>
        </div>

        {/* Live Simulator Viewport */}
        <div className="bg-[#E4EBF1] rounded-2xl p-4 border border-white shadow-inner">
          <div
            dir="ltr"
            className="relative w-full h-[240px] sm:h-[320px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-300 shadow-md group"
            onMouseMove={(e) => {
              if (previewDragging) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                let pct = (x / rect.width) * 100;
                if (pct < 0) pct = 0;
                if (pct > 100) pct = 100;
                setPreviewPosition(pct);
              }
            }}
            onMouseDown={() => setPreviewDragging(true)}
            onMouseUp={() => setPreviewDragging(false)}
            onMouseLeave={() => setPreviewDragging(false)}
          >
            {/* RIGHT SIDE IMAGE */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentCategoryData.right.image || '/images/super-clear-glass.jpg'}
                alt={currentCategoryData.right.label}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div dir="rtl" className="absolute top-3 right-3 z-10 px-3 py-1 rounded-xl bg-[#06080F]/90 backdrop-blur-md border border-[#00F090]/40 text-white text-[11px] font-bold shadow-md">
                <span className="text-[#00F090] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F090] animate-pulse"></span>
                  {currentCategoryData.right.label}
                </span>
              </div>
            </div>

            {/* LEFT SIDE IMAGE */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${previewPosition}%` }}
            >
              <img
                src={currentCategoryData.left.image || '/images/float-glass.jpg'}
                alt={currentCategoryData.left.label}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%' }}
                draggable={false}
              />
              <div dir="rtl" className="absolute top-3 left-3 z-10 px-3 py-1 rounded-xl bg-[#11172C]/90 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold shadow-md">
                <span>{currentCategoryData.left.label}</span>
              </div>
            </div>

            {/* DIVIDER LINE & HANDLE */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] cursor-ew-resize flex items-center justify-center -ml-[1px]"
              style={{ left: `${previewPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#00F090] text-[#06080F] border-2 border-white shadow-xl flex items-center justify-center font-black">
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#11172C]/70 mt-2 font-medium">
            💡 موس را روی تصویر بکشید تا تفاوت تصاویر جدید بارگذاری شده را قبل از انتشار نهایی ارزیابی کنید.
          </p>
        </div>
      </div>

    </div>
  );
};
