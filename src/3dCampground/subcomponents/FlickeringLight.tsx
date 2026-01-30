import { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PointLight } from "three";
import { AppContext } from "~/global/AppContext";

/** Types */

type Props = {
  position: [number, number, number];
  color: {
    lit: string;
    unlit: string;
  };
  baseIntensity?: number;
}

/** A point light that flickers like a campfire. */
const FlickeringLight = ({ position, color, baseIntensity = 1 }: Props) => {
  const { get: { isFireOn } } = useContext(AppContext);
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Create flickering effect using sine waves with different frequencies
      const flicker1 = Math.sin(state.clock.elapsedTime * 8) * 0.1;
      const flicker2 = Math.sin(state.clock.elapsedTime * 13) * 0.05;
      const flicker3 = Math.sin(state.clock.elapsedTime * 20) * 0.03;
      const intensity = baseIntensity + flicker1 + flicker2 + flicker3;

      lightRef.current.intensity = isFireOn 
        ? intensity
        : intensity * 0.1;
    }
  })

  return <pointLight ref={lightRef} position={position} color={isFireOn ? color.lit : color.unlit} decay={1.2} />
}

/** Exports */

export default FlickeringLight;