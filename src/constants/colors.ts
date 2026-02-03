import type { ColorPair } from '~/types';
import { theme } from '~/theme';

/**
 * Fire/campfire colors.
 * Re-exported from theme for backward compatibility.
 */
export const FIRE_COLORS: ColorPair = {
  lit: theme.scene.fireLit,
  unlit: theme.scene.fireUnlit,
};
