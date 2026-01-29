import { useGifTexture } from "~/utils";
import fireGif from "~/assets/images/fire.gif";
import { useEffect, useRef } from "react";

/** Assets */

import FireOutSound from "~/assets/sounds/fire_sizzle.m4a";

/** Types */

type Props = {
  position: [number, number, number];
  isVisible?: boolean;
  isMuted?: boolean;
}

/** A sprite that displays an animated fire GIF. */
const FireSprite = ({ position, isVisible = true, isMuted = false }: Props) => {
  const texture = useGifTexture(fireGif, 50)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isFirstRender = useRef(true);
  
    useEffect(() => {
      audioRef.current = new Audio(FireOutSound);
      audioRef.current.volume = 0.5;
    }, []);
  
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
  
      if (audioRef.current && !isVisible && !isMuted) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Ignore errors from autoplay restrictions
        });
      }
    }, [isVisible, isMuted]);

  if (!texture || !isVisible) return null;

  return (
    <sprite position={position} scale={[0.2, 0.25, 0.1]}>
      <spriteMaterial map={texture} transparent sizeAttenuation={false} depthTest />
    </sprite>
  )
}

/** Exports */

export default FireSprite;