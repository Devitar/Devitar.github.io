import { AudioListener, Audio, AudioLoader } from 'three';
import { useEffect, useRef, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

/** Types */

type Props = {
  /** URL of the audio file to play. */
  url: string;
  /** Volume of the audio. */
  volume?: number;
  /** Whether the audio should be playing. */
  isPlaying?: boolean;
  /** Duration of fade in/out in milliseconds. Set to 0 for no fade. */
  fadeDuration?: number;
};

type FadeState = {
  startVolume: number;
  targetVolume: number;
  startTime: number;
  duration: number;
  onComplete?: () => void;
};

/** Plays a given sound. */
const GlobalAudio = ({ url, volume = 0.5, isPlaying = true, fadeDuration = 0 }: Props) => {
  const { camera } = useThree();
  const soundRef = useRef<Audio | null>(null);
  const isLoadedRef = useRef(false);
  const hasStartedRef = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  const fadeStateRef = useRef<FadeState | null>(null);
  const volumeRef = useRef(volume);

  // Keep refs in sync with props
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    volumeRef.current = volume;
    // Cancel any ongoing fade so it doesn't override the new volume
    fadeStateRef.current = null;
    // Apply volume change to currently playing audio
    if (soundRef.current && isLoadedRef.current && hasStartedRef.current) {
      soundRef.current.setVolume(volume);
    }
  }, [volume]);

  /** Set volume instantly using Web Audio API (bypasses Three.js's gradual setTargetAtTime) */
  const setVolumeInstant = useCallback((sound: Audio, value: number) => {
    sound.gain.gain.cancelScheduledValues(0);
    sound.gain.gain.value = value;
  }, []);

  /** Start a fade from the current volume to the target over the given duration. */
  const fadeVolume = useCallback(
    (targetVolume: number, duration: number, onComplete?: () => void) => {
      const sound = soundRef.current;
      if (!sound) return;

      if (duration <= 0) {
        sound.setVolume(targetVolume);
        onComplete?.();
        return;
      }

      fadeStateRef.current = {
        startVolume: sound.getVolume(),
        targetVolume,
        startTime: performance.now(),
        duration,
        onComplete,
      };
    },
    []
  );

  // Drive active fades from the R3F render loop instead of a separate rAF.
  useFrame(() => {
    const fade = fadeStateRef.current;
    const sound = soundRef.current;
    if (!fade || !sound) return;

    const elapsed = performance.now() - fade.startTime;
    const progress = Math.min(elapsed / fade.duration, 1);
    // Ease out curve for smoother fade
    const easedProgress = 1 - Math.pow(1 - progress, 2);
    const newVolume = fade.startVolume + (fade.targetVolume - fade.startVolume) * easedProgress;

    sound.setVolume(newVolume);

    if (progress >= 1) {
      const onComplete = fade.onComplete;
      fadeStateRef.current = null;
      onComplete?.();
    }
  });

  useEffect(() => {
    const listener = new AudioListener();
    camera.add(listener);

    const sound = new Audio(listener);
    soundRef.current = sound;

    const audioLoader = new AudioLoader();
    audioLoader.load(url, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      isLoadedRef.current = true;
    });

    // One-time click handler to start audio after user interaction (for browser autoplay restrictions)
    const handleFirstClick = () => {
      if (!hasStartedRef.current && isLoadedRef.current) {
        hasStartedRef.current = true;
        // Only play if isPlaying prop is true
        if (isPlayingRef.current && !sound.isPlaying) {
          // Set volume instantly before play to avoid loud burst
          setVolumeInstant(sound, fadeDuration > 0 ? 0 : volumeRef.current);
          sound.play();
          if (fadeDuration > 0) {
            fadeVolume(volumeRef.current, fadeDuration);
          }
        }
      }
    };

    document.addEventListener('click', handleFirstClick, { once: true });

    // Clean up on unmount
    return () => {
      document.removeEventListener('click', handleFirstClick);
      fadeStateRef.current = null;
      if (sound.isPlaying) {
        sound.stop();
      }
    };
  }, [camera, url, fadeDuration, fadeVolume, setVolumeInstant]);

  useEffect(() => {
    if (!soundRef.current || !isLoadedRef.current || !hasStartedRef.current) return;

    if (isPlaying) {
      if (!soundRef.current.isPlaying) {
        // Set volume instantly before play to avoid loud burst
        setVolumeInstant(soundRef.current, fadeDuration > 0 ? 0 : volume);
        soundRef.current.play();
        if (fadeDuration > 0) {
          fadeVolume(volume, fadeDuration);
        }
      }
    } else {
      if (soundRef.current.isPlaying) {
        if (fadeDuration > 0) {
          fadeVolume(0, fadeDuration, () => {
            soundRef.current?.pause();
          });
        } else {
          soundRef.current.pause();
        }
      }
    }
  }, [fadeDuration, fadeVolume, isPlaying, setVolumeInstant, volume]);

  return null;
};

/** Exports */

export default GlobalAudio;
