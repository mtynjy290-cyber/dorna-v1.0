import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Link as LinkIcon,
  Trash2,
  Eye,
  Sliders,
  FolderOpen
} from 'lucide-react';

interface LiveImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl: string;
  currentAltText?: string;
  currentCaption?: string;
  title?: string;
  onSave: (data: { imageUrl: string; altText?: string; caption?: string }) => void;
}

const PRESET_ARCHITECTURAL_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    title: 'ورودی لوکس برج فرشته با فریم طلایی',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    title: 'پارتیشن فریم‌لس شیشه‌ای دوجداره',
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    title: 'درب گردان اتوماتیک ریولوینگ',
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    title: 'سیستم اسلایدینگ کلین‌روم بیمارستانی',
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: 'نمای کرتین‌وال و شیشه هوشمند برج تجاری',
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    title: 'طراحی مینیمال شیشه سوپرکلیر و هندریل استیل',
  },
];

export const LiveImageEditorModal: React.FC<LiveImageEditorModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl,
  currentAltText = '',
  currentCaption = '',
  title = 'تغییر و آپلود تصویر',
  onSave,
}) => {
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [altText, setAltText] = useState(currentAltText);
  const [caption, setCaption] = useState(currentCaption);
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setImageUrl(currentImageUrl);
      setAltText(currentAltText);
      setCaption(currentCaption);
    }
  }, [isOpen, currentImageUrl, currentAltText, currentCaption]);

  if (!isOpen) return null;

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('لطفاً فقط فایل تصویری (JPG, PNG, WEBP) انتخاب کنید.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    onSave({
      imageUrl,
      altText,
      caption,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-[#06080F] text-white border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00F090]/20 border border-[#00F090]/40 flex items-center justify-center text-[#00F090]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">{title}</h3>
              <p className="text-xs text-[#CBD8E2]/70">تغییر تصویر زنده، آپلود فایل یا انتخاب از آرشیو معماری</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 p-3 bg-white/[0.02] border-b border-white/10 px-5">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-[#00F090] text-[#06080F]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>آپلود فایل جدید</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-[#00F090] text-[#06080F]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>آدرس اینترنتی (URL)</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'bg-[#00F090] text-[#06080F]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>آرشیو تصاویر لوکس</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Tab 1: Upload */}
          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-[#00F090] bg-[#00F090]/10 scale-[1.01]'
                  : 'border-white/20 hover:border-[#00F090]/60 bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileProcess(e.target.files[0]);
                  }
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#00F090]">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">تصویر را به اینجا بکشید یا برای انتخاب کلیک کنید</p>
                <p className="text-xs text-[#CBD8E2]/60 mt-1">فرمت‌های مجاز: JPG, PNG, WEBP (کیفیت بالا)</p>
              </div>
            </div>
          )}

          {/* Tab 2: URL Input */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-white/80 block">لینک مستقیم تصویر (URL):</label>
              <div className="relative">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00F090] font-mono text-left"
                  dir="ltr"
                />
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>
          )}

          {/* Tab 3: Presets Gallery */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-3 gap-3 max-h-56 overflow-y-auto p-1 custom-scrollbar">
              {PRESET_ARCHITECTURAL_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageUrl(preset.url)}
                  className={`group relative rounded-xl overflow-hidden border transition-all text-right cursor-pointer ${
                    imageUrl === preset.url
                      ? 'border-[#00F090] ring-2 ring-[#00F090]/50'
                      : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  <img src={preset.url} alt={preset.title} className="w-full h-24 object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] font-bold text-white line-clamp-1">{preset.title}</span>
                  </div>
                  {imageUrl === preset.url && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#00F090] text-[#06080F] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Preview & Metadata Fields */}
          {imageUrl && (
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black">
                  <img src={imageUrl} alt="پیش‌نمایش" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1 text-xs">
                  <p className="font-bold text-white flex items-center gap-1.5 text-xs text-[#00F090]">
                    <Check className="w-3.5 h-3.5" />
                    <span>تصویر بارگذاری شده آماده اعمال است</span>
                  </p>
                  <p className="text-[11px] text-white/50 truncate font-mono" dir="ltr">{imageUrl.slice(0, 50)}...</p>
                </div>
              </div>

              {/* Alt & Caption */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div>
                  <label className="text-[11px] font-bold text-white/70 block mb-1">متن جایگزین (Alt Text برای سئو):</label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="مثال: درب شیشه‌ای اتوماتیک ورودی فرشته"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#00F090]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-white/70 block mb-1">توضیح زیر تصویر (Caption):</label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="مثال: اجرای سیستم دانکر آلمان توسط درنا درب"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#00F090]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            انصراف
          </button>

          <button
            onClick={handleSave}
            disabled={!imageUrl}
            className="px-6 py-2.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] disabled:opacity-50 text-[#06080F] text-xs font-black flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>تایید و اعمال تصویر</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
