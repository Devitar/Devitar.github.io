import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { PointLight } from "three"

const FlickeringLight = ({ position, color, baseIntensity = 1 }: { position: [number, number, number], color: string, baseIntensity?: number }) => {
  const lightRef = useRef<PointLight>(null!)

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

export default FlickeringLight