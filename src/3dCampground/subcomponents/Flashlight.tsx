import { useEffect, useRef } from "react";

/** Assets */

import FlashlightSound from "~/assets/sounds/flashlight.m4a";

/** Types */

type Props = {
  isLit?: boolean;
  onClick?: () => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

/** A flashlight with body, head, and beam. */
const Flashlight = ({
  isLit = true,
  onClick,
  position = [0.05, 0.06, 2.515],
  rotation = [-1.3446253347470072, -0.1497907014217364, -0.30376392625385],
  scale = [0.57, 0.57, 0.57],
}: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    audioRef.current = new Audio(FlashlightSound);
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore errors from autoplay restrictions
      });
    }
  }, [isLit]);

  return (
    <group name="flashlight" position={position} rotation={rotation} scale={scale}>
      {/* Invisible cube for click detection */}
      <mesh scale={[0.05, 0.07, 0.05]} position={[0.01, -0.005, 0]} visible={false} onClick={onClick}>
        <boxGeometry />
      </mesh>
      {/* Flashlight body */}
      <mesh scale={[1, 0.45, 1]} position={[0.0129733619910496, -0.00527906290348988, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
        <meshStandardMaterial color={"#b8bb00"} />
      </mesh>
      {/* Flashlight head */}
      <mesh position={[0.0139417451462573, 0.0212736204050017, 0]} scale={[1.35, 0.45, 1.39]} rotation={[3.121669280381995, 0.007306405590103245, 0.018904953205471604]}>
        <coneGeometry args={[0.015, 0.03, 8]} />
        <meshStandardMaterial color={"#8b8d00"} />
        {/* Flashlight beam */}
          <spotLight
            position={[0.2, 0.1, -0.15]}
            target-position={[1, 1, 0]}
            angle={0.4}
            penumbra={0.5}
            intensity={isLit ? 2 : 0}
            distance={3}
            color={"#fff8e7"}
            castShadow
          />
      </mesh>
    </group>
  );
};

/** Exports */

export default Flashlight;
