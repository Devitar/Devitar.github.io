/** Types */

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

/** A flashlight with body, head, and beam. */
const Flashlight = ({
  position = [0.18, 0.06, 2.57],
  rotation = [-1.3446253347470072, -0.1497907014217364, -0.30376392625385],
  scale = [0.57, 0.57, 0.57]
}: Props) => {
  return (
    <group name="flashlight" position={position} rotation={rotation} scale={scale}>
      {/* Flashlight body */}
      <mesh scale={[1, 0.45, 1]} position={[0.0129733619910496, -0.00527906290348988, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
        <meshStandardMaterial color={"#555555"} />
      </mesh>
      {/* Flashlight head */}
      <mesh position={[0.0139417451462573, 0.0212736204050017, 0]} scale={[1.35, 0.45, 1.39]} rotation={[3.121669280381995, 0.007306405590103245, 0.018904953205471604]}>
        <coneGeometry args={[0.015, 0.03, 8]} />
        <meshStandardMaterial color={"#666666"} />
      </mesh>
      {/* Flashlight beam */}
      <spotLight
        position={[0.0149383325902224, 0.0162121137644282, 0]}
        target-position={[1, 1, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        distance={3}
        color={"#fff8e7"}
        castShadow
      />
    </group>
  );
};

/** Exports */

export default Flashlight;
