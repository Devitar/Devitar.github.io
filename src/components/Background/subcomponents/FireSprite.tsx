import { useGifTexture } from "~/utils";
import fireGif from "~/assets/images/fire.gif";
import { useEffect, useRef } from "react";

/** Assets */

import FlashlightSound from "~/assets/sounds/fire_sizzle.m4a";

/** Types */

type Props = {
  position: [number, number, number];
  isVisible?: boolean;
}

/** A sprite that displays an animated fire GIF. */
const FireSprite = ({ position, isVisible = true }: Props) => {
  const texture = useGifTexture(fireGif, 50)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isFirstRender = useRef(true);
  
    useEffect(() => {
      audioRef.current = new Audio(FlashlightSound);
      audioRef.current.volume = 0.5;
    }, []);
  
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
  
      if (audioRef.current && !isVisible) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Ignore errors from autoplay restrictions
        });
      }
    }, [isVisible]);

  if (!texture || !isVisible) return null;

  return (
    <sprite position={position} scale={[0.2, 0.25, 0.1]}>
      <spriteMaterial map={texture} transparent sizeAttenuation={false} />
    </sprite>
  )
}

/** Exports */

export default FireSprite;