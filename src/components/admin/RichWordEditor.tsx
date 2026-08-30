import React, { useRef, useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Table as TableIcon,
  Sparkles,
  HelpCircle,
  Undo2,
  Redo2,
  CheckSquare,
  AlertTriangle,
  Lightbulb,
  FileCode,
  Minus,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface RichWordEditorProps {
  initialContent?: string;
  onChange: (htmlContent: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichWordEditor: React.FC<RichWordEditorProps> = ({
  initialContent = '',
  onChange,
  placeholder = 'متن مقاله را اینجا بنویسید یا ویرایش کنید...',
  minHeight = '360px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState(initialContent);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    heading1: false,
    heading2: false,
    heading3: false,
    ul: false,
    ol: false,
    justifyRight: true,
    justifyCenter: false,
    justifyLeft: false,
  });

  // Sync initial content to editor on mount or external reset
  useEffect(() => {
    if (editorRef.current && initialContent !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialContent || '';
      setHtmlSource(initialContent || '');
    }
  }, [initialContent]);

  // Execute standard formatting commands
  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (isHtmlMode) return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleEditorInput();
    }
    checkActiveFormats();
  };

  // Inspect selection state to highlight active toolbar buttons
  const checkActiveFormats = () => {
    if (isHtmlMode || !editorRef.current) return;
    try {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        heading1: document.queryCommandValue('formatBlock') === 'h1',
        heading2: document.queryCommandValue('formatBlock') === 'h2',
        heading3: document.queryCommandValue('formatBlock') === 'h3',
        ul: document.queryCommandState('insertUnorderedList'),
        ol: document.queryCommandState('insertOrderedList'),
        justifyRight: document.queryCommandState('justifyRight') || true,
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyLeft: document.queryCommandState('justifyLeft'),
      });
    } catch {
      // Ignore cross-browser queryCommandState quirks
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlSource(html);
      onChange(html);
    }
  };

  // Switch between WYSIWYG Word view and raw HTML mode
  const toggleHtmlMode = () => {
    if (isHtmlMode) {
      // Switching from HTML back to Rich Text Visual
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlSource;
      }
      onChange(htmlSource);
      setIsHtmlMode(false);
    } else {
      // Switching from Visual to HTML
      if (editorRef.current) {
        setHtmlSource(editorRef.current.innerHTML);
      }
      setIsHtmlMode(true);
    }
  };

  const handleHtmlSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtmlSource(newHtml);
    onChange(newHtml);
  };

  // Insert Custom Styled Elements
  const insertCustomBlock = (type: 'callout-green' | 'callout-amber' | 'specs-table' | 'quote') => {
    if (isHtmlMode || !editorRef.current) return;
    editorRef.current.focus();

    let snippet = '';
    if (type === 'callout-green') {
      snippet = `
        <div class="my-4 p-4 rounded-2xl bg-[#00F090]/10 border-2 border-[#00F090]/40 text-[#06080F]">
          <strong class="block text-sm font-black mb-1 flex items-center gap-1.5 text-[#06080F]">
            💡 نکته فنی و تخصصی مهندسی درنا درب:
          </strong>
          <p class="text-xs leading-relaxed font-medium m-0">متن نکته فنی، توصیه کارشناسی یا استاندارد اجرایی را اینجا بنویسید...</p>
        </div>
      `;
    } else if (type === 'callout-amber') {
      snippet = `
        <div class="my-4 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-[#06080F]">
          <strong class="block text-sm font-black mb-1 flex items-center gap-1.5 text-amber-900">
            ⚠️ هشدار مهم و استاندارد ایمنی:
          </strong>
          <p class="text-xs leading-relaxed font-medium m-0">توضیحات مربوط به نکات ایمنی، جلوگیری از استهلاک یا شرایط گارانتی قطعات...</p>
        </div>
      `;
    } else if (type === 'specs-table') {
      snippet = `
        <div class="my-4 overflow-x-auto rounded-xl border border-[#06080F]/15">
          <table class="w-full text-xs text-right border-collapse bg-white">
            <thead>
              <tr class="bg-[#06080F] text-white">
                <th class="p-2.5 font-black border border-white/20">مشخصه فنی</th>
                <th class="p-2.5 font-black border border-white/20">مقدار / استاندارد</th>
                <th class="p-2.5 font-black border border-white/20">توضیحات کاربردی</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[#06080F]/10">
                <td class="p-2.5 font-bold bg-[#E4EBF1]/50 border border-[#06080F]/10">نوع موتور اپراتور</td>
                <td class="p-2.5 border border-[#06080F]/10">Dunkermotoren آلمان</td>
                <td class="p-2.5 border border-[#06080F]/10">بدون زغال (Brushless) با تردد نامحدود</td>
              </tr>
              <tr class="border-b border-[#06080F]/10">
                <td class="p-2.5 font-bold bg-[#E4EBF1]/50 border border-[#06080F]/10">نوع شیشه</td>
                <td class="p-2.5 border border-[#06080F]/10">سکوریت ۱۰ میل سوپرکلیر</td>
                <td class="p-2.5 border border-[#06080F]/10">نشکن، حرارت‌دیده با لبه دیاموند براق</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (type === 'quote') {
      snippet = `
        <blockquote class="my-4 p-4 rounded-xl bg-[#E4EBF1] border-r-4 border-[#06080F] text-xs font-semibold italic text-[#11172C] leading-relaxed">
          «جمله یا نقل‌قول کلیدی از کارشناس یا استانداردهای بین‌المللی ساختمان...»
        </blockquote>
      `;
    }

    document.execCommand('insertHTML', false, snippet);
    handleEditorInput();
  };

  const insertLinkPrompt = () => {
    if (isHtmlMode) return;
    const url = window.prompt('آدرس اینترنتی (URL) پیوند را وارد نمایید:', 'https://');
    if (url) {
      execCmd('createLink', url);
    }
  };

  const insertImagePrompt = () => {
    if (isHtmlMode) return;
    const url = window.prompt('آدرس مستقیم تصویر (Image URL) را وارد نمایید:', 'https://images.unsplash.com/...');
    if (url) {
      const imgHtml = `<img src="${url}" alt="تصویر مقاله" class="rounded-2xl max-w-full my-4 shadow-md border border-[#06080F]/10 object-cover" />`;
      document.execCommand('insertHTML', false, imgHtml);
      handleEditorInput();
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-[#06080F]/15 shadow-sm overflow-hidden flex flex-col">
      {/* ==================================================================== */}
      {/* WORD-STYLE TOP FORMATTING TOOLBAR RIBBON */}
      {/* ==================================================================== */}
      <div className="bg-[#CBD8E2]/80 border-b border-[#06080F]/15 p-2 flex flex-wrap items-center gap-1 sm:gap-1.5 select-none">
        
        {/* Undo / Redo */}
        <div className="flex items-center bg-white/70 rounded-lg p-0.5 border border-[#06080F]/10">
          <button
            type="button"
            onClick={() => execCmd('undo')}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="بازگردانی (Undo)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('redo')}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="تکرار (Redo)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-[#06080F]/20 mx-0.5" />

        {/* Headings Dropdown / Buttons */}
        <div className="flex items-center bg-white/70 rounded-lg p-0.5 border border-[#06080F]/10">
          <button
            type="button"
            onClick={() => execCmd('formatBlock', '<h2>')}
            className={`px-2 py-1 rounded text-xs font-black flex items-center gap-1 cursor-pointer transition-all ${
              activeFormats.heading2 ? 'bg-[#06080F] text-[#00F090]' : 'hover:bg-white text-[#06080F]'
            }`}
            title="تیتر اصلی سطح دو (H2)"
          >
            <Heading2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">تیتر اصلی (H2)</span>
          </button>
          <button
            type="button"
            onClick={() => execCmd('formatBlock', '<h3>')}
            className={`px-2 py-1 rounded text-xs font-black flex items-center gap-1 cursor-pointer transition-all ${
              activeFormats.heading3 ? 'bg-[#06080F] text-[#00F090]' : 'hover:bg-white text-[#06080F]'
            }`}
            title="تیتر فرعی سطح سه (H3)"
          >
            <Heading3 className="w-3.5 h-3.5" />
            <span className="text-[11px]">تیتر فرعی (H3)</span>
          </button>
          <button
            type="button"
            onClick={() => execCmd('formatBlock', '<p>')}
            className="px-2 py-1 rounded text-xs font-medium hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="پاراگراف عادی"
          >
            متن عادی
          </button>
        </div>

        <div className="h-4 w-px bg-[#06080F]/20 mx-0.5" />

        {/* Character Formatting: Bold, Italic, Underline, Strikethrough */}
        <div className="flex items-center bg-white/70 rounded-lg p-0.5 border border-[#06080F]/10">
          <button
            type="button"
            onClick={() => execCmd('bold')}
            className={`p-1.5 rounded cursor-pointer transition-all ${
              activeFormats.bold ? 'bg-[#06080F] text-[#00F090]' : 'hover:bg-white text-[#06080F]'
            }`}
            title="ضخیم (Bold - Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('italic')}
            className={`p-1.5 rounded cursor-pointer transition-all ${
              activeFormats.italic ? 'bg-[#06080F] text-[#00F090]' : 'hover:bg-white text-[#06080F]'
            }`}
            title="مورب (Italic - Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('underline')}
            className={`p-1.5 rounded cursor-pointer transition-all ${
              activeFormats.underline ? 'bg-[#06080F] text-[#00F090]' : 'hover:bg-white text-[#06080F]'
            }`}
            title="زیرخط (Underline - Ctrl+U)"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('strikeThrough')}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="خط خورده (Strikethrough)"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-[#06080F]/20 mx-0.5" />

        {/* Text Alignment */}
        <div className="flex items-center bg-white/70 rounded-lg p-0.5 border border-[#06080F]/10">
          <button
            type="button"
            onClick={() => execCmd('justifyRight')}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="راست‌چین"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyCenter')}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="وسط‌چین"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyLeft')}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="چپ‌چین"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-[#06080F]/20 mx-0.5" />

        {/* Lists */}
        <div className="flex items-center bg-white/70 rounded-lg p-0.5 border border-[#06080F]/10">
          <button
            type="button"
            onClick={() => execCmd('insertUnorderedList')}
            className={`p-1.5 rounded cursor-pointer transition-all ${
              activeFormats.ul ? 'bg-[#06080F] text-[#00F090]' : 'hover:bg-white text-[#06080F]'
            }`}
            title="لیست بالت‌دار (نقطه‌ای)"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('insertOrderedList')}
            className={`p-1.5 rounded cursor-pointer transition-all ${
              activeFormats.ol ? 'bg-[#06080F] text-[#00F090]' : 'hover:bg-white text-[#06080F]'
            }`}
            title="لیست شماره‌دار عددی"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-[#06080F]/20 mx-0.5" />

        {/* Links & Images */}
        <div className="flex items-center bg-white/70 rounded-lg p-0.5 border border-[#06080F]/10">
          <button
            type="button"
            onClick={insertLinkPrompt}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="درج پیوند (Link)"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={insertImagePrompt}
            className="p-1.5 rounded hover:bg-white text-[#06080F] cursor-pointer transition-all"
            title="درج تصویر از طریق URL"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-[#06080F]/20 mx-0.5" />

        {/* Smart Engineering Preset Inserts */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertCustomBlock('callout-green')}
            className="px-2 py-1 rounded-lg bg-[#00F090]/20 hover:bg-[#00F090]/30 text-[#06080F] border border-[#00F090]/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
            title="درج باکس نکته مهندسی سبز"
          >
            <Lightbulb className="w-3.5 h-3.5 text-emerald-800" />
            <span className="hidden sm:inline">نکته مهندسی</span>
          </button>

          <button
            type="button"
            onClick={() => insertCustomBlock('callout-amber')}
            className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-950 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
            title="درج باکس هشدار ایمنی"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">هشدار ایمنی</span>
          </button>

          <button
            type="button"
            onClick={() => insertCustomBlock('specs-table')}
            className="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 text-[#06080F] border border-[#06080F]/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
            title="درج جدول مشخصات فنی"
          >
            <TableIcon className="w-3.5 h-3.5 text-[#06080F]" />
            <span className="hidden sm:inline">جدول مشخصات</span>
          </button>

          <button
            type="button"
            onClick={() => insertCustomBlock('quote')}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#06080F] border border-[#06080F]/20 cursor-pointer transition-all"
            title="درج نقل‌قول"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right end: HTML Code Toggle */}
        <div className="mr-auto flex items-center gap-1">
          <button
            type="button"
            onClick={toggleHtmlMode}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all border ${
              isHtmlMode
                ? 'bg-[#06080F] text-[#00F090] border-[#06080F]'
                : 'bg-white hover:bg-slate-100 text-[#06080F] border-[#06080F]/20'
            }`}
            title="تغییر حالت به ویرایش مستقیم کد HTML"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{isHtmlMode ? 'بازگشت به حالت ورد' : 'کد HTML'}</span>
          </button>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* MAIN DOCUMENT CANVAS (WYSIWYG OR RAW HTML) */}
      {/* ==================================================================== */}
      <div className="relative flex-grow bg-white p-4 sm:p-6" style={{ minHeight }}>
        {isHtmlMode ? (
          <textarea
            value={htmlSource}
            onChange={handleHtmlSourceChange}
            placeholder="کدهای HTML مقاله را وارد کنید..."
            className="w-full h-full min-h-[360px] p-4 font-mono text-xs text-[#06080F] bg-slate-900 text-emerald-400 rounded-xl focus:outline-none resize-y leading-relaxed"
            dir="ltr"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onKeyUp={checkActiveFormats}
            onMouseUp={checkActiveFormats}
            data-placeholder={placeholder}
            className="w-full h-full min-h-[340px] focus:outline-none text-[#06080F] text-sm sm:text-base leading-relaxed selection:bg-[#00F090]/30 selection:text-[#06080F] prose prose-slate max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
            dir="rtl"
          />
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-[#E4EBF1] border-t border-[#06080F]/10 px-4 py-2 flex items-center justify-between text-[11px] text-[#11172C]/70 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F090]" />
          <span>محیط ویرایشگر زنده Word (WYSIWYG)</span>
        </div>
        <div>
          <span>{htmlSource.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length} کلمه</span>
        </div>
      </div>
    </div>
  );
};
