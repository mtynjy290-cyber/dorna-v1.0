import React from 'react';
import { Phone, MessageCircle, Calculator, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface MobileStickyBarProps {
  onOpenInquiry?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenInquiry }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-[#CBD8E2]/90 backdrop-blur-xl border-t border-white/80 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] font-vazir">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Direct Call */}
        <a
          href={`tel:${SITE_CONFIG.contact.directEngineeringMobileTel}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/80 border border-white/80 text-[#06080F] active:scale-95 transition-all text-center shadow-xs"
        >
          <Phone className="w-4 h-4 text-[#06080F] mb-1" />
          <span className="text-[11px] font-bold">تماس مستقیم</span>
        </a>

        {/* WhatsApp Quote */}
        <a
          href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
            'سلام، جهت مشاوره و استعلام قیمت شیشه و درب اتوماتیک از سایت مزاحم شدم.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#00F090]/25 border border-[#00F090]/50 text-[#06080F] active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-4 h-4 text-[#06080F] mb-1" />
          <span className="text-[11px] font-black">واتس‌اپ</span>
        </a>

        {/* Online Calculator */}
        <a
          href="/calculator"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#00F090] text-[#06080F] font-black shadow-md border border-white/60 active:scale-95 transition-all text-center"
        >
          <Calculator className="w-4 h-4 text-[#06080F] mb-1" />
          <span className="text-[11px] font-black">محاسبه قیمت</span>
        </a>

      </div>
    </div>
  );
};
