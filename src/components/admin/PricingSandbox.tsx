import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Calculator,
  Sliders,
  Save,
  RefreshCw,
  Sparkles,
  Layers,
  Shield,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  TrendingUp,
  Activity,
  ArrowLeftRight,
} from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';
import { CatalogItem, DEFAULT_CATALOG_ITEMS, PricingConfig } from '../../lib/supabase';

// Helper Persian Number & Words Formatter
function formatFaCommas(num: number | string | undefined | null): string {
  if (num === undefined || num === null || isNaN(Number(num))) return '۰';
  return Number(num).toLocaleString('fa-IR');
}

function formatEnCommas(num: number | string | undefined | null): string {
  if (num === undefined || num === null || isNaN(Number(num))) return '0';
  return Number(num).toLocaleString('en-US');
}

const ONES: { [key: number]: string } = {
  1: 'یک', 2: 'دو', 3: 'سه', 4: 'چهار', 5: 'پنج', 6: 'شش', 7: 'هفت', 8: 'هشت', 9: 'نه',
};
const TEENS: { [key: number]: string } = {
  10: 'ده', 11: 'یازده', 12: 'دوازده', 13: 'سیزده', 14: 'چهارده', 15: 'پانزده', 16: 'شانزده', 17: 'هفده', 18: 'هجده', 19: 'نوزده',
};
const TENS: { [key: number]: string } = {
  2: 'بیست', 3: 'سی', 4: 'چهل', 5: 'پنجاه', 6: 'شصت', 7: 'هفتاد', 8: 'هشتاد', 9: 'نود',
};
const HUNDREDS: { [key: number]: string } = {
  1: 'صد', 2: 'دویست', 3: 'سیصد', 4: 'چهارصد', 5: 'پانصد', 6: 'ششصد', 7: 'هفتصد', 8: 'هشتصد', 9: 'نهصد',
};
const SCALES = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

function numToPersianWords(input: number | string | undefined | null): string {
  if (input === undefined || input === null || input === '') return 'صفر';
  const rawNum = typeof input === 'string' ? parseInt(input.replace(/[^0-9-]/g, ''), 10) : Math.floor(input);
  if (isNaN(rawNum) || rawNum === 0) return 'صفر';

  let num = Math.abs(rawNum);
  const isNegative = rawNum < 0;
  const chunks: number[] = [];
  while (num > 0) {
    chunks.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  const chunkWordsList: string[] = [];
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunkVal = chunks[i];
    if (chunkVal === 0) continue;
    const words: string[] = [];
    const h = Math.floor(chunkVal / 100);
    const rem = chunkVal % 100;
    if (h > 0 && HUNDREDS[h]) words.push(HUNDREDS[h]);
    if (rem >= 10 && rem <= 19) {
      if (TEENS[rem]) words.push(TEENS[rem]);
    } else {
      const t = Math.floor(rem / 10);
      const o = rem % 10;
      if (t > 0 && TENS[t]) words.push(TENS[t]);
      if (o > 0 && ONES[o]) words.push(ONES[o]);
    }
    if (words.length > 0) {
      let chunkStr = words.join(' و ');
      const scale = SCALES[i];
      if (scale) chunkStr = `${chunkStr} ${scale}`;
      chunkWordsList.push(chunkStr);
    }
  }

  if (chunkWordsList.length === 0) return 'صفر';
  const result = chunkWordsList.join(' و ');
  return isNegative ? `منفی ${result}` : result;
}

interface PriceInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  unit?: string;
  hint?: string;
}

