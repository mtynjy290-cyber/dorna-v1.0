import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Save,
  Eye,
  EyeOff,
  Sparkles,
  FileText,
  Upload,
  Plus,
  ArrowRight,
  Check,
  Lock,
  Layers,
  Table as TableIcon,
  AlertCircle,
  HelpCircle,
  Image as ImageIcon,
  Quote,
  Trash2,
  RefreshCw,
  FileCode
} from 'lucide-react';
import { parseDocxFile } from '../lib/wordDocxImporter';

interface LiveArticleEditorBarProps {
  isLiveEditActive: boolean;
  onToggleLiveEdit: (active: boolean) => void;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  onPreviewToggle: () => void;
  isPreviewOnly: boolean;
  onAddBlock: (blockType: 'paragraph' | 'callout' | 'table' | 'quote' | 'faq' | 'image') => void;
  onWordDocImported: (data: { html: string; suggestedTitle?: string; suggestedSummary?: string }) => void;
  onExitToAdmin: () => void;
}

export const LiveArticleEditorBar: React.FC<LiveArticleEditorBarProps> = ({
  isLiveEditActive,
  onToggleLiveEdit,
  hasUnsavedChanges,
  isSaving,
  onSave,
  onPreviewToggle,
  isPreviewOnly,
  onAddBlock,
  onWordDocImported,
  onExitToAdmin,
}) => {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [isImportingWord, setIsImportingWord] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleWordFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.endsWith('.docx')) {
        alert('لطفاً یک فایل استاندارد ورد با پسوند .docx انتخاب فرمایید.');
        return;
      }

      setIsImportingWord(true);
      try {
        const parsed = await parseDocxFile(file);
        onWordDocImported({
          html: parsed.html,
          suggestedTitle: parsed.suggestedTitle,
          suggestedSummary: parsed.suggestedSummary,
        });
      } catch (err) {
        console.error('Error parsing docx file:', err);
        alert('خطا در خواندن فایل ورد. لطفاً از سالم بودن فایل مطمئن شوید.');
      } finally {
        setIsImportingWord(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleWordFileChange}
      />

      <div
        className="fixed top-0 left-0 right-0 z-[100] w-full bg-[#06080F]/95 backdrop-blur-xl border-b border-[#00F090]/40 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,144,0.15)] transition-all"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-3 text-white overflow-x-auto no-scrollbar">
          {/* Right Section: Status and Live Edit Switch */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00F090] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black text-[#00F090] whitespace-nowrap">ویرایشگر زنده درون‌صفحه‌ای</span>
            </div>

            {/* Live Edit Mode Switch */}
            <button
              onClick={() => onToggleLiveEdit(!isLiveEditActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isLiveEditActive
                  ? 'bg-[#00F090] text-[#06080F] shadow-[0_0_15px_rgba(0,240,144,0.4)]'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLiveEditActive ? 'حالت ادیتور: فعال' : 'حالت ادیتور: غیرفعال'}</span>
            </button>

            {hasUnsavedChanges && (
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold whitespace-nowrap">
                تغییرات ذخیره‌نشده
              </span>
            )}
          </div>

          {/* Center / Left Section: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Word Import (.docx) */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImportingWord || !isLiveEditActive}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap"
              title="بارگذاری و تبدیل مستقیم فایل مایکروسافت ورد (.docx)"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">{isImportingWord ? 'در حال تبدیل ورد...' : 'ایمپورت فایل Word (.docx)'}</span>
              <span className="sm:hidden">فایل Word</span>
            </button>

            {/* Add New Block Dropdown */}
            {isLiveEditActive && (
              <div className="relative">
                <button
                  onClick={() => setAddMenuOpen(!addMenuOpen)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 text-[#00F090]" />
                  <span>+ افزودن بلوک</span>
                </button>

                <AnimatePresence>
                  {addMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-60 rounded-2xl bg-[#06080F] border border-white/20 shadow-2xl p-2 z-[110] text-right space-y-1"
                    >
                      <button
                        onClick={() => {
                          onAddBlock('paragraph');
                          setAddMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-xs text-white/90 flex items-center gap-2 transition-colors text-right cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-[#00F090]" />
                        <span>پاراگراف متنی با تیتر</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddBlock('callout');
                          setAddMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-xs text-white/90 flex items-center gap-2 transition-colors text-right cursor-pointer"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <span>باکس هشدار و نکته مهندسی</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddBlock('table');
                          setAddMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-xs text-white/90 flex items-center gap-2 transition-colors text-right cursor-pointer"
                      >
                        <TableIcon className="w-4 h-4 text-cyan-400" />
                        <span>جدول مشخصات فنی مقایسه‌ای</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddBlock('quote');
                          setAddMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-xs text-white/90 flex items-center gap-2 transition-colors text-right cursor-pointer"
                      >
                        <Quote className="w-4 h-4 text-emerald-400" />
                        <span>نقل‌قول و توصیه طراحان</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddBlock('faq');
                          setAddMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-xs text-white/90 flex items-center gap-2 transition-colors text-right cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4 text-purple-400" />
                        <span>پرسش و پاسخ فنی (FAQ)</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddBlock('image');
                          setAddMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-xs text-white/90 flex items-center gap-2 transition-colors text-right cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4 text-rose-400" />
                        <span>تصویر با زیرنویس و کپشن</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Preview Toggle */}
            <button
              onClick={onPreviewToggle}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isPreviewOnly
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 hover:bg-white/15 text-white/80'
              }`}
              title="مشاهده پیش‌نمایش تمیز بدون کادرهای ادیتور"
            >
              {isPreviewOnly ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isPreviewOnly ? 'خروج از پیش‌نمایش' : 'پیش‌نمایش'}</span>
            </button>

            {/* Save Button */}
            <button
              onClick={onSave}
              disabled={isSaving}
              className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] disabled:opacity-50 text-[#06080F] font-black text-xs flex items-center gap-1.5 shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? 'در حال ذخیره...' : 'ذخیره مقاله'}</span>
            </button>

            {/* Exit to CMS */}
            <button
              onClick={onExitToAdmin}
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="بازگشت به پنل مدیریت دُرنا دَرب"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
