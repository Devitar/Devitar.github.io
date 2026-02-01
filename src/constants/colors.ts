import type { ColorPair } from '~/types';

/** Fire/campfire colors */
export const FIRE_COLORS: ColorPair = {
  lit: '#dfa811',
  unlit: '#b94712',
};

/** UI colors */
export const UI_COLORS = {
  maroon: '#8b1e2f',
  wood: {
    dark: '#3d2817',
    medium: '#42301a',
    tent: '#8b4513',
    tentDark: '#7a3d11',
  },
  metal: '#555555',
  flashlight: {
    body: '#b8bb00',
    head: '#8b8d00',
    beam: '#fff8e7',
  },
  sky: {
    day: '#87CEEB',
    night: '#132d96',
  },
  sun: '#f2ff39',
  sunGlow: '#ffa500',
  moon: '#ffffff',
  ground: '#467a05',
  readingLight: '#fffaf0',
} as const;
