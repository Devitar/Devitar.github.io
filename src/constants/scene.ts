import type { Vector3 } from '~/types';

/** Campfire scene positions */
export const CAMPFIRE = {
  position: [0, 0.01, 2.73] as Vector3,
  fireSprite: [0, 0.025, 2.73] as Vector3,
  smoke: [0, -0.1, 2.73] as Vector3,
  flickeringLight: [0, 0.03, 2.73] as Vector3,
};

/** Book/journal positions */
export const BOOK = {
  restPosition: [0.13, 0.025, 2.6] as Vector3,
  restRotation: [-Math.PI / 8, 0, 0.05] as Vector3,
  restScale: 0.3,
};

/** Flashlight default transform */
export const FLASHLIGHT = {
  position: [0.05, 0.06, 2.515] as Vector3,
  rotation: [-1.3446253347470072, -0.1497907014217364, -0.30376392625385] as Vector3,
  scale: [0.57, 0.57, 0.57] as Vector3,
};

/** Sasquatch positions */
export const SASQUATCH = {
  desktop: [0.3, 0.075, 2.15] as Vector3,
  mobile: [0.15, 0.05, 2.15] as Vector3,
  scale: [0.15, 0.15, 1] as Vector3,
};

/** Camera settings */
export const CAMERA = {
  desktop: {
    position: [0.21, 0.03, 3.04] as Vector3,
    rotation: [0.27925268031909284, 0.13962634015954653, 0] as Vector3,
    fov: 50,
  },
  mobile: {
    position: [0.075, 0.03, 3] as Vector3,
    rotation: [0.1, 0.125, 0] as Vector3,
    fov: 60,
    baseHeight: 0.03,
  },
};

/** Skybox positions */
export const SKYBOX = {
  celestialX: 0.1,
  moonZ: -0.59,
  sunZ: -0.6,
  skyZ: -0.67,
  celestialY: {
    visible: 2.24,
    hidden: -0.5,
  },
};
