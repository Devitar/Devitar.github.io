import { AudioListener, Audio, AudioLoader } from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

/** Types */

type Props = {
	/** URL of the audio file to play. */
	url: string;
	/** Volume of the audio. */
	volume?: number;
	/** Whether the audio should be playing. */
	isPlaying?: boolean;
};

/** Plays a given sound. */
const AudioComponent = ({ url, volume = 0.5, isPlaying = true }: Props) => {
	const { camera } = useThree();
	const soundRef = useRef<Audio | null>(null);
	const isLoadedRef = useRef(false);
	const hasStartedRef = useRef(false);

	useEffect(() => {
		const listener = new AudioListener();
		camera.add(listener);

		const sound = new Audio(listener);
		soundRef.current = sound;

		const audioLoader = new AudioLoader();
		audioLoader.load(url, (buffer) => {
			sound.setBuffer(buffer);
			sound.setLoop(true);
			sound.setVolume(volume);
			isLoadedRef.current = true;
		});

		// One-time click handler to start audio after user interaction (for browser autoplay restrictions)
		const handleFirstClick = () => {
			if (!hasStartedRef.current && isLoadedRef.current) {
				hasStartedRef.current = true;
				// Trigger the isPlaying effect by checking current state
				if (!sound.isPlaying) {
					sound.play();
				}
			}
		};

		document.addEventListener('click', handleFirstClick, { once: true });

		// Clean up on unmount
		return () => {
			document.removeEventListener('click', handleFirstClick);
			if (sound.isPlaying) {
				sound.stop();
			}
		};
	}, [camera, url]);

	useEffect(() => {
		if (!soundRef.current || !isLoadedRef.current || !hasStartedRef.current) return;

		if (isPlaying) {
			if (!soundRef.current.isPlaying) {
				soundRef.current.play();
			}
		} else {
			if (soundRef.current.isPlaying) {
				soundRef.current.pause();
			}
		}
	}, [isPlaying]);

	return null;
}

/** Exports */

export default AudioComponent