import { useSpring, animated } from '@react-spring/three';
import { Html } from '@react-three/drei';
import type { ReactNode } from 'react';

/** Types */

type Props = {
  /** Position when resting (inactive) */
  restPosition: [number, number, number];
  /** Rotation when resting (inactive) */
  restRotation?: [number, number, number];
  /** Scale when resting (inactive) */
  restScale?: number;
  /** Position when active (viewing) */
  activePosition: [number, number, number];
  /** Rotation when active (viewing) */
  activeRotation?: [number, number, number];
  /** Scale when active (viewing) */
  activeScale?: number;
  /** Whether the binder is in active/viewing mode */
  isActive?: boolean;
  /** Whether the binder cover is open */
  isOpen?: boolean;
  /** Content to display on the front cover */
  coverContent?: ReactNode;
  /** Content to display on the inside of the cover (visible when open) */
  coverInsideContent?: ReactNode;
  /** Content to display on the inner page (visible when open) */
  pageContent?: ReactNode;
  onClick?: () => void;
};

/** A notebook binder with turnable pages. */
const Binder = ({
  restPosition,
  restRotation = [0, 0, 0],
  restScale = 1,
  activePosition,
  activeRotation = [0, 0, 0],
  activeScale = 1,
  isActive = false,
  isOpen = false,
  coverContent,
  coverInsideContent,
  pageContent,
  onClick,
}: Props) => {
  // Animate position, rotation, and scale between rest and active states
  const { position, rotation, scale } = useSpring({
    position: isActive ? activePosition : restPosition,
    rotation: isActive ? activeRotation : restRotation,
    scale: isActive ? activeScale : restScale,
    config: { mass: 1, tension: 80, friction: 20 },
  });

  // Animate the front cover rotation around the left edge (rings)
  const { coverRotation } = useSpring({
    coverRotation: isOpen ? -Math.PI : 0,
    config: { mass: 1, tension: 120, friction: 20 },
  });

  return (
    <animated.group position={position} rotation={rotation as unknown as [number, number, number]} scale={scale} onClick={onClick}>
      {/* Invisible cube for click detection */}
      {/* <mesh position={[0, 0, 0.0015]} visible={false} onClick={onClick}>
        <boxGeometry args={[0.1, 0.15, 0.01]} />
        <meshBasicMaterial />
      </mesh> */}

      {/* Back cover */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.15, 0.001]} />
        <meshStandardMaterial />
      </mesh>

      {/* Inner pages */}
      <mesh position={[0, 0, 0.001]}>
        <boxGeometry args={[0.1, 0.15, 0.001]} />
        <meshStandardMaterial />
      </mesh>
      <group position={[0, 0, 0.002]}>
        <mesh>
          <boxGeometry args={[0.1, 0.15, 0.001]} />
          <meshStandardMaterial />
        </mesh>
        {pageContent && isOpen && (
          <Html
            transform
            occlude
            position={[0, 0, 0.001]}
            scale={0.005}
            pointerEvents="none"
          >
            {pageContent}
          </Html>
        )}
      </group>

      {/* Front cover */}
      <animated.group position={[-0.05, 0, 0.003]} rotation-y={coverRotation}>
        {/* Mesh is offset so its left edge is at the group's origin (pivot point) */}
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[0.1, 0.15, 0.001]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {coverContent && (
          <Html
            transform
            occlude
            position={[0.05, 0, 0.001]}
            scale={0.005}
            pointerEvents="none"
          >
            {coverContent}
          </Html>
        )}
        {coverInsideContent && (
          <Html
            transform
            occlude
            position={[0.05, 0, -0.001]}
            rotation={[0, Math.PI, 0]}
            scale={0.005}
          >
            {coverInsideContent}
          </Html>
        )}
      </animated.group>

      {/* Binder rings - 3 rings on the left side */}
      <mesh position={[-0.05, 0.05, 0.0015]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.005, 0.0015, 8, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.05, 0, 0.0015]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.005, 0.0015, 8, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.05, -0.05, 0.0015]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.005, 0.0015, 8, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
    </animated.group>
  );
};

export default Binder;
