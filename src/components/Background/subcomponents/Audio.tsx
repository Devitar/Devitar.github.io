import { AudioListener, Audio, AudioLoader } from "three";
import { useEffect, useRef, useCallback } from "react";
import { useThree } from "@react-three/fiber";

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

/** Plays a given sound. */
const AudioComponent = ({ url, volume = 0.5, isPlaying = true, fadeDuration = 0 }: Props) => {
	const { camera } = useThree();
	const soundRef = useRef<Audio | null>(null);
	const isLoadedRef = useRef(false);
	const hasStartedRef = useRef(false);
	const isPlayingRef = useRef(isPlaying);
	const fadeAnimationRef = useRef<number | null>(null);
	const volumeRef = useRef(volume);

	// Keep refs in sync with props
	useEffect(() => {
		isPlayingRef.current = isPlaying;
	}, [isPlaying]);

	useEffect(() => {
		volumeRef.current = volume;
	}, [volume]);

	/** Set volume instantly using Web Audio API (bypasses Three.js's gradual setTargetAtTime) */
	const setVolumeInstant = useCallback((sound: Audio, value: number) => {
		// Cancel any scheduled changes and set value directly
		sound.gain.gain.cancelScheduledValues(0);
		sound.gain.gain.value = value;
	}, []);

	/** Fade volume from current to target over duration */
	const fadeVolume = useCallback((targetVolume: number, duration: number, onComplete?: () => void) => {
		const sound = soundRef.current;
		if (!sound) return;

		// Cancel any existing fade
		if (fadeAnimationRef.current) {
			cancelAnimationFrame(fadeAnimationRef.current);
		}

		if (duration <= 0) {
			sound.setVolume(targetVolume);
			onComplete?.();
			return;
		}

		const startVolume = sound.getVolume();
		const startTime = performance.now();

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Ease out curve for smoother fade
			const easedProgress = 1 - Math.pow(1 - progress, 2);
			const newVolume = startVolume + (targetVolume - startVolume) * easedProgress;

			sound.setVolume(newVolume);

			if (progress < 1) {
				fadeAnimationRef.current = requestAnimationFrame(animate);
			} else {
				fadeAnimationRef.current = null;
				onComplete?.();
			}
		};

		fadeAnimationRef.current = requestAnimationFrame(animate);
	}, []);

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
			if (fadeAnimationRef.current) {
				cancelAnimationFrame(fadeAnimationRef.current);
			}
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
	}, [isPlaying, fadeDuration, fadeVolume, volume, setVolumeInstant]);

	return null;
}

/** Exports */

export default AudioComponent