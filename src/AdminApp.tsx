import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  User,
  LayoutDashboard,
  Users,
  Calculator,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
  AlertCircle,
  Database,
  Activity,
  Phone,
} from 'lucide-react';
import { authService, AdminUser } from './lib/auth';
import { useAdminStore, AdminTab } from './stores/adminStore';
import { LeadsManager } from './components/admin/LeadsManager';
import { PricingSandbox } from './components/admin/PricingSandbox';
import { CMSContentEditor } from './components/admin/CMSContentEditor';
import { SettingsAudit } from './components/admin/SettingsAudit';
import { ArticleEditorView } from './components/admin/ArticleEditorView';
import { isSupabaseConfigured } from './lib/supabase';
import { SITE_CONFIG } from './config/siteConfig';

export default function AdminApp() {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    setCurrentUser,
    fetchAllData,
    inquiries,
    pricingConfig,
    articles,
    projects,
    statusMessage,
    setStatusMessage,
    isLoading,
  } = useAdminStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Initialize and check session + query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as AdminTab | null;
    if (tabParam && ['dashboard', 'inquiries', 'pricing', 'cms', 'audit'].includes(tabParam)) {
      setActiveTab(tabParam);
    }

    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      fetchAllData();
    }
  }, []);

  // Auto-dismiss status notifications
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = authService.login(passcode, 'مدیر ارشد', rememberMe);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      fetchAllData();
    } else {
      setLoginError(res.message || 'رمز عبور نامعتبر است.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // ----------------------------------------------------------------------------
  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  // ----------------------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#E4EBF1] flex items-center justify-center p-4 selection:bg-[#00F090]/30 selection:text-[#06080F]">
        <div className="w-full max-w-md bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#06080F] text-[#00F090] mx-auto flex items-center justify-center shadow-lg border border-white/20">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black text-[#06080F]">
              پنل مدیریت مهندسی دُرنا دَرب
            </h1>
            <p className="text-xs text-[#11172C] font-medium">
              سامانه یکپارچه CRM، شبیه‌ساز قیمت‌گذاری و مدیریت محتوای پروژه
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#06080F] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#06080F]" />
                <span>رمز عبور مدیریت:</span>
              </label>
              <input
                type="password"
                dir="ltr"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#E4EBF1] border border-[#06080F]/15 text-[#06080F] font-mono text-sm tracking-widest text-center focus:border-[#06080F] focus:bg-white focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#11172C]">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#00F090] accent-[#06080F]"
                />
                <span>مرا به خاطر بسپار</span>
              </label>
              <span className="text-[11px] text-[#11172C]/70 font-mono">
                کد دسترسی: dorna2026
              </span>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#00F090] text-[#06080F] font-black text-sm hover:bg-[#00F090]/90 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>ورود به پنل مدیریت</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#06080F]/10">
            <a
              href="/"
              className="text-xs text-[#11172C] hover:text-[#06080F] font-bold inline-flex items-center gap-1.5"
            >
              <span>بازگشت به وب‌سایت اصلی دُرنا دَرب</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------
  // 2. DASHBOARD KPI COMPUTATIONS
  // ----------------------------------------------------------------------------
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'pending').length;
  const wonInquiries = inquiries.filter((i) => i.status === 'won').length;
  const totalEstimatedValue = inquiries.reduce((acc, curr) => acc + (curr.estimated_price || 0), 0);

  return (
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] flex flex-col selection:bg-[#00F090]/30 selection:text-[#06080F]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#CBD8E2]/90 backdrop-blur-md border-b border-[#06080F]/10 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#E4EBF1] text-[#06080F] border border-[#06080F]/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="w-9 h-9 rounded-xl bg-[#06080F] text-[#00F090] flex items-center justify-center font-black text-sm shadow-md">
              D
            </div>
            <div>
              <h1 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                <span>پنل مدیریت دُرنا دَرب</span>
                <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00F090] text-[#06080F]">
                  نسخه ۳.۲ ریفکتور شده
                </span>
              </h1>
              <p className="text-[11px] text-[#11172C] hidden sm:block">
                سیستم معماری ماژولار با Zustand و پایگاه داده هماهنگ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs font-bold text-[#06080F]">
              <div className="w-2 h-2 rounded-full bg-[#00F090] animate-pulse" />
              <span>{currentUser.name}</span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-[#06080F] font-bold text-xs flex items-center gap-1.5 border border-[#06080F]/10 transition-all shadow-sm"
              title="مشاهده زنده سایت"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">مشاهده سایت</span>
            </a>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 transition-all border border-red-200 cursor-pointer shadow-sm"
              title="خروج از حساب مدیریت"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Status Toast Notification */}
      {statusMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 ${
              statusMessage.type === 'success'
                ? 'bg-[#06080F] text-[#00F090] border-[#00F090]/40'
                : statusMessage.type === 'error'
                ? 'bg-red-900 text-white border-red-500'
                : 'bg-[#CBD8E2] text-[#06080F] border-[#06080F]/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00F090]" />
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Layout Body */}
      {activeTab === 'article-editor' ? (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
          <ArticleEditorView />
        </div>
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Navigation Sidebar (PC: 3 cols, Tablet/Mobile: Full width or toggle) */}
          <aside
            className={`lg:col-span-3 space-y-2 ${
              mobileMenuOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-3 shadow-sm space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#06080F] text-[#00F090] shadow-md'
                    : 'text-[#06080F] hover:bg-[#E4EBF1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>پیشخوان و آمار کلی</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('inquiries');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#06080F] text-[#00F090] shadow-md'
                    : 'text-[#06080F] hover:bg-[#E4EBF1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>سرنخ‌ها و مشتریان (CRM)</span>
                </div>
                {pendingInquiries > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#00F090] text-[#06080F] text-[10px] font-black font-mono">
                    {pendingInquiries}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('pricing');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'pricing'
                    ? 'bg-[#06080F] text-[#00F090] shadow-md'
                    : 'text-[#06080F] hover:bg-[#E4EBF1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-4 h-4" />
                  <span>فرمول قیمت و شبیه‌ساز</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-black">
                  Sandbox
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('cms');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'cms'
                    ? 'bg-[#06080F] text-[#00F090] shadow-md'
                    : 'text-[#06080F] hover:bg-[#E4EBF1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>مدیریت محتوا (Live CMS)</span>
                </div>
                <span className="text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-black">
                  Drag&Drop
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('audit');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-[#06080F] text-[#00F090] shadow-md'
                    : 'text-[#06080F] hover:bg-[#E4EBF1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4" />
                  <span>لاگ حسابرسی و تنظیمات</span>
                </div>
              </button>
            </div>

            {/* Quick Help Card */}
            <div className="bg-[#CBD8E2]/60 border border-[#06080F]/10 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 font-black text-[#06080F]">
                <Sparkles className="w-4 h-4 text-[#06080F]" />
                <span>پشتیبانی مهندسی</span>
              </div>
              <p className="text-[11px] text-[#11172C] leading-relaxed">
                برای افزودن فیلدهای جدید یا تغییرات دیتابیس با پشتیبانی سامانه دُرنا دَرب در ارتباط باشید.
              </p>
            </div>
          </aside>

          {/* Dynamic Content View Area (PC: 9 cols, Tablet/Mobile: Full width) */}
          <main className="lg:col-span-9 space-y-6">
            {/* 1. DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-[#06080F] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-4">
                  <div className="relative z-10 space-y-2">
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-[#00F090] text-[#06080F] inline-block">
                      سیستم مدیریت جامع دُرنا دَرب
                    </span>
                    <h2 className="text-xl font-black">
                      خوش آمدید، {currentUser.name}
                    </h2>
                    <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                      کنترل کامل جریان سرنخ‌ها، فرمول تعرفه مهندسی، وبلاگ، پروژه‌های شاخص شمال تهران و لاگ حسابرسی اپراتورها در دسترس شماست.
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="px-4 py-2.5 rounded-xl bg-[#00F090] text-[#06080F] font-black text-xs hover:bg-[#00F090]/90 transition-all cursor-pointer shadow-md"
                    >
                      مشاهده سرنخ‌های جدید ({pendingInquiries})
                    </button>
                    <button
                      onClick={() => setActiveTab('pricing')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/20 cursor-pointer"
                    >
                      شبیه‌ساز قیمت‌گذاری (Sandbox)
                    </button>
                  </div>
                </div>

                {/* KPI Cards Grid (PC: 12-col 3x4, Tablet: 8-col 2x4, Mobile: 4-col) */}
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                  <div className="col-span-4 md:col-span-4 lg:col-span-3 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-4 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-[#11172C]">
                      <span className="text-xs font-bold">کل سرنخ‌های ثبت‌شده</span>
                      <Users className="w-4 h-4 text-[#06080F]" />
                    </div>
                    <div className="text-2xl font-black font-mono text-[#06080F]">
                      {totalInquiries}
                    </div>
                    <span className="text-[11px] text-[#11172C]/70 block font-medium">
                      درخواست‌های آنلاین و حضوری
                    </span>
                  </div>

                  <div className="col-span-4 md:col-span-4 lg:col-span-3 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-4 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-[#11172C]">
                      <span className="text-xs font-bold">در انتظار بررسی فوری</span>
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-2xl font-black font-mono text-amber-700">
                      {pendingInquiries}
                    </div>
                    <span className="text-[11px] text-amber-700 font-bold block">
                      نیازمند تماس کارشناس
                    </span>
                  </div>

                  <div className="col-span-4 md:col-span-4 lg:col-span-3 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-4 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-[#11172C]">
                      <span className="text-xs font-bold">قراردادهای نهایی (Won)</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-black font-mono text-emerald-700">
                      {wonInquiries}
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold block">
                      پروژه‌های واردشده به خط تولید
                    </span>
                  </div>

                  <div className="col-span-4 md:col-span-4 lg:col-span-3 bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-4 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-[#11172C]">
                      <span className="text-xs font-bold">پروژه‌ها و مقالات فعال</span>
                      <Briefcase className="w-4 h-4 text-[#06080F]" />
                    </div>
                    <div className="text-2xl font-black font-mono text-[#06080F]">
                      {projects.length + articles.length}
                    </div>
                    <span className="text-[11px] text-[#11172C]/70 block font-medium">
                      {projects.length} نمونه‌کار • {articles.length} مقاله
                    </span>
                  </div>
                </div>

                {/* Quick Jump Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setActiveTab('pricing')}
                    className="bg-[#CBD8E2] border border-[#06080F]/10 hover:border-[#06080F]/40 rounded-2xl p-5 shadow-sm space-y-3 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-[#06080F]" />
                        <span>شبیه‌ساز و فرمول قیمت‌گذاری (Sandbox)</span>
                      </h3>
                      <span className="text-xs text-[#06080F] font-bold underline">ورود به محیط تست</span>
                    </div>
                    <p className="text-xs text-[#11172C] leading-relaxed">
                      تست فوری تغییرات تعرفه شیشه سوپرکلیر، اپراتورهای دانکر آلمان و ضرایب مناطق شمال تهران با پیش‌فاکتور زنده.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('cms')}
                    className="bg-[#CBD8E2] border border-[#06080F]/10 hover:border-[#06080F]/40 rounded-2xl p-5 shadow-sm space-y-3 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#06080F]" />
                        <span>سیستم مدیریت محتوا با آپلود درگ‌اند‌دراپ</span>
                      </h3>
                      <span className="text-xs text-[#06080F] font-bold underline">مدیریت رسانه</span>
                    </div>
                    <p className="text-xs text-[#11172C] leading-relaxed">
                      بارگذاری تصاویر شاخص مقالات و پروژه‌های لوکس به صورت درگ‌اند‌دراپ مستقیم بدون نیاز به کپی URL.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. LEADS CRM MANAGER */}
            {activeTab === 'inquiries' && <LeadsManager />}

            {/* 3. PRICING & SANDBOX SIMULATOR */}
            {activeTab === 'pricing' && <PricingSandbox />}

            {/* 4. LIVE CMS & DRAG-AND-DROP MEDIA */}
            {activeTab === 'cms' && <CMSContentEditor />}

            {/* 5. SETTINGS & AUDIT TRAIL */}
            {activeTab === 'audit' && <SettingsAudit />}
          </main>
        </div>
      )}
    </div>
  );
}
