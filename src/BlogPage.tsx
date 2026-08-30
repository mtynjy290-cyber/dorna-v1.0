import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight,
  Share2, 
  Check, 
  Copy, 
  MessageCircle, 
  Phone, 
  ChevronLeft, 
  Star, 
  Eye, 
  Tag, 
  Sparkles, 
  SlidersHorizontal, 
  Bookmark, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Building2, 
  Flame, 
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Printer,
  Send,
  User,
  CheckCircle2,
  HelpCircle,
  Calculator,
  Compass,
  Edit,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  FileText,
  AlertCircle,
  Table as TableIcon,
  Quote,
  X
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { ARTICLES_DATA, ALL_ARTICLE_CATEGORIES, getArticleByIdOrSlug } from './data/articlesData';
import { dbService, ArticleRecord } from './lib/supabase';
import { Article } from './types';
import { authService, AdminUser } from './lib/auth';
import { LiveArticleEditorBar } from './components/LiveArticleEditorBar';
import { LiveRichTextToolbar } from './components/LiveRichTextToolbar';
import { LiveImageEditorModal } from './components/LiveImageEditorModal';
import { parseDocxFile } from './lib/wordDocxImporter';
import { SITE_CONFIG } from './config/siteConfig';

interface CommentItem {
  id: string;
  name: string;
  role: string;
  date: string;
  comment: string;
  likes: number;
}

