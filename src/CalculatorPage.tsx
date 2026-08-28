import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Phone, 
  Check, 
  Layers, 
  Cpu, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  FileText, 
  Info, 
  Menu, 
  X, 
  ArrowLeft,
  Settings2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronLeft
} from 'lucide-react';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { dbService, PricingConfig, CatalogItem, DEFAULT_PRICING_CONFIG } from './lib/supabase';

/**
 * ============================================================================
 * TECHNICAL PRICING ARCHITECTURE (ADMIN READY)
 * ============================================================================
 * Single centralized PRICING_CONFIG object containing all unit rates,
 * multiplier coefficients, hardware costs, and site variable add-ons.
 * Readily pluggable to future Admin Panel / Database endpoints.
 */
export const PRICING_CONFIG = {
  // 1. System Categories
  systemCategories: {
    sliding: {
      id: 'sliding',
      label: 'درب اتوماتیک اسلایدینگ',
      basePriceToman: 42000000,
      multiplier: 1.0,
      description: 'حرکت خطی نرم با اپراتور پرقدرت، مناسب ورودی لابی و فروشگاه',
      defaultWidth: 3.0,
      defaultHeight: 2.4,
    },
    telescopic: {
      id: 'telescopic',
      label: 'درب اتوماتیک تلسکوپی',
      basePriceToman: 54000000,
      multiplier: 1.32,
      description: 'افزایش ۳۰٪ بازشوی مفید در دهانه‌های با عرض محدود',
      defaultWidth: 3.6,
      defaultHeight: 2.5,
    },
    manual_glass: {
      id: 'manual_glass',
      label: 'درب شیشه‌ای میرال (دستی)',
      basePriceToman: 18000000,
      multiplier: 0.65,
      description: 'سیستم‌های استپی، ریلی کشویی دستی و پینی برای ورودی‌های لوکس',
      defaultWidth: 2.2,
      defaultHeight: 2.4,
    },
    partition: {
      id: 'partition',
      label: 'پارتیشن شیشه‌ای',
      basePriceToman: 24000000,
      multiplier: 0.72,
      description: 'جداسازی مدرن فضاهای اداری تک‌جداره و دوجداره آکوستیک',
      defaultWidth: 4.0,
      defaultHeight: 2.8,
    },
    shutter: {
      id: 'shutter',
      label: 'کرکره برقی',
      basePriceToman: 29000000,
      multiplier: 0.82,
      description: 'حفاظت حداکثری با تیغه‌های آلومینیومی دوبل، غضروف‌دار و پلی‌کربنات',
      defaultWidth: 3.0,
      defaultHeight: 3.0,
    },
  },

  // 2. Dynamic Option Sets per System Category
  options: {
    // A. Automatic Doors (Sliding & Telescopic)
    automatic: {
      motors: {
        dunker_germany: {
          id: 'dunker_germany',
          label: 'اپراتور دانکر آلمان (Dunkermotoren)',
          badge: 'اورجینال آلمان • ۵ سال گارانتی',
          priceToman: 72000000,
        },
        dorna_standard: {
          id: 'dorna_standard',
          label: 'اپراتور استاندارد درنا',
          badge: 'مهندسی درنا • ۳ سال گارانتی',
          priceToman: 44000000,
        },
      },
      glass: {
        securit_10mm_clear: {
          id: 'securit_10mm_clear',
          label: 'سکوریت ۱۰ میل شفاف',
          badge: 'سوپرکلیر وین‌لایت شفاف',
          ratePerSqMeterToman: 3200000,
        },
        securit_10mm_frosted: {
          id: 'securit_10mm_frosted',
          label: 'سکوریت ۱۰ میل مات/سندبلاست',
          badge: 'پوشش خصوصی سندبلاست کامل',
          ratePerSqMeterToman: 3700000,
        },
        laminated_security: {
          id: 'laminated_security',
          label: 'لمینت امنیتی',
          badge: 'دولایه نشکن PVB عایق و ایمن',
          ratePerSqMeterToman: 5400000,
        },
      },
      frameFinish: {
        anodized_matte: {
          id: 'anodized_matte',
          label: 'آنودایز مات',
          badge: 'سیلور / شامپاینی ضدخش',
          priceToman: 6500000,
        },
        black_matte: {
          id: 'black_matte',
          label: 'مشکی مات',
          badge: 'پودری الکترواستاتیک کوره',
          priceToman: 7200000,
        },
        white_electrostatic: {
          id: 'white_electrostatic',
          label: 'سفید الکترواستاتیک',
          badge: 'پلی‌استر RAL9016 براق/مات',
          priceToman: 5500000,
        },
      },
    },

    // B. Manual Mirral Glass Door
    manualGlass: {
      mechanism: {
        sliding_overhead: {
          id: 'sliding_overhead',
          label: 'کشویی دستی (ریل بالاسری)',
          badge: 'سیستم هنگر ریلی آرام‌بند',
          priceToman: 12500000,
        },
        floor_spring: {
          id: 'floor_spring',
          label: 'استپی (استوپ کف)',
          badge: 'پمپ هیدرولیک روغنی توکار',
          priceToman: 9800000,
        },
        pin_pivot: {
          id: 'pin_pivot',
          label: 'پینی (لولا بالا/پایین)',
          badge: 'لولا فریم‌لس استیل ضدزنگ',
          priceToman: 8200000,
        },
      },
      glassFinish: {
        securit_10mm_clear: {
          id: 'securit_10mm_clear',
          label: 'سکوریت ۱۰ میل شفاف',
          badge: 'سوپرکلیر درجه یک',
          ratePerSqMeterToman: 3100000,
        },
        frosted_sandblast: {
          id: 'frosted_sandblast',
          label: 'مات / سندبلاست',
          badge: 'طرح‌دار یا یکدست مات',
          ratePerSqMeterToman: 3600000,
        },
        smart_pdlc: {
          id: 'smart_pdlc',
          label: 'هوشمند PDLC (مات‌شونده)',
          badge: 'کنترل ریموت با فیلم هوشمند',
          ratePerSqMeterToman: 11500000,
        },
      },
      hardwareColor: {
        steel_silver: {
          id: 'steel_silver',
          label: 'استیل مات (سیلور)',
          badge: 'استیل ۳۰۴ مات ضدزنگ',
          priceToman: 4500000,
        },
        steel_gold: {
          id: 'steel_gold',
          label: 'استیل طلایی (گلد)',
          badge: 'آبکاری PVD طلایی لوکس',
          priceToman: 6800000,
        },
        black_matte: {
          id: 'black_matte',
          label: 'مشکی مات',
          badge: 'پوشش الکترواستاتیک مات',
          priceToman: 4900000,
        },
      },
    },

    // C. Glass Partition
    partition: {
      profile: {
        frameless_single: {
          id: 'frameless_single',
          label: 'تک‌جداره فریم‌لس',
          badge: 'پروفیل U-Channel اسلیم مینیمال',
          priceToman: 11000000,
        },
        acoustic_double: {
          id: 'acoustic_double',
          label: 'دوجداره آکوستیک',
          badge: 'عایق صوتی تا ۴۵ دسی‌بل با پرده',
          priceToman: 23000000,
        },
      },
      glassType: {
        securit_10mm_simple: {
          id: 'securit_10mm_simple',
          label: '۱۰ میل ساده',
          badge: 'سکوریت شفاف سوپرکلیر',
          ratePerSqMeterToman: 3000000,
        },
        frosted_lines: {
          id: 'frosted_lines',
          label: 'مات / راه مات',
          badge: 'سندبلاست با خطوط دکوراتیو',
          ratePerSqMeterToman: 3500000,
        },
        smart_pdlc: {
          id: 'smart_pdlc',
          label: 'هوشمند (PDLC)',
          badge: 'شیشه مات‌شونده برقی',
          ratePerSqMeterToman: 11500000,
        },
      },
    },

    // D. Electric Roller Shutter
    shutter: {
      slatType: {
        heavy_aluminum: {
          id: 'heavy_aluminum',
          label: 'تیغه آلومینیوم سنگین',
          badge: 'دوجداره فابریک ۶۰۶۳ استاندارد',
          ratePerSqMeterToman: 2800000,
        },
        luxury_cartilage: {
          id: 'luxury_cartilage',
          label: 'تیغه غضروف‌دار لوکس',
          badge: 'حرکت فوق‌بی‌صدا با نوار میانی',
          ratePerSqMeterToman: 3900000,
        },
        polycarbonate_clear: {
          id: 'polycarbonate_clear',
          label: 'تیغه پلی‌کربنات (شفاف)',
          badge: 'ضدضربه و نشکن با لولای آلومینیوم',
          ratePerSqMeterToman: 5200000,
        },
      },
      motorType: {
        tubular: {
          id: 'tubular',
          label: 'موتور توبولار',
          badge: 'داخل لوله، کم‌حجم برای تردد متوسط',
          priceToman: 13500000,
        },
        side_industrial: {
          id: 'side_industrial',
          label: 'موتور ساید (جانبی صنعتی)',
          badge: 'پرقدرت صنعتی مجهز به زنجیر دستی و UPS',
          priceToman: 22000000,
        },
      },
    },
  },

  // 3. Site Variables & Installation Add-ons
  siteVariables: {
    ironSubstructure: {
      id: 'ironSubstructure',
      label: 'نیاز به قوطی‌کشی و زیرسازی فلزی دارد',
      description: 'اجرای کلاف‌کشی تیرآهن یا قوطی فلزی شاسی جهت استحکام نصب دهانه',
      baseFeeToman: 7500000,
    },
    outsideTehran: {
      id: 'outsideTehran',
      label: 'محل پروژه خارج از تهران می‌باشد',
      description: 'حمل تخصصی شیشه، ایاب و ذهاب تکنسین‌های اجرایی در شهرستان‌ها',
      baseFeeToman: 6000000,
    },
    scaffoldingNeeded: {
      id: 'scaffoldingNeeded',
      label: 'ارتفاع نصب بالای ۳ متر (نیازمند بالابر/داربست)',
      description: 'تجهیزات ایمنی کار در ارتفاع و بالابرهای وکیوم برقی شیشه',
      baseFeeToman: 4500000,
    },
  },

  // 4. Baseline Installation & Calibration Rates
  baselineInstallationPercent: 0.12, // 12% for calibration, fitting & safety tests
};

