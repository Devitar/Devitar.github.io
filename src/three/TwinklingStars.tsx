import { memo, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BoxGeometry,
  Color,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  Quaternion,
  Vector3,
} from 'three';
import type { Vector3 as Vec3 } from '~/types';

type StarPlacement = {
  position: Vec3;
  scale?: Vec3;
};

type Props = {
  stars: StarPlacement[];
  phaseRange?: number;
  name?: string;
};

const DEFAULT_SCALE: Vec3 = [0.05, 0.05, 0.01];

const sharedGeometry = new BoxGeometry();
const sharedMaterial = new MeshBasicMaterial({ color: 'white' });

const scratchColor = new Color();

/** A batch of twinkling stars rendered as a single InstancedMesh. */
const TwinklingStars = memo(({ stars, phaseRange = 9, name = 'stars' }: Props) => {
  const meshRef = useRef<InstancedMesh>(null);

  const phaseOffsets = useMemo(
    () => stars.map(() => Math.random() * phaseRange),
    [stars, phaseRange]
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const matrix = new Matrix4();
    const pos = new Vector3();
    const scale = new Vector3();
    const quat = new Quaternion();

    stars.forEach((star, i) => {
      pos.set(star.position[0], star.position[1], star.position[2]);
      const s = star.scale ?? DEFAULT_SCALE;
      scale.set(s[0], s[1], s[2]);
      matrix.compose(pos, quat, scale);
      mesh.setMatrixAt(i, matrix);
      mesh.setColorAt(i, scratchColor.setScalar(0.3));
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [stars]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < stars.length; i++) {
      const time = t + phaseOffsets[i];
      const brightness =
        0.3 +
        Math.sin(time * 1.2) * 0.15 +
        Math.sin(time * 1.8) * 0.1 +
        Math.sin(time * 2.5) * 0.05;
      scratchColor.setScalar(brightness);
      mesh.setColorAt(i, scratchColor);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[sharedGeometry, sharedMaterial, stars.length]}
      name={name}
    />
  );
});

export default TwinklingStars;
