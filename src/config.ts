export const ANIMATION_CONFIG = {
  // Title animation
  titleFadeInDuration: 30,
  titleScaleFrom: 0.8,
  titleScaleTo: 1,
  
  // Ranking row animation
  rowStartDelay: 60,
  rowStaggerDelay: 20,
  rowFadeInDuration: 20,
  rowSlideDistance: -50,
  rowScaleFrom: 0.8,
  rowScaleTo: 1,
  rowSlideDuration: 40,
  rowScaleDuration: 30,
} as const;

export const STYLE_CONFIG = {
  // Colors
  backgroundColor: '#1a1a1a',
  overlayGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
  rankColors: ['#FFD700', '#C0C0C0', '#CD7F32'], // Gold, Silver, Bronze
  defaultTextColor: '#ffffff',
  
  // Typography
  titleFontSize: 80,
  rankFontSize: 60,
  nameFontSize: 48,
  valueFontSize: 56,
  
  // Layout
  titleTop: 80,
  contentTop: 250,
  contentPadding: {
    left: 200,
    right: 200,
    bottom: 100,
  },
  rowPadding: '20px 40px',
  rowMarginBottom: 30,
  rowBorderRadius: 10,
} as const;