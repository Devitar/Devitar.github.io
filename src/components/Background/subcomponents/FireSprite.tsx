import { useGifTexture } from "~/utils"
import fireGif from '~/assets/images/fire.gif'

const FireSprite = ({ position }: { position: [number, number, number] }) => {
  const texture = useGifTexture(fireGif, 50)

  if (!texture) return null

  return (
    <sprite position={position} scale={[0.15, 0.1, 0.15]}>
      <spriteMaterial map={texture} transparent sizeAttenuation={false} />
    </sprite>
  )
}

export default FireSprite