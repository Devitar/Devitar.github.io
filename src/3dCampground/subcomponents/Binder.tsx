import { useSpring, animated } from '@react-spring/three';
import { Html, Text, RenderTexture, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { FrontSide, BackSide, PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { type ReactNode, useMemo } from 'react';

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
  /** Position when active (viewing). Ignored if fitToViewport is enabled. */
  activePosition?: [number, number, number];
  /** Rotation when active (viewing) */
  activeRotation?: [number, number, number];
  /** Scale when active (viewing). Ignored if fitToViewport is enabled. */
  activeScale?: number;
  /** Whether the binder is in active/viewing mode */
  isActive?: boolean;
  /** Whether the binder cover is open */
  isOpen?: boolean;
  /** Whether the user is on a mobile device */
  isMobile?: boolean;
  /** Text configuration for the front cover (rendered as texture) */
  coverText?: CoverTextConfig;
  /** Content to display on the inside of the cover (visible when open) */
  coverInsideContent?: ReactNode;
  /** Content to display on the inner page (visible when open) */
  pageContent?: ReactNode;
  onClick?: () => void;
  /** Automatically calculate position and scale to fit the binder in viewport when active */
  fitToViewport?: boolean;
  /** Maximum scale when using fitToViewport. Default: 1.5 */
  maxScale?: number;
  /** Minimum scale when using fitToViewport to ensure readability. Default: 0.8 */
  minScale?: number;
  /** Padding factor (0-1) when fitting to viewport. Default: 0.8 */
  viewportPadding?: number;
};

/** A notebook binder with turnable pages. */
const Binder = ({
  restPosition,
  restRotation = [0, 0, 0],
  restScale = 1,
  activePosition: activePositionProp,
  activeRotation = [0, 0, 0],
  activeScale: activeScaleProp,
  isActive = false,
  isOpen = false,
  isMobile = false,
  coverText,
  coverInsideContent,
  pageContent,
  onClick,
  fitToViewport = false,
  maxScale = 1.5,
  minScale = 0.8,
  viewportPadding = 0.8,
}: Props) => {
  const { viewport, camera } = useThree();

  // Binder dimensions in world units
  const BINDER_WIDTH = 0.1;
  const BINDER_HEIGHT = 0.15;

  // Calculate viewport-fitted position and scale
  const { activePosition, activeScale } = useMemo(() => {
    if (!fitToViewport) {
      return {
        activePosition: activePositionProp ?? restPosition,
        activeScale: activeScaleProp ?? 1,
      };
    }

    const perspectiveCamera = camera as ThreePerspectiveCamera;
    const fovRadians = (perspectiveCamera.fov * Math.PI) / 180;

    // Calculate z position - place binder at a distance that works well
    const binderZ = camera.position.z - 0.15;
    const distanceFromCamera = camera.position.z - binderZ;

    // Get the visible dimensions at the binder's z position
    const visibleHeight = 2 * Math.tan(fovRadians / 2) * distanceFromCamera;
    const visibleWidth = visibleHeight * viewport.aspect;

    // Calculate scale to fit within viewport with padding
    // Account for opened cover by using 2x width (cover + page side by side)
    const openedBinderWidth = BINDER_WIDTH * 2;
    const maxHeightScale = (visibleHeight * viewportPadding) / BINDER_HEIGHT;
    const maxWidthScale = (visibleWidth * viewportPadding) / openedBinderWidth;
    const calculatedScale = Math.max(
      minScale,
      Math.min(maxHeightScale, maxWidthScale, maxScale)
    );

    // Position: center horizontally, slight raise to avoid ground clipping
    // Keep it close to camera's y position with a small offset
    const verticalOffset = isMobile ? 0.02 : 0.045;

    const position: [number, number, number] = [
      camera.position.x + (isMobile ? 0.0025 : 0.02), // Slight offset for opened cover
      camera.position.y + verticalOffset,
      binderZ,
    ];

    return {
      activePosition: position,
      activeScale: calculatedScale,
    };
  }, [fitToViewport, activePositionProp, activeScaleProp, restPosition, camera, viewport.aspect, maxScale, minScale, viewportPadding, isMobile]);

  // Animate position, rotation, and scale between rest and active states
  const { position, rotation, scale } = useSpring({
    position: isActive ? activePosition : restPosition,
    rotation: isActive ? activeRotation : restRotation,
    scale: isActive ? activeScale : restScale,
    config: { mass: 1, tension: 80, friction: 20 },
  });

  // Animate the front cover rotation around the left edge (rings)
  const { coverRotation, coverPosition } = useSpring({
    coverRotation: isOpen ? -Math.PI : 0,
    coverPosition: isOpen ? [-0.051, 0, 0.003] : [-0.05, 0, 0.003],
    config: { mass: 1, tension: 120, friction: 20 },
  });

  return (
    <animated.group position={position} rotation={rotation as unknown as [number, number, number]} scale={scale} onClick={onClick} renderOrder={1}>
      {/* Back cover */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.15, 0.001]} />
        <meshStandardMaterial color="#dfdddd" />
      </mesh>

      {/* Inner pages */}
      <mesh position={[0, 0, 0.001]}>
        <boxGeometry args={[0.1, 0.15, 0.001]} />
        <meshStandardMaterial color="#dfdddd" />
      </mesh>
      <group position={[0, 0, 0.002]}>
        <mesh>
          <boxGeometry args={[0.1, 0.15, 0.001]} />
          <meshStandardMaterial color="#dfdddd" />
        </mesh>
        {pageContent && isOpen && (
          <Html
            transform
            position={[-0.00025, 0, 0.001]}
            scale={0.005}
            occlude
          >
            {pageContent}
          </Html>
        )}
      </group>

      {/* Front cover */}
      <animated.group position={coverPosition as unknown as [number, number, number]} rotation-y={coverRotation}>
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
            position={[0.05, 0, -0.001]}
            rotation={[0, Math.PI, 0]}
            scale={0.005}
            occlude
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
