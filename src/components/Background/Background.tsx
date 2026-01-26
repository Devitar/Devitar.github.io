import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { parseGIF, decompressFrames } from 'gifuct-js'
import "./Background.css"
import fireGif from '~/assets/images/fire.gif'

function FlickeringLight({ position, color, baseIntensity = 1 }: { position: [number, number, number], color: string, baseIntensity?: number }) {
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame((state) => {
    if (lightRef.current) {
      // Create flickering effect using sine waves with different frequencies
      const flicker1 = Math.sin(state.clock.elapsedTime * 8) * 0.1
      const flicker2 = Math.sin(state.clock.elapsedTime * 13) * 0.05
      const flicker3 = Math.sin(state.clock.elapsedTime * 20) * 0.03

      lightRef.current.intensity = baseIntensity + flicker1 + flicker2 + flicker3
    }
  })

  return <pointLight ref={lightRef} position={position} color={color} />
}

function useGifTexture(url: string, interval: number = 100) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)
  const [frames, setFrames] = useState<any[]>([])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const currentFrameRef = useRef(0)
  const lastFrameTimeRef = useRef(0)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvasRef.current = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    fetch(url)
      .then(resp => resp.arrayBuffer())
      .then(buff => {
        const gif = parseGIF(buff)
        const frames = decompressFrames(gif, true)
        setFrames(frames)

        if (frames.length > 0) {
          canvas.width = frames[0].dims.width
          canvas.height = frames[0].dims.height
          const tex = new THREE.CanvasTexture(canvas)
          tex.minFilter = THREE.LinearFilter
          tex.magFilter = THREE.NearestFilter
          setTexture(tex)
        }
      })
      .catch(console.error)
  }, [url])

  useFrame((state) => {
    if (!frames.length || !canvasRef.current || !texture) return

    // Only update frame if enough time has passed
    const currentTime = state.clock.elapsedTime * 1000 // Convert to milliseconds
    if (currentTime - lastFrameTimeRef.current < interval) return

    lastFrameTimeRef.current = currentTime

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const frame = frames[currentFrameRef.current]
    const imageData = new ImageData(
      new Uint8ClampedArray(frame.patch),
      frame.dims.width,
      frame.dims.height
    )

    ctx.putImageData(imageData, 0, 0)
    texture.needsUpdate = true

    currentFrameRef.current = (currentFrameRef.current + 1) % frames.length
  })

  return texture
}

function FireSprite({ position }: { position: [number, number, number] }) {
  const texture = useGifTexture(fireGif, 50)

  if (!texture) return null

  return (
    <sprite position={position} scale={[0.15, 0.1, 0.15]}>
      <spriteMaterial map={texture} transparent sizeAttenuation={false} />
    </sprite>
  )
}

//       <group name="flashlight" position={[0.18, 0.06, 2.57]} rotation={[-1.3446253347470072, -0.1497907014217364, -0.30376392625385]} scale={[0.57, 0.57, 0.57]}>
//   {/* Flashlight body */}
//   <mesh scale={[1, 0.45, 1]} position={[0.0129733619910496, -0.00527906290348988, 0]}>
//     <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
//     <meshStandardMaterial color={"#555555"} />
//   </mesh>
//   {/* Flashlight head */}
//   <mesh position={[0.0139417451462573, 0.0212736204050017, 0]} scale={[1.35, 0.45, 1.39]} rotation={[3.121669280381995, 0.007306405590103245, 0.018904953205471604]}>
//     <coneGeometry args={[0.015, 0.03, 8]} />
//     <meshStandardMaterial color={"#666666"} />
//   </mesh>
//   {/* Flashlight beam */}
//   <spotLight
//     position={[0.0149383325902224, 0.0162121137644282, 0]}
//     target-position={[1, 1, 0]}
//     angle={0.4}
//     penumbra={0.5}
//     intensity={2}
//     distance={3}
//     color={"#fff8e7"}
//     castShadow
//   />
// </group>

export default function Scene() {
  return (
    <Canvas className='main-canvas'>
      {/* GLOBAL */}

      <PerspectiveCamera makeDefault position={[0.12, 0.03, 3.16]} rotation={[0.26179938779914946, 0.13962634015954647, 3.503543193473437e-18]} />

      {/* CAMP */}

      <FlickeringLight position={[0, 0.03, 2.73]} color={"#dfa811"} baseIntensity={1} />
      <FireSprite position={[0, 0.025, 2.73]} />

      {/* Campfire logs bundle */}
      <group name="campfire" position={[0, 0.01, 2.73]} scale={[0.34, 0.34, 0.34]} rotation={[0, -0.26179938779914963, 0]}>
        {/* Logs arranged in a circular pattern radiating from center */}
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

      <group name="tent" position={[-0.23, 0, 2.39]} rotation={[0, 0.4188790204786392, 0]} scale={[0.75, 0.68, 0.61]}>
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
        <mesh position={[-0.01, 0.01, 0.0057728639021013]} rotation={[0, 0, 0]} scale={[1.06, 1.06, 1.63]}>
          <boxGeometry args={[0.3, 0.01, 0.3]} />
          <meshStandardMaterial color={"#7a3d11"} />
        </mesh>
        {/* Tent stakes - small cylinders */}
        <mesh position={[-0.17, 0, 0.25]} rotation={[Math.PI / 6, 0, Math.PI / 8]} scale={[1, 0.45, 1]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color={"#555555"} />
        </mesh>
        <mesh position={[0.15, 0, 0.25]} rotation={[Math.PI / 6, 0, -Math.PI / 8]} scale={[1, 0.49, 1]}>
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
        <mesh position={[0, 0, 0]} scale={[0.05, 0.05, 0.01]} name={"megrez"}>
          <boxGeometry />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
        <mesh position={[0.4, 0, 0]} scale={[0.05, 0.05, 0.01]} name={"dubhe"}>
          <boxGeometry />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
        <mesh position={[0.45, -0.3, 0]} scale={[0.05, 0.05, 0.01]} name={"merak"}>
          <boxGeometry />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
        <mesh position={[0.05, -0.3, 0]} scale={[0.05, 0.05, 0.01]} name={"phecda"}>
          <boxGeometry />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
        <mesh position={[-0.21, 0.2, 0]} scale={[0.05, 0.05, 0.01]} name={"alioth"}>
          <boxGeometry />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
        <mesh position={[-0.48, 0.46, 0]} scale={[0.05, 0.05, 0.01]} name={"mizar"}>
          <boxGeometry />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
        <mesh position={[-0.82, 0.5, 0]} scale={[0.05, 0.05, 0.01]} name={"alkaid"}>
          <boxGeometry />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
      </group>
      <mesh position={[0.07, 1.68, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh><mesh position={[-1.1, 1.01, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh><mesh position={[0.52, 0.66, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh><mesh position={[1.35, 1.35, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh><mesh position={[0.57, 3.22, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh><mesh position={[1.87, 3.05, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh><mesh position={[2.42, 1.78, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh><mesh position={[-2.83, 1.78, -0.63]} scale={[0.05, 0.05, 0.01]} name={"star"}>
        <boxGeometry />
        <meshBasicMaterial color={"#ffffff"} />
      </mesh>

      {/* ENVIRONMENT */}

      <mesh scale={[12.82, 3.92, 0.01]} position={[0, 1.86, -0.67]} name={"sky"}>
        <boxGeometry />
        <meshStandardMaterial color={"#132d96"} />
      </mesh>
      <mesh scale={[12.41, 0.01, 5.11]} position={[0, 0, 1.85]} name={"ground"}>
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
