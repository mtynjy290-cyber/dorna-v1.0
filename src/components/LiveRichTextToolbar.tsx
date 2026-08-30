import React, { useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Sparkles,
  Table as TableIcon,
  AlertCircle,
  Highlighter,
  Trash2
} from 'lucide-react';

interface LiveRichTextToolbarProps {
  isVisible: boolean;
  onApplyFormat: (command: string, value?: string) => void;
  onInsertSnippet?: (type: 'callout' | 'table' | 'quote') => void;
  onDeleteCurrentBlock?: () => void;
}

export const LiveRichTextToolbar: React.FC<LiveRichTextToolbarProps> = ({
  isVisible,
  onApplyFormat,
  onInsertSnippet,
  onDeleteCurrentBlock,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-3 py-2 rounded-2xl bg-[#06080F]/95 backdrop-blur-xl border border-[#00F090]/40 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,144,0.2)] flex items-center gap-1.5 text-white animate-in fade-in slide-in-from-bottom-4 duration-200"
      dir="rtl"
    >
      <div className="flex items-center gap-1 pl-2 border-l border-white/15">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onApplyFormat('bold');
          }}
          className="w-8 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] flex items-center justify-center transition-colors cursor-pointer"
          title="ضخیم (Bold)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onApplyFormat('italic');
          }}
          className="w-8 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] flex items-center justify-center transition-colors cursor-pointer"
          title="مورب (Italic)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onApplyFormat('underline');
          }}
          className="w-8 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] flex items-center justify-center transition-colors cursor-pointer"
          title="زیرخط (Underline)"
        >
          <Underline className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 pl-2 border-l border-white/15">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onApplyFormat('formatBlock', 'h2');
          }}
          className="px-2 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] text-xs font-black flex items-center justify-center transition-colors cursor-pointer"
          title="تیتر اصلی بخش (H2)"
        >
          <Heading2 className="w-4 h-4 mr-0.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onApplyFormat('formatBlock', 'h3');
          }}
          className="px-2 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] text-xs font-black flex items-center justify-center transition-colors cursor-pointer"
          title="زیرتیتر (H3)"
        >
          <Heading3 className="w-4 h-4 mr-0.5" />
        </button>
      </div>

      <div className="flex items-center gap-1 pl-2 border-l border-white/15">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onApplyFormat('insertUnorderedList');
          }}
          className="w-8 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] flex items-center justify-center transition-colors cursor-pointer"
          title="لیست بالت‌دار"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onApplyFormat('insertOrderedList');
          }}
          className="w-8 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] flex items-center justify-center transition-colors cursor-pointer"
          title="لیست شماره‌دار"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            const url = prompt('آدرس اینترنتی پیوند را وارد کنید:', 'https://');
            if (url) {
              onApplyFormat('createLink', url);
            }
          }}
          className="w-8 h-8 rounded-lg hover:bg-white/10 active:bg-[#00F090] active:text-[#06080F] flex items-center justify-center transition-colors cursor-pointer"
          title="درج پیوند (Link)"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {onInsertSnippet && (
          <>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onInsertSnippet('callout');
              }}
              className="px-2 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] font-bold text-[#00F090] flex items-center gap-1 transition-colors cursor-pointer"
              title="درج باکس نکته مهندسی"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>باکس نکته</span>
            </button>

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onInsertSnippet('table');
              }}
              className="px-2 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] font-bold text-white flex items-center gap-1 transition-colors cursor-pointer"
              title="درج جدول مشخصات فنی"
            >
              <TableIcon className="w-3.5 h-3.5 text-[#00F090]" />
              <span>جدول</span>
            </button>
          </>
        )}

        {onDeleteCurrentBlock && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              onDeleteCurrentBlock();
            }}
            className="px-2.5 h-8 rounded-lg bg-rose-600/30 hover:bg-rose-600/60 text-[11px] font-bold text-rose-300 border border-rose-500/40 flex items-center gap-1 transition-colors cursor-pointer mr-1"
            title="حذف باکس یا جدول انتخابی زیر نشانگر"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>حذف بخش/جدول</span>
          </button>
        )}
      </div>
    </div>
  );
};
