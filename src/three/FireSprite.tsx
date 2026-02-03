import { useContext } from 'react';
import { useGifTexture, useSoundOnChange } from '~/hooks';
import { AppContext } from '~/context/AppContext';
import type { Vector3 } from '~/types';

/** Assets */

import fireGif from '~/assets/images/fire.gif';
import FireOutSound from '~/assets/sounds/fire_sizzle.m4a';

/** Types */

type Props = {
  position: Vector3;
};

/** A sprite that displays an animated fire GIF. */
const FireSprite = ({ position }: Props) => {
  const {
    get: { isMuted, isFireOn },
  } = useContext(AppContext);
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
  );
};

/** Exports */

export default FireSprite;
