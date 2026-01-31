import { useContext } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, Color } from 'three';
import { useSound, useInteraction } from '~/utils';
import { AppContext } from '~/global/AppContext';

/** Types */

type Props = {
  /** Path to the image texture */
  imagePath: string;
  /** Position in 3D space */
  position: [number, number, number];
  /** Scale of the sprite */
  scale?: [number, number, number];
  /** Whether the sprite is visible */
  isVisible?: boolean;
  /** Name for the sprite */
  name?: string;
  /** A sound to play when the sprite is clicked. */
  sound?: {
    soundPath: string;
    volume?: number;
  };
  /** Whether the sprite is affected by scene lighting */
  affectedByLighting?: boolean;
  /** Brightness multiplier (0-1). 1.0 = normal, 0.5 = 50% darker, 0 = black. Only works when affectedByLighting is true. */
  brightness?: number;
};

/** A sprite component that displays an image texture. */
const ImageSprite = ({
  imagePath,
  position,
  scale = [0.4, 0.6, 1],
  isVisible = true,
  name = "sprite",
  sound,
  affectedByLighting = false,
  brightness = 1,
}: Props) => {
  const { get: { isMuted } } = useContext(AppContext);
  const disableInteraction = useInteraction();
  const texture = useLoader(TextureLoader, imagePath);
  const { play: playSound } = useSound(sound?.soundPath, {
    volume: sound?.volume,
    isMuted,
  });

  if (!isVisible) return null;

  const textureToUse = Array.isArray(texture) ? texture[0] : texture;

  // Create color multiplier for brightness (values > 1 make it brighter)
  const brightnessColor = new Color(brightness, brightness, brightness);

  if (affectedByLighting) {
    return (
      <mesh position={position} scale={scale} name={name} onClick={sound && !disableInteraction ? playSound : undefined}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={textureToUse}
          transparent
          alphaTest={0.5}
          color={brightnessColor}
        />
      </mesh>
    );
  }

  return (
    <sprite position={position} scale={scale} name={name} onClick={sound && !disableInteraction ? playSound : undefined}>
      <spriteMaterial
        map={textureToUse}
        transparent
        sizeAttenuation={false}
        color={brightnessColor}
      />
    </sprite>
  );
};

/** Exports */

export default ImageSprite;
