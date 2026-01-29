import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect, useCallback } from 'react';
import type { PerspectiveCamera as PerspectiveCameraType } from 'three';

type Props = {
  position: [number, number, number];
  baseRotation: [number, number, number];
  fov: number;
  /** Maximum rotation around Y-axis in radians (looking left/right) */
  maxRotationY?: number;
  /** Maximum rotation around X-axis in radians (looking up/down) */
  maxRotationX?: number;
  /** Device tilt angle (in degrees) at which max rotation is reached */
  maxTiltAngle?: number;
  /** Smoothing factor for camera movement (0-1, lower = smoother) */
  smoothing?: number;
  /** Whether device orientation is enabled */
  enabled?: boolean;
};

/**
 * A camera component that responds to device orientation.
 * Updates are done via useFrame to avoid React re-renders.
 */
const DeviceOrientationCamera = ({
  position,
  baseRotation,
  fov,
  maxRotationY = 0.1,
  maxRotationX = 0.1,
  maxTiltAngle = 25,
  smoothing = 0.06,
  enabled = true,
}: Props) => {
  const cameraRef = useRef<PerspectiveCameraType>(null);
  const { set } = useThree();

  // Use refs to avoid re-renders - these are updated by event listeners
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const isListening = useRef(false);

  /**
   * Apply dampening - as value approaches max, movement slows down.
   */
  const applyDampening = useCallback((normalizedValue: number): number => {
    const clamped = Math.max(-1, Math.min(1, normalizedValue));
    const sign = Math.sign(clamped);
    const abs = Math.abs(clamped);
    return sign * (1 - Math.pow(1 - abs, 2));
  }, []);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const { beta, gamma } = event;
    if (beta === null || gamma === null) return;

    const centeredBeta = beta - 45;
    const normalizedY = gamma / maxTiltAngle;
    const normalizedX = centeredBeta / maxTiltAngle;

    const dampenedY = applyDampening(normalizedY);
    const dampenedX = applyDampening(normalizedX);

    targetRotation.current = {
      x: dampenedX * maxRotationX,
      y: dampenedY * maxRotationY,
    };
  }, [maxRotationX, maxRotationY, maxTiltAngle, applyDampening]);

  const startListening = useCallback(() => {
    if (isListening.current) return;
    isListening.current = true;
    window.addEventListener('deviceorientation', handleOrientation);
  }, [handleOrientation]);

  /**
   * Request permission for device orientation (required on iOS 13+).
   */
  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) {
      return;
    }

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      // @ts-expect-error - requestPermission is iOS-specific
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        // @ts-expect-error - requestPermission is iOS-specific
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          startListening();
        }
      } catch {
        // Permission denied
      }
    } else {
      startListening();
    }
  }, [startListening]);

  // Set up event listeners
  useEffect(() => {
    if (!enabled) return;

    // On non-iOS devices, start listening immediately
    // @ts-expect-error - requestPermission is iOS-specific
    if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
      startListening();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      isListening.current = false;
    };
  }, [enabled, handleOrientation, startListening]);

  // Make camera the default and expose requestPermission
  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [set]);

  // Handle click to request permission (for iOS)
  useEffect(() => {
    if (!enabled) return;

    const handleClick = () => {
      requestPermission();
    };

    window.addEventListener('click', handleClick, { once: true });
    return () => window.removeEventListener('click', handleClick);
  }, [enabled, requestPermission]);

  // Update camera rotation directly via useFrame - no React re-renders!
  useFrame(() => {
    if (!cameraRef.current || !enabled) return;

    const dx = targetRotation.current.x - currentRotation.current.x;
    const dy = targetRotation.current.y - currentRotation.current.y;

    // Only update if there's meaningful change
    if (Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001) {
      currentRotation.current.x += dx * smoothing;
      currentRotation.current.y += dy * smoothing;

      // Apply rotation offset to base rotation
      cameraRef.current.rotation.x = baseRotation[0] + currentRotation.current.x;
      cameraRef.current.rotation.y = baseRotation[1] + currentRotation.current.y;
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={position}
      rotation={baseRotation}
      fov={fov}
    />
  );
};

export default DeviceOrientationCamera;
