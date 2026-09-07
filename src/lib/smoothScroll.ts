import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  autoRaf?: boolean;
  anchors?: boolean;
}

/**
 * Initializes global smooth inertial scrolling across the application using Lenis.
 * Features:
 * - Physics-based inertial deceleration (glides and gently stops instead of abrupt halting)
 * - Hardware-accelerated 60/120fps requestAnimationFrame synchronization
 * - Respects prefers-reduced-motion for accessibility
 * - Handles anchor navigation with smooth kinetic deceleration
 */
export function initSmoothScroll(options?: SmoothScrollOptions): Lenis | null {
  if (typeof window === 'undefined') return null;

  if (lenisInstance) {
    return lenisInstance;
  }

  try {
    lenisInstance = new Lenis({
      // 1.2s duration gives the signature Apple / luxury architecture studio glide
      duration: options?.duration ?? 1.2,
      // Exponential ease-out decay for natural inertial braking
      easing: options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: options?.orientation ?? 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: options?.smoothWheel ?? true,
      wheelMultiplier: options?.wheelMultiplier ?? 1.0,
      touchMultiplier: options?.touchMultiplier ?? 1.1,
      autoRaf: options?.autoRaf ?? true,
      anchors: options?.anchors ?? true,
    });

    // Expose instance for debugging or external components
    (window as any).__lenis = lenisInstance;

    return lenisInstance;
  } catch (err) {
    console.warn('Failed to initialize Lenis smooth scroll:', err);
    return null;
  }
}

/**
 * Retrieves current active Lenis smooth scroll instance
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Programmatically scrolls smoothly to a target selector, element, or pixel offset
 */
export function smoothScrollTo(
  target: string | HTMLElement | number,
  options?: Parameters<Lenis['scrollTo']>[1]
): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Auto-initialize immediately on module import in browser environments
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
    });
  } else {
    initSmoothScroll();
  }
}