const FormattedPriceInput: React.FC<PriceInputProps> = ({
  label,
  value,
  onChange,
  unit = 'تومان',
  hint,
}) => {
  const [displayVal, setDisplayVal] = useState(formatEnCommas(value));
  const [isFocused, setIsFocused] = useState(false);

  React.useEffect(() => {
    if (!isFocused) {
      setDisplayVal(formatEnCommas(value));
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    setDisplayVal(raw ? Number(raw).toLocaleString('en-US') : '');
    onChange(num);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black text-[#06080F]">{label}</label>
        {hint && <span className="text-[11px] text-[#11172C]/70">{hint}</span>}
      </div>

      <div className="relative">
        <input
          type="text"
          dir="ltr"
          value={displayVal}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-[#06080F] font-mono text-xs font-bold tracking-wider text-left pl-14 focus:border-[#06080F] focus:bg-white focus:outline-none transition-all shadow-inner"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center text-[10px] font-black text-[#06080F] pointer-events-none bg-[#CBD8E2] px-2 py-0.5 rounded border border-[#06080F]/10">
          <span>{unit}</span>
        </div>
      </div>

      <div className="text-[10px] text-[#11172C] px-1 font-medium truncate">
        به حروف: <span className="font-bold text-[#06080F]">{numToPersianWords(value)} {unit}</span>
      </div>
    </div>
  );
};

export const PricingSandbox: React.FC = () => {
  const {
    pricingConfig,
    savePricingConfig,
    toggleCatalogItemActive,
    toggleCatalogItemCalculator,
    updateCatalogItem,
    addCatalogItem,
    deleteCatalogItem,
    isLoading,
    setStatusMessage,
  } = useAdminStore();

  // Local draft state for live editing & sandbox simulation
  const [draftConfig, setDraftConfig] = useState<PricingConfig>(pricingConfig);
  const [activeSubTab, setActiveSubTab] = useState<'formula' | 'catalog' | 'simulator'>('simulator');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync draft when store updates
  React.useEffect(() => {
    setDraftConfig(pricingConfig);
  }, [pricingConfig]);

  // Catalog item editing modal state
  const [editingCatalogItem, setEditingCatalogItem] = useState<CatalogItem | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  // ----------------------------------------------------------------------------
  // LIVE SANDBOX SIMULATOR STATE
  // ----------------------------------------------------------------------------
  const [simWidth, setSimWidth] = useState<number>(3.0); // meters
  const [simHeight, setSimHeight] = useState<number>(2.4); // meters
  const [simLeaves, setSimLeaves] = useState<number>(2);
  const [simGlassKey, setSimGlassKey] = useState<keyof typeof pricingConfig.glassPrices>('superClear10mm');
  const [simOperatorKey, setSimOperatorKey] = useState<keyof typeof pricingConfig.operatorPrices>('germanDunker');
  const [simProfileKey, setSimProfileKey] = useState<keyof typeof pricingConfig.fittingProfiles>('anodizedGold');
  const [simIsNorthTehran, setSimIsNorthTehran] = useState<boolean>(true);
  const [simIncludeAccessControl, setSimIncludeAccessControl] = useState<boolean>(true);

  // Calculate Quote with DRAFT config (live edited rates)
  const simulatedDraftQuote = useMemo(() => {
    const totalArea = simWidth * simHeight;
    const perimeterMeters = (simWidth + simHeight) * 2;

    const glassUnitPrice = draftConfig.glassPrices[simGlassKey] || 2650000;
    const operatorUnitPrice = draftConfig.operatorPrices[simOperatorKey] || 54000000;
    const profileUnitPrice = draftConfig.fittingProfiles[simProfileKey] || 1850000;

    const glassTotal = Math.round(totalArea * glassUnitPrice);
    const profileTotal = Math.round(perimeterMeters * profileUnitPrice);
    const accessCost = simIncludeAccessControl ? 4800000 : 0;
    const installBase = draftConfig.multipliers.installationBaseCost || 4500000;

    const subTotal = glassTotal + operatorUnitPrice + profileTotal + accessCost + installBase;
    const multiplier = simIsNorthTehran
      ? draftConfig.multipliers.districtNorthMultiplier || 1.05
      : draftConfig.multipliers.districtStandardMultiplier || 1.0;

    const finalTotal = Math.round(subTotal * multiplier);

    return {
      area: totalArea.toFixed(2),
      perimeter: perimeterMeters.toFixed(1),
      glassTotal,
      operatorUnitPrice,
      profileTotal,
      accessCost,
      installBase,
      multiplier,
      finalTotal,
    };
  }, [simWidth, simHeight, simLeaves, simGlassKey, simOperatorKey, simProfileKey, simIsNorthTehran, simIncludeAccessControl, draftConfig]);

  // Calculate Quote with CURRENT SAVED config (to show difference)
  const simulatedSavedQuote = useMemo(() => {
    const totalArea = simWidth * simHeight;
    const perimeterMeters = (simWidth + simHeight) * 2;

    const glassUnitPrice = pricingConfig.glassPrices[simGlassKey] || 2650000;
    const operatorUnitPrice = pricingConfig.operatorPrices[simOperatorKey] || 54000000;
    const profileUnitPrice = pricingConfig.fittingProfiles[simProfileKey] || 1850000;

    const glassTotal = Math.round(totalArea * glassUnitPrice);
    const profileTotal = Math.round(perimeterMeters * profileUnitPrice);
    const accessCost = simIncludeAccessControl ? 4800000 : 0;
    const installBase = pricingConfig.multipliers.installationBaseCost || 4500000;

    const subTotal = glassTotal + operatorUnitPrice + profileTotal + accessCost + installBase;
    const multiplier = simIsNorthTehran
      ? pricingConfig.multipliers.districtNorthMultiplier || 1.05
      : pricingConfig.multipliers.districtStandardMultiplier || 1.0;

    const finalTotal = Math.round(subTotal * multiplier);
    return { finalTotal };
  }, [simWidth, simHeight, simLeaves, simGlassKey, simOperatorKey, simProfileKey, simIsNorthTehran, simIncludeAccessControl, pricingConfig]);

  const priceDelta = simulatedDraftQuote.finalTotal - simulatedSavedQuote.finalTotal;

  const handleSaveDraft = async () => {
    const success = await savePricingConfig(draftConfig);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setStatusMessage({ text: 'پیکربندی قیمت‌ها و فرمول با موفقیت در دیتابیس ذخیره شد.', type: 'success' });
    }
  };

  const handleResetDraft = () => {
    setDraftConfig(pricingConfig);
  };

  const handleSaveCatalogModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCatalogItem) return;

    if (editingCatalogItem.id) {
      await updateCatalogItem(editingCatalogItem);
    } else {
      await addCatalogItem(editingCatalogItem);
    }
    setIsCatalogModalOpen(false);
    setEditingCatalogItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-[#06080F] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#06080F]" />
              <span>مرکز فرمول قیمت‌گذاری، کاتالوگ متریال و شبیه‌ساز زنده (Sandbox)</span>
            </h2>
            <p className="text-xs text-[#11172C] mt-1 font-medium">
              تغییر نرخ‌ها با قابلیت تست اثر روی فاکتور نمونه قبل از ذخیره نهایی در دیتابیس
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDraft}
              className="px-3.5 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-[#06080F] font-bold text-xs flex items-center gap-1.5 transition-all border border-[#06080F]/10 cursor-pointer shadow-sm"
              title="بازنشانی به مقادیر ذخیره‌شده"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>بازنشانی</span>
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-[#00F090] hover:bg-[#00F090]/90 text-[#06080F] font-black text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? 'ذخیره شد!' : 'ذخیره تغییرات در سامانه'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs Switcher */}
        <div className="flex items-center gap-2 pt-1 border-t border-[#06080F]/10">
          <button
            onClick={() => setActiveSubTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'simulator'
                ? 'bg-[#06080F] text-[#00F090] shadow-md'
                : 'bg-[#E4EBF1] text-[#06080F] hover:bg-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>شبیه‌ساز زنده فاکتور (Sandbox Simulator)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('formula')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'formula'
                ? 'bg-[#06080F] text-[#00F090] shadow-md'
                : 'bg-[#E4EBF1] text-[#06080F] hover:bg-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>تنظیمات فرمول و نرخ‌های پایه</span>
          </button>

          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'catalog'
                ? 'bg-[#06080F] text-[#00F090] shadow-md'
                : 'bg-[#E4EBF1] text-[#06080F] hover:bg-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>کاتالوگ اقلام و متریال ({draftConfig.catalogItems?.length || DEFAULT_CATALOG_ITEMS.length})</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 1. LIVE SANDBOX SIMULATOR PANEL */}
      {/* ================================================================ */}
      {activeSubTab === 'simulator' && (
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">
          {/* Controls Column (PC 6 cols, Tablet 8 cols, Mobile 4 cols) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 space-y-4">
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
                <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#06080F]" />
                  <span>پارامترهای پروژه نمونه جهت تست قیمت</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00F090] text-[#06080F]">
                  محاسبه Real-Time
                </span>
              </div>

              {/* Width & Height Sliders */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#06080F] mb-1">
                    <span>عرض دهنه (Width):</span>
                    <span className="font-mono">{simWidth} متر</span>
                  </div>
                  <input
                    type="range"
                    min={1.5}
                    max={8.0}
                    step={0.1}
                    value={simWidth}
                    onChange={(e) => setSimWidth(parseFloat(e.target.value))}
                    className="w-full accent-[#06080F] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#06080F] mb-1">
                    <span>ارتفاع دهنه (Height):</span>
                    <span className="font-mono">{simHeight} متر</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={4.5}
                    step={0.1}
                    value={simHeight}
                    onChange={(e) => setSimHeight(parseFloat(e.target.value))}
                    className="w-full accent-[#06080F] cursor-pointer"
                  />
                </div>
              </div>

              {/* Glass Type Selection */}
              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1.5">
                  نوع شیشه سکوریت:
                </label>
                <select
                  value={simGlassKey}
                  onChange={(e) => setSimGlassKey(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs font-bold text-[#06080F] focus:outline-none"
                >
                  <option value="clear10mm">شیشه ۱۰ میل شفاف معمولی ({formatFaCommas(draftConfig.glassPrices.clear10mm)} ت/م²)</option>
                  <option value="superClear10mm">شیشه ۱۰ میل سوپرکلیر وین‌لایت ({formatFaCommas(draftConfig.glassPrices.superClear10mm)} ت/م²)</option>
                  <option value="frosted10mm">شیشه ۱۰ میل سندبلاست/ساتینا ({formatFaCommas(draftConfig.glassPrices.frosted10mm)} ت/م²)</option>
                  <option value="tintedSmoke10mm">شیشه ۱۰ میل دودی/برنز ({formatFaCommas(draftConfig.glassPrices.tintedSmoke10mm)} ت/م²)</option>
                  <option value="laminatedSafety">شیشه لمینت دوجداره ایمنی PVB ({formatFaCommas(draftConfig.glassPrices.laminatedSafety)} ت/م²)</option>
                </select>
              </div>

              {/* Operator Brand Selection */}
              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1.5">
                  پکیج موتور و اپراتور:
                </label>
                <select
                  value={simOperatorKey}
                  onChange={(e) => setSimOperatorKey(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs font-bold text-[#06080F] focus:outline-none"
                >
                  <option value="germanDunker">Dunkermotoren آلمان براش‌لس ({formatFaCommas(draftConfig.operatorPrices.germanDunker)} ت)</option>
                  <option value="italianLabel">Label ایتالیا مدل Evolus ({formatFaCommas(draftConfig.operatorPrices.italianLabel)} ت)</option>
                  <option value="turkishHolux">Holux ترک اکسترا ({formatFaCommas(draftConfig.operatorPrices.turkishHolux)} ت)</option>
                  <option value="iranianStandard">دُرنا استاندارد ارتقایافته ({formatFaCommas(draftConfig.operatorPrices.iranianStandard)} ت)</option>
                </select>
              </div>

              {/* Profile Selection */}
              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1.5">
                  رنگ و پوشش شاسی و فریم:
                </label>
                <select
                  value={simProfileKey}
                  onChange={(e) => setSimProfileKey(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs font-bold text-[#06080F] focus:outline-none"
                >
                  <option value="anodizedGold">آنودایز طلایی لوکس ({formatFaCommas(draftConfig.fittingProfiles.anodizedGold)} ت/متر)</option>
                  <option value="anodizedSilver">آنودایز سیلور مات ({formatFaCommas(draftConfig.fittingProfiles.anodizedSilver)} ت/متر)</option>
                  <option value="matteBlackPowder">مشکی مات الکترواستاتیک ({formatFaCommas(draftConfig.fittingProfiles.matteBlackPowder)} ت/متر)</option>
                  <option value="framelessStainlessSteel">کاور استیل ۳۰۴ فریم‌لس ({formatFaCommas(draftConfig.fittingProfiles.framelessStainlessSteel)} ت/متر)</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#06080F]/10">
                <label className="flex items-center gap-2 text-xs font-bold text-[#06080F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simIsNorthTehran}
                    onChange={(e) => setSimIsNorthTehran(e.target.checked)}
                    className="w-4 h-4 rounded text-[#00F090] accent-[#06080F]"
                  />
                  <span>ضریب مناطق شمال تهران (×{draftConfig.multipliers.districtNorthMultiplier})</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#06080F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simIncludeAccessControl}
                    onChange={(e) => setSimIncludeAccessControl(e.target.checked)}
                    className="w-4 h-4 rounded text-[#00F090] accent-[#06080F]"
                  />
                  <span>اکسس کنترل رمزی/کارتی (+۴.۸ م)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Quote Output Card (PC 6 cols, Tablet 8 cols, Mobile 4 cols) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 space-y-4">
            <div className="bg-[#06080F] text-white rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00F090]" />
                  <h3 className="text-sm font-black text-white">پیش‌فاکتور برآوردی شبیه‌ساز</h3>
                </div>
                <span className="text-[11px] font-mono text-[#00F090] bg-[#00F090]/10 px-2.5 py-1 rounded-lg border border-[#00F090]/20">
                  {simulatedDraftQuote.area} m² • {simulatedDraftQuote.perimeter} m
                </span>
              </div>

              {/* Price Breakdown Table */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span>هزینه شیشه ({simulatedDraftQuote.area} مترمربع):</span>
                  <span className="font-mono font-bold text-white">{formatFaCommas(simulatedDraftQuote.glassTotal)} تومان</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span>پکیج موتور و اپراتور اتوماتیک:</span>
                  <span className="font-mono font-bold text-white">{formatFaCommas(simulatedDraftQuote.operatorUnitPrice)} تومان</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span>شاسی، کاور و پروفیل فریم ({simulatedDraftQuote.perimeter} متر):</span>
                  <span className="font-mono font-bold text-white">{formatFaCommas(simulatedDraftQuote.profileTotal)} تومان</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span>اجرت نصب، کالیبراسیون و تست اولیه:</span>
                  <span className="font-mono font-bold text-white">{formatFaCommas(simulatedDraftQuote.installBase)} تومان</span>
                </div>

                {simIncludeAccessControl && (
                  <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                    <span>سیستم کنترل تردد (Access Control):</span>
                    <span className="font-mono font-bold text-white">{formatFaCommas(simulatedDraftQuote.accessCost)} تومان</span>
                  </div>
                )}
              </div>

              {/* Total Quote Box */}
              <div className="bg-[#CBD8E2] text-[#06080F] p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black">مبلغ کل نهایی پیش‌فاکتور:</span>
                  <div className="text-left">
                    <span className="text-xl font-black font-mono">
                      {formatFaCommas(simulatedDraftQuote.finalTotal)}
                    </span>
                    <span className="text-xs font-bold mr-1">تومان</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#11172C] leading-relaxed font-bold border-t border-[#06080F]/10 pt-2">
                  معادل به حروف: {numToPersianWords(simulatedDraftQuote.finalTotal)} تومان
                </p>
              </div>

              {/* Comparison with Saved Rates */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-[#00F090]" />
                  <span className="text-slate-300">تفاضل با نرخ‌های فعلی دیتابیس:</span>
                </div>

                {priceDelta === 0 ? (
                  <span className="text-slate-400 font-bold">بدون تغییر (همگام با دیتابیس)</span>
                ) : priceDelta > 0 ? (
                  <span className="text-[#00F090] font-black font-mono">
                    +{formatFaCommas(priceDelta)} تومان افزایش نسبت به قبل
                  </span>
                ) : (
                  <span className="text-amber-400 font-black font-mono">
                    {formatFaCommas(priceDelta)} تومان کاهش نسبت به قبل
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 2. FORMULA RATES EDITOR */}
      {/* ================================================================ */}
      {activeSubTab === 'formula' && (
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">
          {/* Glass Base Prices */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <Shield className="w-4 h-4 text-[#06080F]" />
              <span>نرخ‌های پایه شیشه سکوریت (هر مترمربع)</span>
            </h3>

            <div className="space-y-3">
              <FormattedPriceInput
                label="شیشه ۱۰ میل شفاف معمولی"
                value={draftConfig.glassPrices.clear10mm}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    glassPrices: { ...draftConfig.glassPrices, clear10mm: val },
                  })
                }
              />
              <FormattedPriceInput
                label="شیشه ۱۰ میل سوپرکلیر وین‌لایت"
                value={draftConfig.glassPrices.superClear10mm}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    glassPrices: { ...draftConfig.glassPrices, superClear10mm: val },
                  })
                }
              />
              <FormattedPriceInput
                label="شیشه ۱۰ میل مات سندبلاست / ساتینا"
                value={draftConfig.glassPrices.frosted10mm}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    glassPrices: { ...draftConfig.glassPrices, frosted10mm: val },
                  })
                }
              />
              <FormattedPriceInput
                label="شیشه ۱۰ میل دودی / برنز"
                value={draftConfig.glassPrices.tintedSmoke10mm}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    glassPrices: { ...draftConfig.glassPrices, tintedSmoke10mm: val },
                  })
                }
              />
              <FormattedPriceInput
                label="شیشه لمینت دوجداره ایمنی ضدسرقت (PVB)"
                value={draftConfig.glassPrices.laminatedSafety}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    glassPrices: { ...draftConfig.glassPrices, laminatedSafety: val },
                  })
                }
              />
            </div>
          </div>

          {/* Operator Base Prices */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <Activity className="w-4 h-4 text-[#06080F]" />
              <span>پکیج‌های موتور و اپراتور اتوماتیک (پکیج کامل)</span>
            </h3>

            <div className="space-y-3">
              <FormattedPriceInput
                label="Dunkermotoren آلمان (براش‌لس دائم‌کار)"
                value={draftConfig.operatorPrices.germanDunker}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    operatorPrices: { ...draftConfig.operatorPrices, germanDunker: val },
                  })
                }
              />
              <FormattedPriceInput
                label="Label ایتالیا مدل Evolus"
                value={draftConfig.operatorPrices.italianLabel}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    operatorPrices: { ...draftConfig.operatorPrices, italianLabel: val },
                  })
                }
              />
              <FormattedPriceInput
                label="Holux Exclusive ترک"
                value={draftConfig.operatorPrices.turkishHolux}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    operatorPrices: { ...draftConfig.operatorPrices, turkishHolux: val },
                  })
                }
              />
              <FormattedPriceInput
                label="دُرنا استاندارد (موتور ملی ارتقایافته)"
                value={draftConfig.operatorPrices.iranianStandard}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    operatorPrices: { ...draftConfig.operatorPrices, iranianStandard: val },
                  })
                }
              />
            </div>
          </div>

          {/* Profiles and Multipliers */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <Layers className="w-4 h-4 text-[#06080F]" />
              <span>پروفیل و فریم‌ها (هر متر طول)</span>
            </h3>

            <div className="space-y-3">
              <FormattedPriceInput
                label="آنودایز طلایی مات/براق"
                value={draftConfig.fittingProfiles.anodizedGold}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    fittingProfiles: { ...draftConfig.fittingProfiles, anodizedGold: val },
                  })
                }
              />
              <FormattedPriceInput
                label="آنودایز سیلور مات"
                value={draftConfig.fittingProfiles.anodizedSilver}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    fittingProfiles: { ...draftConfig.fittingProfiles, anodizedSilver: val },
                  })
                }
              />
              <FormattedPriceInput
                label="مشکی مات الکترواستاتیک کوره"
                value={draftConfig.fittingProfiles.matteBlackPowder}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    fittingProfiles: { ...draftConfig.fittingProfiles, matteBlackPowder: val },
                  })
                }
              />
              <FormattedPriceInput
                label="کاور استیل ۳۰۴ فریم‌لس"
                value={draftConfig.fittingProfiles.framelessStainlessSteel}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    fittingProfiles: { ...draftConfig.fittingProfiles, framelessStainlessSteel: val },
                  })
                }
              />
            </div>
          </div>

          {/* Multipliers & Installation */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2">
              <TrendingUp className="w-4 h-4 text-[#06080F]" />
              <span>ضرایب منطقه‌ای و هزینه نصب</span>
            </h3>

            <div className="space-y-3">
              <FormattedPriceInput
                label="هزینه پایه نصب و کالیبراسیون"
                value={draftConfig.multipliers.installationBaseCost}
                onChange={(val) =>
                  setDraftConfig({
                    ...draftConfig,
                    multipliers: { ...draftConfig.multipliers, installationBaseCost: val },
                  })
                }
              />

              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#06080F] block">
                  ضریب مناطق ۱ الی ۳ تهران (خدمات ویژه VIP):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1.0"
                  max="2.0"
                  value={draftConfig.multipliers.districtNorthMultiplier}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      multipliers: {
                        ...draftConfig.multipliers,
                        districtNorthMultiplier: parseFloat(e.target.value) || 1.0,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#06080F] block">
                  ضریب تحویل اکسپرس / اورژانسی:
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1.0"
                  max="2.0"
                  value={draftConfig.multipliers.emergencyDeliveryMultiplier}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      multipliers: {
                        ...draftConfig.multipliers,
                        emergencyDeliveryMultiplier: parseFloat(e.target.value) || 1.0,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs font-bold text-[#06080F] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 3. CATALOG MATERIALS LIST */}
      {/* ================================================================ */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#11172C]">
              لیست متریال، شیشه‌ها و ماژول‌های فعال در کاتالوگ فروش
            </span>
            <button
              onClick={() => {
                setEditingCatalogItem({
                  id: '',
                  name: '',
                  category: 'glass',
                  price: 1500000,
                  unit: 'هر مترمربع',
                  description: '',
                  badge: '',
                  isActive: true,
                  showInCalculator: true,
                });
                setIsCatalogModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#00F090]/90 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن متریال جدید</span>
            </button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
            {(draftConfig.catalogItems || DEFAULT_CATALOG_ITEMS).map((item) => (
              <div
                key={item.id}
                className={`col-span-4 md:col-span-4 lg:col-span-4 bg-[#CBD8E2] border rounded-2xl p-4 flex flex-col justify-between shadow-sm transition-all ${
                  item.isActive ? 'border-[#06080F]/10' : 'border-red-300 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-black text-xs text-[#06080F]">{item.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E4EBF1] text-[#06080F]">
                      {item.category === 'glass' ? 'شیشه' : item.category === 'operator' ? 'اپراتور' : 'فریم/پروفیل'}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-[11px] text-[#11172C] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-baseline justify-between bg-[#E4EBF1] p-2 rounded-xl">
                    <span className="text-[11px] text-[#11172C]/70">تعرفه مصوب:</span>
                    <div className="text-left">
                      <span className="text-xs font-black font-mono text-[#06080F]">
                        {formatFaCommas(item.price)}
                      </span>
                      <span className="text-[10px] text-[#11172C] mr-1">تومان ({item.unit})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#06080F]/10">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleCatalogItemActive(item.id)}
                      className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                        item.isActive
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                      title="تغییر وضعیت فعال در سیستم"
                    >
                      {item.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>{item.isActive ? 'فعال' : 'غیرفعال'}</span>
                    </button>

                    <button
                      onClick={() => toggleCatalogItemCalculator(item.id)}
                      className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                        item.showInCalculator
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                      title="نمایش در محاسبه‌گر آنلاین"
                    >
                      {item.showInCalculator ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span className="hidden sm:inline">محاسبه‌گر</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingCatalogItem(item);
                        setIsCatalogModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-[#E4EBF1] hover:bg-white text-[#06080F] border border-[#06080F]/10 cursor-pointer"
                      title="ویرایش متریال"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`آیا از حذف ${item.name} اطمینان دارید؟`)) {
                          deleteCatalogItem(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 cursor-pointer"
                      title="حذف متریال"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catalog Item Modal */}
      {isCatalogModalOpen && editingCatalogItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <h3 className="text-sm font-black text-[#06080F]">
                {editingCatalogItem.id ? 'ویرایش مشخصات متریال' : 'افزودن متریال به کاتالوگ'}
              </h3>
              <button
                onClick={() => setIsCatalogModalOpen(false)}
                className="text-[#06080F] hover:bg-[#E4EBF1] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCatalogModal} className="space-y-3">
              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">نام متریال / مدل:</label>
                <input
                  type="text"
                  value={editingCatalogItem.name}
                  onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">دسته‌بندی:</label>
                  <select
                    value={editingCatalogItem.category}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] font-bold focus:outline-none"
                  >
                    <option value="glass">شیشه سکوریت</option>
                    <option value="operator">موتور و اپراتور</option>
                    <option value="frame">شاسی و فریم</option>
                    <option value="mechanism">مکانیزم و یراق‌آلات</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">واحد سنجش:</label>
                  <input
                    type="text"
                    value={editingCatalogItem.unit}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, unit: e.target.value })}
                    required
                    placeholder="هر مترمربع / پکیج کامل"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <FormattedPriceInput
                  label="تعرفه قیمت (تومان):"
                  value={editingCatalogItem.price}
                  onChange={(val) => setEditingCatalogItem({ ...editingCatalogItem, price: val })}
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#06080F] block mb-1">توضیحات مشخصات فنی:</label>
                <textarea
                  value={editingCatalogItem.description || ''}
                  onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#06080F]/10">
                <button
                  type="button"
                  onClick={() => setIsCatalogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-xs font-bold text-[#06080F] border border-[#06080F]/10 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all cursor-pointer"
                >
                  ذخیره متریال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
