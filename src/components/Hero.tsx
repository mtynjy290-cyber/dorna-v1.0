import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Calculator, PhoneCall } from 'lucide-react';
import { useSiteContentStore } from '../lib/siteContentStore';

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenInquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const heroContent = useSiteContentStore((state) => state.hero);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // 1. Precise Track of Section Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring motion for buttery responsive frame interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.1,
    restDelta: 0.0001,
  });

  // Camera Pass-Through Zoom & Forward Motion as doors open (0.65 -> 1.0)
  const videoScale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 1.18]);
  const passThroughGlowOpacity = useTransform(scrollYProgress, [0.65, 0.92, 1], [0, 0.6, 0.9]);
  const heroFadeOut = useTransform(scrollYProgress, [0.88, 1], [1, 0.2]);

  // 2. Hardware-Accelerated Video Scrubbing Engine (Instant 0-Lag Seeking)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isComponentMounted = true;
    let rafId: number;
    let lastSetTime = 0;
    const duration = 5.875; // exact duration of hero-scroll.mp4

    // Prepare video element for instant low-latency scrubbing
    video.pause();

    const handleLoaded = () => {
      if (!isComponentMounted) return;
      setVideoReady(true);
      video.pause();
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('canplay', handleLoaded);

    if (video.readyState >= 1) {
      setVideoReady(true);
    }

    // High-frequency, lock-protected video scrubbing
    const renderLoop = () => {
      if (!isComponentMounted) return;

      const progress = smoothProgress.get();
      const currentDuration = video.duration && !isNaN(video.duration) && video.duration > 0
        ? video.duration
        : duration;

      const targetTime = Math.min(Math.max(progress * currentDuration, 0), currentDuration);

      // Only seek if hardware decoder is idle and time delta is noticeable (> 0.015s)
      if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.015) {
        lastSetTime = targetTime;
        video.currentTime = targetTime;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    // When hardware seek finishes, catch up immediately if user scrolled further during seek
    const handleSeeked = () => {
      if (!isComponentMounted) return;
      const progress = smoothProgress.get();
      const currentDuration = video.duration && !isNaN(video.duration) && video.duration > 0
        ? video.duration
        : duration;
      const targetTime = Math.min(Math.max(progress * currentDuration, 0), currentDuration);

      if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.02) {
        lastSetTime = targetTime;
        video.currentTime = targetTime;
      }
    };

    video.addEventListener('seeked', handleSeeked);
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMounted = false;
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('canplay', handleLoaded);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [smoothProgress]);

  return (
    <div ref={containerRef} id="hero-section" className="relative h-[200vh] bg-[#06080F] isolate">
      {/* Sticky Fullscreen / Fluid Viewport */}
      <motion.div 
        style={{ 
          opacity: heroFadeOut,
          height: 'clamp(560px, 85vh + 5vw, 100vh)',
          minHeight: 'clamp(520px, 85dvh, 960px)',
        }}
        className="hero-video-container sticky top-0 w-full flex items-center justify-center overflow-hidden"
      >
        {/* Instant Fallback Poster (Zero Waiting / 0ms First Paint) */}
        <img
          src="/video/frames/frame_001.webp"
          alt="Dorna Door Automatic Glass Architecture"
          width="1876"
          height="1024"
          fetchPriority="high"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-500 ${
            videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Ultra-Fast Single MP4 Video (GPU Accelerated Scrubbing, 750KB instead of 7.5MB) */}
        <motion.video
          ref={videoRef}
          src="/video/hero-scroll.mp4"
          poster="/video/frames/frame_001.webp"
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          style={{ scale: videoScale }}
          className="hero-video-player absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transform-gpu will-change-transform origin-center"
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
                  color: '#FFFFFF',
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 4px 28px rgba(6, 8, 15, 0.9), 0 1px 3px rgba(0, 0, 0, 1)',
                }}
                className="hero-title text-white max-w-4xl mx-auto drop-shadow-xl font-[800] leading-[1.4] tracking-[-0.03em]"
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
                  fontWeight: 400,
                  lineHeight: 1.8,
                  opacity: 0.96,
                  color: '#E6EFF6',
                  textShadow: '0 1px 8px rgba(0, 0, 0, 0.8), 0 2px 16px rgba(6, 8, 15, 0.65)',
                }}
                className="hero-subtitle text-[#E6EFF6] max-w-2xl mx-auto drop-shadow-md font-[400] leading-[1.8] opacity-95"
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
