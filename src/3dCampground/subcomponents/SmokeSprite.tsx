import { useContext, useRef, useState, useEffect, memo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, Texture } from 'three';
import type { Sprite } from 'three';
import { AppContext } from '~/global/AppContext';
import type { Vector3 } from '~/types';
import { ANIMATION } from '~/constants';

/** Assets */

import SmokeImage from '~/assets/images/Smoke.svg';

/** Types */

type Props = {
  position: Vector3;
};

/** A single smoke particle that rises and fades out. */
const SmokeParticle = memo(
  ({ position, delay = 0, texture }: { position: Vector3; delay?: number; texture: Texture }) => {
    const spriteRef = useRef<Sprite | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setHasStarted(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    useFrame((state) => {
      if (!spriteRef.current || !hasStarted) return;

      if (startTime === null) {
        setStartTime(state.clock.elapsedTime);
        return;
      }

      const elapsed = state.clock.elapsedTime - startTime;
      const progress = (elapsed % ANIMATION.smokeDuration) / ANIMATION.smokeDuration;

      // Animate position (rise upward)
      spriteRef.current.position.y = position[1] + progress * 0.5;

      // Animate opacity (fade out)
      if (spriteRef.current.material) {
        spriteRef.current.material.opacity = 0.6 * (1 - progress);
      }
    });

    return (
      <sprite ref={spriteRef} position={position} scale={[0.35, 0.3, 0.1]}>
        <spriteMaterial map={texture} transparent sizeAttenuation={false} depthTest />
      </sprite>
    );
  }
);

/** A sprite that displays animated smoke particles rising from the campfire. */
const SmokeSprite = ({ position }: Props) => {
  const {
    get: { isFireOn },
  } = useContext(AppContext);
  const texture = useLoader(TextureLoader, SmokeImage);

  // Smoke is visible when fire is off
  if (isFireOn) return null;

  // Create 3 smoke particles with staggered delays, sharing the same texture
  const [delay1, delay2, delay3] = ANIMATION.smokeDelays;
  return (
    <>
      <SmokeParticle position={position} delay={delay1} texture={texture} />
      <SmokeParticle
        position={[position[0] - 0.02, position[1], position[2]]}
        delay={delay2}
        texture={texture}
      />
      <SmokeParticle
        position={[position[0] + 0.02, position[1], position[2]]}
        delay={delay3}
        texture={texture}
      />
    </>
  );
};

/** Exports */

export default SmokeSprite;
