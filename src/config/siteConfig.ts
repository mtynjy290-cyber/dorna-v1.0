/**
 * siteConfig.ts — Central Configuration File for Dorna Door (درنا درب)
 * 
 * To rebrand or adapt this application for a new client/company:
 * 1. Modify the brand, contact, social, and pricing parameters in this file.
 * 2. All components, calculators, WhatsApp generators, headers, and footers
 *    will automatically inherit these updated settings.
 */

export interface SystemPricingConfig {
  id: string;
  name: string;
  nameEn: string;
  badge: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  baseOperatorCostToman: number; // Base operator hardware cost in Tomans
  pricePerSqMeterToman: number;  // Price per square meter for glass + profile
  installationCoefficient: number; // Factor for installation & site calibration
  recommendedMotor: string;
  warrantyPeriod: string;
}

export const SITE_CONFIG = {
  // 🏢 Brand & Identity
  brand: {
    name: 'درنا درب',
    nameEn: 'Dorna Door',
    fullName: 'گروه فنی مهندسی درنا درب',
    legalName: 'شرکت مهندسی درنا درب آریا',
    tagline: 'طراحی و اجرای سازه‌های شیشه‌ای و درب اتوماتیک',
    slogan: 'مرجع تخصصی سیستم‌های درب اتوماتیک و سازه‌های شیشه‌ای لوکس در تهران',
    shortDescription: 'مرجع تخصصی محاسبه آنلاین قیمت و اجرای سیستم‌های درب اتوماتیک شیشه‌ای، پارتیشن‌های آکوستیک، شیشه سکوریت و فریم‌های لوکس در مناطق ۱ تا ۵ تهران.',
    logoUrl: '/favicon.svg',
    ogImageUrl: '/og-image.jpg',
    establishedYear: 1389,
    themeColor: '#E2E4E8',
    domain: 'https://dornadoor.ir',
  },

  // 📞 Contact Information
  contact: {
    centralOfficePhone: '۰۲۱-۲۲۰۰۹۸۷۶',
    centralOfficePhoneTel: '+982122009876',
    directEngineeringMobile: '۰۹۱۲۲۰۰۹۸۷۶',
    directEngineeringMobileTel: '+989122009876',
    whatsappNumber: '989122009876', // International format without +
    whatsappDisplay: '۰۹۱۲۲۰۰۹۸۷۶',
    supportEmail: 'info@dornadoor.ir',
    officeAddress: 'تهران، خیابان فرشته (شهید فیاضی)، برج نماد الهیه، طبقه ۷، واحد ۷۰۲',
    officeAddressShort: 'تهران، خیابان فرشته، برج نماد الهیه',
    workingHours: 'شنبه تا چهارشنبه ۸:۳۰ الی ۱۹:۳۰ | پنج‌شنبه‌ها ۸:۳۰ الی ۱۴:۰۰',
    freeLaserMeasurementCoverage: 'سراسر مناطق ۱ تا ۵ تهران (الهیه، فرشته، نیاوران، زعفرانیه، ولنجک، سعادت‌آباد)',
  },

  // 🌐 Social Media & External Links
  social: {
    whatsappUrl: 'https://wa.me/989122009876',
    instagramUrl: 'https://instagram.com/dornadoor.ir',
    telegramUrl: 'https://t.me/dornadoor_ir',
    linkedinUrl: 'https://linkedin.com/company/dornadoor',
  },

  // 🛡️ Guarantees, Certificates & Standards
  guarantees: {
    goldenWarrantyMonths: 24,
    goldenWarrantyLabel: '۲۴ ماه گارانتی تعویض بی‌قیدوشرط قطعات',
    afterSalesYears: 10,
    afterSalesLabel: '۱۰ سال خدمات پس از فروش و تأمین قطعات',
    supportResponseTime: 'اعزام کارشناس در کمتر از ۲ ساعت در تهران',
    safetyStandard: 'استاندارد ایمنی ضدبرخورد EN 16005 اتحادیه اروپا',
    motorPartner: 'دانکر آلمان (Dunkermotoren)',
    radarPartner: 'بئا سوئیس / بلژیک (BEA)',
    glassPartner: 'سوپرکلیر اردکان و شیشه هوشمند PDLC کره‌ای',
  },

  // 📍 Prime Geographic Coverage Zones (Tehran)
  districts: [
    {
      id: 'd1',
      number: 'منطقه ۱',
      title: 'شمیرانات و شمال تهران',
      neighborhoods: ['الهیه', 'فرشته', 'نیاوران', 'زعفرانیه', 'ولنجک', 'فرمانیه', 'کامرانیه', 'اقدسیه'],
      averageDispatchTime: '۴۵ دقیقه',
    },
    {
      id: 'd2',
      number: 'منطقه ۲',
      title: 'غرب و شمال‌غرب',
      neighborhoods: ['سعادت‌آباد', 'شهرک غرب', 'گیشا', 'ستارخان', 'مرزداران'],
      averageDispatchTime: '۶۰ دقیقه',
    },
    {
      id: 'd3',
      number: 'منطقه ۳',
      title: 'شمال مرکزی',
      neighborhoods: ['جردن (نلسون ماندلا)', 'پاسداران', 'دروس', 'قلهک', 'میرداماد', 'ظفر'],
      averageDispatchTime: '۴۵ دقیقه',
    },
    {
      id: 'd4-5',
      number: 'مناطق ۴ و ۵',
      title: 'شرق و غرب مدرن',
      neighborhoods: ['پونک', 'بلوار فردوس', 'جنت‌آباد', 'تهرانپارس غربی', 'هروی'],
      averageDispatchTime: '۶۰ دقیقه',
    },
  ],

  // 🧮 Pricing Engine Variables & Parameters
  pricing: {
    currencyUnit: 'تومان',
    currencyUnitEn: 'TOMAN',
    
    // System-specific calculation base values
    systems: {
      sliding: {
        id: 'sliding',
        name: 'درب اتوماتیک اسلایدینگ (کشویی)',
        nameEn: 'Automatic Sliding Door',
        badge: 'محبوب‌ترین سیستم تجاری و لابی',
        defaultWidth: 3.0,
        defaultHeight: 2.4,
        minWidth: 1.6,
        maxWidth: 6.0,
        minHeight: 2.0,
        maxHeight: 3.5,
        baseOperatorCostToman: 38_500_000,
        pricePerSqMeterToman: 3_800_000,
        installationCoefficient: 1.15,
        recommendedMotor: 'دانکر آلمان Dunkermotoren Dunker 55×30',
        warrantyPeriod: '۲۴ ماه طلایی',
      },
      telescopic: {
        id: 'telescopic',
        name: 'درب اتوماتیک تلسکوپی (بازشوی ۶۶٪)',
        nameEn: 'Telescopic Sliding Door',
        badge: 'حداکثر بازشو در ورودی‌های عریض',
        defaultWidth: 3.6,
        defaultHeight: 2.4,
        minWidth: 2.0,
        maxWidth: 7.5,
        minHeight: 2.0,
        maxHeight: 3.5,
        baseOperatorCostToman: 54_000_000,
        pricePerSqMeterToman: 4_200_000,
        installationCoefficient: 1.18,
        recommendedMotor: 'دانکر براشلس Dunkermotoren BG 75',
        warrantyPeriod: '۲۴ ماه طلایی',
      },
      revolving: {
        id: 'revolving',
        name: 'درب گردان اتوماتیک (ریولوینگ لوکس)',
        nameEn: 'Automatic Revolving Door',
        badge: 'عایق کامل حرارتی و آکوستیک برج‌ها',
        defaultWidth: 2.8,
        defaultHeight: 2.6,
        minWidth: 2.2,
        maxWidth: 4.8,
        minHeight: 2.2,
        maxHeight: 3.8,
        baseOperatorCostToman: 165_000_000,
        pricePerSqMeterToman: 9_500_000,
        installationCoefficient: 1.25,
        recommendedMotor: 'سروو موتور صنعتی تورک بالا',
        warrantyPeriod: '۲۴ ماه طلایی + ۵ سال سازه',
      },
      framelessPartition: {
        id: 'framelessPartition',
        name: 'پارتیشن شیشه‌ای فریم‌لس آکوستیک',
        nameEn: 'Frameless Acoustic Glass Partition',
        badge: 'معماری مدرن اداری و مدیریتی',
        defaultWidth: 4.5,
        defaultHeight: 2.8,
        minWidth: 1.5,
        maxWidth: 15.0,
        minHeight: 2.0,
        maxHeight: 4.0,
        baseOperatorCostToman: 8_500_000, // Profile and hardware base
        pricePerSqMeterToman: 2_950_000,
        installationCoefficient: 1.12,
        recommendedMotor: 'سیستم آرام‌بند هیدرولیک توکار کف',
        warrantyPeriod: '۳۶ ماه قطعات مکانیکی',
      },
    } as Record<string, SystemPricingConfig>,

    // Add-on components cost modifiers
    addons: {
      smartPdlcGlassPerSqMeter: 3_200_000, // PDLC Switchable Smart Film addition
      anodizedPvdGoldFramePerMeter: 650_000, // PVD Titanium Gold Profile upgrade
      biometricAccessControlUnit: 14_500_000, // Face ID / RFID Scanner integration
      emergencyBatteryBackupUps: 7_800_000, // High-capacity battery pack
    },

    /**
     * Calculates the estimated cost range in Tomans for a given configuration
     */
    calculateCost(systemId: string, width: number, height: number, hasSmartGlass = false, hasGoldPvd = false) {
      const system = this.systems[systemId] || this.systems.sliding;
      const area = Math.max(0.5, width * height);
      const perimeter = (width + height) * 2;

      let totalBase = system.baseOperatorCostToman + (area * system.pricePerSqMeterToman);

      if (hasSmartGlass) {
        totalBase += area * this.addons.smartPdlcGlassPerSqMeter;
      }
      if (hasGoldPvd) {
        totalBase += perimeter * this.addons.anodizedPvdGoldFramePerMeter;
      }

      const estimatedPrice = totalBase * system.installationCoefficient;
      const minRange = Math.round((estimatedPrice * 0.95) / 100_000) * 100_000;
      const maxRange = Math.round((estimatedPrice * 1.10) / 100_000) * 100_000;

      return {
        area: Number(area.toFixed(2)),
        estimatedPrice,
        minRangeToman: minRange,
        maxRangeToman: maxRange,
        systemName: system.name,
      };
    }
  }
};

export type SiteConfigType = typeof SITE_CONFIG;
