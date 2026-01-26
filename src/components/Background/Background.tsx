import "./Background.css";
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useCallback, useContext } from "react";
import { AppContext } from "~/global/AppContext";

/** Assets */

import Fire from "~/assets/sounds/fire.wav";

/** Subcomponents */

import FireSprite from "./subcomponents/FireSprite";
import FlickeringLight from "./subcomponents/FlickeringLight";
import TwinklingStar from "./subcomponents/TwinklingStar";
import Audio from "./subcomponents/Audio";
import Flashlight from "./subcomponents/Flashlight";

/** Renders a 3D camping scene. */
export default function Scene() {
  const { get, set: { setIsFireOn, setIsFlashlightOn } } = useContext(AppContext);

  const isMobile = window.innerWidth < 768;

  /** Calculate camera y-position based on screen aspect ratio to prevent ground clipping. */
  const getCameraY = useCallback(() => {
    const baseHeight = 0.03;

    if (!isMobile) return baseHeight;

    const aspectRatio = window.innerWidth / window.innerHeight;
    // For narrower screens (portrait), we need to position camera higher to prevent the bottom of the view from clipping through ground
    const adjustment = (1 - aspectRatio) * 0.15; // Adjusts based on how 'portrait' the screen is

    return baseHeight + Math.max(0, adjustment);
  }, [isMobile]);

  const cameraPosition: [number, number, number] = isMobile
    ? [0.075, getCameraY(), 3]
    : [0.21, 0.03, 3.04];
  const cameraRotation: [number, number, number] = isMobile
    ? [0.1, 0.125, 0]
    : [0.27925268031909284, 0.13962634015954653, 0];

  return (
    <Canvas
      className='main-canvas'
      dpr={[1, 2]}
      gl={{
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'high-performance'
      }}
    >
      {/* GLOBAL */}

      <PerspectiveCamera makeDefault position={cameraPosition} rotation={cameraRotation} fov={isMobile ? 60 : 50} />
      <Audio url={Fire} isPlaying={get.isFireOn} />

      {/* CAMP */}

      <FlickeringLight
        position={[0, 0.03, 2.73]}
        color={{
          lit: "#dfa811",
          unlit: "#b94712"
        }}
        baseIntensity={1}
        isLit={get.isFireOn}
      />
      <FireSprite position={[0, 0.025, 2.73]} isVisible={get.isFireOn} />

      <Flashlight
        isLit={get.isFlashlightOn}
        onClick={() => setIsFlashlightOn((prev) => !prev)}
      />

      {/* Campfire logs bundle */}
      <group name="campfire" position={[0, 0.01, 2.73]} scale={[0.34, 0.34, 0.34]} rotation={[0, -0.26179938779914963, 0]}>
        {/* Invisible cube for click detection */}
        <mesh scale={[0.2, 0.2, 0.2]} position={[0, 0, 0]} visible={false} onClick={() => setIsFireOn((prev) => !prev)}>
          <boxGeometry />
          <meshStandardMaterial color={"#555555"} />
        </mesh>
        {/* Log 1 - Right */}
        <mesh position={[0.06, 0.008, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#3d2817"} />
        </mesh>
        {/* Log 2 - Left */}
        <mesh position={[-0.06, 0.008, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#42301a"} />
        </mesh>
        {/* Log 3 - Front */}
        <mesh position={[0, 0.008, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#3d2817"} />
        </mesh>
        {/* Log 4 - Back */}
        <mesh position={[0, 0.008, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#42301a"} />
        </mesh>
        {/* Log 5 - Front-Right diagonal */}
        <mesh position={[0.042, 0.008, 0.042]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#3d2817"} />
        </mesh>
        {/* Log 6 - Front-Left diagonal */}
        <mesh position={[-0.042, 0.008, 0.042]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#42301a"} />
        </mesh>
        {/* Log 7 - Back-Right diagonal */}
        <mesh position={[0.042, 0.008, -0.042]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#3d2817"} />
        </mesh>
        {/* Log 8 - Back-Left diagonal */}
        <mesh position={[-0.042, 0.008, -0.042]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
          <meshStandardMaterial color={"#42301a"} />
        </mesh>
      </group>

      <mesh name={"log"} position={[0.1, 0.03, 2.52]} rotation={[3.0152557600895867e-17, -0.40142572795869585, 1.5707963267948966]} scale={[0.6, 0.39, 0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial color={"#3d2817"} />
      </mesh>

      <group name="tent" position={[-0.23, 0.0075, 2.39]} rotation={[0, 0.4188790204786392, 0]} scale={[0.75, 0.68, 0.61]}>
        {/* Left slanted side of tent */}
        <mesh position={[-0.09, 0.1, 0.0100000000000002]} rotation={[0, 0, 2.5]}>
          <boxGeometry args={[0.01, 0.3, 0.5]} />
          <meshStandardMaterial color={"#8b4513"} />
        </mesh>
        {/* Right slanted side of tent */}
        <mesh position={[0.08, 0.1, 0.0100000000000002]} rotation={[0, 0, -2.5]}>
          <boxGeometry args={[0.01, 0.3, 0.5]} />
          <meshStandardMaterial color={"#8b4513"} />
        </mesh>
        {/* Back triangle */}
        <mesh position={[-0.01, 0, 0.0057728639021013]} rotation={[0, 0, 0]} scale={[1.06, 1.06, 1.63]}>
          <boxGeometry args={[0.3, 0.01, 0.3]} />
          <meshStandardMaterial color={"#7a3d11"} />
        </mesh>
        {/* Tent stakes - small cylinders */}
        <mesh position={[-0.17, 0, 0.25]} rotation={[Math.PI / 6, 0, Math.PI / 8]} scale={[1, 0.45, 1]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={"#555555"} />
        </mesh>
        <mesh position={[0.154342404307889, 0, 0.24]} rotation={[Math.PI / 6, 0, -Math.PI / 8]} scale={[1, 0.49, 1]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={"#555555"} />
        </mesh>
        <mesh position={[0.15, 0, -0.24]} rotation={[-Math.PI / 6, 0, -Math.PI / 8]} scale={[1, 0.4, 1]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={"#555555"} />
        </mesh>
        <mesh position={[-0.17, 0, -0.23]} rotation={[-Math.PI / 6, 0, Math.PI / 8]} scale={[1, 0.49, 1]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={"#555555"} />
        </mesh>
      </group>

      {/* SKYBOX */}

      <ambientLight color={"#fff"} intensity={0.15} />

      <mesh position={[0.1, 2.24, -0.63]} scale={[0.5, 0.5, 0.01]} name={"moon"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
        <pointLight intensity={2} />
      </mesh>
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

      {/* ENVIRONMENT */}

      <mesh scale={[12.82, 3.92, 0.01]} position={[0, 1.86, -0.67]} name={"sky"}>
        <boxGeometry />
        <meshStandardMaterial color={"#132d96"} />
      </mesh>
      <mesh scale={[20, 0.01, 19.47]} position={[0, 0, 8]} name={"ground"}>
        <boxGeometry />
        <meshStandardMaterial color={"#467a05"} />
      </mesh>

      {/* MOUNTAINS */}

      <group name='mountain' position={[3.05, 0, 0]} scale={[1.49, 1, 1]}>
        <mesh position={[-1.54, 0.5, -0.1]} name={"mountain_left"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#a89d9e"} />
        </mesh>
        <mesh position={[-1.54, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_left"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#fafcfa"} />
        </mesh>
        <mesh position={[-0.3, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_right"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#fafcfa"} />
        </mesh>
        <mesh position={[-0.9, 1.3, 0.01]} scale={[0.53, 0.56, 1.03]} name={"snow_main"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#fafcfa"} />
        </mesh>
        <mesh position={[-0.3, 0.5, -0.1]} name={"mountain_right"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#a89d9e"} />
        </mesh>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.97, 2.16, 1]} name={"mountain_main"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#a89d9e"} />
        </mesh>
      </group><group name='mountain' position={[-0.29, 0, 0]} scale={[1.49, 1, 1]}>
        <mesh position={[-1.54, 0.5, -0.1]} name={"mountain_left"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#a89d9e"} />
        </mesh>
        <mesh position={[-1.54, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_left"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#fafcfa"} />
        </mesh>
        <mesh position={[-0.3, 0.86, -0.09]} scale={[0.31, 0.29, 1.03]} name={"snow_right"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#fafcfa"} />
        </mesh>
        <mesh position={[-0.9, 1.3, 0.01]} scale={[0.53, 0.56, 1.03]} name={"snow_main"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#fafcfa"} />
        </mesh>
        <mesh position={[-0.3, 0.5, -0.1]} name={"mountain_right"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#a89d9e"} />
        </mesh>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.97, 2.16, 1]} name={"mountain_main"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#a89d9e"} />
        </mesh>
      </group>

      {/* TREES */}

      <group name='tree' position={[0.24, 0, 2.01]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[0.13, 0, 1.79]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[0.34, 0, 1.79]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[-0.08, 0, 1.79]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[-0.28, 0, 1.79]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[0.55, 0, 1.79]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[0.04, 0, 2.01]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[-0.17, 0, 2.01]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[-0.39, 0, 2.01]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[-0.65, 0, 2.07]} scale={[0.15, 0.39, 1]} rotation={[0, 1.0297442586766545, 0]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[-0.67, 0, 1.88]} scale={[0.15, 0.39, 1]} rotation={[0, 1.0297442586766545, 0]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[-0.85, 0, 2.1]} scale={[0.15, 0.39, 1]} rotation={[0, 1.0297442586766545, 0]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[-0.76, 0, 2.26]} scale={[0.15, 0.39, 1]} rotation={[0, 1.0297442586766545, 0]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[-0.59, 0, 1.68]} scale={[0.15, 0.39, 1]} rotation={[0, 1.0297442586766545, 0]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[0.66, 0, 2.01]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[0.86, 0, 2.15]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.03, 0, 1.99]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[0.84, 0, 1.83]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.22, 0, 2.15]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.01, 0, 2.33]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.3, 0, 2.37]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[0.71, 0, 2.37]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.16, 0, 2.61]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[0.85, 0, 2.61]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.41, 0, 2.9]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.21, 0, 3.07]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1.41, 0, 2.63]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group><group name='tree' position={[1, 0, 2.86]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
      <group name='tree' position={[0.45, 0, 2.01]} scale={[0.15, 0.39, 1]}>
        <mesh position={[-0.9, 0.5, 0]} scale={[1.07, 0.5, 1]} name={"tree_3"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.67, 0]} scale={[0.85, 0.5, 1]} name={"tree_2"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.85, 0]} scale={[0.66, 0.5, 1]} name={"tree_1"}>
          <shapeGeometry />
          <meshStandardMaterial color={"#1f7307"} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.00999999999999979]} scale={[0.3, 0.5, 0.01]} name={"tree_trunk"}>
          <boxGeometry />
          <meshStandardMaterial color={"#521d00"} />
        </mesh>
      </group>
    </Canvas>
  );
}
