import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link as LinkIcon, Check, Sparkles } from 'lucide-react';

interface ImageDropUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  aspectRatioHint?: string;
}

export const ImageDropUploader: React.FC<ImageDropUploaderProps> = ({
  value,
  onChange,
  label = 'تصویر کاور / شاخص',
  hint = 'فرمت‌های مجاز: JPG, PNG, WEBP تا سقف ۵ مگابایت',
  aspectRatioHint = 'نسبت تصویر پیشنهادی: ۱۶:۹ یا ۴:۳',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [manualUrl, setManualUrl] = useState(value || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('لطفاً فقط فایل‌های تصویری معتبر انتخاب کنید.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('حجم فایل انتخابی بیش از ۵ مگابایت است.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
        setManualUrl(reader.result);
      }
    };
    reader.onerror = () => {
      setErrorMsg('خطا در خواندن فایل تصویر.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleManualUrlApply = () => {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setErrorMsg(null);
    }
  };

  const handleRemove = () => {
    onChange('');
    setManualUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black text-[#06080F] flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#06080F]" />
          <span>{label}</span>
        </label>

        {/* Mode Toggle */}
        <div className="flex items-center bg-[#E4EBF1] p-0.5 rounded-lg border border-[#06080F]/10 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              mode === 'upload'
                ? 'bg-[#06080F] text-[#00F090]'
                : 'text-[#11172C] hover:text-[#06080F]'
            }`}
          >
            آپلود / درگ فایل
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              mode === 'url'
                ? 'bg-[#06080F] text-[#00F090]'
                : 'text-[#11172C] hover:text-[#06080F]'
            }`}
          >
            آدرس اینترنتی (URL)
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div>
          {value ? (
            /* Image Preview Container */
            <div className="relative rounded-xl overflow-hidden border border-[#06080F]/15 bg-[#E4EBF1] p-2 flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-40 h-28 rounded-lg overflow-hidden bg-[#CBD8E2] shrink-0 relative group">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 text-white rounded-md hover:bg-red-700 transition-colors shadow-md cursor-pointer"
                  title="حذف تصویر"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 w-full space-y-1.5 text-right">
                <div className="flex items-center gap-2 text-xs font-bold text-[#06080F]">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تصویر با موفقیت بارگذاری شد</span>
                </div>
                <p className="text-[11px] text-[#11172C]/70">
                  {aspectRatioHint}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 text-[11px] font-bold rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] border border-[#06080F]/10 cursor-pointer transition-all"
                  >
                    تغییر تصویر
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-3 py-1 text-[11px] font-bold rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 cursor-pointer transition-all"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Drag and Drop Container */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-[#00F090] bg-[#00F090]/10 scale-[0.99]'
                  : 'border-[#06080F]/20 hover:border-[#06080F]/50 bg-[#E4EBF1]/60 hover:bg-[#E4EBF1]'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#CBD8E2] border border-[#06080F]/10 flex items-center justify-center text-[#06080F] shadow-sm">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-black text-[#06080F]">
                  تصویر را اینجا بکشید یا برای انتخاب کلیک کنید
                </p>
                <p className="text-[11px] text-[#11172C]/70">
                  {hint}
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#CBD8E2] text-[#06080F] border border-[#06080F]/10 mt-1">
                {aspectRatioHint}
              </span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        /* Manual URL Mode */
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                dir="ltr"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-3 pr-9 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:bg-white focus:outline-none"
              />
              <LinkIcon className="w-4 h-4 text-[#11172C]/60 absolute right-3 top-2.5" />
            </div>
            <button
              type="button"
              onClick={handleManualUrlApply}
              className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all cursor-pointer"
            >
              اعمال لینک
            </button>
          </div>

          {value && (
            <div className="h-24 w-full rounded-xl overflow-hidden bg-[#CBD8E2] border border-[#06080F]/10 relative">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-2 bg-[#06080F]/80 text-white text-[10px] px-2 py-0.5 rounded">
                پیش‌نمایش زنده URL
              </span>
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <p className="text-[11px] font-bold text-red-600 pt-0.5">{errorMsg}</p>
      )}
    </div>
  );
};
