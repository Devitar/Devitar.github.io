/**
 * Theme constants - single source of truth for CSS variables and scene colors.
 * CSS variables are injected into :root at runtime.
 * Scene colors are used directly in 3D components.
 */

export const theme = {
  colors: {
    primary: '#8b1e2f',
    primaryDark: '#7a1a29',

    buttonPrimary: '#2d4a4a',
    buttonSecondary: '#4a2d2d',

    textPrimary: '#1a1a1a',
    textBlack: '#000000',
    textWhite: '#ffffff',
    textMuted: '#555555',
    textLight: '#888888',

    bgSky: '#00000d',

    tabActive: '#ece4d5',
    tabBg: '#d4c4a8',
    tabBgHover: '#c4b498',
    tabText: '#5c5347',

    paperBg: '#f8f6f1',
    paperLines: '#c9e1f5',

    tapeLight: 'rgba(255, 248, 220, 0.7)',
    tapeMid: 'rgba(245, 235, 200, 0.6)',
    tapeBorder: 'rgba(200, 180, 140, 0.3)',
  },

  shadows: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.55)',
    darker: 'rgba(0, 0, 0, 0.75)',
    button: 'rgba(0, 0, 0, 0.6)',
  },

  fonts: {
    display: "'Bungee', monospace",
    body: "'Cabin', sans-serif",
    handwritten: "'Caveat', cursive",
  },

  spacing: {
    xs: '0.4rem',
    sm: '0.8rem',
    md: '1.6rem',
    lg: '2.4rem',
    xl: '4rem',
  },

  radius: {
    sm: '0.3rem',
    md: '0.4rem',
    lg: '0.8rem',
    round: '50%',
  },

  transitions: {
    fast: '0.1s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },

  zIndex: {
    background: 0,
    content: 1,
    overlay: 10,
    modal: 100,
  },

  /**
   * Scene colors for 3D components.
   * These are not injected as CSS variables.
   */
  scene: {
    // Book/binder
    bookCover: '#8b1e2f',
    bookPages: '#ece4d5',
    binderRings: '#c0c0c0',

    // Lighting
    readingLight: '#fffaf0',
    ambientLight: '#ffffff',
    directionalSun: '#fffacd',

    // Sky
    sun: '#f2ff39',
    sunGlow: '#ffa500',
    moon: '#ffffff',
    skyDay: '#87CEEB',
    skyNight: '#132d96',

    // Ground & nature
    ground: '#467a05',
    treeFoliage: '#1f7307',
    treeTrunk: '#521d00',

    // Mountains
    mountainRock: '#a89d9e',
    mountainSnow: '#fafcfa',

    // Campfire & wood
    woodDark: '#3d2817',
    woodMedium: '#42301a',
    tent: '#8b4513',
    tentDark: '#7a3d11',

    // Fire
    fireLit: '#dfa811',
    fireUnlit: '#b94712',

    // Objects
    metal: '#555555',
    flashlightBody: '#b8bb00',
    flashlightHead: '#8b8d00',
    flashlightBeam: '#fff8e7',
  },
} as const;

export type Theme = typeof theme;
