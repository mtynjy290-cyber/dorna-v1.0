import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Sparkles, Calculator, PhoneCall } from 'lucide-react';
import { useSiteContentStore } from '../lib/siteContentStore';

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenInquiry?: () => void;
}

const TOTAL_FRAMES = 141;

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const heroContent = useSiteContentStore((state) => state.hero);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // 1. Precise Track of Section Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring motion for buttery responsive frame interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.1,
    restDelta: 0.0001,
  });

  // Smooth fade/depth transitions for foreground content during scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 0.95], [1, 0.85, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  // 2. High-Performance Instant Image Sequence Preloader & Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES + 1);
    let currentRenderedIndex = -1;
    let isComponentMounted = true;
    let rafId: number;

    // Helper: Draw image on canvas with 'object-fit: cover'
    const drawCoverImage = (img: HTMLImageElement) => {
      if (!ctx || !canvas || !img || !img.complete || !img.naturalWidth) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const iWidth = img.naturalWidth;
      const iHeight = img.naturalHeight;

      const scale = Math.max(cWidth / iWidth, cHeight / iHeight);
      const renderW = iWidth * scale;
      const renderH = iHeight * scale;
      const offsetX = (cWidth - renderW) / 2;
      const offsetY = (cHeight - renderH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    // Resize canvas with high-DPI awareness
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const frameIdx = currentRenderedIndex > 0 ? currentRenderedIndex : 1;
      if (images[frameIdx] && images[frameIdx].complete) {
        drawCoverImage(images[frameIdx]);
      }
    };

    // 1. Instant First Frame Load (Zero Waiting)
    const firstImg = new Image();
    firstImg.src = '/video/frames/frame_001.webp';
    images[1] = firstImg;

    firstImg.onload = () => {
      if (!isComponentMounted) return;
      setFirstFrameLoaded(true);
      handleResize();
      drawCoverImage(firstImg);
      currentRenderedIndex = 1;
    };

    if (firstImg.complete) {
      setFirstFrameLoaded(true);
      handleResize();
      drawCoverImage(firstImg);
      currentRenderedIndex = 1;
    }

    // 2. Preload remaining frames in background
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/video/frames/frame_${paddedIndex}.webp`;
      images[i] = img;
    }

    // 3. Continuous 60fps / 120fps ultra-fast canvas render loop
    const renderLoop = () => {
      const progress = smoothProgress.get();
      // Calculate active frame index (1 to 141)
      const targetIndex = Math.min(
        Math.max(Math.round(progress * (TOTAL_FRAMES - 1)) + 1, 1),
        TOTAL_FRAMES
      );

      if (targetIndex !== currentRenderedIndex) {
        const targetImg = images[targetIndex];
        if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
          drawCoverImage(targetImg);
          currentRenderedIndex = targetIndex;
        } else {
          // Fallback to nearest loaded frame to guarantee zero flicker
          for (let offset = 1; offset <= 10; offset++) {
            const prev = images[targetIndex - offset];
            if (prev && prev.complete && prev.naturalWidth > 0) {
              drawCoverImage(prev);
              break;
            }
            const next = images[targetIndex + offset];
            if (next && next.complete && next.naturalWidth > 0) {
              drawCoverImage(next);
              break;
            }
          }
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('resize', handleResize);
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMounted = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [smoothProgress]);

  return (
    <div ref={containerRef} id="hero-section" className="relative h-[320vh] bg-[#E4EBF1] isolate">
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* GPU-Accelerated 2D Canvas Viewport (Zero Lag, Instant Load, 60/120fps) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transform-gpu will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />

        {/* Hero Content Overlay */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4 py-8 pointer-events-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CBD8E2]/85 backdrop-blur-xs border border-[#06080F]/10 text-[#06080F] text-xs font-bold shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#00F090]" />
            <span>{heroContent.badgeText || 'سیستم‌های هوشمند درب اتوماتیک و سازه‌های شیشه‌ای'}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#06080F] tracking-tight leading-[1.3] max-w-4xl mx-auto"
          >
            {heroContent.headline || 'تلاقی شیشه، نور و مهندسی مدرن'}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#11172C] max-w-2xl mx-auto leading-relaxed"
          >
            طراحی، تولید و اجرای تخصصی انواع درب‌های اتوماتیک شیشه‌ای، تلسکوپی، کرو و سازه‌های لوکس معماری در مناطق ۱ تا ۵ تهران
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href={heroContent.ctaPrimaryLink || 'calculator.html'}
              id="btn-hero-calc"
              className="px-8 py-4 rounded-xl bg-[#00F090] text-[#06080F] font-black text-sm hover:bg-[#00F090]/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              <span>{heroContent.ctaPrimaryText || 'محاسبه آنلاین قیمت'}</span>
            </a>

            <button
              onClick={onOpenInquiry}
              id="btn-hero-inquiry"
              className="px-8 py-4 rounded-xl bg-[#06080F] text-[#00F090] border border-[#00F090]/30 font-bold text-sm hover:bg-[#06080F]/90 transition-all shadow-md hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5" />
              <span>{heroContent.ctaSecondaryText || 'مشاوره و استعلام پروژه'}</span>
            </button>
          </motion.div>

          {/* Quick Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="bg-[#CBD8E2]/65 border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">۵ سال</span>
              <span className="text-[11px] text-[#11172C]">گارانتی بی‌قیدوشرط</span>
            </div>
            <div className="bg-[#CBD8E2]/65 border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">دانکر آلمان</span>
              <span className="text-[11px] text-[#11172C]">موتورهای براشلس اصلی</span>
            </div>
            <div className="bg-[#CBD8E2]/65 border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">۱۰ میل</span>
              <span className="text-[11px] text-[#11172C]">سکوریت سوپرکلیر</span>
            </div>
            <div className="bg-[#CBD8E2]/65 border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">مناطق ۱ تا ۵</span>
              <span className="text-[11px] text-[#11172C]">کارشناسی و اعزام فوری</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};


