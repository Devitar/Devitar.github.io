import { useGifTexture } from "~/utils";
import fireGif from "~/assets/images/fire.gif";

/** Types */

type Props = {
  position: [number, number, number]
}

/** A sprite that displays an animated fire GIF. */
const FireSprite = ({ position }: Props) => {
  const texture = useGifTexture(fireGif, 50)

  if (!texture) return null

  return (
    <sprite position={position} scale={[0.15, 0.1, 0.15]}>
      <spriteMaterial map={texture} transparent sizeAttenuation={false} />
    </sprite>
  )
}

/** Exports */

export default FireSprite;