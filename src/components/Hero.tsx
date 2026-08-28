import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { Sparkles, Calculator, PhoneCall } from 'lucide-react';
import { useSiteContentStore } from '../lib/siteContentStore';

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenInquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const heroContent = useSiteContentStore((state) => state.hero);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // 1. Track Scroll Progress inside Hero Section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 2. Physics Spring for Ultra-Smooth Playback Interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    mass: 0.08,
    restDelta: 0.0001,
  });

  // 3. Initialize video metadata & prepare playback sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      if (video.duration && !isNaN(video.duration)) {
        const currentProgress = smoothProgress.get();
        video.currentTime = currentProgress * video.duration;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    }

    // Direct frame render request loop with micro-lerp to ensure 60fps buttery smooth sub-frame movement
    let rafId: number;
    let targetTime = 0;

    const renderLoop = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const latest = smoothProgress.get();
        targetTime = Math.min(Math.max(latest * video.duration, 0), video.duration);
        
        const delta = targetTime - video.currentTime;
        if (Math.abs(delta) > 0.001) {
          // Smooth micro-step towards target position
          video.currentTime += delta * 0.25;
        }
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [smoothProgress]);

  // 4. Synchronize video frame directly on value change
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const target = Math.min(Math.max(latest * video.duration, 0), video.duration);
      if (Math.abs(video.currentTime - target) > 0.08) {
        video.currentTime = target;
      }
    }
  });

  return (
    <div ref={containerRef} id="hero-section" className="relative h-[1200vh] bg-[#E4EBF1]">
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video Layer - 100% Crisp & Clear without White Veil */}
        <video
          ref={videoRef}
          src="/video/hero-scroll.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-500"
          style={{ opacity: isVideoLoaded ? 1 : 0 }}
        />

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4 py-8 pointer-events-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CBD8E2]/85 backdrop-blur-md border border-[#06080F]/10 text-[#06080F] text-xs font-bold shadow-xs"
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
            <div className="bg-[#CBD8E2]/65 backdrop-blur-sm border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">۵ سال</span>
              <span className="text-[11px] text-[#11172C]">گارانتی بی‌قیدوشرط</span>
            </div>
            <div className="bg-[#CBD8E2]/65 backdrop-blur-sm border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">دانکر آلمان</span>
              <span className="text-[11px] text-[#11172C]">موتورهای براشلس اصلی</span>
            </div>
            <div className="bg-[#CBD8E2]/65 backdrop-blur-sm border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">۱۰ میل</span>
              <span className="text-[11px] text-[#11172C]">سکوریت سوپرکلیر</span>
            </div>
            <div className="bg-[#CBD8E2]/65 backdrop-blur-sm border border-[#06080F]/10 rounded-xl p-3 text-center shadow-xs">
              <span className="block text-lg font-black text-[#06080F]">مناطق ۱ تا ۵</span>
              <span className="text-[11px] text-[#11172C]">کارشناسی و اعزام فوری</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

