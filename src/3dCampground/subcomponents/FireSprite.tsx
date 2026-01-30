import { useGifTexture, useSoundOnChange } from "~/utils";
import fireGif from "~/assets/images/fire.gif";

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
  const texture = useGifTexture(fireGif, 50);
  useSoundOnChange(FireOutSound, isVisible, {
    volume: 0.5,
    isMuted,
    playWhen: (prev, current) => prev === true && current === false,
  });

  if (!texture || !isVisible) return null;

  return (
    <sprite position={position} scale={[0.2, 0.25, 0.1]}>
      <spriteMaterial map={texture} transparent sizeAttenuation={false} depthTest />
    </sprite>
  )
}

/** Exports */

export default FireSprite;