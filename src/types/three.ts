/** A 3D position/rotation/scale tuple [x, y, z] */
export type Vector3 = [number, number, number];

/** A color pair for lit/unlit states */
export type ColorPair = {
  lit: string;
  unlit: string;
};

/** Sound configuration for interactive components */
export type SoundConfig = {
  soundPath: string;
  volume?: number;
};
