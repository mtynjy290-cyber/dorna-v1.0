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

  // Camera Pass-Through Zoom & Forward Motion as doors open (0.65 -> 1.0)
  const canvasScale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 1.18]);
  const passThroughGlowOpacity = useTransform(scrollYProgress, [0.65, 0.92, 1], [0, 0.6, 0.9]);
  const heroFadeOut = useTransform(scrollYProgress, [0.88, 1], [1, 0.2]);

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

    // Helper: Draw single unified high-definition full-screen frame (Cover mode)
    const drawCoverImage = (img: HTMLImageElement) => {
      if (!ctx || !canvas || !img || !img.complete || !img.naturalWidth) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const iWidth = img.naturalWidth;
      const iHeight = img.naturalHeight;

      // Clean single cover scaling - fills viewport seamlessly with zero letterboxing
      const scale = Math.max(cWidth / iWidth, cHeight / iHeight);
      const renderW = iWidth * scale;
      const renderH = iHeight * scale;
      const offsetX = (cWidth - renderW) / 2;
      const offsetY = (cHeight - renderH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
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
    firstImg.decoding = 'async';
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

    // 2. Intelligent Progressive Background Preloader
    // Load keyframes first (every 8 frames) for immediate responsive scrubbing, then fill remaining frames in idle chunks
    const keyframeIndices: number[] = [];
    const remainingIndices: number[] = [];

    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      if (i % 8 === 0 || i === TOTAL_FRAMES) {
        keyframeIndices.push(i);
      } else {
        remainingIndices.push(i);
      }
    }

    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (images[idx] && images[idx].complete) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = 'async';
        const paddedIndex = String(idx).padStart(3, '0');
        img.src = `/video/frames/frame_${paddedIndex}.webp`;
        img.onload = () => {
          if (isComponentMounted) images[idx] = img;
          resolve();
        };
        img.onerror = () => resolve();
        images[idx] = img;
      });
    };

    // Load keyframes in small batches to preserve network bandwidth for above-the-fold assets
    let chunkTimer: any = null;
    const processBatch = (queue: number[], batchSize: number, delayMs: number) => {
      if (!isComponentMounted || queue.length === 0) return;
      const currentBatch = queue.splice(0, batchSize);
      currentBatch.forEach((idx) => loadSingleFrame(idx));

      if (queue.length > 0) {
        chunkTimer = setTimeout(() => {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => processBatch(queue, batchSize, delayMs), { timeout: 150 });
          } else {
            processBatch(queue, batchSize, delayMs);
          }
        }, delayMs);
      }
    };

    // Start keyframe loading after initial paint (50ms delay)
    setTimeout(() => {
      processBatch(keyframeIndices, 4, 30);
      // Once keyframes are on their way, stream remaining frames smoothly
      setTimeout(() => {
        processBatch(remainingIndices, 6, 40);
      }, 200);
    }, 50);

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
          // If current frame is not yet loaded, actively load it immediately
          if (!targetImg) {
            loadSingleFrame(targetIndex);
          }

          // Fallback to nearest loaded frame to guarantee zero flicker
          for (let offset = 1; offset <= 15; offset++) {
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

    window.addEventListener('resize', handleResize, { passive: true });

    // Precise ResizeObserver for seamless fluid resizing
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas) {
      resizeObserver.observe(canvas);
    }

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMounted = false;
      if (chunkTimer) clearTimeout(chunkTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [smoothProgress]);

  return (
    <div ref={containerRef} id="hero-section" className="relative h-[320vh] bg-[#06080F] isolate">
      {/* Sticky Fullscreen / Fluid Viewport */}
      <motion.div 
        style={{ 
          opacity: heroFadeOut,
          height: 'clamp(560px, 85vh + 5vw, 100vh)',
          minHeight: 'clamp(520px, 85dvh, 960px)',
        }}
        className="hero-video-container sticky top-0 w-full flex items-center justify-center overflow-hidden"
      >
        {/* GPU-Accelerated 2D Canvas Viewport (Zero Lag, Instant Load, 60/120fps with Pass-Through Zoom) */}
        <motion.canvas
          ref={canvasRef}
          style={{ scale: canvasScale }}
          className="hero-video-canvas absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transform-gpu will-change-transform origin-center"
        />

        {/* Ambient Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080F]/65 via-[#06080F]/20 to-[#06080F]/80 pointer-events-none z-[1]" />

        {/* Cinematic Doorway Pass-Through Light Bloom (Emerges as doors slide fully open) */}
        <motion.div 
          style={{ opacity: passThroughGlowOpacity }}
          className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_at_center,rgba(0,240,144,0.18)_0%,rgba(203,216,226,0.15)_40%,transparent_75%)] backdrop-blur-[2px]"
        />

        {/* Hero Content Overlay (Aligned to 12-Column Grid System: 80px Margins, 24px Gutter) */}
        <div 
          style={{
            paddingTop: 'clamp(2.5rem, 6vh + 1rem, 6rem)',
            paddingBottom: 'clamp(2.5rem, 6vh + 1rem, 6rem)',
          }}
          className="hero-video-content relative z-10 grid-container-12 pointer-events-auto"
        >
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2 text-center space-y-8 sm:space-y-10">
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.4,
                  letterSpacing: '-0.03em',
                }}
                className="hero-title text-white max-w-4xl mx-auto drop-shadow-md text-[clamp(1.5rem,2.5vw+1rem,3rem)] font-[800] leading-[1.4] tracking-[-0.03em]"
              >
                {heroContent.headline || 'تلاقی شیشه، نور و مهندسی مدرن'}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontSize: 'clamp(0.9rem, 0.8vw + 0.7rem, 1.2rem)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  opacity: 0.9,
                }}
                className="hero-subtitle text-[#CBD8E2] max-w-2xl mx-auto drop-shadow-xs text-[clamp(0.9rem,0.8vw+0.7rem,1.2rem)] font-[300] leading-[1.8] opacity-90"
              >
                طراحی، مهندسی و اجرای تخصصی انواع درب‌های اتوماتیک شیشه‌ای، تلسکوپی، کرو و سازه‌های مدرن معماری در سراسر تهران و کشور
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-5 pt-6 sm:pt-8"
              >
                <a
                  href="/calculator"
                  id="btn-hero-calc"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/calculator';
                  }}
                  className="px-8 py-4 rounded-xl bg-[#00F090] text-[#06080F] font-black text-sm hover:bg-[#00F090]/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2.5 cursor-pointer relative z-30 pointer-events-auto"
                >
                  <Calculator className="w-5 h-5" />
                  <span>{heroContent.ctaPrimaryText || 'محاسبه آنلاین قیمت'}</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenInquiry}
                  id="btn-hero-inquiry"
                  className="px-8 py-4 rounded-xl bg-[#06080F]/85 text-[#00F090] border border-[#00F090]/40 backdrop-blur-md font-bold text-sm hover:bg-[#06080F] transition-all shadow-lg hover:scale-[1.02] flex items-center gap-2.5 cursor-pointer relative z-30 pointer-events-auto"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>{heroContent.ctaSecondaryText || 'مشاوره و استعلام پروژه'}</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


