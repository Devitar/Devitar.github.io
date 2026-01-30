import { useContext } from "react";
import { useGifTexture, useSoundOnChange } from "~/utils";
import { AppContext } from "~/global/AppContext";
import fireGif from "~/assets/images/fire.gif";

/** Assets */

import FireOutSound from "~/assets/sounds/fire_sizzle.m4a";

/** Types */

type Props = {
  position: [number, number, number];
}

/** A sprite that displays an animated fire GIF. */
const FireSprite = ({ position }: Props) => {
  const { get: { isMuted, isFireOn } } = useContext(AppContext);
  const texture = useGifTexture(fireGif, 50);
  useSoundOnChange(FireOutSound, isFireOn, {
    volume: 0.5,
    isMuted,
    playWhen: (prev, current) => prev === true && current === false,
  });

  if (!texture || !isFireOn) return null;

  return (
    <sprite position={position} scale={[0.2, 0.25, 0.1]}>
      <spriteMaterial map={texture} transparent sizeAttenuation={false} depthTest />
    </sprite>
  )
}

/** Exports */

export default FireSprite;