export const BlogPage: React.FC = () => {
  const [articlesList, setArticlesList] = useState<Article[]>(ARTICLES_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('همه مقالات');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readingProgress, setReadingProgress] = useState<number>(0);
  
  // Admin & Live In-Place Editor States
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLiveEditActive, setIsLiveEditActive] = useState(false);
  const [isPreviewOnly, setIsPreviewOnly] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [isDraggingWordOver, setIsDraggingWordOver] = useState(false);

  // Live Article Draft State
  const [draftTitle, setDraftTitle] = useState('');
  const [draftCategory, setDraftCategory] = useState('شیشه و متریال');
  const [draftReadTime, setDraftReadTime] = useState('۶ دقیقه');
  const [draftDate, setDraftDate] = useState('۱۴۰۴/۱۲/۰۵');
  const [draftSummary, setDraftSummary] = useState('');
  const [draftImage, setDraftImage] = useState('');
  const [draftKeyTakeaways, setDraftKeyTakeaways] = useState<string[]>([]);
  const [draftContent, setDraftContent] = useState('');
  const [draftAuthorName, setDraftAuthorName] = useState('');
  const [draftAuthorRole, setDraftAuthorRole] = useState('');
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const [draftFeatured, setDraftFeatured] = useState(false);

  // Rich Text Editor & Image Modal
  const [isTextFocused, setIsTextFocused] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalTarget, setImageModalTarget] = useState<'hero' | 'author' | 'content'>('hero');
  const [imageModalData, setImageModalData] = useState<{ url: string; alt?: string; caption?: string }>({ url: '' });

  // Refs
  const articleContentRef = useRef<HTMLDivElement>(null);
  const newTagInputRef = useRef<HTMLInputElement>(null);

  // UI & Modals
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryPrefill, setInquiryPrefill] = useState('استعلام تخصصی از طریق مقالات مهندسی');
  const [copyToast, setCopyToast] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState<boolean | null>(null);
  
  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      name: 'مهندس آرش سپهری',
      role: 'طراح سازه و معمار پروژه در منطقه ۱',
      date: '۲ روز پیش',
      comment: 'توضیحات مربوط به تست غوطه‌وری حرارتی (HST) و استفاده از شیشه‌های کم‌آهن وین‌لایت فوق‌العاده کاربردی بود. برای پروژه برج مسکونی فرشته دقیقاً همین چالش سبزی لبه شیشه‌ها را داشتیم که با توصیه فنی مهندسین درنا درب حل شد.',
      likes: 14,
    },
    {
      id: 'c2',
      name: 'دکتر افشین رادپور',
      role: 'کارفرمای مجتمع تجاری اداری',
      date: '۱ هفته پیش',
      comment: 'در مورد موتورهای براش‌لس دانکر آلمان، کارکرد بی‌صدا و عدم استهلاک گیربکس خورشیدی برای ورودی اصلی برج ما کاملاً محسوس است. مقاله بسیار تخصصی و مستند تهیه شده.',
      likes: 9,
    },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Check admin user on mount and URL parameters
  useEffect(() => {
    const user = authService.getCurrentUser();
    setAdminUser(user);

    const params = new URLSearchParams(window.location.search);
    const editParam = params.get('edit') === 'true';
    if (user || editParam) {
      setIsLiveEditActive(true);
    }
  }, []);

  // Load articles from dbService or fallback
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const list = await dbService.getArticles();
        if (list && list.length > 0) {
          const merged: Article[] = list.map((item) => {
            const staticMatch = ARTICLES_DATA.find(
              (s) => s.id === item.id || (item.slug && s.slug === item.slug)
            );
            const authorObj = typeof item.author === 'object' && item.author !== null
              ? item.author
              : staticMatch?.author || {
                  name: typeof item.author === 'string' ? item.author : 'تحریریه مهندسی درنا درب',
                  role: 'دپارتمان فنی و مهندسی سیستم‌های اتوماتیک',
                };

            return {
              ...item,
              slug: item.slug || item.id,
              content: item.content && item.content.length > 150 ? item.content : staticMatch?.content || item.content,
              keyTakeaways: item.keyTakeaways || staticMatch?.keyTakeaways || [item.summary],
              author: authorObj,
              relatedSlugs: staticMatch?.relatedSlugs || [],
            };
          });
          setArticlesList(merged);
        }
      } catch (err) {
        console.warn('Error fetching articles from dbService:', err);
      }
    };
    fetchArticles();
  }, []);

  // Sync draft states when selectedArticle changes
  useEffect(() => {
    if (selectedArticle) {
      setDraftTitle(selectedArticle.title || '');
      setDraftCategory(selectedArticle.category || 'شیشه و متریال');
      setDraftReadTime(selectedArticle.readTime || '۵ دقیقه');
      setDraftDate(selectedArticle.date || '۱۴۰۴/۱۲/۰۵');
      setDraftSummary(selectedArticle.summary || '');
      setDraftImage(selectedArticle.image || '');
      setDraftKeyTakeaways(selectedArticle.keyTakeaways ? [...selectedArticle.keyTakeaways] : []);
      setDraftContent(selectedArticle.content || '');
      setDraftAuthorName(selectedArticle.author?.name || 'مهندس ارشد دپارتمان درنا درب');
      setDraftAuthorRole(selectedArticle.author?.role || 'سرپرست مهندسی و بازرسی سازه‌های شیشه‌ای');
      setDraftTags(selectedArticle.tags ? [...selectedArticle.tags] : []);
      setDraftFeatured(Boolean(selectedArticle.featured));
      setHasUnsavedChanges(false);
    }
  }, [selectedArticle]);

  // Parse URL query parameter or path to set active article
  const parseUrlForArticle = () => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id') || params.get('article');
    
    // Check path for /blog/1001 or similar
    const pathname = window.location.pathname;
    const pathMatch = pathname.match(/\/blog\/([a-zA-Z0-9_-]+)/);
    const pathSlug = pathMatch ? pathMatch[1] : null;

    // Check hash for #1001
    const hash = window.location.hash.replace(/^#/, '');

    const query = idParam || pathSlug || hash;
    if (query) {
      const found = getArticleByIdOrSlug(query, articlesList);
      if (found) {
        setSelectedArticle(found);
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        return;
      }
    }
    // If no query or invalid, stay on catalog
    setSelectedArticle(null);
  };

  useEffect(() => {
    parseUrlForArticle();

    const handlePopState = () => {
      parseUrlForArticle();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articlesList]);

  // Update URL and history when user selects an article
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setHasLiked(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const editParam = isLiveEditActive ? '&edit=true' : '';
    const targetUrl = `/blog?id=${article.id}${editParam}`;
    window.history.pushState({ articleId: article.id }, '', targetUrl);
  };

  const handleBackToCatalog = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({}, '', '/blog');
  };

  // Scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!selectedArticle) {
        setReadingProgress(0);
        return;
      }
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle]);

  // Enhance existing DOM elements with block-delete buttons when entering live edit mode
  useEffect(() => {
    if (isLiveEditActive && !isPreviewOnly && articleContentRef.current) {
      const tables = articleContentRef.current.querySelectorAll('table, .overflow-x-auto, blockquote, .my-6');
      tables.forEach((el) => {
        const blockContainer = el.closest('.article-editable-block') || el;
        if (!blockContainer.classList.contains('article-editable-block')) {
          blockContainer.classList.add('article-editable-block', 'relative', 'group/block');
        }
        if (!blockContainer.querySelector('.block-delete-badge')) {
          const badge = document.createElement('div');
          badge.className =
            'block-delete-badge absolute -top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 opacity-90 hover:opacity-100 transition-all z-20 select-none';
          badge.setAttribute('contenteditable', 'false');
          badge.setAttribute('data-action', 'delete-block');
          badge.setAttribute('title', 'حذف کامل این بخش یا جدول');
          badge.innerHTML = `
            <svg class="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            <span class="pointer-events-none">حذف</span>
          `;
          blockContainer.prepend(badge);
        }
      });
    }
  }, [isLiveEditActive, isPreviewOnly, draftContent]);

  // ============================================================================
  // LIVE EDITOR ACTIONS (Rich Text, Snippets, Word Import, Image, Save)
  // ============================================================================

  const handleApplyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (articleContentRef.current) {
      setDraftContent(articleContentRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  // Helper to remove any focused block (table, callout, quote, etc.)
  const handleDeleteCurrentBlock = () => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) {
      alert('لطفاً ابتدا روی جدول یا باکسی که قصد حذف آن را دارید کلیک کنید.');
      return;
    }
    
    let node: Node | null = selection.anchorNode;
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentElement;
    }
    
    if (node && node instanceof HTMLElement && articleContentRef.current) {
      const targetBlock = node.closest('.article-editable-block, table, .overflow-x-auto, blockquote, .my-6, [data-action="block"]');
      if (targetBlock && targetBlock !== articleContentRef.current) {
        targetBlock.remove();
        setDraftContent(articleContentRef.current.innerHTML);
        setHasUnsavedChanges(true);
        setSaveToast('بخش یا جدول مورد نظر با موفقیت حذف شد.');
        setTimeout(() => setSaveToast(null), 3000);
        return;
      }
    }

    // Fallback: standard selection delete
    document.execCommand('delete');
    if (articleContentRef.current) {
      setDraftContent(articleContentRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  // Handle direct click on any delete button inside the editable content
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const deleteBtn = target.closest('[data-action="delete-block"], .block-delete-badge, .block-delete-btn');
    if (deleteBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = deleteBtn.closest('.article-editable-block, .my-6, table, .overflow-x-auto, blockquote');
      if (block) {
        block.remove();
        if (articleContentRef.current) {
          setDraftContent(articleContentRef.current.innerHTML);
          setHasUnsavedChanges(true);
          setSaveToast('باکس / جدول با موفقیت حذف گردید.');
          setTimeout(() => setSaveToast(null), 3000);
        }
      }
      return;
    }
  };

  const handleInsertSnippet = (type: 'callout' | 'table' | 'quote') => {
    let snippetHtml = '';

    if (type === 'callout') {
      snippetHtml = `
        <div class="article-editable-block relative group/block my-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#06080F]">
          <div class="block-delete-badge absolute -top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 opacity-90 hover:opacity-100 transition-all z-20 select-none" contenteditable="false" data-action="delete-block" title="حذف کامل این باکس نکته">
            <svg class="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            <span class="pointer-events-none">حذف این باکس نکته</span>
          </div>
          <h4 class="font-black text-sm mb-1 text-amber-900 flex items-center gap-1.5">
            ⚠️ نکته فنی و استاندارد بازرسی مهندسی:
          </h4>
          <p class="text-xs leading-relaxed">
            در این بخش جزئیات مربوط به استانداردهای ایمنی EN16005 و مشخصات آزمون بارگذاری جانبی شیشه‌ها را وارد نمایید.
          </p>
        </div>
      `;
    } else if (type === 'table') {
      snippetHtml = `
        <div class="article-editable-block relative group/block my-6 rounded-2xl border border-[#06080F]/15 bg-white p-4 shadow-xs">
          <div class="block-delete-badge absolute -top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 opacity-90 hover:opacity-100 transition-all z-20 select-none" contenteditable="false" data-action="delete-block" title="حذف کامل این جدول">
            <svg class="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            <span class="pointer-events-none">حذف جدول</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-right border-collapse">
              <thead>
                <tr class="border-b border-[#06080F]/15 bg-[#E4EBF1]/60">
                  <th class="p-2.5 font-black text-[#06080F]">شاخص فنی</th>
                  <th class="p-2.5 font-black text-[#06080F]">سیستم استاندارد دُرنا دَرب</th>
                  <th class="p-2.5 font-black text-[#06080F]">سیستم‌های متفرقه بازار</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-slate-100">
                  <td class="p-2.5 font-bold">توان موتور و گیربکس</td>
                  <td class="p-2.5 text-emerald-800 font-bold">دانکر BG75 آلمان ۲۴ ولت براش‌لس</td>
                  <td class="p-2.5 text-slate-600">موتورهای ذغالی چینی ۱۲ ولت</td>
                </tr>
                <tr class="border-b border-slate-100">
                  <td class="p-2.5 font-bold">نوع شیشه و ضخامت</td>
                  <td class="p-2.5 text-emerald-800 font-bold">۱۰ میل سکوریت سوپرکلیر وین‌لایت با تست HST</td>
                  <td class="p-2.5 text-slate-600">شیشه ۸ میل فلوت معمولی با لبه سبز</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold">گارانتی تعویض بی قید و شرط</td>
                  <td class="p-2.5 text-emerald-800 font-bold">۳۶ ماه طلایی رسمی با هولوگرام</td>
                  <td class="p-2.5 text-slate-600">فاقد پشتیبانی معتبر</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (type === 'quote') {
      snippetHtml = `
        <blockquote class="article-editable-block relative group/block my-6 p-4 rounded-2xl bg-[#06080F] text-white border-r-4 border-[#00F090] space-y-1">
          <div class="block-delete-badge absolute -top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 opacity-90 hover:opacity-100 transition-all z-20 select-none" contenteditable="false" data-action="delete-block" title="حذف نقل‌قول">
            <svg class="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            <span class="pointer-events-none">حذف</span>
          </div>
          <p class="text-xs sm:text-sm font-bold text-[#00F090]">
            «انتخاب سیستم درب اتوماتیک تنها یک تصمیم مکانیکی نیست؛ بلکه امضای ورودی معماری کل ساختمان شماست.»
          </p>
          <span class="text-[11px] text-[#CBD8E2]/70 block">— مهندس آرش معتمدی، مدیر ارشد فنی درنا درب</span>
        </blockquote>
      `;
    }

    if (articleContentRef.current) {
      articleContentRef.current.innerHTML += snippetHtml;
      setDraftContent(articleContentRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  const handleAddBlock = (blockType: 'paragraph' | 'callout' | 'table' | 'quote' | 'faq' | 'image') => {
    let blockHtml = '';

    if (blockType === 'paragraph') {
      blockHtml = `
        <div class="article-editable-block relative group/block my-6 space-y-2">
          <div class="block-delete-badge absolute -top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 opacity-90 hover:opacity-100 transition-all z-20 select-none" contenteditable="false" data-action="delete-block" title="حذف این بخش">
            <svg class="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            <span class="pointer-events-none">حذف بخش</span>
          </div>
          <h2 class="text-lg sm:text-xl font-black text-[#06080F]">عنوان جدید بخش تحلیلی مهندسی</h2>
          <p class="text-sm leading-relaxed text-[#11172C]">
            متن پاراگراف خود را اینجا بنویسید. شما می‌توانید با کلیک روی همین متن مستقیماً آن را ویرایش کرده یا فونت و ابعاد آن را تغییر دهید.
          </p>
        </div>
      `;
    } else if (blockType === 'callout') {
      handleInsertSnippet('callout');
      return;
    } else if (blockType === 'table') {
      handleInsertSnippet('table');
      return;
    } else if (blockType === 'quote') {
      handleInsertSnippet('quote');
      return;
    } else if (blockType === 'faq') {
      blockHtml = `
        <div class="article-editable-block relative group/block my-6 p-5 rounded-2xl bg-white border border-[#06080F]/15 space-y-2 shadow-xs">
          <div class="block-delete-badge absolute -top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 opacity-90 hover:opacity-100 transition-all z-20 select-none" contenteditable="false" data-action="delete-block" title="حذف سوال و پاسخ">
            <svg class="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            <span class="pointer-events-none">حذف سوال</span>
          </div>
          <h4 class="text-sm font-black text-[#06080F] flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#06080F] text-[#00F090] text-xs flex items-center justify-center font-mono">؟</span>
            سوال متداول: تفاوت موتور براش‌لس با موتورهای معمولی در چیست؟
          </h4>
          <p class="text-xs text-[#11172C] leading-relaxed pr-8">
            پاسخ کارشناسی: موتورهای براش‌لس (Brushless) به دلیل حذف ذغال و اصطکاک مکانیکی، بدون تولید گرما و صدا در ترددهای سنگین کار می‌کنند و عمر مفید آنها تا ۱۰ سال بدون نیاز به سرویس تضمین می‌شود.
          </p>
        </div>
      `;
    } else if (blockType === 'image') {
      blockHtml = `
        <div class="article-editable-block relative group/block my-6 rounded-2xl overflow-hidden border border-[#06080F]/15 bg-white shadow-xs">
          <div class="block-delete-badge absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 opacity-90 hover:opacity-100 transition-all z-20 select-none" contenteditable="false" data-action="delete-block" title="حذف تصویر">
            <svg class="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            <span class="pointer-events-none">حذف عکس</span>
          </div>
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="پروژه درنا درب" class="w-full h-72 object-cover" />
          <div class="p-3 bg-[#E4EBF1] text-xs text-[#11172C] text-center font-medium">
            توضیح تصویر: اجرای سیستم شیشه‌ای فریم‌لس با موتور دانکر آلمان در برج زعفرانیه تهران
          </div>
        </div>
      `;
    }

    if (articleContentRef.current) {
      articleContentRef.current.innerHTML += blockHtml;
      setDraftContent(articleContentRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  // Word Document (.docx) handler
  const handleWordDocImported = (data: { html: string; suggestedTitle?: string; suggestedSummary?: string }) => {
    if (data.suggestedTitle && confirm(`آیا مایلید عنوان مقاله نیز با عنوان استخراج شده از فایل ورد («${data.suggestedTitle}») جایگزین شود؟`)) {
      setDraftTitle(data.suggestedTitle);
    }
    if (data.suggestedSummary) {
      setDraftSummary(data.suggestedSummary);
    }

    setDraftContent(data.html);
    if (articleContentRef.current) {
      articleContentRef.current.innerHTML = data.html;
    }
    setHasUnsavedChanges(true);
    setSaveToast('فایل ورد (.docx) با موفقیت خوانده و ساختار آن در صفحه جای‌گذاری شد!');
    setTimeout(() => setSaveToast(null), 4000);
  };

  // Drag and drop docx directly onto the whole article
  const handleArticleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isLiveEditActive && !isPreviewOnly) {
      setIsDraggingWordOver(true);
    }
  };

  const handleArticleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingWordOver(false);
  };

  const handleArticleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingWordOver(false);
    if (!isLiveEditActive || isPreviewOnly) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.docx')) {
        try {
          const parsed = await parseDocxFile(file);
          handleWordDocImported({
            html: parsed.html,
            suggestedTitle: parsed.suggestedTitle,
            suggestedSummary: parsed.suggestedSummary,
          });
        } catch (err) {
          console.error(err);
          alert('خطا در خواندن فایل ورد. لطفاً فایل سالم .docx انتخاب کنید.');
        }
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (re) => {
          if (re.target?.result) {
            setDraftImage(re.target.result as string);
            setHasUnsavedChanges(true);
            setSaveToast('تصویر شاخص مقاله به‌روزرسانی شد.');
            setTimeout(() => setSaveToast(null), 3000);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Save changes to database and local store
  const handleSaveArticle = async () => {
    if (!selectedArticle) return;
    setIsSaving(true);

    let currentHtml = articleContentRef.current?.innerHTML || draftContent;
    // Sanitize by removing edit-only deletion badges before saving to database
    if (typeof window !== 'undefined') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = currentHtml;
      const deleteBadges = tempDiv.querySelectorAll('.block-delete-badge, [data-action="delete-block"]');
      deleteBadges.forEach((badge) => badge.remove());
      currentHtml = tempDiv.innerHTML;
    }

    const updatedArticleRecord: ArticleRecord = {
      id: selectedArticle.id,
      title: draftTitle.trim() || selectedArticle.title,
      category: draftCategory,
      readTime: draftReadTime,
      date: draftDate,
      summary: draftSummary.trim() || selectedArticle.summary,
      image: draftImage || selectedArticle.image,
      content: currentHtml,
      tags: draftTags,
      featured: draftFeatured,
      status: 'published',
      author: {
        name: draftAuthorName.trim() || 'دپارتمان مهندسی درنا درب',
        role: draftAuthorRole.trim() || 'سرپرست فنی و بازرسی سازه‌های شیشه‌ای',
      },
      keyTakeaways: draftKeyTakeaways,
    };

    try {
      await dbService.saveArticle(updatedArticleRecord);

      // Update in local articles list
      const updatedList = articlesList.map((a) =>
        a.id === selectedArticle.id ? { ...a, ...updatedArticleRecord } : a
      );
      setArticlesList(updatedList);
      setSelectedArticle({ ...selectedArticle, ...updatedArticleRecord });
      setHasUnsavedChanges(false);
      setSaveToast('مقاله با موفقیت ذخیره و در سایت به‌روزرسانی شد!');
    } catch (err) {
      console.error('Save failed:', err);
      setSaveToast('خطا در ذخیره‌سازی مقاله.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveToast(null), 4000);
    }
  };

  // Filtered articles list for catalog view
  const filteredArticles = useMemo(() => {
    return articlesList.filter((art) => {
      const matchCategory =
        activeCategory === 'همه مقالات' || art.category === activeCategory;
      const matchSearch =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.tags && art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCategory && matchSearch;
    });
  }, [articlesList, activeCategory, searchQuery]);

  // Featured article
  const featuredArticle = useMemo(() => {
    return articlesList.find((a) => a.featured) || articlesList[0];
  }, [articlesList]);

  // Related articles for current active article
  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return articlesList
      .filter((a) => a.id !== selectedArticle.id)
      .filter((a) => 
        a.category === selectedArticle.category || 
        (selectedArticle.relatedSlugs && selectedArticle.relatedSlugs.includes(a.slug))
      )
      .slice(0, 3);
  }, [selectedArticle, articlesList]);

  // Previous and Next article navigation
  const prevNextArticles = useMemo(() => {
    if (!selectedArticle) return { prev: null, next: null };
    const currentIndex = articlesList.findIndex((a) => a.id === selectedArticle.id);
    const prev = currentIndex > 0 ? articlesList[currentIndex - 1] : null;
    const next = currentIndex < articlesList.length - 1 ? articlesList[currentIndex + 1] : null;
    return { prev, next };
  }, [selectedArticle, articlesList]);

  // Share & Copy URL Action
  const handleCopyLink = () => {
    if (!selectedArticle) return;
    const shareableUrl = `${window.location.origin}/blog?id=${selectedArticle.id}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
  };

  const handleWhatsAppShare = () => {
    if (!selectedArticle) return;
    const shareableUrl = `${window.location.origin}/blog?id=${selectedArticle.id}`;
    const text = encodeURIComponent(
      `مقاله تخصصی درنا درب: ${draftTitle || selectedArticle.title}\n\nمطالعه در لینک زیر:\n${shareableUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Submit comment handler
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newC: CommentItem = {
      id: 'c_' + Date.now(),
      name: newCommentName.trim(),
      role: newCommentRole.trim() || 'کارشناس پروژه',
      date: 'هم‌اکنوع',
      comment: newCommentText.trim(),
      likes: 1,
    };

    setComments([newC, ...comments]);
    setNewCommentName('');
    setNewCommentRole('');
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  return (
    <div 
      className="min-h-screen bg-[#E4EBF1] text-[#06080F] font-['Vazirmatn',sans-serif] flex flex-col antialiased selection:bg-[#00F090]/30 selection:text-[#06080F] relative"
      onDragOver={handleArticleDragOver}
      onDragLeave={handleArticleDragLeave}
      onDrop={handleArticleDrop}
    >
      
      {/* Top Sticky Reading Progress Bar (when viewing article) */}
      {selectedArticle && !isLiveEditActive && (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#CBD8E2] z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#06080F] via-[#00F090] to-[#06080F] transition-all duration-150 ease-out shadow-sm"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Main Global Navbar (Hidden during Live Edit Mode to avoid navbar collision and give a pure full-screen Word editor experience) */}
      {(!selectedArticle || (!isLiveEditActive && !adminUser)) && (
        <Navbar
          onOpenInquiry={() => {
            setInquiryPrefill(
              selectedArticle
                ? `مشاوره فنی بر اساس مقاله: ${draftTitle || selectedArticle.title}`
                : 'مشاوره تخصصی و مهندسی درنا درب'
            );
            setInquiryModalOpen(true);
          }}
        />
      )}

      {/* Floating Save Notification Toast */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-2xl bg-[#06080F] text-[#00F090] border border-[#00F090] shadow-2xl flex items-center gap-3 text-xs font-black"
            dir="rtl"
          >
            <CheckCircle2 className="w-5 h-5 text-[#00F090]" />
            <span>{saveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Live Editor Bar when viewing a single article */}
      {selectedArticle && (adminUser || isLiveEditActive) && (
        <LiveArticleEditorBar
          isLiveEditActive={isLiveEditActive}
          onToggleLiveEdit={(active) => setIsLiveEditActive(active)}
          hasUnsavedChanges={hasUnsavedChanges}
          isSaving={isSaving}
          onSave={handleSaveArticle}
          onPreviewToggle={() => setIsPreviewOnly(!isPreviewOnly)}
          isPreviewOnly={isPreviewOnly}
          onAddBlock={handleAddBlock}
          onWordDocImported={handleWordDocImported}
          onExitToAdmin={() => {
            window.location.href = '/admin?tab=cms';
          }}
        />
      )}

      {/* Floating Rich Text Selection Toolbar */}
      {selectedArticle && isLiveEditActive && !isPreviewOnly && (
        <LiveRichTextToolbar
          isVisible={true}
          onApplyFormat={handleApplyFormat}
          onInsertSnippet={handleInsertSnippet}
          onDeleteCurrentBlock={handleDeleteCurrentBlock}
        />
      )}

      {/* Full-Screen Drag and Drop Overlay for Word Documents */}
      <AnimatePresence>
        {isDraggingWordOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-[#06080F]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center border-4 border-dashed border-[#00F090]"
            dir="rtl"
          >
            <div className="w-24 h-24 rounded-3xl bg-[#00F090]/20 border border-[#00F090] text-[#00F090] flex items-center justify-center mb-4 animate-bounce">
              <FileText className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black text-white">فایل Word (.docx) خود را اینجا رها کنید</h2>
            <p className="text-sm text-[#CBD8E2] mt-2 max-w-md">
              سامانه به‌صورت خودکار تیترها، پاراگراف‌ها و جداول سند ورد را استخراج و در صفحه مقاله جای‌گذاری می‌نماید.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Main Body: Single Article View vs. Catalog View */}
      <main className={`flex-1 pb-20 ${selectedArticle && (adminUser || isLiveEditActive) ? 'pt-20 sm:pt-24' : 'pt-24'}`}>
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            /* ================================================================ */
            /* 1. DEDICATED SINGLE ARTICLE PAGE VIEW (/blog/1001 or ?id=1001)   */
            /* ================================================================ */
            <motion.div
              key={selectedArticle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              {/* Breadcrumb Navigation & Back Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-4 border-b border-[#CBD8E2]">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#11172C]/70">
                  <a 
                    href="/" 
                    className="hover:text-[#06080F] font-semibold transition-colors flex items-center gap-1"
                  >
                    صفحه اصلی
                  </a>
                  <span className="text-[#CBD8E2]">/</span>
                  <button 
                    onClick={handleBackToCatalog}
                    className="hover:text-[#06080F] transition-colors font-medium cursor-pointer"
                  >
                    مقالات و دانشنامه
                  </button>
                  <span className="text-[#CBD8E2]">/</span>
                  <span className="text-[#06080F] font-bold">
                    {draftCategory || selectedArticle.category}
                  </span>
                  <span className="text-[#CBD8E2] hidden md:inline">/</span>
                  <span className="text-[#06080F] font-bold truncate max-w-[200px] hidden md:inline">
                    {draftTitle || selectedArticle.title}
                  </span>
                </nav>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBackToCatalog}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-white text-[#06080F] text-xs font-bold border border-white/90 shadow-2xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#06080F]" />
                    <span>بازگشت به فهرست مقالات</span>
                  </button>
                </div>
              </div>

              {/* Article Header & Main Meta */}
              <div className={`bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border shadow-xl space-y-6 mb-8 transition-all ${
                isLiveEditActive && !isPreviewOnly ? 'border-[#00F090]/50 ring-2 ring-[#00F090]/20' : 'border-white/90'
              }`}>
                
                {/* Category, Read Time & Verification Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Category Pill (Clickable in Edit Mode) */}
                  {isLiveEditActive && !isPreviewOnly ? (
                    <select
                      value={draftCategory}
                      onChange={(e) => {
                        setDraftCategory(e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      className="px-3 py-1 rounded-full bg-[#06080F] text-[#00F090] text-xs font-black border border-[#00F090]/40 cursor-pointer focus:outline-none"
                    >
                      {ALL_ARTICLE_CATEGORIES.filter((c) => c !== 'همه مقالات').map((cat) => (
                        <option key={cat} value={cat} className="bg-[#06080F] text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="px-3.5 py-1 rounded-full bg-[#06080F] text-[#00F090] text-xs font-black flex items-center gap-1.5 shadow-xs">
                      <BookOpen className="w-3.5 h-3.5 text-[#00F090]" />
                      {draftCategory || selectedArticle.category}
                    </span>
                  )}

                  {/* Read Time (Editable) */}
                  {isLiveEditActive && !isPreviewOnly ? (
                    <input
                      type="text"
                      value={draftReadTime}
                      onChange={(e) => {
                        setDraftReadTime(e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      className="w-24 px-2.5 py-1 rounded-full bg-[#CBD8E2]/60 border border-white/60 text-[#06080F] text-xs font-medium text-center focus:outline-none focus:border-[#00F090]"
                      placeholder="زمان مطالعه"
                    />
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#CBD8E2]/60 border border-white/60 text-[#06080F] text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#11172C]/60" />
                      {draftReadTime || selectedArticle.readTime}
                    </span>
                  )}

                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1 hidden sm:flex">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    تاییدیه فنی دپارتمان مهندسی درنا درب
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[#CBD8E2]/50 text-[#11172C]/70 text-xs font-mono mr-auto flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#11172C]/50" />
                    {selectedArticle.viewsCount || 1200} بازدید تخصصی
                  </span>
                </div>

                {/* Main Article Title (WYSIWYG Inline Editable) */}
                {isLiveEditActive && !isPreviewOnly ? (
                  <div className="relative group">
                    <h1
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const text = e.currentTarget.textContent || '';
                        setDraftTitle(text);
                        setHasUnsavedChanges(true);
                      }}
                      className="text-2xl sm:text-3xl md:text-4xl font-black text-[#06080F] leading-tight sm:leading-snug p-2 rounded-xl border border-dashed border-[#00F090]/60 bg-[#00F090]/5 focus:outline-none focus:ring-2 focus:ring-[#00F090]"
                    >
                      {draftTitle || selectedArticle.title}
                    </h1>
                    <span className="absolute -top-3 left-2 text-[10px] font-bold bg-[#00F090] text-[#06080F] px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      کلیک برای ویرایش تیتر مقاله
                    </span>
                  </div>
                ) : (
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#06080F] leading-tight sm:leading-snug">
                    {draftTitle || selectedArticle.title}
                  </h1>
                )}

                {/* Lead Summary (WYSIWYG Inline Editable) */}
                {isLiveEditActive && !isPreviewOnly ? (
                  <div className="relative group">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const text = e.currentTarget.textContent || '';
                        setDraftSummary(text);
                        setHasUnsavedChanges(true);
                      }}
                      className="text-sm sm:text-base text-[#11172C] leading-relaxed font-medium bg-[#CBD8E2]/40 p-4 sm:p-5 rounded-2xl border border-dashed border-[#00F090]/60 focus:outline-none focus:ring-2 focus:ring-[#00F090]"
                    >
                      {draftSummary || selectedArticle.summary}
                    </p>
                    <span className="absolute -top-3 left-2 text-[10px] font-bold bg-[#00F090] text-[#06080F] px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      کلیک برای ویرایش چکیده مقاله
                    </span>
                  </div>
                ) : (
                  <p className="text-sm sm:text-base text-[#11172C] leading-relaxed font-medium bg-[#CBD8E2]/40 p-4 sm:p-5 rounded-2xl border border-white/60">
                    {draftSummary || selectedArticle.summary}
                  </p>
                )}

                {/* Author Info Bar & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#CBD8E2]">
                  {/* Author Meta */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#06080F] text-[#00F090] font-black text-sm flex items-center justify-center shadow-md border border-[#00F090]/40">
                      {draftAuthorName ? draftAuthorName[0] : 'د'}
                    </div>
                    <div>
                      {isLiveEditActive && !isPreviewOnly ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={draftAuthorName}
                            onChange={(e) => {
                              setDraftAuthorName(e.target.value);
                              setHasUnsavedChanges(true);
                            }}
                            className="px-2 py-0.5 rounded-lg bg-white border border-[#06080F]/20 text-xs font-bold text-[#06080F] focus:outline-none focus:border-[#00F090]"
                            placeholder="نام نویسنده"
                          />
                          <input
                            type="text"
                            value={draftAuthorRole}
                            onChange={(e) => {
                              setDraftAuthorRole(e.target.value);
                              setHasUnsavedChanges(true);
                            }}
                            className="px-2 py-0.5 rounded-lg bg-white border border-[#06080F]/20 text-[11px] text-[#11172C]/80 focus:outline-none focus:border-[#00F090] block"
                            placeholder="سمت / نقش سازمانی"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="text-xs sm:text-sm font-bold text-[#06080F] flex items-center gap-1.5">
                            <span>{draftAuthorName || selectedArticle.author?.name || 'مهندس ارشد دپارتمان درنا درب'}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090]" />
                          </div>
                          <div className="text-[11px] text-[#11172C]/70">
                            {draftAuthorRole || selectedArticle.author?.role || 'سرپرست مهندسی و بازرسی سازه‌های شیشه‌ای'} • تاریخ انتشار: {draftDate || selectedArticle.date}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={handleCopyLink}
                      title="کپی لینک اختصاصی مقاله"
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      {copyToast ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">کپی شد!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>کپی لینک</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleWhatsAppShare}
                      title="ارسال مقاله در واتساپ"
                      className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-500/20 cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>واتساپ</span>
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      title="ذخیره مقاله در نشان‌ها"
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-50 border-amber-300 text-amber-600 shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={() => window.print()}
                      title="چاپ مقاله"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-all cursor-pointer hidden md:flex"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Featured Big Image with Live Image Editor Trigger */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl mt-4 max-h-[460px] bg-slate-950 group">
                  <img
                    src={draftImage || selectedArticle.image}
                    alt={draftTitle || selectedArticle.title}
                    className="w-full h-full object-cover max-h-[460px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Image Edit Trigger in Live Mode */}
                  {isLiveEditActive && !isPreviewOnly && (
                    <button
                      onClick={() => {
                        setImageModalTarget('hero');
                        setImageModalData({ url: draftImage || selectedArticle.image });
                        setImageModalOpen(true);
                      }}
                      className="absolute top-4 left-4 px-4 py-2 rounded-xl bg-[#06080F]/90 hover:bg-black text-[#00F090] border border-[#00F090]/50 text-xs font-black shadow-2xl flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <ImageIcon className="w-4 h-4 text-[#00F090]" />
                      <span>تغییر و آپلود تصویر شاخص</span>
                    </button>
                  )}

                  <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-white text-xs backdrop-blur-md bg-slate-950/60 p-3 rounded-xl border border-white/10">
                    <span className="font-medium truncate">
                      عکس اختصاصی پروژه اجرایی درنا درب • منطقه ۱ تهران (زعفرانیه و الهیه)
                    </span>
                    <span className="font-mono text-[11px] text-slate-300 shrink-0">
                      ID: #{selectedArticle.id}
                    </span>
                  </div>
                </div>

                {/* Key Engineering Takeaways Box (Inline Editable in Live Mode) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#CBD8E2]/60 backdrop-blur-md border border-white/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-[#06080F] font-black text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00F090]" />
                      <span>نکات کلیدی و چک‌لیست تصمیم‌گیری مهندسی:</span>
                    </div>

                    {isLiveEditActive && !isPreviewOnly && (
                      <button
                        onClick={() => {
                          setDraftKeyTakeaways([...draftKeyTakeaways, 'نکته مهندسی و فنی جدید']);
                          setHasUnsavedChanges(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#06080F] text-[#00F090] text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>افزودن نکته</span>
                      </button>
                    )}
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#11172C]">
                    {(draftKeyTakeaways.length > 0 ? draftKeyTakeaways : selectedArticle.keyTakeaways || []).map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-white/90 shadow-2xs group relative">
                        <CheckCircle2 className="w-4 h-4 text-[#00F090] shrink-0 mt-0.5" />
                        {isLiveEditActive && !isPreviewOnly ? (
                          <div className="flex-1 flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={takeaway}
                              onChange={(e) => {
                                const copy = [...draftKeyTakeaways];
                                copy[idx] = e.target.value;
                                setDraftKeyTakeaways(copy);
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full bg-transparent font-medium text-xs focus:outline-none focus:bg-white/90 p-1 rounded"
                            />
                            <button
                              onClick={() => {
                                setDraftKeyTakeaways(draftKeyTakeaways.filter((_, i) => i !== idx));
                                setHasUnsavedChanges(true);
                              }}
                              className="p-1 rounded-md text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="حذف این مورد"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="font-medium">{takeaway}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full Article Rich Technical Body Content (WYSIWYG In-Place Editable) */}
                <div className="relative pt-4 border-t border-[#CBD8E2]">
                  {isLiveEditActive && !isPreviewOnly && (
                    <div className="mb-3 px-4 py-2 rounded-xl bg-[#00F090]/10 border border-[#00F090]/40 flex items-center justify-between text-xs text-[#06080F] font-bold">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#00F090]" />
                        <span>متن زیر را مستقیماً کلیک و ویرایش کنید؛ نوار ابزار بالا برای فرمت‌دهی فعال است.</span>
                      </span>
                      <span className="text-[11px] text-[#11172C]/70">یا فایل Word (.docx) را به اینجا بکشید</span>
                    </div>
                  )}

                  <div 
                    ref={articleContentRef}
                    contentEditable={isLiveEditActive && !isPreviewOnly}
                    suppressContentEditableWarning
                    onFocus={() => setIsTextFocused(true)}
                    onClick={handleContentClick}
                    onBlur={() => {
                      setIsTextFocused(false);
                      if (articleContentRef.current) {
                        setDraftContent(articleContentRef.current.innerHTML);
                        setHasUnsavedChanges(true);
                      }
                    }}
                    className={`prose prose-slate max-w-none text-[#11172C] leading-loose text-sm sm:text-base transition-all p-2 rounded-2xl ${
                      isLiveEditActive && !isPreviewOnly
                        ? 'border border-dashed border-[#00F090]/50 bg-white/40 focus:outline-none focus:ring-2 focus:ring-[#00F090]'
                        : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: draftContent || selectedArticle.content }}
                  />
                </div>

                {/* Tags Section (Editable in Live Mode) */}
                <div className="pt-6 border-t border-[#CBD8E2] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#11172C]/70 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    برچسب‌های فنی:
                  </span>
                  {(draftTags.length > 0 ? draftTags : selectedArticle.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white/80 hover:bg-white text-[#11172C] text-xs font-medium border border-white/90 transition-colors shadow-2xs flex items-center gap-1"
                    >
                      <span>#{tag}</span>
                      {isLiveEditActive && !isPreviewOnly && (
                        <button
                          onClick={() => {
                            setDraftTags(draftTags.filter((_, i) => i !== idx));
                            setHasUnsavedChanges(true);
                          }}
                          className="hover:text-rose-500 text-slate-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}

                  {isLiveEditActive && !isPreviewOnly && (
                    <div className="flex items-center gap-1">
                      <input
                        ref={newTagInputRef}
                        type="text"
                        placeholder="+ برچسب جدید"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = e.currentTarget.value.trim();
                            if (val && !draftTags.includes(val)) {
                              setDraftTags([...draftTags, val]);
                              e.currentTarget.value = '';
                              setHasUnsavedChanges(true);
                            }
                          }
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white text-xs border border-[#06080F]/20 focus:outline-none focus:border-[#00F090] w-28"
                      />
                    </div>
                  )}
                </div>

                {/* Interactive Article Feedback & Helpful Bar */}
                <div className="p-5 rounded-2xl bg-[#CBD8E2]/50 border border-white/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-xs sm:text-sm text-[#06080F]">
                      آیا این راهنمای مهندسی برای پروژه شما مفید بود؟
                    </span>
                    <p className="text-[11px] text-[#11172C]/70">
                      بازخورد شما به تیم تحقیق و توسعه درنا درب در تدوین مقالات کاربردی‌تر کمک می‌کند.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHasLiked(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        hasLiked === true
                          ? 'bg-[#00F090] text-[#06080F] shadow-sm font-black'
                          : 'bg-white hover:bg-white/90 text-[#11172C] border border-white/90 shadow-2xs'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>بله، مفید بود</span>
                    </button>

                    <button
                      onClick={() => setHasLiked(false)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        hasLiked === false
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-white hover:bg-rose-50 text-[#11172C] border border-white/90 shadow-2xs'
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>نیاز به تکمیل</span>
                    </button>
                  </div>
                </div>

                {/* Direct Project Consultation Banner inside Article */}
                <div className="p-6 rounded-2xl bg-[#06080F] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-slate-800">
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-[#00F090] text-[11px] font-bold border border-white/15 inline-block">
                      مشاوره مهندسی درنا درب
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      نیاز به آنالیز ابعاد و محاسبه هزینه برای پروژه اختصاصی خود دارید؟
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                      کارشناسان ارشد درنا درب آماده بازدید حضوری، نقشه‌برداری لیزری و ارائه پیش‌فاکتور دقیق قطعات و شیشه‌ها می‌باشند.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        setInquiryPrefill(`استعلام پروژه از صفحه مقاله: ${draftTitle || selectedArticle.title}`);
                        setInquiryModalOpen(true);
                      }}
                      className="px-5 py-3 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>درخواست تماس فوری</span>
                    </button>

                    <a
                      href="/calculator"
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all border border-white/20"
                    >
                      <Calculator className="w-4 h-4 text-[#00F090]" />
                      <span>محاسبه آنلاین قیمت</span>
                    </a>
                  </div>
                </div>

                {/* Previous & Next Article Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {prevNextArticles.prev ? (
                    <button
                      onClick={() => handleSelectArticle(prevNextArticles.prev!)}
                      className="p-4 rounded-2xl bg-white/70 hover:bg-white border border-white/90 hover:border-[#00F090]/50 text-right transition-all flex flex-col justify-between group cursor-pointer shadow-2xs"
                    >
                      <span className="text-[11px] text-[#11172C]/60 font-bold flex items-center gap-1 group-hover:text-[#06080F]">
                        <ArrowRight className="w-3.5 h-3.5 text-[#06080F]" />
                        مقاله قبلی
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[#06080F] group-hover:text-[#06080F] line-clamp-1 mt-1">
                        {prevNextArticles.prev.title}
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {prevNextArticles.next && (
                    <button
                      onClick={() => handleSelectArticle(prevNextArticles.next!)}
                      className="p-4 rounded-2xl bg-white/70 hover:bg-white border border-white/90 hover:border-[#00F090]/50 text-left sm:text-left transition-all flex flex-col justify-between group cursor-pointer sm:col-start-2 shadow-2xs"
                    >
                      <span className="text-[11px] text-[#11172C]/60 font-bold flex items-center justify-end gap-1 group-hover:text-[#06080F]">
                        مقاله بعدی
                        <ArrowLeft className="w-3.5 h-3.5 text-[#06080F]" />
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[#06080F] group-hover:text-[#06080F] line-clamp-1 mt-1 text-right">
                        {prevNextArticles.next.title}
                      </span>
                    </button>
                  )}
                </div>

              </div>

              {/* Related Articles Section */}
              {relatedArticles.length > 0 && (
                <div className="space-y-4 mb-10">
                  <h3 className="text-base sm:text-lg font-black text-[#06080F] flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#00F090]" />
                    <span>مقالات مرتبط و تکمیلی مهندسی</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedArticles.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => handleSelectArticle(rel)}
                        className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/90 hover:border-[#00F090]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <div className="space-y-3">
                          <div className="h-36 rounded-xl overflow-hidden bg-slate-950 relative">
                            <img
                              src={rel.image}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#06080F]/80 backdrop-blur-md text-[10px] font-bold text-[#00F090] border border-white/15">
                              {rel.category}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-[#06080F] group-hover:text-[#06080F] line-clamp-2 transition-colors">
                            {rel.title}
                          </h4>

                          <p className="text-[11px] text-[#11172C]/80 line-clamp-2 leading-relaxed">
                            {rel.summary}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#06080F]">
                          <span>مطالعه مقاله</span>
                          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#00F090]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussion & Architect Comments Section */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#CBD8E2] pb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#06080F] flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-[#00F090]" />
                      <span>دیدگاه‌ها و پرسش‌های مهندسی معماران ({comments.length})</span>
                    </h3>
                    <p className="text-xs text-[#11172C]/70 mt-0.5">
                      تبادل تجربیات فنی، استعلام متریال و راهکارهای اجرایی
                    </p>
                  </div>
                </div>

                {/* Submit New Comment Form */}
                <form onSubmit={handleCommentSubmit} className="space-y-4 bg-[#CBD8E2]/40 p-5 rounded-2xl border border-white/80">
                  <h4 className="text-xs sm:text-sm font-bold text-[#06080F]">
                    ثبت پرسش فنی یا تجربه اجرایی
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#11172C] mb-1">
                        نام و نام خانوادگی <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        placeholder="مثال: مهندس کاوه سهرابی"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-white/90 text-xs text-[#06080F] focus:border-[#00F090] focus:outline-none shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#11172C] mb-1">
                        سمت / پروژه (اختیاری)
                      </label>
                      <input
                        type="text"
                        value={newCommentRole}
                        onChange={(e) => setNewCommentRole(e.target.value)}
                        placeholder="مثال: مدیر پروژه برج الهیه"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-white/90 text-xs text-[#06080F] focus:border-[#00F090] focus:outline-none shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#11172C] mb-1">
                      متن دیدگاه یا سوال مهندسی <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="دیدگاه، پرسش فنی در مورد مشخصات قطعات یا تجربیات خود را در اینجا بنویسید..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-white/90 text-xs text-[#06080F] focus:border-[#00F090] focus:outline-none leading-relaxed shadow-2xs"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#06080F] hover:bg-slate-900 text-[#00F090] text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95 border border-slate-700"
                    >
                      <Send className="w-3.5 h-3.5 text-[#00F090]" />
                      <span>ارسال دیدگاه</span>
                    </button>

                    {commentSubmitted && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        دیدگاه شما با موفقیت ثبت شد و پس از بررسی تایید می‌شود.
                      </span>
                    )}
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4 pt-2">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-2xl bg-white border border-white/90 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#06080F] text-[#00F090] font-black text-xs flex items-center justify-center border border-slate-700">
                            {comment.name[0]}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-[#06080F] block">
                              {comment.name}
                            </span>
                            <span className="text-[10px] text-[#11172C]/70">
                              {comment.role} • {comment.date}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] text-[#06080F] font-bold flex items-center gap-1 bg-[#CBD8E2]/60 px-2.5 py-1 rounded-lg">
                          <ThumbsUp className="w-3 h-3 text-[#00F090]" />
                          {comment.likes}
                        </span>
                      </div>

                      <p className="text-xs text-[#11172C] leading-relaxed pt-1">
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            /* ================================================================ */
            /* 2. MAIN BLOG CATALOG / ARCHIVE VIEW (/blog or blog.html)        */
            /* ================================================================ */
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
            >
              {/* Header Hero Banner */}
              <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
                <span className="px-4 py-1.5 rounded-full bg-[#CBD8E2]/80 border border-white/80 text-[#06080F] text-xs font-black inline-flex items-center gap-2 shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-[#00F090]" />
                  دانشنامه و مقالات مهندسی درنا درب
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#06080F] tracking-tight">
                  پایگاه دانش فنی، سازه‌های شیشه‌ای و اپراتورها
                </h1>

                <p className="text-xs sm:text-sm text-[#11172C]/80 leading-relaxed">
                  راهنماهای انتخاب متریال، تحلیل متالورژی موتورهای دانکر آلمان، استانداردسازی عایق صوتی و حرارتی در پروژه‌های لوکس مناطق ۱ تا ۵ تهران.
                </p>
              </div>

              {/* Spotlight / Featured Big Card */}
              {featuredArticle && !searchQuery && activeCategory === 'همه مقالات' && (
                <div 
                  onClick={() => handleSelectArticle(featuredArticle)}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8"
                >
                  <div className="lg:col-span-7 rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 relative bg-slate-950">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#00F090] text-[#06080F] text-xs font-black shadow-lg flex items-center gap-1.5 border border-white/60">
                      <Star className="w-3.5 h-3.5 fill-[#06080F]" />
                      مقاله ویژه مهندسی
                    </span>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-[#11172C]/70">
                        <span className="px-3 py-1 rounded-full bg-[#CBD8E2]/80 text-[#06080F] font-bold border border-white/80">
                          {featuredArticle.category}
                        </span>
                        <span>{featuredArticle.readTime}</span>
                        <span>•</span>
                        <span>{featuredArticle.date}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-[#06080F] group-hover:text-[#06080F] transition-colors leading-snug">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#11172C]/80 leading-relaxed line-clamp-4">
                        {featuredArticle.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {featuredArticle.tags?.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-[#CBD8E2]/60 text-[#11172C] text-[11px] font-medium border border-white/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#CBD8E2] flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-[#06080F] flex items-center gap-2 group-hover:gap-3 transition-all">
                        مطالعه کامل مقاله در صفحه اختصاصی
                        <ArrowLeft className="w-4 h-4 text-[#00F090]" />
                      </span>
                      <span className="text-xs text-[#11172C]/60 font-mono">
                        URL: /blog/{featuredArticle.id}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Search & Category Filter Toolbar */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/90 shadow-md space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                    {ALL_ARTICLE_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeCategory === cat
                            ? 'bg-[#06080F] text-[#00F090] shadow-md border border-slate-700'
                            : 'bg-[#CBD8E2]/60 hover:bg-[#CBD8E2] text-[#11172C] border border-white/80'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-72 shrink-0">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجو در عناوین و مقالات..."
                      className="w-full pl-3 pr-9 py-2 rounded-xl bg-white border border-white/90 text-xs text-[#06080F] focus:bg-white focus:border-[#00F090] focus:outline-none shadow-2xs"
                    />
                    <Search className="w-4 h-4 text-[#11172C]/50 absolute right-3 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleSelectArticle(article)}
                      className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/90 hover:border-[#00F090]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="space-y-3">
                        {/* Thumbnail Image */}
                        <div className="h-48 rounded-xl overflow-hidden bg-slate-950 relative">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#06080F]/80 backdrop-blur-md text-[11px] font-bold text-[#00F090] border border-white/15">
                            {article.category}
                          </span>
                          <span className="absolute bottom-3 left-3 text-[10px] text-slate-300 font-mono bg-[#06080F]/70 px-2 py-0.5 rounded border border-white/10">
                            {article.readTime}
                          </span>
                        </div>

                        {/* Date & Meta */}
                        <div className="flex items-center gap-3 text-[11px] text-[#11172C]/70">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#11172C]/50" />
                            {article.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-[#11172C]/50" />
                            {article.viewsCount || 850} بازدید
                          </span>
                        </div>

                        {/* Title & Summary */}
                        <h3 className="text-sm sm:text-base font-black text-[#06080F] group-hover:text-[#06080F] transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-xs text-[#11172C]/80 leading-relaxed line-clamp-3">
                          {article.summary}
                        </p>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {article.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-[#CBD8E2]/60 text-[#11172C] border border-white/60 font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Read Action */}
                      <div className="mt-5 pt-3.5 border-t border-[#CBD8E2] flex items-center justify-between">
                        <span className="text-xs font-bold text-[#06080F] group-hover:text-[#06080F] flex items-center gap-1 transition-colors">
                          ورود به صفحه مقاله
                          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#00F090]" />
                        </span>

                        <span className="text-[10px] text-[#11172C]/60 font-mono">
                          /blog/{article.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white/80 rounded-3xl border border-white/90 space-y-3 shadow-sm">
                  <HelpCircle className="w-10 h-10 text-[#11172C]/50 mx-auto" />
                  <h3 className="text-base font-bold text-[#06080F]">
                    مقاله‌ای با این مشخصات یافت نشد
                  </h3>
                  <p className="text-xs text-[#11172C]/70">
                    لطفاً عبارت جستجو یا دسته‌بندی انتخابی را تغییر دهید.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('همه مقالات');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#06080F] text-[#00F090] text-xs font-black shadow-md border border-slate-700 cursor-pointer"
                  >
                    مشاهده همه مقالات
                  </button>
                </div>
              )}

              {/* Engineering Consultation Banner */}
              <div className="bg-[#06080F] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
                <div className="space-y-2 text-center md:text-right">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[#00F090] text-xs font-bold border border-white/15 inline-block">
                    همکاری تخصصی با دفاتر معماری
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    مشاوره تخصصی با دفاتر معماری و مهندسین مشاور
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    ارائه دیتیل‌های اجرایی اتوکد (CAD Details)، نمونه متریال شیشه‌های سوپرکلیر، و محاسبات بارهای سازه‌ای برای پروژه‌های مناطق ۱ تا ۵ تهران.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setInquiryPrefill('درخواست مشاوره تخصصی دفاتر معماری و محاسبات سازه');
                      setInquiryModalOpen(true);
                    }}
                    className="px-5 py-3 rounded-xl bg-[#00F090] hover:bg-[#00D882] text-[#06080F] text-xs font-black flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>ارتباط مستقیم با مهندس ارشد</span>
                  </button>

                  <a
                    href="/calculator"
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20"
                  >
                    <Calculator className="w-4 h-4 text-[#00F090]" />
                    <span>محاسبه‌گر آنلاین قیمت</span>
                  </a>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Live Image Editor Modal */}
      <LiveImageEditorModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        currentImageUrl={imageModalData.url}
        currentAltText={imageModalData.alt}
        currentCaption={imageModalData.caption}
        title={imageModalTarget === 'hero' ? 'تغییر و آپلود تصویر شاخص مقاله' : 'تغییر تصویر محتوا'}
        onSave={(data) => {
          if (imageModalTarget === 'hero') {
            setDraftImage(data.imageUrl);
          }
          setHasUnsavedChanges(true);
          setSaveToast('تصویر شاخص با موفقیت اعمال گردید.');
          setTimeout(() => setSaveToast(null), 3000);
        }}
      />

      {/* Global Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        prefilledProject={inquiryPrefill}
      />

      {/* Global Footer */}
      <Footer
        onOpenInquiry={() => {
          setInquiryPrefill('استعلام و مشاوره فنی از بخش فوتر وبلاگ');
          setInquiryModalOpen(true);
        }}
      />
    </div>
  );
};
