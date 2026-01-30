import { useCallback, useEffect, useRef } from "react";

/** Options for the useSound hook */
type UseSoundOptions = {
  /** Volume level (0-1). Defaults to 0.5 */
  volume?: number;
  /** Whether sound is muted */
  isMuted?: boolean;
};

/**
 * Creates an audio element and returns a play function.
 * Use this for click-triggered sounds.
 * If soundPath is undefined, returns a no-op play function.
 */
export function useSound(soundPath?: string, options?: UseSoundOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMuted = options?.isMuted ?? false;
  const volume = options?.volume ?? 0.5;

  useEffect(() => {
    if (soundPath) {
      audioRef.current = new Audio(soundPath);
      audioRef.current.volume = volume;
    }
  }, [soundPath, volume]);

  const play = useCallback(() => {
    if (soundPath && audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore errors from autoplay restrictions
      });
    }
  }, [soundPath, isMuted]);

  return { play };
}

/** Options for the useSoundOnChange hook */
type UseSoundOnChangeOptions<T> = UseSoundOptions & {
  /** Custom condition to determine when to play. Defaults to playing on any change. */
  playWhen?: (prev: T, current: T) => boolean;
};

/**
 * Plays a sound when a tracked value changes (not on initial render).
 * Use this for state-change triggered sounds.
 */
export function useSoundOnChange<T>(
  soundPath: string,
  value: T,
  options?: UseSoundOnChangeOptions<T>
) {
  const { play } = useSound(soundPath, options);
  const prevRef = useRef<T | null>(null);
  // Store playWhen in a ref to avoid triggering the effect when the function reference changes
  const playWhenRef = useRef(options?.playWhen);
  playWhenRef.current = options?.playWhen;

  useEffect(() => {
    const hasChanged = prevRef.current !== null && prevRef.current !== value;
    const shouldPlay = playWhenRef.current
      ? prevRef.current !== null && playWhenRef.current(prevRef.current, value)
      : hasChanged;

    if (shouldPlay) {
      play();
    }
    prevRef.current = value;
  }, [value, play]);
}

export default useSound;
