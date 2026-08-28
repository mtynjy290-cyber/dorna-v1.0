/**
 * Utility functions for generating formatted WhatsApp inquiry links for Dorna Door.
 */

import { SITE_CONFIG } from '../config/siteConfig';

export interface WhatsAppInquiryPayload {
  name: string;
  phone: string;
  projectType: string;
  details?: string;
  notes?: string;
  source?: 'calculator' | 'catalog' | 'direct' | 'modal';
  estimatedCost?: string;
}

// Dorna Door engineering support WhatsApp phone number from siteConfig
export const DORNA_WHATSAPP_PHONE = SITE_CONFIG.contact.whatsappNumber;

/**
 * Builds a clean, beautifully formatted WhatsApp text and returns the full wa.me direct URL.
 */
export function buildWhatsAppInquiryUrl(payload: WhatsAppInquiryPayload): string {
  const lines: string[] = [
    `🏢 *درخواست استعلام قیمت و مشاوره مهندسی — ${SITE_CONFIG.brand.name}*`,
    '────────────────────',
    `👤 *نام کارفرما / متقاضی:* ${payload.name.trim() || 'ثبت نشده'}`,
    `📱 *شماره تماس:* ${payload.phone.trim() || 'ثبت نشده'}`,
    `🏷️ *نوع پروژه / کاربری:* ${payload.projectType || 'عمومی'}`,
  ];

  if (payload.estimatedCost) {
    lines.push(`💰 *برآورد تقریبی سیستم:* ${payload.estimatedCost}`);
  }

  if (payload.details && payload.details.trim()) {
    lines.push('────────────────────');
    lines.push('📐 *مشخصات فنی و جزئیات استعلام:*');
    lines.push(payload.details.trim());
  }

  if (payload.notes && payload.notes.trim()) {
    lines.push('────────────────────');
    lines.push('📝 *توضیحات و ملاحظات معماری:*');
    lines.push(payload.notes.trim());
  }

  lines.push('────────────────────');
  lines.push(`🌐 _ارسال شده از طریق وب‌سایت رسمی ${SITE_CONFIG.brand.name} (${SITE_CONFIG.brand.nameEn})_`);

  const fullText = lines.join('\n');
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Validates standard Iranian mobile phone numbers (e.g., 09121234567 or 9121234567 or +989121234567)
 */
export function isValidIranMobile(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const regex = /^(?:(?:\+|00)98|0)?9\d{9}$/;
  return regex.test(cleaned);
}
