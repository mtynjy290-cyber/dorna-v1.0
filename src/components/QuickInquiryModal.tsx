import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Phone, 
  Building, 
  CheckCircle2, 
  Shield, 
  MessageCircle, 
  User, 
  FileText, 
  Send, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Clock,
  MapPin,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { buildWhatsAppInquiryUrl, isValidIranMobile, WhatsAppInquiryPayload } from '../lib/whatsapp';
import { dbService } from '../lib/supabase';

export interface InquiryModalData {
  title?: string;
  projectType?: string;
  details?: string;
  estimatedCost?: string;
  source?: 'calculator' | 'catalog' | 'direct' | 'modal';
}

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: InquiryModalData | null;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({ 
  isOpen, 
  onClose,
  initialData 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectCategory: 'مسکونی و لابی برج',
    details: '',
    note: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync initialData when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setPhoneError('');
      setFormData(prev => ({
        ...prev,
        projectCategory: initialData?.projectType || prev.projectCategory || 'مسکونی و لابی برج',
        details: initialData?.details || '',
      }));
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handlePhoneChange = (val: string) => {
    setFormData(prev => ({ ...prev, phone: val }));
    if (phoneError && isValidIranMobile(val)) {
      setPhoneError('');
    }
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    if (!isValidIranMobile(formData.phone)) {
      setPhoneError('لطفاً یک شماره موبایل معتبر (مانند ۰۹۱۲۳۴۵۶۷۸۹) وارد فرمایید.');
      return;
    }

    setPhoneError('');

    const payload: WhatsAppInquiryPayload = {
      name: formData.name,
      phone: formData.phone,
      projectType: formData.projectCategory,
      details: formData.details || initialData?.details,
      notes: formData.note,
      estimatedCost: initialData?.estimatedCost,
      source: initialData?.source || 'modal',
    };

    const waUrl = buildWhatsAppInquiryUrl(payload);
    
    // Save to Admin CRM Database (Supabase + LocalStorage sync)
    dbService.addInquiry({
      client_name: formData.name,
      phone_number: formData.phone,
      system_type: formData.projectCategory,
      system_title: initialData?.title || formData.projectCategory,
      width: 0,
      height: 0,
      selected_options: { details: formData.details || initialData?.details, note: formData.note },
      estimated_price: initialData?.estimatedCost ? parseInt(initialData.estimatedCost.replace(/[^0-9]/g, '')) || 0 : 0,
      district: 'تهران',
      status: 'pending',
      admin_notes: `ثبت‌شده از طریق فرم استعلام سایت (${initialData?.source || 'سایت'})`,
    }).catch(err => console.error('Error saving lead to CRM:', err));

    // Open WhatsApp in a new tab or app
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div 
        id="dorna-inquiry-modal-backdrop"
        onClick={onClose}
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-[#E4EBF1]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/90 overflow-hidden text-[#06080F]"
        >
          {/* Top Glassmorphic Header */}
          <div className="bg-[#06080F] text-white p-5 sm:p-6 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
            {/* Ambient Accent Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00F090]/20 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#00F090]/20 border border-[#00F090]/40 flex items-center justify-center backdrop-blur-md shadow-inner text-[#00F090]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  {initialData?.title || 'استعلام قیمت و مشاوره مهندسی'}
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  ارسال مستقیم به کارشناس فنی درنا درب در واتس‌اپ
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer shadow-xs"
              title="بستن پنجره"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#00F090]/20 text-[#06080F] border border-[#00F090]/60 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9 text-[#00F090]" />
                </div>
                <h4 className="text-lg font-black text-[#06080F]">
                  درخواست شما به واتس‌اپ منتقل گردید
                </h4>
                <p className="text-xs text-[#11172C]/80 max-w-sm mx-auto leading-relaxed">
                  متن برآورد و استعلام شما در محیط گفتگوی واتس‌اپ آماده ارسال به مهندس ناظر درنا درب است. در صورت نیاز به هماهنگی بیشتر، همکاران ما با شما تماس خواهند گرفت.
                </p>
                <div className="pt-3 flex items-center justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-[#06080F] hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    بستن پنجره
                  </button>
                  <button
                    onClick={() => {
                      const payload: WhatsAppInquiryPayload = {
                        name: formData.name,
                        phone: formData.phone,
                        projectType: formData.projectCategory,
                        details: formData.details,
                        notes: formData.note,
                        estimatedCost: initialData?.estimatedCost,
                      };
                      window.open(buildWhatsAppInquiryUrl(payload), '_blank', 'noopener,noreferrer');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#06080F]" />
                    <span>باز کردن مجدد واتس‌اپ</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                
                {/* Embedded Summary Card if called from Calculator or Catalog */}
                {(initialData?.details || initialData?.estimatedCost) && (
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-white/80 shadow-xs text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-[#06080F]">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#06080F]" />
                        <span>خلاصه برآورد اولیه سامانه:</span>
                      </span>
                      {initialData.estimatedCost && (
                        <span className="text-[#06080F] bg-[#00F090] px-2 py-0.5 rounded-lg border border-white/60 font-mono font-black">
                          {initialData.estimatedCost}
                        </span>
                      )}
                    </div>
                    {initialData.details && (
                      <p className="text-[11px] text-[#11172C] leading-relaxed font-sans line-clamp-3 bg-[#CBD8E2]/40 p-2 rounded-xl border border-white/60 mt-1">
                        {initialData.details}
                      </p>
                    )}
                  </div>
                )}

                {/* Form Fields: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#11172C] mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#11172C]/60" />
                      <span>نام و نام خانوادگی / کارفرما:</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مهندس رادان"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 text-xs font-medium text-[#06080F] focus:outline-none focus:border-[#06080F] focus:bg-white shadow-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#11172C] mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#11172C]/60" />
                      <span>شماره موبایل (جهت ارسال در واتس‌اپ):</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`w-full p-2.5 rounded-xl bg-white/90 backdrop-blur-md border text-xs font-medium text-[#06080F] focus:outline-none shadow-xs transition-all ${
                        phoneError ? 'border-rose-500 bg-rose-50/50' : 'border-white/80 focus:border-[#06080F] focus:bg-white'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#11172C] mb-1 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#11172C]/60" />
                    <span>نوع کاربری پروژه:</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'تجاری و مال', label: 'تجاری / مال' },
                      { id: 'مسکونی و لابی برج', label: 'مسکونی / لابی' },
                      { id: 'اداری و سازمان', label: 'اداری / سازمان' },
                      { id: 'ویلایی و پنت‌هاوس', label: 'ویلایی / لوکس' },
                    ].map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, projectCategory: cat.id })}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                          formData.projectCategory === cat.id
                            ? 'bg-[#06080F] text-[#E4EBF1] border-[#06080F] shadow-xs'
                            : 'bg-white/80 text-[#11172C] border-white/80 hover:bg-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional notes / dimensions */}
                <div>
                  <label className="block text-xs font-bold text-[#11172C] mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#11172C]/60" />
                    <span>توضیحات تکمیلی یا ابعاد دهانه (اختیاری):</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="مثال: دهانه ۳ در ۲.۵ متر، موتور دانکر آلمان، منطقه الهیه..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 text-xs font-medium text-[#06080F] focus:outline-none focus:border-[#06080F] focus:bg-white shadow-xs transition-all"
                  />
                </div>

                {/* Trust guarantee badge */}
                <div className="bg-[#CBD8E2]/80 border border-white/80 rounded-2xl p-3 text-[11px] text-[#11172C] flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-[#06080F] shrink-0" />
                  <span className="font-medium">
                    مشاوره مهندسی، برآورد ریالی و اعزام کارشناس ابعادبرداری لیزری در سراسر مناطق ۱ تا ۵ تهران کاملاً رایگان است.
                  </span>
                </div>

                {/* Main WhatsApp Action Button */}
                <button
                  type="submit"
                  id="btn-modal-send-whatsapp"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#00F090] hover:bg-[#00D882] active:scale-[0.99] text-[#06080F] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg border border-white/60 transition-all duration-200 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#06080F] shrink-0" />
                  <span>ارسال استعلام</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#06080F]" />
                </button>

                <p className="text-[10px] text-[#11172C]/70 text-center font-medium">
                  با کلیک روی دکمه فوق، متن پیش‌نویس استعلام به طور مستقیم در نرم‌افزار واتس‌اپ شما باز خواهد شد.
                </p>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
