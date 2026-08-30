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
  Compass
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { ARTICLES_DATA, ALL_ARTICLE_CATEGORIES, getArticleByIdOrSlug } from './data/articlesData';
import { dbService } from './lib/supabase';
import { Article } from './types';
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

  // Load articles from dbService or fallback
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const list = await dbService.getArticles();
        if (list && list.length > 0) {
          // Merge with rich content from ARTICLES_DATA if needed
          const merged: Article[] = list.map((item) => {
            const staticMatch = ARTICLES_DATA.find(
              (s) => s.id === item.id || s.slug === item.slug
            );
            return {
              ...item,
              content: item.content && item.content.length > 150 ? item.content : staticMatch?.content || item.content,
              keyTakeaways: staticMatch?.keyTakeaways || [item.summary],
              author: staticMatch?.author || {
                name: 'تحریریه مهندسی درنا درب',
                role: 'دپارتمان فنی و مهندسی سیستم‌های اتوماتیک',
              },
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

    // Listen to browser Back/Forward navigation
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

    // Update browser URL to clean /blog?id=1001
    const targetUrl = `/blog?id=${article.id}`;
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

  // Featured article (first featured or first item)
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
      `مقاله تخصصی درنا درب: ${selectedArticle.title}\n\nمطالعه در لینک زیر:\n${shareableUrl}`
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
      date: 'هم‌اکنون',
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
    <div className="min-h-screen bg-[#E4EBF1] text-[#06080F] font-['Vazirmatn',sans-serif] flex flex-col antialiased selection:bg-[#00F090]/30 selection:text-[#06080F]">
      
      {/* Top Sticky Reading Progress Bar (when viewing article) */}
      {selectedArticle && (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#CBD8E2] z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#06080F] via-[#00F090] to-[#06080F] transition-all duration-150 ease-out shadow-sm"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Main Global Navbar */}
      <Navbar
        onOpenInquiry={() => {
          setInquiryPrefill(
            selectedArticle
              ? `مشاوره فنی بر اساس مقاله: ${selectedArticle.title}`
              : 'مشاوره تخصصی و مهندسی درنا درب'
          );
          setInquiryModalOpen(true);
        }}
      />

      {/* Dynamic Main Body: Single Article View vs. Catalog View */}
      <main className="flex-1 pt-24 pb-20">
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
                    {selectedArticle.category}
                  </span>
                  <span className="text-[#CBD8E2] hidden md:inline">/</span>
                  <span className="text-[#06080F] font-bold truncate max-w-[200px] hidden md:inline">
                    {selectedArticle.title}
                  </span>
                </nav>

                <button
                  onClick={handleBackToCatalog}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-white text-[#06080F] text-xs font-bold border border-white/90 shadow-2xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#06080F]" />
                  <span>بازگشت به فهرست مقالات</span>
                </button>
              </div>

              {/* Article Header & Main Meta */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl space-y-6 mb-8">
                
                {/* Category, Read Time & Verification Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-[#06080F] text-[#00F090] text-xs font-black flex items-center gap-1.5 shadow-xs">
                    <BookOpen className="w-3.5 h-3.5 text-[#00F090]" />
                    {selectedArticle.category}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[#CBD8E2]/60 border border-white/60 text-[#06080F] text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#11172C]/60" />
                    {selectedArticle.readTime}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1 hidden sm:flex">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    تاییدیه فنی دپارتمان مهندسی درنا درب
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[#CBD8E2]/50 text-[#11172C]/70 text-xs font-mono mr-auto flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#11172C]/50" />
                    {selectedArticle.viewsCount || 1200} بازدید تخصصی
                  </span>
                </div>

                {/* Main Article Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#06080F] leading-tight sm:leading-snug">
                  {selectedArticle.title}
                </h1>

                {/* Lead Summary */}
                <p className="text-sm sm:text-base text-[#11172C] leading-relaxed font-medium bg-[#CBD8E2]/40 p-4 sm:p-5 rounded-2xl border border-white/60">
                  {selectedArticle.summary}
                </p>

                {/* Author Info Bar & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#CBD8E2]">
                  {/* Author Meta */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#06080F] text-[#00F090] font-black text-sm flex items-center justify-center shadow-md border border-[#00F090]/40">
                      {selectedArticle.author?.name ? selectedArticle.author.name[0] : 'د'}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#06080F] flex items-center gap-1.5">
                        <span>{selectedArticle.author?.name || 'مهندس ارشد دپارتمان درنا درب'}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090]" />
                      </div>
                      <div className="text-[11px] text-[#11172C]/70">
                        {selectedArticle.author?.role || 'سرپرست مهندسی و بازرسی سازه‌های شیشه‌ای'} • تاریخ انتشار: {selectedArticle.date}
                      </div>
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

                {/* Featured Big Image with High Polish */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl mt-4 max-h-[460px] bg-slate-950">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover max-h-[460px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-white text-xs backdrop-blur-md bg-slate-950/60 p-3 rounded-xl border border-white/10">
                    <span className="font-medium truncate">
                      عکس اختصاصی پروژه اجرایی درنا درب • منطقه ۱ تهران (زعفرانیه و الهیه)
                    </span>
                    <span className="font-mono text-[11px] text-slate-300 shrink-0">
                      ID: #{selectedArticle.id}
                    </span>
                  </div>
                </div>

                {/* Key Engineering Takeaways Box */}
                {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#CBD8E2]/60 backdrop-blur-md border border-white/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-[#06080F] font-black text-sm sm:text-base">
                      <Sparkles className="w-4 h-4 text-[#00F090]" />
                      <span>نکات کلیدی و چک‌لیست تصمیم‌گیری مهندسی:</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#11172C]">
                      {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-white/90 shadow-2xs">
                          <CheckCircle2 className="w-4 h-4 text-[#00F090] shrink-0 mt-0.5" />
                          <span className="font-medium">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full Article Rich Technical Body Content */}
                <div 
                  className="prose prose-slate max-w-none text-[#11172C] leading-loose text-sm sm:text-base pt-4 border-t border-[#CBD8E2]"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />

                {/* Tags Section */}
                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <div className="pt-6 border-t border-[#CBD8E2] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#11172C]/70 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      برچسب‌های فنی:
                    </span>
                    {selectedArticle.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-white/80 hover:bg-white text-[#11172C] text-xs font-medium border border-white/90 transition-colors shadow-2xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

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
                        setInquiryPrefill(`استعلام پروژه از صفحه مقاله: ${selectedArticle.title}`);
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
