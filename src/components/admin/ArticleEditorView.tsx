import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Save,
  Eye,
  EyeOff,
  Sparkles,
  FileText,
  Clock,
  User,
  Calendar,
  Tag,
  Folder,
  Globe,
  Search,
  CheckCircle2,
  AlertCircle,
  Star,
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  HelpCircle,
  ExternalLink,
  Upload,
  SplitSquareVertical,
} from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';
import { ArticleRecord } from '../../lib/supabase';
import { ImageDropUploader } from './ImageDropUploader';

export const ArticleEditorView: React.FC = () => {
  const {
    editingArticleId,
    articles,
    saveArticle,
    closeArticleEditor,
    addAuditLog,
    setStatusMessage,
    isLoading,
  } = useAdminStore();

  // Find existing article if editing, or initialize new template
  const isNew = !editingArticleId || editingArticleId === 'new';
  const existingArticle = articles.find((a) => a.id === editingArticleId);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('فنی و مهندسی');
  const [readTime, setReadTime] = useState('۵ دقیقه');
  const [author, setAuthor] = useState('واحد تحقیق و توسعه دُرنا دَرب');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('published');
  const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [scheduledDate, setScheduledDate] = useState('');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>(['درب اتوماتیک', 'موتور دانکر', 'شیشه سکوریت']);
  const [tagInput, setTagInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);

  // UI state
  const [previewMode, setPreviewMode] = useState<'edit' | 'split' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing article data on mount or ID change
  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title || '');
      setSlug(existingArticle.slug || '');
      setSummary(existingArticle.summary || '');
      setContent(existingArticle.content || '');
      setCategory(existingArticle.category || 'فنی و مهندسی');
      setReadTime(existingArticle.readTime || '۵ دقیقه');
      setAuthor(existingArticle.author || 'واحد تحقیق و توسعه دُرنا دَرب');
      setStatus(existingArticle.status || (existingArticle.published !== false ? 'published' : 'draft'));
      setDate(existingArticle.date || new Date().toLocaleDateString('fa-IR'));
      setScheduledDate(existingArticle.scheduledDate || '');
      setImage(existingArticle.image || '');
      setFeatured(Boolean(existingArticle.featured));
      setTags(existingArticle.tags?.length ? existingArticle.tags : ['درب اتوماتیک', 'شیشه سکوریت']);
      setSeoTitle(existingArticle.seoTitle || existingArticle.title || '');
      setSeoDescription(existingArticle.seoDescription || existingArticle.summary || '');
      setGallery(existingArticle.gallery || []);
    } else {
      // New article defaults
      setTitle('');
      setSlug('');
      setSummary('');
      setContent('');
      setCategory('فنی و مهندسی');
      setReadTime('۵ دقیقه');
      setAuthor('واحد تحقیق و توسعه دُرنا دَرب');
      setStatus('published');
      setDate(new Date().toLocaleDateString('fa-IR'));
      setScheduledDate('');
      setImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
      setFeatured(true);
      setTags(['درب اتوماتیک', 'موتور دانکر', 'شیشه سوپرکلیر']);
      setSeoTitle('');
      setSeoDescription('');
      setGallery([]);
    }
  }, [editingArticleId]);

  // Auto-generate slug and SEO title if empty
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')) {
      const generatedSlug = newTitle
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
        .slice(0, 80);
      setSlug(generatedSlug);
    }
    if (!seoTitle) {
      setSeoTitle(newTitle);
    }
  };

  const handleSummaryChange = (newSummary: string) => {
    setSummary(newSummary);
    if (!seoDescription) {
      setSeoDescription(newSummary);
    }
  };

  // Word count & Read Time Calculation
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const estimatedMins = Math.max(1, Math.ceil(wordCount / 200));

  // Tag helpers
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Rich Text Insertion Helpers
  const insertFormatting = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultPlaceholder;

    const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Save handler
  const handleSave = async (saveAsDraft: boolean = false) => {
    if (!title.trim()) {
      setStatusMessage({ text: 'لطفاً عنوان مقاله را وارد نمایید.', type: 'error' });
      return;
    }

    setIsSaving(true);

    const effectiveStatus = saveAsDraft ? 'draft' : status;
    const articleId = !isNew && existingArticle ? existingArticle.id : `art-${Date.now()}`;

    const articleRecord: ArticleRecord = {
      id: articleId,
      title: title.trim(),
      slug: slug.trim() || title.trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-'),
      summary: summary.trim(),
      content: content.trim(),
      category,
      readTime: readTime || `${estimatedMins} دقیقه`,
      author: author.trim() || 'واحد فنی مهندسی دُرنا دَرب',
      status: effectiveStatus,
      published: effectiveStatus === 'published',
      date,
      scheduledDate: effectiveStatus === 'scheduled' ? scheduledDate : undefined,
      image: image.trim(),
      featured,
      tags,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || summary.trim(),
      gallery,
    };

    const success = await saveArticle(articleRecord);
    setIsSaving(false);

    if (success) {
      addAuditLog(
        'article_save',
        `مقاله: ${title}`,
        isNew ? 'نگارش و انتشار مقاله جدید' : 'ویرایش جامع محتوا و متادیتای سئو'
      );
      setStatusMessage({
        text: saveAsDraft
          ? 'مقاله با موفقیت به عنوان پیش‌نویس ذخیره گردید.'
          : 'مقاله با موفقیت در وبلاگ دُرنا دَرب منتشر شد.',
        type: 'success',
      });
      closeArticleEditor();
    } else {
      setStatusMessage({ text: 'خطا در ذخیره‌سازی مقاله. لطفاً مجدداً تلاش کنید.', type: 'error' });
    }
  };

  // Inline Gallery Image Upload
  const handleAddGalleryImage = (base64Url: string) => {
    if (base64Url && !gallery.includes(base64Url)) {
      setGallery([...gallery, base64Url]);
    }
  };

  const handleCopySnippet = (textToCopy: string, id: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* ==================================================================== */}
      {/* 1. TOP STICKY TOOLBAR & ACTIONS */}
      {/* ==================================================================== */}
      <div className="sticky top-16 z-20 bg-[#CBD8E2]/95 backdrop-blur-md border border-[#06080F]/15 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeArticleEditor}
              className="p-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-[#06080F] border border-[#06080F]/10 transition-all cursor-pointer shadow-xs flex items-center gap-1.5 text-xs font-bold"
              title="بازگشت به فهرست مقالات"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="hidden sm:inline">بازگشت به مقالات</span>
            </button>

            <div className="border-r border-[#06080F]/15 pr-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#11172C]/70">مدیریت محتوا</span>
                <span className="text-[11px] text-[#11172C]/40">/</span>
                <h1 className="text-sm font-black text-[#06080F] truncate max-w-xs md:max-w-md">
                  {isNew ? 'نگارش مقاله جدید در وبلاگ' : `ویرایش: ${title || 'بدون عنوان'}`}
                </h1>
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-[11px] text-[#11172C]/80 font-mono">
                <span>{wordCount.toLocaleString('fa-IR')} کلمه</span>
                <span>•</span>
                <span>{charCount.toLocaleString('fa-IR')} نویسه</span>
                <span>•</span>
                <span>زمان مطالعه: {estimatedMins.toLocaleString('fa-IR')} دقیقه</span>
              </div>
            </div>
          </div>

          {/* Controls & Save CTAs */}
          <div className="flex items-center flex-wrap gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#E4EBF1] p-1 rounded-xl border border-[#06080F]/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPreviewMode('edit')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  previewMode === 'edit'
                    ? 'bg-[#06080F] text-[#00F090] shadow-xs'
                    : 'text-[#11172C] hover:text-[#06080F]'
                }`}
                title="فقط محیط ویرایشگر"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>ویرایش</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode('split')}
                className={`px-3 py-1.5 rounded-lg transition-all hidden lg:flex items-center gap-1 cursor-pointer ${
                  previewMode === 'split'
                    ? 'bg-[#06080F] text-[#00F090] shadow-xs'
                    : 'text-[#11172C] hover:text-[#06080F]'
                }`}
                title="نمای همزمان ویرایش و پیش‌نمایش زنده"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>همزمان (Split)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  previewMode === 'preview'
                    ? 'bg-[#06080F] text-[#00F090] shadow-xs'
                    : 'text-[#11172C] hover:text-[#06080F]'
                }`}
                title="پیش‌نمایش نهایی سایت"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>پیش‌نمایش</span>
              </button>
            </div>

            {/* Save Draft CTA */}
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={isSaving || isLoading}
              className="px-4 py-2 rounded-xl bg-[#E4EBF1] hover:bg-white text-[#06080F] font-black text-xs border border-[#06080F]/15 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              ذخیره پیش‌نویس
            </button>

            {/* Primary Publish CTA */}
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={isSaving || isLoading}
              className="px-5 py-2 rounded-xl bg-[#00F090] hover:bg-[#00F090]/90 text-[#06080F] font-black text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'در حال ذخیره...' : isNew ? 'انتشار مقاله' : 'به‌روزرسانی و انتشار'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN 12-COLUMN WORKSPACE */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================================================================ */}
        {/* LEFT COLUMN: MAIN CONTENT & EDITOR (8 Cols in Edit, 6 in Split, 12 in Preview) */}
        {/* ================================================================ */}
        <div
          className={`${
            previewMode === 'preview'
              ? 'col-span-12'
              : previewMode === 'split'
              ? 'col-span-12 lg:col-span-8'
              : 'col-span-12 lg:col-span-8'
          } space-y-6`}
        >
          {/* Main Title & Lead Box (Edit & Split Modes) */}
          {previewMode !== 'preview' && (
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#06080F] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#06080F]" />
                    <span>عنوان مقاله تخصصی (H1):</span>
                  </span>
                  <span className="text-[11px] text-[#11172C]/60 font-mono">
                    {title.length} حرف
                  </span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="مثلاً: بررسی اپراتورهای آلمانی و سوئیسی: تکنولوژی موتورهای Dunker در درب‌های اتوماتیک"
                  className="w-full px-4 py-3 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-sm font-black text-[#06080F] placeholder-[#11172C]/50 focus:border-[#06080F] focus:bg-white focus:outline-none transition-all shadow-inner"
                />
              </div>

              {/* Short Summary / Lead Abstract */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#06080F] flex items-center justify-between">
                  <span>خلاصه کوتاه و لید مقاله (چکیده):</span>
                  <span className="text-[11px] text-[#11172C]/60 font-mono">
                    {summary.length} حرف
                  </span>
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  rows={2}
                  placeholder="چکیده مقاله جهت نمایش در کارت‌های وبلاگ و بخش شاخص صفحه نخست..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] placeholder-[#11172C]/50 focus:border-[#06080F] focus:bg-white focus:outline-none transition-all leading-relaxed shadow-inner"
                />
              </div>
            </div>
          )}

          {/* Rich Content Editor & Toolbar */}
          {previewMode !== 'preview' && (
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#06080F]" />
                  <span className="text-xs font-black text-[#06080F]">
                    متن اصلی مقاله (پشتیبانی از پاراگراف‌ها، عناوین و کد HTML / مارک‌داون)
                  </span>
                </div>
                <div className="text-[11px] text-[#11172C]/70 font-mono">
                  {wordCount.toLocaleString('fa-IR')} کلمه
                </div>
              </div>

              {/* Formatting Action Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#E4EBF1] p-2 rounded-xl border border-[#06080F]/10">
                <button
                  type="button"
                  onClick={() => insertFormatting('## ', '\n', 'تیتر سطح ۲')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs flex items-center gap-1 cursor-pointer transition-all border border-[#06080F]/5"
                  title="تیتر سطح دو (H2)"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                  <span className="text-[10px]">H2</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('### ', '\n', 'تیتر سطح ۳')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs flex items-center gap-1 cursor-pointer transition-all border border-[#06080F]/5"
                  title="تیتر سطح سه (H3)"
                >
                  <Heading3 className="w-3.5 h-3.5" />
                  <span className="text-[10px]">H3</span>
                </button>

                <div className="h-4 w-px bg-[#06080F]/20 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**', 'متن برجسته')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="ضخیم (Bold)"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*', 'متن مورب')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="مورب (Italic)"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-[#06080F]/20 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting('\n- ', '', 'مورد اول')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="لیست بالت‌دار"
                >
                  <List className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('\n1. ', '', 'مورد اول')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="لیست شماره‌دار"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('\n> ', '\n', 'نکته فنی و مهندسی مهم')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="نقل قول / کادر یادداشت"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('`', '`', 'کد یا مدل قطعه')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="کد یا مشخصه فنی"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-[#06080F]/20 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting('[عنوان لینک](', ')', 'https://example.com')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="درج پیوند (Link)"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('\n![توضیح تصویر](', ')\n', 'https://images.unsplash.com/...')}
                  className="p-1.5 rounded-lg bg-[#CBD8E2] hover:bg-white text-[#06080F] font-black text-xs cursor-pointer transition-all border border-[#06080F]/5"
                  title="درج تصویر در متن"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>

                <div className="mr-auto text-[10px] text-[#11172C]/60 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  <span>پشتیبانی کامل از تگ‌های HTML</span>
                </div>
              </div>

              {/* Textarea Workspace */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  placeholder="محتوای تخصصی و جامع مقاله را اینجا وارد نمایید. شما می‌توانید از تگ‌های مارک‌داون یا HTML مانند <p> ، <h3> ، <ul> استفاده نمایید..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs text-[#06080F] focus:border-[#06080F] focus:bg-white focus:outline-none transition-all leading-relaxed shadow-inner"
                />
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* LIVE PREVIEW RENDERING (Shown in Preview or Split Mode) */}
          {/* ================================================================ */}
          {(previewMode === 'preview' || previewMode === 'split') && (
            <div className="bg-[#CBD8E2] border border-[#06080F]/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#00F090]" />
                  <span className="text-sm font-black text-[#06080F]">
                    پیش‌نمایش زنده در قالب عمومی وبلاگ دُرنا دَرب
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#06080F] text-[#00F090] font-black text-[10px]">
                    {category}
                  </span>
                  {featured && (
                    <span className="px-2.5 py-1 rounded-full bg-[#00F090] text-[#06080F] font-black text-[10px] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      مقاله ویژه
                    </span>
                  )}
                </div>
              </div>

              {/* Article Hero Cover in Preview */}
              {image && (
                <div className="rounded-2xl overflow-hidden aspect-video w-full max-h-[380px] bg-[#E4EBF1] relative border border-[#06080F]/10 shadow-md">
                  <img
                    src={image}
                    alt={title || 'کاور مقاله'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Meta Header */}
              <div className="space-y-3">
                <h1 className="text-xl sm:text-2xl font-black text-[#06080F] leading-tight">
                  {title || 'عنوان مقاله تخصصی'}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#11172C]/80 pt-1 pb-2 border-b border-[#06080F]/10">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#06080F]" />
                    <span className="font-bold">{author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#06080F]" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#06080F]" />
                    <span>زمان مطالعه: {readTime}</span>
                  </div>
                </div>
              </div>

              {/* Abstract / Lead */}
              {summary && (
                <div className="p-4 rounded-xl bg-[#E4EBF1] border-r-4 border-[#00F090] text-xs sm:text-sm font-bold text-[#06080F] leading-relaxed shadow-xs">
                  {summary}
                </div>
              )}

              {/* Main Body Preview */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-[#06080F] leading-relaxed space-y-4">
                {content ? (
                  content.split('\n\n').map((paragraph, index) => {
                    const trimmed = paragraph.trim();
                    if (trimmed.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-base sm:text-lg font-black text-[#06080F] pt-3 border-b border-[#06080F]/10 pb-1">
                          {trimmed.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (trimmed.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-sm sm:text-base font-black text-[#06080F] pt-2">
                          {trimmed.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (trimmed.startsWith('> ')) {
                      return (
                        <blockquote key={index} className="p-3 bg-[#E4EBF1] border-r-4 border-[#06080F] rounded-lg text-xs italic text-[#11172C]">
                          {trimmed.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    return (
                      <p key={index} className="text-xs sm:text-sm leading-relaxed text-[#06080F]/90">
                        {trimmed}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-xs text-[#11172C]/50 italic">
                    محتوای مقاله هنوز وارد نشده است...
                  </p>
                )}
              </div>

              {/* Tags in Preview */}
              {tags.length > 0 && (
                <div className="pt-4 border-t border-[#06080F]/10 flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#06080F]" />
                  {tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#E4EBF1] border border-[#06080F]/10 text-[#06080F] text-[11px] font-bold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN: METADATA, SEO, MEDIA & PUBLISH SETTINGS (4 Cols) */}
        {/* ================================================================ */}
        {previewMode !== 'preview' && (
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* 1. PUBLISH STATUS & AUTHOR METADATA */}
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2.5">
                <Globe className="w-4 h-4 text-[#06080F]" />
                <span>وضعیت انتشار و هویت نگارنده</span>
              </h3>

              <div className="space-y-3">
                {/* Status Selector */}
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">
                    وضعیت انتشار:
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none cursor-pointer"
                  >
                    <option value="published">منتشر شده (عمومی در وبلاگ)</option>
                    <option value="draft">پیش‌نویس (عدم نمایش عمومی)</option>
                    <option value="scheduled">زمان‌بندی شده برای آینده</option>
                  </select>
                </div>

                {status === 'scheduled' && (
                  <div>
                    <label className="text-xs font-bold text-[#06080F] block mb-1">
                      تاریخ انتشار برنامه‌ریزی شده:
                    </label>
                    <input
                      type="text"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      placeholder="۱۴۰۴/۱۲/۲۵"
                      className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs text-[#06080F] focus:outline-none"
                    />
                  </div>
                )}

                {/* Author Name */}
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">
                    نام نگارنده / مؤلف:
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="واحد تحقیق و توسعه دُرنا دَرب"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none"
                  />
                </div>

                {/* Date & Read Time in Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-[#06080F] block mb-1">
                      تاریخ درج:
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs text-[#06080F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-[#06080F] block mb-1">
                      زمان تخمینی مطالعه:
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="۵ دقیقه"
                      className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Featured Switch */}
                <div className="pt-2 border-t border-[#06080F]/10">
                  <label className="flex items-center gap-2.5 text-xs font-bold text-[#06080F] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 accent-[#06080F] rounded cursor-pointer"
                    />
                    <span className="flex items-center gap-1">
                      <Star className={`w-3.5 h-3.5 ${featured ? 'fill-amber-500 text-amber-500' : 'text-[#06080F]'}`} />
                      <span>نمایش به عنوان مقاله ویژه در صفحه اول</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 2. PRIMARY 16:9 COVER IMAGE */}
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2.5">
                <ImageIcon className="w-4 h-4 text-[#06080F]" />
                <span>تصویر کاور و پوستر اصلی مقاله</span>
              </h3>

              <ImageDropUploader
                value={image}
                onChange={setImage}
                label="کاور شاخص وبلاگ"
                hint="درگ فایل یا وارد کردن URL تصویر (نسبت استاندارد ۱۶:۹)"
                aspectRatioHint="عرض ۱۲۰۰ در ارتفاع ۶۷۵ پیکسل"
              />
            </div>

            {/* 3. INLINE MEDIA & GALLERY ATTACHMENTS */}
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#06080F]/10 pb-2.5">
                <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#06080F]" />
                  <span>پیوست تصاویر داخل متن ({gallery.length})</span>
                </h3>
              </div>

              <p className="text-[11px] text-[#11172C]/70">
                تصاویر دیاگرام، نقشه فنی یا دیتیل اجرایی را آپلود کرده و با یک کلیک در متن درج کنید.
              </p>

              <ImageDropUploader
                value=""
                onChange={handleAddGalleryImage}
                label="افزودن تصویر جدید به گالری متن"
                hint="فایل جدید را بکشید تا به لیست پیوست‌ها افزوده شود"
              />

              {gallery.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-black text-[#06080F] block">
                    تصاویر آماده جهت درج در متن:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {gallery.map((imgUrl, gIdx) => (
                      <div
                        key={gIdx}
                        className="relative rounded-xl overflow-hidden bg-[#E4EBF1] border border-[#06080F]/15 p-1 group"
                      >
                        <div className="h-20 w-full rounded-lg overflow-hidden bg-[#CBD8E2]">
                          <img
                            src={imgUrl}
                            alt={`Gallery ${gIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-1 px-1">
                          <button
                            type="button"
                            onClick={() => {
                              insertFormatting(`\n![تصویر ${gIdx + 1}](${imgUrl})\n`);
                              setStatusMessage({ text: 'کد تصویر به انتهای متن اضافه شد.', type: 'info' });
                            }}
                            className="text-[10px] font-bold text-[#06080F] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>درج در متن</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setGallery(gallery.filter((_, i) => i !== gIdx))}
                            className="text-red-600 hover:text-red-800 p-0.5 cursor-pointer"
                            title="حذف از پیوست‌ها"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. CATEGORY & TAGS */}
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2.5">
                <Folder className="w-4 h-4 text-[#06080F]" />
                <span>دسته‌بندی موضوعی و برچسب‌ها</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">
                    دسته‌بندی اصلی:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs font-bold text-[#06080F] focus:outline-none cursor-pointer"
                  >
                    <option value="فنی و مهندسی">فنی و مهندسی</option>
                    <option value="شیشه و متریال">شیشه و متریال</option>
                    <option value="معماری و لابی">معماری و لابی</option>
                    <option value="استانداردها">استانداردها و ایمنی</option>
                    <option value="هوشمندسازی">هوشمندسازی و اتوماسیون</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">
                    کلمات کلیدی و تگ‌ها (Enter برای افزودن):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder="مثلاً: موتور دانکر"
                      className="flex-1 px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-2 rounded-xl bg-[#06080F] text-[#00F090] font-black text-xs cursor-pointer hover:bg-black"
                    >
                      افزودن
                    </button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tags.map((tagItem, tIndex) => (
                        <span
                          key={tIndex}
                          className="px-2.5 py-1 rounded-lg bg-[#E4EBF1] border border-[#06080F]/15 text-[#06080F] text-[11px] font-bold flex items-center gap-1.5"
                        >
                          <span>{tagItem}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tagItem)}
                            className="text-[#11172C]/60 hover:text-red-700 font-black cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 5. SEO & SEARCH METADATA PANEL */}
            <div className="bg-[#CBD8E2] border border-[#06080F]/10 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-[#06080F] flex items-center gap-2 border-b border-[#06080F]/10 pb-2.5">
                <Search className="w-4 h-4 text-[#06080F]" />
                <span>بهینه‌سازی سئو (SEO) و پیش‌نمایش در گوگل</span>
              </h3>

              {/* Google Search Result Mockup */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 text-right shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-mono" dir="ltr">
                  <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-800">D</span>
                  <span>dornadarb.com › blog › {slug || 'article-slug'}</span>
                </div>
                <div className="text-sm font-bold text-blue-700 leading-snug line-clamp-1 hover:underline cursor-pointer">
                  {seoTitle || title || 'عنوان مقاله در نتایج جستجوی گوگل'}
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {seoDescription || summary || 'توضیحات متای این مقاله در نتایج موتورهای جستجو به این صورت برای کاربران نمایش داده خواهد شد...'}
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-black text-[#06080F] block mb-1">
                    نامک آدرس اینترنتی (Slug / URL):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="dunker-motor-german-automatic-doors"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 font-mono text-xs text-[#06080F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#06080F] flex items-center justify-between mb-1">
                    <span>عنوان سئو (Meta Title):</span>
                    <span className={`text-[10px] font-mono ${seoTitle.length > 60 ? 'text-amber-700 font-bold' : 'text-[#11172C]/60'}`}>
                      {seoTitle.length} / ۶۰ حرف
                    </span>
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="عنوان بهینه‌شده برای نتایج موتورهای جستجو"
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#06080F] flex items-center justify-between mb-1">
                    <span>توضیحات متا (Meta Description):</span>
                    <span className={`text-[10px] font-mono ${seoDescription.length > 160 ? 'text-amber-700 font-bold' : 'text-[#11172C]/60'}`}>
                      {seoDescription.length} / ۱۶۰ حرف
                    </span>
                  </label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    placeholder="شرح مختصر و جذاب ۱۲۰ الی ۱۶۰ کاراکتری برای ترغیب کاربر در نتایج گوگل..."
                    className="w-full px-3 py-2 rounded-xl bg-[#E4EBF1] border border-[#06080F]/15 text-xs text-[#06080F] focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
