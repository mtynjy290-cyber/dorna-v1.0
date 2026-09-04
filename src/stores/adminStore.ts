import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  dbService,
  InquiryRecord,
  PricingConfig,
  CatalogItem,
  DEFAULT_CATALOG_ITEMS,
  ArticleRecord,
  ProjectRecord,
  DEFAULT_PRICING_CONFIG,
} from '../lib/supabase';
import { authService, AdminUser } from '../lib/auth';

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: 'pricing_update' | 'lead_status_change' | 'lead_batch_action' | 'lead_delete' | 'cms_update' | 'article_save' | 'article_delete' | 'project_save' | 'project_delete' | 'catalog_toggle';
  target: string;
  details: string;
}

export type AdminTab = 'dashboard' | 'inquiries' | 'pricing' | 'cms' | 'glass-lab' | 'articles' | 'projects' | 'settings' | 'audit' | 'article-editor';

export interface AdminStoreState {
  activeTab: AdminTab;
  currentUser: AdminUser | null;
  inquiries: InquiryRecord[];
  selectedInquiryIds: string[];
  inquiryFilter: string;
  inquirySearch: string;
  pricingConfig: PricingConfig;
  catalogFilter: string;
  catalogSearch: string;
  articles: ArticleRecord[];
  projects: ProjectRecord[];
  auditLogs: AuditLogItem[];
  isLoading: boolean;
  statusMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  editingArticleId: string | null;

  // Actions
  setActiveTab: (tab: AdminTab) => void;
  setCurrentUser: (user: AdminUser | null) => void;
  setStatusMessage: (msg: { text: string; type: 'success' | 'error' | 'info' } | null) => void;
  openArticleEditor: (articleId?: string | null) => void;
  closeArticleEditor: () => void;
  
  // Data Fetching
  fetchAllData: () => Promise<void>;
  
