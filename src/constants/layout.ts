/** Responsive breakpoints */
export const BREAKPOINTS = {
  mobile: 768,
} as const;

/** Animation timing defaults */
export const ANIMATION = {
  /** Default GIF frame interval in ms */
  gifFrameInterval: 50,
  /** Smoke particle duration in seconds */
  smokeDuration: 6,
  /** Smoke particle stagger delays in ms */
  smokeDelays: [0, 2000, 4000] as const,
} as const;

/** Audio defaults */
export const AUDIO = {
  defaultVolume: 0.5,
  fireVolume: 1.5,
  cricketVolume: 0.01,
  ambientVolume: 1.5,
  sasquatchVolume: 0.1,
  fadeDuration: 2000,
} as const;