export type SystemCategoryKey = keyof typeof PRICING_CONFIG.systemCategories;

export function CalculatorPage() {
  // Step 1: System Category
  const [selectedCategory, setSelectedCategory] = useState<SystemCategoryKey>('sliding');

  // Dynamic Live Config State
  const [liveConfig, setLiveConfig] = useState<PricingConfig>(DEFAULT_PRICING_CONFIG);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const config = await dbService.getPricingConfig();
        if (config) {
          setLiveConfig(config);
        }
      } catch (err) {
        console.warn('Could not load live pricing:', err);
      }
    }
    fetchPricing();
  }, []);

  // Filter Active Catalog Items (Must be Active AND allowed in Calculator)
  const activeGlasses = useMemo(() => {
    const items = (liveConfig.catalogItems || []).filter(
      (i) => i.category === 'glass' && i.isActive && i.showInCalculator !== false
    );
    if (items.length > 0) return items;
    // Fallback to defaults
    return (DEFAULT_PRICING_CONFIG.catalogItems || []).filter(
      (i) => i.category === 'glass' && i.isActive && i.showInCalculator !== false
    );
  }, [liveConfig]);

  const activeOperators = useMemo(() => {
    const items = (liveConfig.catalogItems || []).filter(
      (i) => i.category === 'operator' && i.isActive && i.showInCalculator !== false
    );
    if (items.length > 0) return items;
    return (DEFAULT_PRICING_CONFIG.catalogItems || []).filter(
      (i) => i.category === 'operator' && i.isActive && i.showInCalculator !== false
    );
  }, [liveConfig]);

  const activeFrames = useMemo(() => {
    const items = (liveConfig.catalogItems || []).filter(
      (i) => i.category === 'frame' && i.isActive && i.showInCalculator !== false
    );
    if (items.length > 0) return items;
    return (DEFAULT_PRICING_CONFIG.catalogItems || []).filter(
      (i) => i.category === 'frame' && i.isActive && i.showInCalculator !== false
    );
  }, [liveConfig]);

  // Selected dynamic catalog items
  const [selectedOperatorId, setSelectedOperatorId] = useState<string>('op-german-dunker');
  const [selectedGlassId, setSelectedGlassId] = useState<string>('glass-clear-10mm');
  const [selectedFrameId, setSelectedFrameId] = useState<string>('frame-anodized-silver');

  // Auto-sync selection if current selection gets deactivated
  useEffect(() => {
    if (activeOperators.length > 0 && !activeOperators.some(op => op.id === selectedOperatorId)) {
      setSelectedOperatorId(activeOperators[0].id);
    }
  }, [activeOperators, selectedOperatorId]);

  useEffect(() => {
    if (activeGlasses.length > 0 && !activeGlasses.some(g => g.id === selectedGlassId)) {
      setSelectedGlassId(activeGlasses[0].id);
    }
  }, [activeGlasses, selectedGlassId]);

  useEffect(() => {
    if (activeFrames.length > 0 && !activeFrames.some(f => f.id === selectedFrameId)) {
      setSelectedFrameId(activeFrames[0].id);
    }
  }, [activeFrames, selectedFrameId]);

  // B. Manual Mirral Door
  const [manualMechanism, setManualMechanism] = useState<keyof typeof PRICING_CONFIG.options.manualGlass.mechanism>('sliding_overhead');
  const [manualGlass, setManualGlass] = useState<keyof typeof PRICING_CONFIG.options.manualGlass.glassFinish>('securit_10mm_clear');
  const [manualHardware, setManualHardware] = useState<keyof typeof PRICING_CONFIG.options.manualGlass.hardwareColor>('steel_silver');

  // C. Glass Partition
  const [partitionProfile, setPartitionProfile] = useState<keyof typeof PRICING_CONFIG.options.partition.profile>('frameless_single');
  const [partitionGlass, setPartitionGlass] = useState<keyof typeof PRICING_CONFIG.options.partition.glassType>('securit_10mm_simple');

  // D. Electric Shutter
  const [shutterSlat, setShutterSlat] = useState<keyof typeof PRICING_CONFIG.options.shutter.slatType>('heavy_aluminum');
  const [shutterMotor, setShutterMotor] = useState<keyof typeof PRICING_CONFIG.options.shutter.motorType>('tubular');

  // Step 3: Dimensions & Site Variables
  const [widthMeters, setWidthMeters] = useState<number>(3.0);
  const [heightMeters, setHeightMeters] = useState<number>(2.4);

  const [hasIronSubstructure, setHasIronSubstructure] = useState<boolean>(false);
  const [isOutsideTehran, setIsOutsideTehran] = useState<boolean>(false);
  const [isScaffoldingNeeded, setIsScaffoldingNeeded] = useState<boolean>(false);

  // Customer Contact Info for Lead
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHoverNav, setActiveHoverNav] = useState<string | null>(null);

  // Dynamic Calculation Engine
  const calculation = useMemo(() => {
    const areaSqMeters = Math.round(widthMeters * heightMeters * 100) / 100;
    let hardwareAndCoreCost = 0;
    let panelAndGlassCost = 0;
    let finishAndAccCost = 0;

    const categoryInfo = PRICING_CONFIG.systemCategories[selectedCategory];

    if (selectedCategory === 'sliding' || selectedCategory === 'telescopic') {
      const activeOp = activeOperators.find((i) => i.id === selectedOperatorId) || activeOperators[0];
      const activeGl = activeGlasses.find((i) => i.id === selectedGlassId) || activeGlasses[0];
      const activeFr = activeFrames.find((i) => i.id === selectedFrameId) || activeFrames[0];

      const opPrice = activeOp ? activeOp.price : 54000000;
      const glRate = activeGl ? activeGl.price : 1450000;
      const frPrice = activeFr ? activeFr.price : 1450000;

      hardwareAndCoreCost = opPrice * categoryInfo.multiplier;
      panelAndGlassCost = glRate * areaSqMeters;
      finishAndAccCost = frPrice * widthMeters;
    } else if (selectedCategory === 'manual_glass') {
      const mech = PRICING_CONFIG.options.manualGlass.mechanism[manualMechanism];
      const activeGl = activeGlasses.find((i) => i.id === selectedGlassId) || activeGlasses[0];
      const hwColor = PRICING_CONFIG.options.manualGlass.hardwareColor[manualHardware];

      const glRate = activeGl ? activeGl.price : 1450000;

      hardwareAndCoreCost = mech.priceToman;
      panelAndGlassCost = glRate * areaSqMeters;
      finishAndAccCost = hwColor.priceToman;
    } else if (selectedCategory === 'partition') {
      const prof = PRICING_CONFIG.options.partition.profile[partitionProfile];
      const activeGl = activeGlasses.find((i) => i.id === selectedGlassId) || activeGlasses[0];
      const glRate = activeGl ? activeGl.price : 1450000;

      hardwareAndCoreCost = prof.priceToman * (widthMeters / 3.0);
      panelAndGlassCost = glRate * areaSqMeters;
      finishAndAccCost = 4500000; // Standard silicone, gaskets & acoustic seals
    } else if (selectedCategory === 'shutter') {
      const slat = PRICING_CONFIG.options.shutter.slatType[shutterSlat];
      const motor = PRICING_CONFIG.options.shutter.motorType[shutterMotor];

      hardwareAndCoreCost = motor.priceToman;
      panelAndGlassCost = slat.ratePerSqMeterToman * areaSqMeters;
      finishAndAccCost = 4800000; // Shaft, end-locks & side guides
    }

    // Site Variables Calculation
    let siteVariablesCost = 0;
    if (hasIronSubstructure) {
      siteVariablesCost += PRICING_CONFIG.siteVariables.ironSubstructure.baseFeeToman;
    }
    if (isOutsideTehran) {
      siteVariablesCost += PRICING_CONFIG.siteVariables.outsideTehran.baseFeeToman;
    }
    if (isScaffoldingNeeded) {
      siteVariablesCost += PRICING_CONFIG.siteVariables.scaffoldingNeeded.baseFeeToman;
    }

    // Base installation from live config or default
    const installBase = liveConfig.multipliers?.installationBaseCost || 4500000;
    const subtotalRaw = hardwareAndCoreCost + panelAndGlassCost + finishAndAccCost;
    const installationCost = Math.round(subtotalRaw * PRICING_CONFIG.baselineInstallationPercent) + (installBase > 0 ? 500000 : 0);
    const totalEstimatedPriceToman = subtotalRaw + installationCost + siteVariablesCost;

    // Price range calculation (+- 6% for site specifics)
    const minRangeToman = Math.round((totalEstimatedPriceToman * 0.94) / 100000) * 100000;
    const maxRangeToman = Math.round((totalEstimatedPriceToman * 1.06) / 100000) * 100000;

    return {
      areaSqMeters,
      hardwareAndCoreCost,
      panelAndGlassCost,
      finishAndAccCost,
      siteVariablesCost,
      installationCost,
      totalEstimatedPriceToman,
      minRangeToman,
      maxRangeToman,
    };
  }, [
    selectedCategory,
    selectedOperatorId,
    selectedGlassId,
    selectedFrameId,
    activeOperators,
    activeGlasses,
    activeFrames,
    manualMechanism,
    manualGlass,
    manualHardware,
    partitionProfile,
    partitionGlass,
    shutterSlat,
    shutterMotor,
    widthMeters,
    heightMeters,
    hasIronSubstructure,
    isOutsideTehran,
    isScaffoldingNeeded,
    liveConfig,
  ]);

  const handleCategoryChange = (key: SystemCategoryKey) => {
    setSelectedCategory(key);
    setWidthMeters(PRICING_CONFIG.systemCategories[key].defaultWidth);
    setHeightMeters(PRICING_CONFIG.systemCategories[key].defaultHeight);
  };

  const getCalculationSummary = () => {
    const activeCat = PRICING_CONFIG.systemCategories[selectedCategory].label;
    return `سیستم انتخابی: ${activeCat} | ابعاد: ${widthMeters} × ${heightMeters} متر (مساحت: ${calculation.areaSqMeters} متر مربع) | بازه برآورد هزینه: ${calculation.minRangeToman.toLocaleString('fa-IR')} تا ${calculation.maxRangeToman.toLocaleString('fa-IR')} تومان`;
  };

  const handleSendToWhatsApp = () => {
    setInquiryOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryOpen(true);
  };

  const navLinks = [
    { id: 'home', label: 'صفحه اصلی', href: 'index.html', icon: Sparkles, desc: 'خانه و معرفی سیستم‌ها' },
    { id: 'services', label: 'خدمات', href: 'services.html', icon: Layers, desc: 'سیستم‌های درب اتوماتیک و شیشه' },
    { id: 'projects', label: 'پروژه‌ها', href: 'projects.html', icon: Briefcase, desc: 'پروژه‌های شاخص و رزومه اجرایی' },
    { id: 'calculator', label: 'استعلام قیمت', href: 'calculator.html', icon: Calculator, desc: 'سامانه آنلاین برآورد قیمت' },
    { id: 'standards', label: 'استانداردها', href: 'standards.html', icon: ShieldCheck, desc: 'گارانتی ۲۴ ماهه و استانداردها' },
    { id: 'blog', label: 'مقالات', href: 'blog.html', icon: FileText, desc: 'دانشنامه و مقالات فنی' },
    { id: 'about', label: 'درباره ما', href: 'about.html', icon: Info, desc: 'پیشینه و اصالت ۲۵ ساله' },
  ];

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#11172C] font-['Vazirmatn',sans-serif] flex flex-col justify-between selection:bg-[#00F090]/30 selection:text-[#06080F]">
      
      {/* ========================================================
          1. PAGE HEADER & DESIGN SYSTEM: EXACT LUXURY NAVBAR
      ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#CBD8E2]/90 backdrop-blur-[16px] border-b border-white/80 shadow-xs py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* 1. Logo & Brand Tagline */}
            <a href="index.html" className="flex items-center gap-2.5 shrink-0" id="brand-logo-link-calc">
              <div className="brand-logo-icon relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#06080F] flex items-center justify-center p-1.5 shadow-sm border border-slate-700/50">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00F090" strokeWidth="1.7" />
                  <path d="M9 3v18" stroke="#00F090" strokeWidth="1.7" strokeDasharray="2 2" />
                  <path d="M15 3v18" stroke="#00F090" strokeWidth="1.7" strokeDasharray="2 2" />
                  <circle cx="12" cy="12" r="2" fill="#00F090" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-extrabold text-base sm:text-lg text-[#06080F] tracking-tight">درنا درب</span>
                  <span className="text-[#00F090] font-bold text-sm hidden sm:inline">|</span>
                  <span className="font-sans font-bold text-xs text-[#11172C] tracking-wider hidden sm:inline">DORNA DOOR</span>
                </div>
                <span className="text-[10px] text-[#11172C]/70 font-medium tracking-wide hidden sm:block">
                  سامانه برآورد آنلاین مهندسی
                </span>
              </div>
            </a>

            {/* 2. Desktop Navigation: 7 Concise Items */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 p-1 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-2xs">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setActiveHoverNav(link.id)}
                  onMouseLeave={() => setActiveHoverNav(null)}
                  className={`relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-bold rounded-xl transition-all whitespace-nowrap ${
                    link.id === 'calculator' ? 'text-[#06080F] bg-white font-extrabold shadow-xs' : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/80'
                  }`}
                >
                  {link.label}
                  {activeHoverNav === link.id && (
                    <motion.span
                      layoutId="nav-indicator-calc"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00F090] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* 3. Desktop CTA Button: Single prominent CTA */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setInquiryOpen(true)}
                id="btn-nav-inquiry-calc"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black bg-[#00F090] hover:bg-[#00D882] text-[#06080F] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#06080F]" />
                <span>استعلام فوری / مشاوره</span>
              </button>
            </div>

            {/* 4. Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <a
                href="tel:02122009876"
                aria-label="مشاوره فوری"
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white/80 hover:bg-white text-[#06080F] border border-white/90 shadow-2xs backdrop-blur-[8px] flex items-center justify-center transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#06080F]" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="منوی سایت"
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#06080F] hover:bg-slate-900 text-white border border-slate-700/50 shadow-2xs backdrop-blur-[8px] flex items-center justify-center transition-all active:scale-95"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-5 border-t border-white/80 bg-[#CBD8E2]/95 backdrop-blur-xl space-y-2 mt-2">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/70 hover:bg-white text-[#06080F] font-bold text-xs transition-colors border border-white/70"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 text-[#06080F]" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] text-[#11172C]/70 font-normal">{item.desc}</span>
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="index.html"
                className="w-full py-3 rounded-xl bg-white/80 hover:bg-white text-[#06080F] text-xs font-bold flex items-center justify-center gap-2 text-center border border-white/80"
              >
                <span>بازگشت به صفحه اصلی</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInquiryOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>درخواست مشاوره تخصصی</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          2. PAGE TITLE & HERO HEADER
      ======================================================== */}
      <main className="flex-1 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CBD8E2] border border-white/80 text-[#06080F] text-xs font-bold shadow-2xs backdrop-blur-md mb-4">
              <Calculator className="w-4 h-4 text-[#06080F]" />
              <span>سامانه برآورد آنلاین درنا درب</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#06080F] tracking-tight">
              محاسبه‌گر هوشمند قیمت پروژه
            </h1>

            <p className="text-xs sm:text-sm text-[#11172C]/80 mt-3 leading-relaxed max-w-2xl mx-auto font-medium">
              برآورد آنلاین هزینه‌های اجرایی بر اساس ابعاد، نوع موتور و متریال درنا درب
            </p>
          </div>

          {/* ========================================================
              3. MAIN CONTAINER: CENTERED SLEEK GLASSMORPHIC CARD
          ======================================================== */}
          <div className="bg-[#CBD8E2]/70 backdrop-blur-[16px] rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/80 shadow-xl shadow-[#06080F]/[0.05] mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              
              {/* ========================================================
                  LEFT: DYNAMIC CONDITIONAL CALCULATOR LOGIC (7 Cols)
              ======================================================== */}
              <div className="lg:col-span-7 space-y-7">
                
                {/* STEP 1: System Category Selection (Ultra-minimalist Segmented Control / Low-profile Glass Pills) */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#06080F] mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#06080F] text-[#00F090] text-[11px] font-black flex items-center justify-center">۱</span>
                      <span>انتخاب دسته‌بندی سیستم سازه:</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#06080F] bg-white/80 px-2.5 py-0.5 rounded-md border border-white/90 shadow-2xs">
                      {PRICING_CONFIG.systemCategories[selectedCategory].label}
                    </span>
                  </label>

                  {/* Low-profile Glass Segmented Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/70">
                    {(Object.keys(PRICING_CONFIG.systemCategories) as SystemCategoryKey[]).map((catKey) => {
                      const item = PRICING_CONFIG.systemCategories[catKey];
                      const isSelected = selectedCategory === catKey;
                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => handleCategoryChange(catKey)}
                          className={`relative py-2.5 px-2 rounded-xl text-center font-bold text-xs transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-[#06080F] text-white shadow-md'
                              : 'text-[#11172C] hover:text-[#06080F] hover:bg-white/60'
                          }`}
                        >
                          <span className="relative z-10 block truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-[#11172C]/70 mt-2 px-1">
                    {PRICING_CONFIG.systemCategories[selectedCategory].description}
                  </p>
                </div>

                {/* STEP 2: DYNAMIC CONDITIONAL OPTIONS (Display ONLY options relevant to selected category) */}
                <div className="bg-white/70 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/80 shadow-2xs space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                    <span className="text-xs sm:text-sm font-bold text-[#06080F] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#06080F] text-[#00F090] text-[11px] font-black flex items-center justify-center">۲</span>
                      <span>مشخصات فنی و متریال اختصاصی</span>
                    </span>
                    <span className="text-[11px] text-[#11172C]/70 font-medium">پیکربندی هوشمند شرطی</span>
                  </div>

                  {/* CASE 1: AUTOMATIC DOORS (Sliding & Telescopic) */}
                  {(selectedCategory === 'sliding' || selectedCategory === 'telescopic') && (
                    <motion.div 
                      key="auto-doors-options"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* Motor / Operator (Dynamic from Active Catalog) */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-[#06080F] flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5 text-[#06080F]" />
                            <span>نوع موتور و اپراتور الکترونیکی:</span>
                          </label>
                          <span className="text-[10px] text-[#06080F] font-bold bg-[#00F090]/25 px-2 py-0.5 rounded border border-[#00F090]/40">
                            {activeOperators.length} مدل فعال
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {activeOperators.map((item) => {
                            const isSel = selectedOperatorId === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedOperatorId(item.id)}
                                className={`p-3.5 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <div>
                                  <span className="font-bold text-[#06080F] mb-1 block">{item.name}</span>
                                  {item.description && (
                                    <p className="text-[10px] text-[#11172C]/70 leading-tight mb-2 line-clamp-1">{item.description}</p>
                                  )}
                                </div>
                                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                                  <span className="text-[10px] text-[#06080F] font-bold">{item.badge || 'اورجینال'}</span>
                                  <span className="text-[11px] font-extrabold text-[#06080F]">{item.price.toLocaleString('fa-IR')} تومان</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Glass Type (Dynamic from Active Catalog) */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-[#06080F] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#06080F]" />
                            <span>نوع شیشه سازه (قیمت هر مترمربع):</span>
                          </label>
                          <span className="text-[10px] text-[#06080F] font-bold bg-[#00F090]/25 px-2 py-0.5 rounded border border-[#00F090]/40">
                            {activeGlasses.length} متریال فعال
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {activeGlasses.map((item) => {
                            const isSel = selectedGlassId === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedGlassId(item.id)}
                                className={`p-3 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <div>
                                  <span className="font-bold text-[#06080F] mb-1 block">{item.name}</span>
                                  {item.badge && (
                                    <span className="text-[10px] text-[#11172C]/70 block mb-1">{item.badge}</span>
                                  )}
                                </div>
                                <div className="text-[11px] font-extrabold text-[#06080F] mt-1">
                                  {item.price.toLocaleString('fa-IR')} تومان / م²
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Frame Finish (Dynamic from Active Catalog) */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-[#06080F] flex items-center gap-1.5">
                            <Settings2 className="w-3.5 h-3.5 text-[#06080F]" />
                            <span>پوشش فریم و شاسی پروفیل آلومینیوم:</span>
                          </label>
                          <span className="text-[10px] text-[#06080F] font-bold bg-[#00F090]/25 px-2 py-0.5 rounded border border-[#00F090]/40">
                            {activeFrames.length} فریم فعال
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                          {activeFrames.map((item) => {
                            const isSel = selectedFrameId === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedFrameId(item.id)}
                                className={`p-3 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{item.name}</span>
                                <span className="text-[10px] text-[#11172C]/70">{item.badge}</span>
                                <span className="text-[10px] font-extrabold text-[#06080F] mt-1">{item.price.toLocaleString('fa-IR')} تومان</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CASE 2: MANUAL MIRRAL GLASS DOOR */}
                  {selectedCategory === 'manual_glass' && (
                    <motion.div 
                      key="manual-glass-options"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* Mechanism Type */}
                      <div>
                        <label className="block text-xs font-bold text-[#06080F] mb-2 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#06080F]" />
                          <span>نوع مکانیزم حرکتی و یراق‌آلات (Mechanism Type):</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {(Object.keys(PRICING_CONFIG.options.manualGlass.mechanism) as Array<keyof typeof PRICING_CONFIG.options.manualGlass.mechanism>).map((key) => {
                            const opt = PRICING_CONFIG.options.manualGlass.mechanism[key];
                            const isSel = manualMechanism === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setManualMechanism(key)}
                                className={`p-3 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{opt.label}</span>
                                <span className="text-[10px] text-[#11172C]/70">{opt.badge}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Glass Finish */}
                      <div>
                        <label className="block text-xs font-bold text-[#06080F] mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#06080F]" />
                          <span>پوشش و پرداخت شیشه میرال (Glass Finish):</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {(Object.keys(PRICING_CONFIG.options.manualGlass.glassFinish) as Array<keyof typeof PRICING_CONFIG.options.manualGlass.glassFinish>).map((key) => {
                            const opt = PRICING_CONFIG.options.manualGlass.glassFinish[key];
                            const isSel = manualGlass === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setManualGlass(key)}
                                className={`p-3 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{opt.label}</span>
                                <span className="text-[10px] text-[#11172C]/70">{opt.badge}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hardware Color */}
                      <div>
                        <label className="block text-xs font-bold text-[#06080F] mb-2 flex items-center gap-1.5">
                          <Settings2 className="w-3.5 h-3.5 text-[#06080F]" />
                          <span>رنگ یراق‌آلات و دستگیره (Hardware Color):</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {(Object.keys(PRICING_CONFIG.options.manualGlass.hardwareColor) as Array<keyof typeof PRICING_CONFIG.options.manualGlass.hardwareColor>).map((key) => {
                            const opt = PRICING_CONFIG.options.manualGlass.hardwareColor[key];
                            const isSel = manualHardware === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setManualHardware(key)}
                                className={`p-3 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{opt.label}</span>
                                <span className="text-[10px] text-[#11172C]/70">{opt.badge}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CASE 3: GLASS PARTITION */}
                  {selectedCategory === 'partition' && (
                    <motion.div 
                      key="partition-options"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* System Profile */}
                      <div>
                        <label className="block text-xs font-bold text-[#06080F] mb-2 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#06080F]" />
                          <span>نوع پروفیل و ساختار پارتیشن (System Profile):</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(Object.keys(PRICING_CONFIG.options.partition.profile) as Array<keyof typeof PRICING_CONFIG.options.partition.profile>).map((key) => {
                            const opt = PRICING_CONFIG.options.partition.profile[key];
                            const isSel = partitionProfile === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setPartitionProfile(key)}
                                className={`p-3.5 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{opt.label}</span>
                                <span className="text-[10px] text-[#06080F] font-bold">{opt.badge}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Glass Type */}
                      <div>
                        <label className="block text-xs font-bold text-[#06080F] mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#06080F]" />
                          <span>نوع شیشه پارتیشن (Glass Type):</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {(Object.keys(PRICING_CONFIG.options.partition.glassType) as Array<keyof typeof PRICING_CONFIG.options.partition.glassType>).map((key) => {
                            const opt = PRICING_CONFIG.options.partition.glassType[key];
                            const isSel = partitionGlass === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setPartitionGlass(key)}
                                className={`p-3 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{opt.label}</span>
                                <span className="text-[10px] text-[#11172C]/70">{opt.badge}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CASE 4: ELECTRIC ROLLER SHUTTER */}
                  {selectedCategory === 'shutter' && (
                    <motion.div 
                      key="shutter-options"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* Slat Type */}
                      <div>
                        <label className="block text-xs font-bold text-[#06080F] mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#06080F]" />
                          <span>نوع تیغه کرکره برقی (Slat Type):</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {(Object.keys(PRICING_CONFIG.options.shutter.slatType) as Array<keyof typeof PRICING_CONFIG.options.shutter.slatType>).map((key) => {
                            const opt = PRICING_CONFIG.options.shutter.slatType[key];
                            const isSel = shutterSlat === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setShutterSlat(key)}
                                className={`p-3 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{opt.label}</span>
                                <span className="text-[10px] text-[#11172C]/70">{opt.badge}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Motor Type */}
                      <div>
                        <label className="block text-xs font-bold text-[#06080F] mb-2 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-[#06080F]" />
                          <span>نوع موتور کرکره برقی (Motor Type):</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(Object.keys(PRICING_CONFIG.options.shutter.motorType) as Array<keyof typeof PRICING_CONFIG.options.shutter.motorType>).map((key) => {
                            const opt = PRICING_CONFIG.options.shutter.motorType[key];
                            const isSel = shutterMotor === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setShutterMotor(key)}
                                className={`p-3.5 rounded-xl text-right border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                                  isSel 
                                    ? 'bg-white border-[#06080F] shadow-sm ring-2 ring-[#00F090]/50' 
                                    : 'bg-white/60 hover:bg-white border-white/80'
                                }`}
                              >
                                <span className="font-bold text-[#06080F] mb-1">{opt.label}</span>
                                <span className="text-[10px] text-[#06080F] font-bold">{opt.badge}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* STEP 3: Dimensions & Site Variables (Universal Inputs) */}
                <div className="bg-white/70 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/80 shadow-2xs space-y-5">
                  
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                    <span className="text-xs sm:text-sm font-bold text-[#06080F] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#06080F] text-[#00F090] text-[11px] font-black flex items-center justify-center">۳</span>
                      <span>ابعاد بازشو و متغیرهای محل پروژه</span>
                    </span>
                    <span className="text-xs font-black text-[#06080F] bg-[#00F090]/30 px-3 py-1 rounded-full border border-[#00F090]/50 shadow-2xs">
                      مساحت کل: {calculation.areaSqMeters} m²
                    </span>
                  </div>

                  {/* Width: Slider + Direct Input (1m to 10m) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#06080F]">
                      <span>عرض دهانه (Width):</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="1.0"
                          max="10.0"
                          step="0.1"
                          value={widthMeters}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val)) {
                              setWidthMeters(Math.min(10.0, Math.max(1.0, val)));
                            }
                          }}
                          className="w-16 p-1 text-center font-extrabold text-[#06080F] text-sm bg-white rounded-lg border border-slate-200 shadow-2xs focus:outline-none focus:border-[#00F090]"
                        />
                        <span className="text-xs text-[#11172C]/70 font-medium">متر</span>
                      </div>
                    </div>
                    <div className="py-1">
                      <input
                        type="range"
                        min="1.0"
                        max="10.0"
                        step="0.1"
                        value={widthMeters}
                        onChange={(e) => setWidthMeters(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00F090] focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] sm:text-[11px] text-[#11172C]/70 font-medium">
                      <span>۱.۰ متر (حداقل)</span>
                      <span>۵.۰ متر</span>
                      <span>۱۰.۰ متر (حداکثر)</span>
                    </div>
                  </div>

                  {/* Height: Slider + Direct Input (2m to 5m) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#06080F]">
                      <span>ارتفاع بازشو (Height):</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="2.0"
                          max="5.0"
                          step="0.1"
                          value={heightMeters}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val)) {
                              setHeightMeters(Math.min(5.0, Math.max(2.0, val)));
                            }
                          }}
                          className="w-16 p-1 text-center font-extrabold text-[#06080F] text-sm bg-white rounded-lg border border-slate-200 shadow-2xs focus:outline-none focus:border-[#00F090]"
                        />
                        <span className="text-xs text-[#11172C]/70 font-medium">متر</span>
                      </div>
                    </div>
                    <div className="py-1">
                      <input
                        type="range"
                        min="2.0"
                        max="5.0"
                        step="0.1"
                        value={heightMeters}
                        onChange={(e) => setHeightMeters(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00F090] focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] sm:text-[11px] text-[#11172C]/70 font-medium">
                      <span>۲.۰ متر (حداقل)</span>
                      <span>۳.۵ متر</span>
                      <span>۵.۰ متر (حداکثر)</span>
                    </div>
                  </div>

                  {/* Optional Site Variable Checkboxes */}
                  <div className="pt-2 border-t border-slate-200/70 space-y-2.5">
                    <span className="text-xs font-bold text-[#06080F] block mb-2">شرایط و ملزومات کارگاهی:</span>

                    {/* Toggle 1: Iron Substructure */}
                    <label className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#00F090] transition-colors cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={hasIronSubstructure}
                        onChange={(e) => setHasIronSubstructure(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#06080F] focus:ring-[#00F090] cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-[#06080F] block">{PRICING_CONFIG.siteVariables.ironSubstructure.label}</span>
                        <span className="text-[10px] text-[#11172C]/70 leading-tight block mt-0.5">{PRICING_CONFIG.siteVariables.ironSubstructure.description}</span>
                      </div>
                    </label>

                    {/* Toggle 2: Outside Tehran */}
                    <label className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#00F090] transition-colors cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={isOutsideTehran}
                        onChange={(e) => setIsOutsideTehran(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#06080F] focus:ring-[#00F090] cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-[#06080F] block">{PRICING_CONFIG.siteVariables.outsideTehran.label}</span>
                        <span className="text-[10px] text-[#11172C]/70 leading-tight block mt-0.5">{PRICING_CONFIG.siteVariables.outsideTehran.description}</span>
                      </div>
                    </label>

                    {/* Toggle 3: Scaffolding / High Altitude */}
                    <label className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#00F090] transition-colors cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={isScaffoldingNeeded}
                        onChange={(e) => setIsScaffoldingNeeded(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#06080F] focus:ring-[#00F090] cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-[#06080F] block">{PRICING_CONFIG.siteVariables.scaffoldingNeeded.label}</span>
                        <span className="text-[10px] text-[#11172C]/70 leading-tight block mt-0.5">{PRICING_CONFIG.siteVariables.scaffoldingNeeded.description}</span>
                      </div>
                    </label>
                  </div>

                </div>

              </div>

              {/* ========================================================
                  RIGHT: LIVE SUMMARY & ESTIMATION PANEL (5 Cols)
              ======================================================== */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#06080F] text-white rounded-3xl p-5 sm:p-7 lg:p-8 shadow-2xl border border-slate-800/90 relative overflow-hidden">
                
                <div>
                  {/* Panel Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#00F090]/20 border border-[#00F090]/30 flex items-center justify-center text-[#00F090]">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white">برآورد آنلاین و زنده هزینه</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#00F090] bg-[#00F090]/10 border border-[#00F090]/20 px-2.5 py-0.5 rounded-full">
                      آنلاین و دقیق
                    </span>
                  </div>

                  {/* Specifications Overview */}
                  <div className="space-y-2 text-xs text-slate-300 mb-5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">سیستم انتخابی:</span>
                      <span className="font-bold text-white">{PRICING_CONFIG.systemCategories[selectedCategory].label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ابعاد و مساحت:</span>
                      <span className="font-bold text-white">{widthMeters} × {heightMeters} متر ({calculation.areaSqMeters} m²)</span>
                    </div>
                    
                    {/* Dynamic label depending on active system */}
                    {(selectedCategory === 'sliding' || selectedCategory === 'telescopic') && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-400">اپراتور:</span>
                          <span className="font-bold text-[#00F090]">
                            {activeOperators.find(i => i.id === selectedOperatorId)?.name || 'اپراتور استاندارد'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">نوع شیشه:</span>
                          <span className="font-bold text-white">
                            {activeGlasses.find(i => i.id === selectedGlassId)?.name || 'شیشه سکوریت ۱۰ میل'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">پوشش فریم:</span>
                          <span className="font-bold text-slate-200">
                            {activeFrames.find(i => i.id === selectedFrameId)?.name || 'آنادایز مات'}
                          </span>
                        </div>
                      </>
                    )}

                    {selectedCategory === 'manual_glass' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-400">مکانیزم:</span>
                          <span className="font-bold text-[#00F090]">{PRICING_CONFIG.options.manualGlass.mechanism[manualMechanism].label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">نوع شیشه:</span>
                          <span className="font-bold text-white">{PRICING_CONFIG.options.manualGlass.glassFinish[manualGlass].label}</span>
                        </div>
                      </>
                    )}

                    {selectedCategory === 'partition' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-400">نوع ساختار:</span>
                          <span className="font-bold text-[#00F090]">{PRICING_CONFIG.options.partition.profile[partitionProfile].label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">نوع شیشه:</span>
                          <span className="font-bold text-white">{PRICING_CONFIG.options.partition.glassType[partitionGlass].label}</span>
                        </div>
                      </>
                    )}

                    {selectedCategory === 'shutter' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-400">نوع تیغه:</span>
                          <span className="font-bold text-[#00F090]">{PRICING_CONFIG.options.shutter.slatType[shutterSlat].label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">موتور کرکره:</span>
                          <span className="font-bold text-white">{PRICING_CONFIG.options.shutter.motorType[shutterMotor].label}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Itemized Cost Breakdown */}
                  <div className="space-y-2 text-xs text-slate-300 mb-5 pb-5 border-b border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">موتور / قطعات الکترومکانیکال اصلی:</span>
                      <span className="font-semibold text-slate-200">{calculation.hardwareAndCoreCost.toLocaleString('fa-IR')} تومان</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">پنل‌ها، شیشه سکوریت / تیغه‌ها:</span>
                      <span className="font-semibold text-slate-200">{calculation.panelAndGlassCost.toLocaleString('fa-IR')} تومان</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">فریم‌ها، اتصالات و یراق‌آلات تکمیلی:</span>
                      <span className="font-semibold text-slate-200">{calculation.finishAndAccCost.toLocaleString('fa-IR')} تومان</span>
                    </div>
                    {calculation.siteVariablesCost > 0 && (
                      <div className="flex justify-between text-[#00F090]">
                        <span>هزینه شرایط خاص کارگاهی:</span>
                        <span className="font-semibold">{calculation.siteVariablesCost.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">نصب، کالیبراسیون و تست استاندارد:</span>
                      <span className="font-semibold text-slate-200">{calculation.installationCost.toLocaleString('fa-IR')} تومان</span>
                    </div>
                  </div>

                  {/* Calculated Estimated Price Range (in Toman) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-[#00F090]/30 shadow-lg text-center mb-5">
                    <span className="text-xs text-slate-400 block mb-1">
                      بازه تقریبی هزینه تمام‌شده پروژه:
                    </span>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#00F090] tracking-tight">
                      {calculation.minRangeToman.toLocaleString('fa-IR')} تا {calculation.maxRangeToman.toLocaleString('fa-IR')}
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block">تومان (شامل متریال، یراق‌آلات، فریم و نصب)</span>

                    <div className="flex items-center justify-around mt-3.5 pt-3.5 border-t border-slate-800 text-[11px] text-slate-300">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090]" />
                        <span>گارانتی معتبر درنا درب</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090]" />
                        <span>نصب مهندسی استاندارد</span>
                      </span>
                    </div>
                  </div>

                </div>

                {/* Consultation Lead Form & Actions */}
                <div className="mt-2 pt-2">
                  {isSubmitted ? (
                    <div className="p-4 bg-[#00F090]/15 border border-[#00F090]/30 text-[#00F090] rounded-2xl text-center text-xs space-y-1">
                      <Check className="w-5 h-5 mx-auto text-[#00F090] mb-1" />
                      <p className="font-bold">درخواست شما با موفقیت ثبت گردید</p>
                      <p className="text-[11px] text-slate-300">مهندس ناظر فنی درنا درب جهت هماهنگی و بازدید در محل تماس خواهد گرفت.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          required
                          placeholder="نام و نام خانوادگی"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00F090]"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="شماره تماس (۰۹۱۲...)"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00F090]"
                        />
                      </div>

                      {/* Primary CTA Button */}
                      <button
                        type="submit"
                        id="btn-calc-page-submit"
                        className="w-full py-3.5 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#06080F]" />
                        <span>درخواست مشاوره تخصصی و اندازه‌گیری در محل</span>
                      </button>

                      {/* Quick WhatsApp Action */}
                      <button
                        type="button"
                        onClick={handleSendToWhatsApp}
                        className="w-full py-2.5 rounded-xl bg-[#00F090]/15 hover:bg-[#00F090]/25 text-[#00F090] border border-[#00F090]/40 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <span>ارسال مستقیم این برآورد به کارشناس واتس‌اپ</span>
                      </button>
                    </form>
                  )}

                  {/* Required Disclaimer */}
                  <p className="text-[11px] text-slate-400 text-center leading-relaxed mt-3.5 font-normal">
                    * هزینه‌های محاسبه‌شده حدودی بوده و قیمت نهایی پس از بررسی کارشناس در محل ثبت می‌شود.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Technical Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#CBD8E2]/80 backdrop-blur-md p-6 rounded-2xl border border-white/90 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white text-[#06080F] flex items-center justify-center mb-2 shadow-2xs">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#06080F]">مبنای محاسبه قیمت در سامانه</h3>
              <p className="text-xs text-[#11172C]/80 leading-relaxed">
                فرمول برآورد هزینه شامل قیمت روز اپراتور اورجینال، شیشه‌های استاندارد سوپرکلیر، پروفیل‌های شاسی‌کشی آلومینیوم و درصد نصب و تست استاندارد است.
              </p>
            </div>

            <div className="bg-[#CBD8E2]/80 backdrop-blur-md p-6 rounded-2xl border border-white/90 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white text-[#06080F] flex items-center justify-center mb-2 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#06080F]">گارانتی تعویض و خدمات پس از فروش</h3>
              <p className="text-xs text-[#11172C]/80 leading-relaxed">
                کلیه سیستم‌های مجهز به اپراتور Dunkermotoren آلمان دارای ۵ سال گارانتی کتبی تعویض بی‌قید و شرط و ۱۰ سال خدمات تامین قطعات هستند.
              </p>
            </div>

            <div className="bg-[#CBD8E2]/80 backdrop-blur-md p-6 rounded-2xl border border-white/90 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white text-[#06080F] flex items-center justify-center mb-2 shadow-2xs">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#06080F]">کارشناسی حضوری و بازدید رایگان در محل</h3>
              <p className="text-xs text-[#11172C]/80 leading-relaxed">
                کارشناسان فنی درنا درب در سراسر مناطق ۱ تا ۵ تهران (الهیه، فرشته، نیاوران، زعفرانیه و...) جهت نقشه‌برداری دقیق دهانه در محل پروژه حضور می‌یابند.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Luxury Footer */}
      <footer className="bg-[#CBD8E2] text-[#11172C] py-10 border-t border-white/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#06080F]">
            <span className="font-black text-sm">درنا درب</span>
            <span className="text-[#11172C]/40">•</span>
            <span className="text-xs text-[#11172C]/80">سامانه تخصصی برآورد آنلاین قیمت درب اتوماتیک و سازه‌های شیشه‌ای</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="index.html" className="hover:text-[#06080F] transition-colors font-medium">صفحه اصلی</a>
            <a href="tel:02122009876" className="text-[#06080F] hover:text-[#00F090] font-black">۰۲۱-۲۲۰۰۹۸۷۶</a>
          </div>
        </div>
      </footer>

      {/* Quick Inquiry & On-site Survey Modal */}
      <QuickInquiryModal 
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialData={{
          title: 'استعلام قیمت و ارسال پیش‌فاکتور محاسبه‌شده',
          projectType: PRICING_CONFIG.systemCategories[selectedCategory].label,
          details: getCalculationSummary(),
          estimatedCost: `${calculation.minRangeToman.toLocaleString('fa-IR')} تا ${calculation.maxRangeToman.toLocaleString('fa-IR')} تومان`,
          source: 'calculator',
        }}
      />

    </div>
  );
}
