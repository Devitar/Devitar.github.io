import { useSpring, animated, config } from '@react-spring/three';
import TwinklingStar from '../TwinklingStar';

type Props = {
  isNightTime: boolean;
  onToggleNightTime: () => void;
};

const Skybox = ({ isNightTime, onToggleNightTime }: Props) => {
  const { moonY, sunY, skyColor, ambientIntensity, sunIntensity } = useSpring({
    moonY: isNightTime ? 2.24 : -0.5,
    sunY: isNightTime ? -0.5 : 2.24,
    skyColor: isNightTime ? '#132d96' : '#87CEEB',
    ambientIntensity: isNightTime ? 0.15 : 1.5,
    sunIntensity: isNightTime ? 0 : 8,
    config: config.molasses,
  });

  return (
    <>
      <animated.ambientLight color={"#fff"} intensity={ambientIntensity} />

      {/* Directional sunlight during day */}
      {!isNightTime && (
        <directionalLight
          position={[5, 5, 2]}
          intensity={2}
          color={"#fffacd"}
          castShadow
        />
      )}

      {/* Moon - visible at night */}
      <animated.mesh
        position-y={moonY}
        position-x={0.1}
        position-z={-0.59}
        scale={[0.5, 0.5, 0.01]}
        name={"moon"}
        onClick={() => isNightTime && onToggleNightTime()}
      >
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
        {isNightTime && <pointLight intensity={2} />}
      </animated.mesh>

      {/* Sun - visible during day */}
      <animated.mesh
        position-y={sunY}
        position-x={0.1}
        position-z={-0.6}
        scale={[0.5, 0.5, 0.01]}
        name={"sun"}
        onClick={() => !isNightTime && onToggleNightTime()}
      >
        <boxGeometry />
        <meshBasicMaterial color={"#f2ff39"} />
        <animated.pointLight intensity={sunIntensity} color={"#ffa500"} />
      </animated.mesh>

      {isNightTime && (
        <>
          <group name="big_dipper" position={[-1.18, 1.95, -0.63]} rotation={[-0.057859925759693155, 0.07155343523626997, -0.2801141128557414]}>
            <TwinklingStar position={[0, 0, 0]} name={"megrez"} />
            <TwinklingStar position={[0.4, 0, 0]} name={"dubhe"} />
            <TwinklingStar position={[0.45, -0.3, 0]} name={"merak"} />
            <TwinklingStar position={[0.05, -0.3, 0]} name={"phecda"} />
            <TwinklingStar position={[-0.21, 0.2, 0]} name={"alioth"} />
            <TwinklingStar position={[-0.48, 0.46, 0]} name={"mizar"} />
            <TwinklingStar position={[-0.82, 0.5, 0]} name={"alkaid"} />
          </group>
          <TwinklingStar position={[0.07, 1.68, -0.63]} /><TwinklingStar position={[-0.66, 2.88, -0.63]} /><TwinklingStar position={[-2.18, 2.12, -0.63]} /><TwinklingStar position={[-3.08, 2.76, -0.63]} /><TwinklingStar position={[-3.54, 1.03, -0.63]} />
          <TwinklingStar position={[-1.1, 1.01, -0.63]} />
          <TwinklingStar position={[0.52, 0.66, -0.63]} />
          <TwinklingStar position={[1.35, 1.35, -0.63]} />
          <TwinklingStar position={[0.57, 3.22, -0.63]} />
          <TwinklingStar position={[1.87, 3.05, -0.63]} />
          <TwinklingStar position={[2.42, 1.78, -0.63]} /><TwinklingStar position={[3.07, 2.44, -0.63]} />
          <TwinklingStar position={[-2.83, 1.78, -0.63]} />
        </>
      )}

      {/* Sky background */}
      <mesh scale={[12.82, 3.92, 0.01]} position={[0, 1.86, -0.67]} name={"sky"}>
        <boxGeometry />
        <animated.meshStandardMaterial color={skyColor} />
      </mesh>

      {/* Ground */}
      <mesh scale={[20, 0.01, 19.47]} position={[0, 0, 8]} name={"ground"}>
        <boxGeometry />
        <meshStandardMaterial color={"#467a05"} />
      </mesh>
    </>
  );
};

export default Skybox;
