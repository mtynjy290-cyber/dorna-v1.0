# Project Checkpoints & Persistent Instructions

## Checkpoint: Save 1 (سیو ۱)
- **Tag**: `save-1`
- **Created**: 2026-09-05
- **Status**: Stable baseline approved by user.

### Features of Save 1:
1. **Hero Section Architecture**:
   - Scroll height: `200vh` (exact `100vh` scroll travel to pass hero).
   - Fluid typography with high contrast:
     - Title: `clamp(1.5rem, 2.5vw + 1rem, 3rem)`, color `#FFFFFF`, deep text-shadow for maximum readability against video.
     - Subtitle: `clamp(0.9rem, 0.8vw + 0.7rem, 1.2rem)`, color `#E6EFF6`, font-weight 400.
   - Fluid video viewport: `height: clamp(560px, 85vh + 5vw, 100vh)`, `min-height: clamp(520px, 85dvh, 960px)`.
   - Real-time `ResizeObserver` for instant responsive canvas redraw.
2. **Speed & Bandwidth Optimizations**:
   - Adaptive mobile video: streams 71 odd frames on mobile (~3.7MB total) instead of 141 frames (~7.5MB), keeping door motion silky smooth while halving data usage.
   - Code splitting: all below-the-fold components (`LuxuryProjectsShowcase`, `GlassComparisonSlider`, `ArticlesSection`, `TehranDistrictsCoverage`, `Footer`, `QuickInquiryModal`) loaded via `React.lazy()` and `Suspense`.
   - Fonts: streamlined Google Fonts weights in `index.html` (400, 500, 600, 700, 800) to minimize render blocking.
   - All below-the-fold images have `loading="lazy"` and `decoding="async"`.
3. **UI Cleanliness**:
   - Removed the mobile bottom sticky bar (`MobileStickyBar`).

### Restoration Instruction:
Whenever the user says:
- "برگردیم به سیو ۱"
- "برو به سیو 1"
- "Restore to Save 1"
Run:
```bash
git reset --hard save-1 && git clean -fd
```
And then re-verify with `compile_applet` and `restart_dev_server`.
