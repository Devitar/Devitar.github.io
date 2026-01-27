import { useSpring, animated } from '@react-spring/three';

/** Types */

type Props = {
  position: [number, number, number];
  isOpen?: boolean;
  onClick?: () => void;
};

/** A notebook binder with turnable pages. */
const Binder = ({ position, isOpen = false, onClick }: Props) => {
  // Animate the front cover rotation around the left edge (rings)
  const { coverRotation } = useSpring({
    coverRotation: isOpen ? -Math.PI : 0, // Rotate 180 degrees when open
    config: { mass: 1, tension: 120, friction: 20 },
  });

  return (
    <group position={position}>
      {/* Invisible box for click detection */}
      <mesh position={[0, 0, 0.0015]} visible={false} onClick={onClick}>
        <boxGeometry args={[0.1, 0.15, 0.01]} />
        <meshBasicMaterial />
      </mesh>

      {/* Back cover (red) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.15, 0.001]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>

      {/* Inner pages */}
      <mesh position={[0, 0, 0.001]}>
        <boxGeometry args={[0.1, 0.15, 0.001]} />
        <meshStandardMaterial color="#15ff00" />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <boxGeometry args={[0.1, 0.15, 0.001]} />
        <meshStandardMaterial color="#0400ff" />
      </mesh>

      {/* Front cover (white) - rotates around the left edge */}
      <animated.group position={[-0.05, 0, 0.003]} rotation-y={coverRotation}>
        {/* Mesh is offset so its left edge is at the group's origin (pivot point) */}
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[0.1, 0.15, 0.001]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
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
    </group>
  );
};

export default Binder;
