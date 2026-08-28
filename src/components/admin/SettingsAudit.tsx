import React, { useState } from 'react';
import {
  Shield,
  Activity,
  User,
  Clock,
  Trash2,
  Download,
  Database,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Lock,
  Key,
  Server,
} from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';
import { isSupabaseConfigured } from '../../lib/supabase';

export const SettingsAudit: React.FC = () => {
  const {
    auditLogs,
    clearAuditLogs,
    currentUser,
    pricingConfig,
    inquiries,
    articles,
    projects,
    fetchAllData,
    isLoading,
  } = useAdminStore();

  const [searchLog, setSearchLog] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchFilter = filterAction === 'all' || log.action === filterAction;
    const searchLow = searchLog.toLowerCase();
    const matchSearch =
      !searchLog ||
      log.user.toLowerCase().includes(searchLow) ||
      log.target.toLowerCase().includes(searchLow) ||
      log.details.toLowerCase().includes(searchLow);
    return matchFilter && matchSearch;
  });

  const handleExportLogs = () => {
    const headers = ['تاریخ و زمان', 'کاربر اپراتور', 'نوع عملیات', 'هدف / بخش', 'جزئیات تغییرات'];
    const rows = filteredLogs.map((log) => [
      new Date(log.timestamp).toLocaleString('fa-IR'),
      log.user,
      log.action,
      log.target,
      log.details,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dorna_audit_trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'pricing_update':
        return <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[10px]">تعرفه‌ها و قیمت</span>;
      case 'lead_status_change':
        return <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[10px]">وضعیت سرنخ</span>;
      case 'lead_batch_action':
        return <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-[10px]">عملیات گروهی CRM</span>;
      case 'lead_delete':
        return <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-bold text-[10px]">حذف سرنخ</span>;
      case 'cms_update':
        return <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">محتوای CMS</span>;
      case 'article_save':
        return <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold text-[10px]">وبلاگ و مقاله</span>;
      case 'project_save':
        return <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">پروژه و نمونه‌کار</span>;
      case 'catalog_toggle':
        return <span className="px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 font-bold text-[10px]">کاتالوگ متریال</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-[10px]">سیستمی</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-[#06080F] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#06080F]" />
              <span>گزارش لاگ تغییرات، سابقه حسابرسی (Audit Trail) و وضعیت سیستم</span>
            </h2>
            <p className="text-xs text-[#11172C] mt-1 font-medium">
              ردیابی زمان‌مند اقدامات اپراتورها، تغییرات فرمول و وضعیت همگام‌سازی پایگاه داده
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportLogs}
              className="px-3.5 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-[#06080F] font-bold text-xs flex items-center gap-1.5 transition-all border border-[#06080F]/10 cursor-pointer shadow-sm"
              title="خروجی لاگ‌ها به صورت فایل اکسل"
            >
              <Download className="w-4 h-4" />
              <span>خروجی لاگ‌ها (CSV)</span>
            </button>
            <button
              onClick={() => {
                if (confirm('آیا از پاک‌سازی لاگ‌های حسابرسی اطمینان دارید؟')) {
                  clearAuditLogs();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs flex items-center gap-1.5 transition-all border border-red-200 cursor-pointer"
              title="پاک‌سازی لاگ‌ها"
            >
              <Trash2 className="w-4 h-4" />
              <span>پاک‌سازی تاریخچه</span>
            </button>
          </div>
        </div>

        {/* System Health Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#06080F]/10">
          <div className="p-3 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs">
            <span className="text-[#11172C]/70 block text-[11px]">وضعیت دیتابیس ابری:</span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-[#06080F]">
              {isSupabaseConfigured ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Supabase Live Sync</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Local Storage Active</span>
                </>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs">
            <span className="text-[#11172C]/70 block text-[11px]">اپراتور فعال جاری:</span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-[#06080F] truncate">
              <User className="w-4 h-4 text-[#06080F]" />
              <span>{currentUser?.name || 'مدیر ارشد فنی'}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs">
            <span className="text-[#11172C]/70 block text-[11px]">مجموع رکوردهای CRM:</span>
            <div className="flex items-center gap-1.5 mt-1 font-mono font-black text-[#06080F]">
              <Activity className="w-4 h-4 text-[#06080F]" />
              <span>{inquiries.length} استعلام ثبت‌شده</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E4EBF1] border border-[#06080F]/10 text-xs">
            <span className="text-[#11172C]/70 block text-[11px]">معماری فرانت‌اند:</span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-[#06080F] font-mono text-[11px]">
              <Server className="w-4 h-4 text-[#00F090]" />
              <span>Zustand v5 • Tailwind v4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
        <div className="col-span-4 md:col-span-5 lg:col-span-8 relative">
          <input
            type="text"
            value={searchLog}
            onChange={(e) => setSearchLog(e.target.value)}
            placeholder="جستجو در لاگ‌ها بر اساس نام کاربر، هدف یا شرح تغییر..."
            className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#CBD8E2] border border-[#06080F]/10 text-xs text-[#06080F] placeholder-[#11172C]/60 focus:border-[#06080F] focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#11172C] absolute right-3 top-3" />
        </div>

        <div className="col-span-4 md:col-span-3 lg:col-span-4">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#CBD8E2] border border-[#06080F]/10 text-xs text-[#06080F] font-bold focus:outline-none cursor-pointer"
          >
            <option value="all">همه اقدامات ({auditLogs.length})</option>
            <option value="pricing_update">تغییر تعرفه و فرمول</option>
            <option value="lead_status_change">تغییر وضعیت سرنخ</option>
            <option value="lead_batch_action">عملیات گروهی CRM</option>
            <option value="cms_update">به‌روزرسانی محتوای سایت</option>
            <option value="article_save">مقالات وبلاگ</option>
            <option value="project_save">پروژه‌ها و نمونه‌کارها</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#06080F] text-[#E4EBF1]">
                <th className="py-3 px-4 font-black">زمان و تاریخ</th>
                <th className="py-3 px-4 font-black">کاربر اپراتور</th>
                <th className="py-3 px-4 font-black">نوع اقدام</th>
                <th className="py-3 px-4 font-black">بخش هدف</th>
                <th className="py-3 px-4 font-black">شرح دقیق عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#06080F]/10">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#11172C]/70 font-bold">
                    هیچ لاگی با این فیلتر ثبت نشده است.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-[#11172C]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#11172C]/60" />
                        <span>{new Date(log.timestamp).toLocaleString('fa-IR')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-black text-[#06080F]">
                      {log.user}
                    </td>
                    <td className="py-3 px-4">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#06080F]">
                      {log.target}
                    </td>
                    <td className="py-3 px-4 text-[#11172C] leading-relaxed">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
