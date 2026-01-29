import { useSpring, animated } from '@react-spring/three';
import { Html, Text, RenderTexture, PerspectiveCamera } from '@react-three/drei';
import { FrontSide, BackSide } from 'three';
import type { ReactNode } from 'react';

/** Fonts */

import BungeeFont from '~/assets/fonts/Bungee-Regular.ttf';

/** Types */

type CoverTextConfig = {
  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  backgroundColor?: string;
};

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
  /** Text configuration for the front cover (rendered as texture) */
  coverText?: CoverTextConfig;
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
  coverText,
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
            position={[-0.00025, 0, 0.001]}
            scale={0.005}
          >
            {pageContent}
          </Html>
        )}
      </group>

      {/* Front cover */}
      <animated.group position={[-0.05, 0, 0.003]} rotation-y={coverRotation}>
        {/* Front face of cover - with texture */}
        <mesh position={[0.05, 0, 0.0005]}>
          <planeGeometry args={[0.1, 0.15]} />
          <meshStandardMaterial side={FrontSide}>
            <RenderTexture attach="map" anisotropy={16}>
              <PerspectiveCamera makeDefault manual aspect={0.1 / 0.15} position={[0, 0, 0.5]} />
              <color attach="background" args={[coverText?.backgroundColor ?? '#8b1e2f']} />
              {coverText && (
                <>
                  <Text
                    position={[0, 0.08, 0]}
                    fontSize={0.05}
                    color={coverText.titleColor ?? '#ffffff'}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={0.18}
                    textAlign="center"
                    fontWeight="bold"
                    font={BungeeFont}
                    letterSpacing={-0.5}
                    outlineColor="#000000"
                    outlineWidth={0.0075}
                  >
                    {coverText.title}
                  </Text>
                  {coverText.subtitle && (
                    <Text
                      position={[0, -0.1, 0]}
                      fontSize={0.04}
                      color={coverText.subtitleColor ?? '#ffffff'}
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={0.18}
                      textAlign="center"
                      letterSpacing={-0.25}
                      font={BungeeFont}
                    >
                      {coverText.subtitle}
                    </Text>
                  )}
                </>
              )}
            </RenderTexture>
          </meshStandardMaterial>
        </mesh>
        {/* Back face of cover - plain for inside content */}
        <mesh position={[0.05, 0, -0.0005]}>
          <planeGeometry args={[0.1, 0.15]} />
          <meshStandardMaterial color="#dfdddd" side={BackSide} />
        </mesh>
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
