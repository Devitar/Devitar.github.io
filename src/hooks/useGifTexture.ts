import { CanvasTexture, LinearFilter, NearestFilter } from 'three';
import { decompressFrames, parseGIF } from 'gifuct-js';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const useGifTexture = (url: string, interval: number = 100) => {
  const [texture, setTexture] = useState<CanvasTexture | null>(null);
  const [frames, setFrames] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    fetch(url)
      .then((resp) => resp.arrayBuffer())
      .then((buff) => {
        const gif = parseGIF(buff);
        const frames = decompressFrames(gif, true);
        setFrames(frames);

        if (frames.length > 0) {
          canvas.width = frames[0].dims.width;
          canvas.height = frames[0].dims.height;
          const tex = new CanvasTexture(canvas);
          tex.minFilter = LinearFilter;
          tex.magFilter = NearestFilter;
          setTexture(tex);
        }
      })
      .catch(console.error);
  }, [url]);

  useFrame((state) => {
    if (!frames.length || !canvasRef.current || !texture) return;

    // Only update frame if enough time has passed
    const currentTime = state.clock.elapsedTime * 1000; // Convert to milliseconds
    if (currentTime - lastFrameTimeRef.current < interval) return;

    lastFrameTimeRef.current = currentTime;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frame = frames[currentFrameRef.current];
    const imageData = new ImageData(
      new Uint8ClampedArray(frame.patch),
      frame.dims.width,
      frame.dims.height
    );

    ctx.putImageData(imageData, 0, 0);
    texture.needsUpdate = true;

    currentFrameRef.current = (currentFrameRef.current + 1) % frames.length;
  });

  return texture;
};

export default useGifTexture;
