import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, Texture } from 'three';
import { useRef, useState, useEffect } from 'react';
import type { Sprite } from 'three';

/** Assets */

import SmokeImage from '~/assets/images/Smoke.svg';

/** Types */

type Props = {
  position: [number, number, number];
  isVisible?: boolean;
}

/** A single smoke particle that rises and fades out. */
const SmokeParticle = ({
  position,
  delay = 0,
  texture
}: {
  position: [number, number, number];
  delay?: number;
  texture: Texture;
}) => {
  const spriteRef = useRef<Sprite>(null);
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
    const duration = 6;
    const progress = (elapsed % duration) / duration;

    // Animate position (rise upward)
    spriteRef.current.position.y = position[1] + progress * 0.5;

    // Animate opacity (fade out)
    if (spriteRef.current.material) {
      spriteRef.current.material.opacity = 0.6 * (1 - progress);
    }
  });

  return (
    <sprite
      ref={spriteRef}
      position={position}
      scale={[0.35, 0.3, 0.1]}
    >
      <spriteMaterial
        map={texture}
        transparent
        sizeAttenuation={false}
      />
    </sprite>
  );
};

/** A sprite that displays animated smoke particles rising from the campfire. */
const SmokeSprite = ({ position, isVisible = true }: Props) => {
  const texture = useLoader(TextureLoader, SmokeImage);

  if (!isVisible) return null;

  // Create 3 smoke particles with staggered delays, sharing the same texture
  return (
    <>
      <SmokeParticle position={position} delay={0} texture={texture} />
      <SmokeParticle position={[position[0] - 0.02, position[1], position[2]]} delay={2000} texture={texture} />
      <SmokeParticle position={[position[0] + 0.02, position[1], position[2]]} delay={4000} texture={texture} />
    </>
  );
}

/** Exports */

export default SmokeSprite;
