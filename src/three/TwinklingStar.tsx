import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial } from 'three';
import { theme } from '~/theme';
import type { Vector3 } from '~/types';

/** Types */

type Props = {
  position: Vector3;
  scale?: Vector3;
  name?: string;
  phaseRange?: number;
};

/** A star that twinkles with subtle brightness variations. */
const TwinklingStar = memo(
  ({ position, scale = [0.05, 0.05, 0.01] as Vector3, name = 'star', phaseRange = 9 }: Props) => {
    const meshRef = useRef<Mesh>(null);
    const phaseOffset = useMemo(() => Math.random() * phaseRange, [phaseRange]);

    useFrame((state) => {
      if (meshRef.current && meshRef.current.material) {
        const time = state.clock.elapsedTime + phaseOffset;

        const twinkle1 = Math.sin(time * 1.2) * 0.15;
        const twinkle2 = Math.sin(time * 1.8) * 0.1;
        const twinkle3 = Math.sin(time * 2.5) * 0.05;

        const brightness = 0.3 + twinkle1 + twinkle2 + twinkle3;

        // Update the material color
        const material = meshRef.current.material as MeshBasicMaterial;
        material.color.setScalar(brightness);
      }
    });

    return (
      <mesh ref={meshRef} position={position} scale={scale} name={name}>
        <boxGeometry />
        <meshBasicMaterial color={theme.scene.moon} />
      </mesh>
    );
  }
);

/** Exports */

export default TwinklingStar;