  // Leads / CRM Actions
  setInquiryFilter: (filter: string) => void;
  setInquirySearch: (search: string) => void;
  updateInquiryStatus: (id: string, status: InquiryRecord['status']) => Promise<void>;
  updateInquiryNotes: (id: string, notes: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  toggleSelectInquiry: (id: string) => void;
  selectAllInquiries: (ids: string[]) => void;
  clearSelectedInquiries: () => void;
  batchUpdateInquiryStatus: (status: InquiryRecord['status']) => Promise<void>;
  batchDeleteInquiries: () => Promise<void>;

  // Pricing & Catalog Actions
  updatePricingConfig: (newConfig: Partial<PricingConfig>) => void;
  savePricingConfig: (configToSave: PricingConfig) => Promise<boolean>;
  toggleCatalogItemActive: (id: string) => Promise<void>;
  toggleCatalogItemCalculator: (id: string) => Promise<void>;
  updateCatalogItem: (item: CatalogItem) => Promise<void>;
  addCatalogItem: (item: Omit<CatalogItem, 'id'>) => Promise<void>;
  deleteCatalogItem: (id: string) => Promise<void>;

  // Article Actions
  saveArticle: (article: ArticleRecord) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;
  toggleArticleFeatured: (id: string) => Promise<void>;

  // Project Actions
  saveProject: (project: ProjectRecord) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  toggleProjectFeatured: (id: string) => Promise<void>;

  // Audit Log Actions
  addAuditLog: (action: AuditLogItem['action'], target: string, details: string) => void;
  clearAuditLogs: () => void;
}

const AUDIT_LOGS_STORAGE_KEY = 'dorna_admin_audit_logs_v1';

export const useAdminStore = create<AdminStoreState>()(
  persist(
    (set, get) => ({
      activeTab: 'dashboard',
      currentUser: authService.getCurrentUser(),
      inquiries: [],
      selectedInquiryIds: [],
      inquiryFilter: 'all',
      inquirySearch: '',
      pricingConfig: DEFAULT_PRICING_CONFIG,
      catalogFilter: 'all',
      catalogSearch: '',
      articles: [],
      projects: [],
      auditLogs: [
        {
          id: 'log-seed-1',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          user: 'مدیر ارشد مهندسی',
          action: 'pricing_update',
          target: 'فرمول قیمت‌گذاری اسلایدینگ',
          details: 'به‌روزرسانی نرخ پایه موتور دانکر آلمان',
        },
        {
          id: 'log-seed-2',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          user: 'کارشناس فروش',
          action: 'lead_status_change',
          target: 'سرنخ مجتمع الماس',
          details: 'تغییر وضعیت از در انتظار به تماس گرفته شده',
        },
      ],
      isLoading: false,
      statusMessage: null,
      editingArticleId: null,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setStatusMessage: (msg) => set({ statusMessage: msg }),
      openArticleEditor: (articleId = null) => {
        set({
          editingArticleId: articleId,
          activeTab: 'article-editor',
        });
      },
      closeArticleEditor: () => {
        set({
          editingArticleId: null,
          activeTab: 'cms',
        });
      },

      fetchAllData: async () => {
        set({ isLoading: true });
        try {
          const [inquiries, pricingConfig, articles, projects] = await Promise.all([
            dbService.getInquiries(),
            dbService.getPricingConfig(),
            dbService.getArticles(),
            dbService.getProjects(),
          ]);

          set({
            inquiries,
            pricingConfig: pricingConfig || DEFAULT_PRICING_CONFIG,
            articles,
            projects,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error fetching admin data:', error);
          set({ isLoading: false });
        }
      },

      setInquiryFilter: (filter) => set({ inquiryFilter: filter }),
      setInquirySearch: (search) => set({ inquirySearch: search }),

      updateInquiryStatus: async (id, status) => {
        const currentUser = get().currentUser?.name || 'مدیر سیستم';
        const targetLead = get().inquiries.find((i) => i.id === id);
        const success = await dbService.updateInquiry(id, { status });
        if (success) {
          set((state) => ({
            inquiries: state.inquiries.map((i) => (i.id === id ? { ...i, status } : i)),
          }));
          get().addAuditLog(
            'lead_status_change',
            targetLead?.client_name || `سرنخ ${id}`,
            `تغییر وضعیت به: ${status}`
          );
        }
      },

      updateInquiryNotes: async (id, admin_notes) => {
        const success = await dbService.updateInquiry(id, { admin_notes });
        if (success) {
          set((state) => ({
            inquiries: state.inquiries.map((i) => (i.id === id ? { ...i, admin_notes } : i)),
          }));
        }
      },

      deleteInquiry: async (id) => {
        const targetLead = get().inquiries.find((i) => i.id === id);
        const success = await dbService.deleteInquiry(id);
        if (success) {
          set((state) => ({
            inquiries: state.inquiries.filter((i) => i.id !== id),
            selectedInquiryIds: state.selectedInquiryIds.filter((selId) => selId !== id),
          }));
          get().addAuditLog(
            'lead_delete',
            targetLead?.client_name || `سرنخ ${id}`,
            'حذف سرنخ از سامانه CRM'
          );
        }
      },

      toggleSelectInquiry: (id) => {
        set((state) => {
          const exists = state.selectedInquiryIds.includes(id);
          return {
            selectedInquiryIds: exists
              ? state.selectedInquiryIds.filter((i) => i !== id)
              : [...state.selectedInquiryIds, id],
          };
        });
      },

      selectAllInquiries: (ids) => {
        set({ selectedInquiryIds: ids });
      },

      clearSelectedInquiries: () => {
        set({ selectedInquiryIds: [] });
      },

      batchUpdateInquiryStatus: async (status) => {
        const { selectedInquiryIds, inquiries } = get();
        if (selectedInquiryIds.length === 0) return;

        set({ isLoading: true });
        for (const id of selectedInquiryIds) {
          await dbService.updateInquiry(id, { status });
        }

        set({
          inquiries: inquiries.map((i) =>
            selectedInquiryIds.includes(i.id) ? { ...i, status } : i
          ),
          selectedInquiryIds: [],
          isLoading: false,
        });

        get().addAuditLog(
          'lead_batch_action',
          `${selectedInquiryIds.length} سرنخ`,
          `تغییر وضعیت گروهی به ${status}`
        );
      },

      batchDeleteInquiries: async () => {
        const { selectedInquiryIds, inquiries } = get();
        if (selectedInquiryIds.length === 0) return;

        set({ isLoading: true });
        for (const id of selectedInquiryIds) {
          await dbService.deleteInquiry(id);
        }

        set({
          inquiries: inquiries.filter((i) => !selectedInquiryIds.includes(i.id)),
          selectedInquiryIds: [],
          isLoading: false,
        });

        get().addAuditLog(
          'lead_batch_action',
          `${selectedInquiryIds.length} سرنخ`,
          'حذف گروهی سرنخ‌ها از پایگاه داده'
        );
      },

      updatePricingConfig: (newConfig) => {
        set((state) => ({
          pricingConfig: { ...state.pricingConfig, ...newConfig },
        }));
      },

      savePricingConfig: async (configToSave) => {
        set({ isLoading: true });
        const success = await dbService.savePricingConfig(configToSave);
        if (success) {
          set({ pricingConfig: configToSave, isLoading: false });
          get().addAuditLog(
            'pricing_update',
            'پیکربندی تعرفه‌ها',
            'ذخیره تغییرات نرخ پایه و فرمول محاسباتی در دیتابیس'
          );
        } else {
          set({ isLoading: false });
        }
        return success;
      },

      toggleCatalogItemActive: async (id) => {
        const { pricingConfig } = get();
        const items = pricingConfig.catalogItems || DEFAULT_CATALOG_ITEMS;
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, isActive: !item.isActive } : item
        );
        const updatedConfig = { ...pricingConfig, catalogItems: updatedItems };
        await get().savePricingConfig(updatedConfig);
        get().addAuditLog(
          'catalog_toggle',
          `متریال ${id}`,
          'تغییر وضعیت فعال/غیرفعال بودن در سامانه'
        );
      },

      toggleCatalogItemCalculator: async (id) => {
        const { pricingConfig } = get();
        const items = pricingConfig.catalogItems || DEFAULT_CATALOG_ITEMS;
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, showInCalculator: !item.showInCalculator } : item
        );
        const updatedConfig = { ...pricingConfig, catalogItems: updatedItems };
        await get().savePricingConfig(updatedConfig);
      },

      updateCatalogItem: async (item) => {
        const { pricingConfig } = get();
        const items = pricingConfig.catalogItems || DEFAULT_CATALOG_ITEMS;
        const updatedItems = items.map((i) => (i.id === item.id ? item : i));
        const updatedConfig = { ...pricingConfig, catalogItems: updatedItems };
        await get().savePricingConfig(updatedConfig);
        get().addAuditLog(
          'catalog_toggle',
          item.name,
          `ویرایش قیمت و مشخصات کاتالوگ: ${item.price.toLocaleString('fa-IR')} تومان`
        );
      },

      addCatalogItem: async (item) => {
        const { pricingConfig } = get();
        const items = pricingConfig.catalogItems || DEFAULT_CATALOG_ITEMS;
        const newItem: CatalogItem = {
          ...item,
          id: 'item-' + Math.random().toString(36).substring(2, 9),
        };
        const updatedConfig = { ...pricingConfig, catalogItems: [...items, newItem] };
        await get().savePricingConfig(updatedConfig);
        get().addAuditLog(
          'catalog_toggle',
          newItem.name,
          'افزودن متریال یا ماژول جدید به کاتالوگ فروش'
        );
      },

      deleteCatalogItem: async (id) => {
        const { pricingConfig } = get();
        const items = pricingConfig.catalogItems || DEFAULT_CATALOG_ITEMS;
        const target = items.find((i) => i.id === id);
        const updatedItems = items.filter((i) => i.id !== id);
        const updatedConfig = { ...pricingConfig, catalogItems: updatedItems };
        await get().savePricingConfig(updatedConfig);
        get().addAuditLog(
          'catalog_toggle',
          target?.name || id,
          'حذف متریال از کاتالوگ'
        );
      },

      saveArticle: async (article) => {
        set({ isLoading: true });
        const saved = await dbService.saveArticle(article);
        const articles = await dbService.getArticles();
        set({ articles, isLoading: false });
        get().addAuditLog(
          'article_save',
          article.title,
          article.id ? 'ویرایش و بازنشر مقاله مهندسی' : 'انتشار مقاله جدید در بلاگ'
        );
        return Boolean(saved);
      },

      deleteArticle: async (id) => {
        const target = get().articles.find((a) => a.id === id);
        const success = await dbService.deleteArticle(id);
        if (success) {
          set((state) => ({
            articles: state.articles.filter((a) => a.id !== id),
          }));
          get().addAuditLog(
            'article_delete',
            target?.title || id,
            'حذف مقاله از وب‌سایت'
          );
        }
        return success;
      },

      toggleArticleFeatured: async (id) => {
        const art = get().articles.find((a) => a.id === id);
        if (!art) return;
        await get().saveArticle({ ...art, featured: !art.featured });
      },

      saveProject: async (project) => {
        set({ isLoading: true });
        const saved = await dbService.saveProject(project);
        const projects = await dbService.getProjects();
        set({ projects, isLoading: false });
        get().addAuditLog(
          'project_save',
          project.title,
          project.id ? 'ویرایش مشخصات پروژه اجراشده' : 'ثبت پروژه و نمونه‌کار جدید'
        );
        return Boolean(saved);
      },

      deleteProject: async (id) => {
        const target = get().projects.find((p) => p.id === id);
        const success = await dbService.deleteProject(id);
        if (success) {
          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
          }));
          get().addAuditLog(
            'project_delete',
            target?.title || id,
            'حذف پروژه از نمونه‌کارها'
          );
        }
        return success;
      },

      toggleProjectFeatured: async (id) => {
        const proj = get().projects.find((p) => p.id === id);
        if (!proj) return;
        await get().saveProject({ ...proj, featured: !proj.featured });
      },

      addAuditLog: (action, target, details) => {
        const currentUser = get().currentUser?.name || 'مدیر سیستم';
        const newLog: AuditLogItem = {
          id: 'log-' + Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          user: currentUser,
          action,
          target,
          details,
        };
        set((state) => ({
          auditLogs: [newLog, ...state.auditLogs.slice(0, 99)], // keep last 100
        }));
      },

      clearAuditLogs: () => {
        set({ auditLogs: [] });
      },
    }),
    {
      name: 'dorna_admin_store_v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        auditLogs: state.auditLogs,
      }),
    }
  )
);
