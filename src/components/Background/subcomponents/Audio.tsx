import { AudioListener, Audio, AudioLoader } from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/** Types */

type Props = {
    /** URL of the audio file to play. */
    url: string;
};

/** Plays a given sound. */
const AudioComponent = ({ url }: Props) => {
    const { camera } = useThree();
    useEffect(() => {
        const listener = new AudioListener();
        camera.add(listener);

        const sound = new Audio(listener);

        const playSound = () => {
            if (!sound.isPlaying) sound.play();
        };

        const audioLoader = new AudioLoader();
        audioLoader.load(url, (buffer) => {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            
            window.addEventListener('click', playSound);
            window.addEventListener('keydown', playSound);
            window.addEventListener('touchstart', playSound);
        });

        // Clean up events on unmount
        return () => {
            window.removeEventListener('click', playSound);
            window.removeEventListener('keydown', playSound);
            window.removeEventListener('touchstart', playSound);
        };
    }, []);

    return null;
}

/** Exports */

export default AudioComponent