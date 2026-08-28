import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Building,
  Calendar,
  CheckSquare,
  Square,
  Check,
  RefreshCw,
  Sparkles,
  Download,
} from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';
import { InquiryRecord } from '../../lib/supabase';
import { SITE_CONFIG } from '../../config/siteConfig';

export const LeadsManager: React.FC = () => {
  const {
    inquiries,
    selectedInquiryIds,
    inquiryFilter,
    inquirySearch,
    setInquiryFilter,
    setInquirySearch,
    updateInquiryStatus,
    updateInquiryNotes,
    deleteInquiry,
    toggleSelectInquiry,
    selectAllInquiries,
    clearSelectedInquiries,
    batchUpdateInquiryStatus,
    batchDeleteInquiries,
    fetchAllData,
    isLoading,
  } = useAdminStore();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [batchStatusDropdownOpen, setBatchStatusDropdownOpen] = useState(false);

  // Filter & Search Logic
  const filteredInquiries = inquiries.filter((item) => {
    const matchFilter = inquiryFilter === 'all' || item.status === inquiryFilter;
    const searchLow = inquirySearch.toLowerCase();
    const matchSearch =
      !inquirySearch ||
      item.client_name.toLowerCase().includes(searchLow) ||
      item.phone_number.includes(searchLow) ||
      (item.system_title && item.system_title.toLowerCase().includes(searchLow)) ||
      (item.district && item.district.toLowerCase().includes(searchLow));
    return matchFilter && matchSearch;
  });

  const allFilteredSelected =
    filteredInquiries.length > 0 &&
    filteredInquiries.every((i) => selectedInquiryIds.includes(i.id));

  const handleSelectAllToggle = () => {
    if (allFilteredSelected) {
      clearSelectedInquiries();
    } else {
      selectAllInquiries(filteredInquiries.map((i) => i.id));
    }
  };

  const handleOpenNotes = (inq: InquiryRecord) => {
    setEditingNotesId(inq.id);
    setTempNotes(inq.admin_notes || '');
  };

  const handleSaveNotes = async () => {
    if (editingNotesId) {
      await updateInquiryNotes(editingNotesId, tempNotes);
      setEditingNotesId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['نام کارفرما', 'تلفن', 'سیستم', 'ابعاد (عرض×ارتفاع)', 'منطقه', 'قیمت برآوردی', 'وضعیت', 'تاریخ'];
    const rows = filteredInquiries.map((inq) => [
      inq.client_name,
      inq.phone_number,
      inq.system_title || inq.system_type,
      `${inq.width}×${inq.height}`,
      inq.district || '-',
      inq.estimated_price.toLocaleString('fa-IR'),
      inq.status,
      new Date(inq.created_at).toLocaleDateString('fa-IR'),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dorna_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pipeline summary counts
  const pendingCount = inquiries.filter((i) => i.status === 'pending').length;
  const contactedCount = inquiries.filter((i) => i.status === 'contacted').length;
  const quotedCount = inquiries.filter((i) => i.status === 'quoted').length;
  const wonCount = inquiries.filter((i) => i.status === 'won').length;

  return (
    <div className="space-y-6">
      {/* Header & Pipeline KPI Badges */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-[#06080F] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#06080F]" />
              <span>مدیریت سرنخ‌ها، مشتریان و استعلام‌های آنلاین (CRM)</span>
            </h2>
            <p className="text-xs text-[#11172C] mt-1 font-medium">
              پیگیری درخواست‌های بازدید حضوری، استعلام قیمت، وضعیت تماس و صدور پیش‌فاکتور رسمی
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-[#06080F] font-bold text-xs flex items-center gap-1.5 transition-all border border-[#06080F]/10 cursor-pointer shadow-sm"
              title="خروجی اکسل / CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">خروجی اکسل</span>
            </button>
            <button
              onClick={() => fetchAllData()}
              className="p-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-[#06080F] transition-all border border-[#06080F]/10 cursor-pointer shadow-sm"
              title="تازه‌سازی اطلاعات"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Quick Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <button
            onClick={() => setInquiryFilter('pending')}
            className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
              inquiryFilter === 'pending'
                ? 'bg-[#06080F] text-white border-[#06080F] shadow-md'
                : 'bg-[#E4EBF1] border-[#06080F]/10 hover:bg-white text-[#06080F]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                در انتظار بررسی
              </span>
              <span className="text-sm font-black font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600">
                {pendingCount}
              </span>
            </div>
          </button>

          <button
            onClick={() => setInquiryFilter('contacted')}
            className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
              inquiryFilter === 'contacted'
                ? 'bg-[#06080F] text-white border-[#06080F] shadow-md'
                : 'bg-[#E4EBF1] border-[#06080F]/10 hover:bg-white text-[#06080F]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-500 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                تماس گرفته‌شده
              </span>
              <span className="text-sm font-black font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600">
                {contactedCount}
              </span>
            </div>
          </button>

          <button
            onClick={() => setInquiryFilter('quoted')}
            className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
              inquiryFilter === 'quoted'
                ? 'bg-[#06080F] text-white border-[#06080F] shadow-md'
                : 'bg-[#E4EBF1] border-[#06080F]/10 hover:bg-white text-[#06080F]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-500 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                پیش‌فاکتور صادرشده
              </span>
              <span className="text-sm font-black font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600">
                {quotedCount}
              </span>
            </div>
          </button>

          <button
            onClick={() => setInquiryFilter('won')}
            className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
              inquiryFilter === 'won'
                ? 'bg-[#06080F] text-white border-[#06080F] shadow-md'
                : 'bg-[#E4EBF1] border-[#06080F]/10 hover:bg-white text-[#06080F]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                عقد قرارداد (موفق)
              </span>
              <span className="text-sm font-black font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600">
                {wonCount}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Filter & Batch Actions Toolbar */}
      <div className="space-y-3">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="col-span-4 md:col-span-5 lg:col-span-8 relative">
            <input
              type="text"
              value={inquirySearch}
              onChange={(e) => setInquirySearch(e.target.value)}
              placeholder="جستجو بر اساس نام کارفرما، شماره تماس، منطقه یا سیستم..."
              className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#CBD8E2] border border-[#06080F]/10 text-xs text-[#06080F] placeholder-[#11172C]/60 focus:border-[#06080F] focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#11172C] absolute right-3 top-3" />
          </div>

          {/* Status Filter */}
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <select
              value={inquiryFilter}
              onChange={(e) => setInquiryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#CBD8E2] border border-[#06080F]/10 text-xs text-[#06080F] font-bold focus:border-[#06080F] focus:outline-none cursor-pointer"
            >
              <option value="all">نمایش همه وضعیت‌ها ({inquiries.length})</option>
              <option value="pending">در انتظار بررسی ({pendingCount})</option>
              <option value="contacted">تماس گرفته‌شده ({contactedCount})</option>
              <option value="quoted">پیش‌فاکتور صادرشده ({quotedCount})</option>
              <option value="won">قرارداد نهایی ({wonCount})</option>
              <option value="lost">انصراف / لغوشده</option>
            </select>
          </div>
        </div>

        {/* Multi-Select Batch Actions Bar */}
        {selectedInquiryIds.length > 0 && (
          <div className="bg-[#06080F] text-white p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#00F090] text-[#06080F] font-black text-xs">
                {selectedInquiryIds.length} سرنخ انتخاب شده
              </span>
              <button
                onClick={clearSelectedInquiries}
                className="text-xs text-[#E4EBF1]/70 hover:text-white underline cursor-pointer"
              >
                لغو انتخاب همه
              </button>
            </div>

            <div className="flex items-center gap-2 relative">
              <span className="text-xs font-bold text-[#E4EBF1] hidden sm:inline">عملیات گروهی:</span>

              {/* Batch Status Change */}
              <div className="relative">
                <button
                  onClick={() => setBatchStatusDropdownOpen(!batchStatusDropdownOpen)}
                  className="px-3 py-1.5 rounded-lg bg-[#CBD8E2] text-[#06080F] font-bold text-xs flex items-center gap-1.5 hover:bg-white transition-all cursor-pointer"
                >
                  <span>تغییر وضعیت گروهی</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {batchStatusDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-48 bg-white border border-[#06080F]/10 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                    <button
                      onClick={() => {
                        batchUpdateInquiryStatus('pending');
                        setBatchStatusDropdownOpen(false);
                      }}
                      className="w-full text-right px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50 cursor-pointer"
                    >
                      در انتظار بررسی
                    </button>
                    <button
                      onClick={() => {
                        batchUpdateInquiryStatus('contacted');
                        setBatchStatusDropdownOpen(false);
                      }}
                      className="w-full text-right px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 cursor-pointer"
                    >
                      تماس گرفته‌شده
                    </button>
                    <button
                      onClick={() => {
                        batchUpdateInquiryStatus('quoted');
                        setBatchStatusDropdownOpen(false);
                      }}
                      className="w-full text-right px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                    >
                      پیش‌فاکتور صادرشده
                    </button>
                    <button
                      onClick={() => {
                        batchUpdateInquiryStatus('won');
                        setBatchStatusDropdownOpen(false);
                      }}
                      className="w-full text-right px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                    >
                      عقد قرارداد نهایی
                    </button>
                    <button
                      onClick={() => {
                        batchUpdateInquiryStatus('lost');
                        setBatchStatusDropdownOpen(false);
                      }}
                      className="w-full text-right px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      انصراف / لغوشده
                    </button>
                  </div>
                )}
              </div>

              {/* Batch Delete */}
              <button
                onClick={() => {
                  if (confirm(`آیا از حذف گروهی ${selectedInquiryIds.length} سرنخ اطمینان دارید؟`)) {
                    batchDeleteInquiries();
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف گروهی</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiries Table Container */}
      <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#06080F] text-[#E4EBF1] border-b border-[#06080F]/10">
                <th className="py-3 px-4 w-10">
                  <button
                    onClick={handleSelectAllToggle}
                    className="flex items-center justify-center text-[#00F090] cursor-pointer"
                    title={allFilteredSelected ? 'لغو انتخاب همه' : 'انتخاب همه'}
                  >
                    {allFilteredSelected ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 hover:text-white" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 font-black">کارفرما / پروژه</th>
                <th className="py-3 px-4 font-black">نوع سیستم و مشخصات</th>
                <th className="py-3 px-4 font-black">ابعاد (cm)</th>
                <th className="py-3 px-4 font-black">منطقه / موقعیت</th>
                <th className="py-3 px-4 font-black">برآورد قیمت</th>
                <th className="py-3 px-4 font-black">وضعیت پیگیری</th>
                <th className="py-3 px-4 font-black text-center">اقدامات سریع</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#06080F]/10">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#11172C]/70">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-[#11172C]/40" />
                    <p className="font-bold">هیچ سرنخ یا استعلامی با این مشخصات یافت نشد.</p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const isSelected = selectedInquiryIds.includes(inq.id);
                  const isExpanded = expandedId === inq.id;

                  return (
                    <React.Fragment key={inq.id}>
                      <tr
                        className={`transition-colors ${
                          isSelected
                            ? 'bg-[#00F090]/15 hover:bg-[#00F090]/20'
                            : 'hover:bg-white/60'
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleSelectInquiry(inq.id)}
                            className="cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#06080F]" />
                            ) : (
                              <Square className="w-4 h-4 text-[#11172C]/40 hover:text-[#06080F]" />
                            )}
                          </button>
                        </td>

                        {/* Client Name & Date */}
                        <td className="py-3.5 px-4">
                          <div className="font-black text-[#06080F]">{inq.client_name}</div>
                          <div className="flex items-center gap-1 text-[11px] text-[#11172C]/70 font-mono mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(inq.created_at).toLocaleDateString('fa-IR')}</span>
                          </div>
                        </td>

                        {/* System */}
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#06080F]">
                            {inq.system_title || inq.system_type}
                          </span>
                        </td>

                        {/* Dimensions */}
                        <td className="py-3.5 px-4 font-mono font-bold text-[#06080F]">
                          {inq.width} × {inq.height}
                        </td>

                        {/* District */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-[#E4EBF1] text-[#06080F] font-bold border border-[#06080F]/10">
                            {inq.district || 'تهران'}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4">
                          <div className="font-black text-[#06080F] font-mono">
                            {inq.estimated_price ? inq.estimated_price.toLocaleString('fa-IR') : '—'}
                          </div>
                          <div className="text-[10px] text-[#11172C]/60 font-bold">تومان</div>
                        </td>

                        {/* Status Select */}
                        <td className="py-3.5 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryStatus(inq.id, e.target.value as InquiryRecord['status'])
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                              inq.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : inq.status === 'contacted'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : inq.status === 'quoted'
                                ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                                : inq.status === 'won'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-red-100 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="pending">در انتظار بررسی</option>
                            <option value="contacted">تماس گرفته‌شده</option>
                            <option value="quoted">پیش‌فاکتور صادرشده</option>
                            <option value="won">عقد قرارداد (موفق)</option>
                            <option value="lost">انصراف / لغوشده</option>
                          </select>
                        </td>

                        {/* Quick Actions */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Call */}
                            <a
                              href={`tel:${inq.phone_number}`}
                              className="p-1.5 rounded-lg bg-[#E4EBF1] hover:bg-white text-emerald-700 border border-[#06080F]/10 transition-colors shadow-sm"
                              title={`تماس تلفنی با ${inq.phone_number}`}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            {/* WhatsApp */}
                            <a
                              href={`https://wa.me/${inq.phone_number.replace(/^0/, '98')}?text=${encodeURIComponent(
                                `سلام جناب ${inq.client_name} عزیز، پیرو استعلام ثبت‌شده شما در خصوص ${inq.system_title || inq.system_type} از شرکت دُرنا دَرب با شما در ارتباط هستیم.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[#E4EBF1] hover:bg-white text-emerald-600 border border-[#06080F]/10 transition-colors shadow-sm"
                              title="ارسال پیام واتس‌اپ"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>

                            {/* Notes Modal */}
                            <button
                              onClick={() => handleOpenNotes(inq)}
                              className={`p-1.5 rounded-lg border transition-colors shadow-sm cursor-pointer ${
                                inq.admin_notes
                                  ? 'bg-[#06080F] text-[#00F090] border-[#06080F]'
                                  : 'bg-[#E4EBF1] hover:bg-white text-[#06080F] border-[#06080F]/10'
                              }`}
                              title="یادداشت کارشناس فروش"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>

                            {/* Expand Details */}
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : inq.id)}
                              className="p-1.5 rounded-lg bg-[#E4EBF1] hover:bg-white text-[#06080F] border border-[#06080F]/10 transition-colors shadow-sm cursor-pointer"
                              title="مشاهده جزئیات کامل"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                if (confirm(`آیا از حذف استعلام ${inq.client_name} اطمینان دارید؟`)) {
                                  deleteInquiry(inq.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 transition-colors shadow-sm cursor-pointer"
                              title="حذف سرنخ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Details Drawer */}
                      {isExpanded && (
                        <tr className="bg-[#E4EBF1]/80">
                          <td colSpan={8} className="p-4 border-t border-[#06080F]/10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white p-3.5 rounded-xl border border-[#06080F]/10 space-y-1.5">
                                <span className="text-[11px] font-black text-[#06080F] block">
                                  اطلاعات تکمیلی استعلام:
                                </span>
                                <div className="text-[11px] space-y-1 text-[#11172C]">
                                  <p>شماره تماس: <span className="font-mono font-bold">{inq.phone_number}</span></p>
                                  <p>منطقه نصب: <span className="font-bold">{inq.district || 'نامشخص'}</span></p>
                                  <p>تاریخ ثبت: <span className="font-mono">{new Date(inq.created_at).toLocaleString('fa-IR')}</span></p>
                                </div>
                              </div>

                              <div className="bg-white p-3.5 rounded-xl border border-[#06080F]/10 space-y-1.5">
                                <span className="text-[11px] font-black text-[#06080F] block">
                                  آپشن‌های مهندسی انتخاب‌شده:
                                </span>
                                <div className="text-[11px] text-[#11172C] space-y-1">
                                  {inq.selected_options && Object.keys(inq.selected_options).length > 0 ? (
                                    Object.entries(inq.selected_options).map(([key, val]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-[#11172C]/70">{key}:</span>
                                        <span className="font-bold">{String(val)}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-[#11172C]/60">آپشن خاصی ثبت نشده است.</p>
                                  )}
                                </div>
                              </div>

                              <div className="bg-white p-3.5 rounded-xl border border-[#06080F]/10 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-black text-[#06080F]">
                                    یادداشت کارشناس فنی:
                                  </span>
                                  <button
                                    onClick={() => handleOpenNotes(inq)}
                                    className="text-[10px] font-bold text-[#06080F] underline cursor-pointer"
                                  >
                                    ویرایش یادداشت
                                  </button>
                                </div>
                                <p className="text-[11px] text-[#11172C] leading-relaxed bg-[#E4EBF1] p-2 rounded-lg min-h-[48px]">
                                  {inq.admin_notes || 'هنوز یادداشتی ثبت نشده است.'}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes Modal */}
      {editingNotesId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
              <h3 className="text-sm font-black text-[#06080F] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#06080F]" />
                <span>یادداشت و گزارش پیگیری سرنخ</span>
              </h3>
              <button
                onClick={() => setEditingNotesId(null)}
                className="text-[#06080F] hover:bg-[#E4EBF1] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#06080F] block">
                متن یادداشت داخلی (تاریخ تماس، ابعاد توافقی، شماره تماس هماهنگ‌کننده):
              </label>
              <textarea
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                rows={4}
                placeholder="مثلاً: با مهندس ناظر تماس گرفته شد، بازدید روز شنبه ساعت ۱۰ صبح هماهنگ گردید..."
                className="w-full p-3 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:border-[#06080F] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#06080F]/10">
              <button
                onClick={() => setEditingNotesId(null)}
                className="px-4 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-xs font-bold text-[#06080F] border border-[#06080F]/10 cursor-pointer"
              >
                انصراف
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded-xl bg-[#00F090] text-[#06080F] text-xs font-black hover:bg-[#00F090]/90 transition-all cursor-pointer"
              >
                ذخیره یادداشت
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
