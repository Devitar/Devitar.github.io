import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect, useCallback } from 'react';
import type { PerspectiveCamera as PerspectiveCameraType } from 'three';
import type { Vector3 } from '~/types';

type Props = {
  position: Vector3;
  baseRotation: Vector3;
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
  /** Enable pinch-to-zoom on mobile */
  enablePinchZoom?: boolean;
  /** Minimum FOV when zoomed in */
  minFov?: number;
  /** Maximum FOV when zoomed out */
  maxFov?: number;
  /** Callback when zoom level changes, returns scale factor (1 = no zoom, >1 = zoomed in) */
  onZoomChange?: (zoomScale: number) => void;
  /** Increment to trigger a reset of zoom and orientation */
  resetTrigger?: number;
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
  enablePinchZoom = false,
  minFov = 20,
  maxFov,
  onZoomChange,
  resetTrigger = 0,
}: Props) => {
  const cameraRef = useRef<PerspectiveCameraType>(null);
  const { set } = useThree();

  // Use refs to avoid re-renders - these are updated by event listeners
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const isListening = useRef(false);

  // Mobile zoom state
  const targetFov = useRef(fov);
  const currentFov = useRef(fov);
  const pinchZoomOffset = useRef({ x: 0, y: 0 });
  const initialPinchDistance = useRef<number | null>(null);
  const initialPinchFov = useRef(fov);
  const effectiveMaxFov = maxFov ?? fov;
  const lastReportedZoom = useRef(1);

  /**
   * Apply dampening - as value approaches max, movement slows down.
   */
  const applyDampening = useCallback((normalizedValue: number): number => {
    const clamped = Math.max(-1, Math.min(1, normalizedValue));
    const sign = Math.sign(clamped);
    const abs = Math.abs(clamped);
    return sign * (1 - Math.pow(1 - abs, 2));
  }, []);

  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
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
    },
    [maxRotationX, maxRotationY, maxTiltAngle, applyDampening]
  );

  const startListening = useCallback(() => {
    if (isListening.current) return;
    isListening.current = true;
    window.addEventListener('deviceorientation', handleOrientation);
  }, [handleOrientation]);

  // Mobile zoom handlers
  const getDistance = useCallback((touches: TouchList) => {
    const [t1, t2] = [touches[0], touches[1]];
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  }, []);

  const getPinchCenter = useCallback((touches: TouchList) => {
    const [t1, t2] = [touches[0], touches[1]];
    return {
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2,
    };
  }, []);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enablePinchZoom || e.touches.length !== 2) return;
      initialPinchDistance.current = getDistance(e.touches);
      initialPinchFov.current = currentFov.current;

      // Calculate offset from center of screen
      const center = getPinchCenter(e.touches);
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      // Normalize to -1 to 1 range
      pinchZoomOffset.current = {
        x: (center.x - screenCenterX) / screenCenterX,
        y: (center.y - screenCenterY) / screenCenterY,
      };
    },
    [enablePinchZoom, getDistance, getPinchCenter]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enablePinchZoom || e.touches.length !== 2 || initialPinchDistance.current === null)
        return;

      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / initialPinchDistance.current;

      // Invert scale for FOV (pinch in = smaller FOV = zoom in)
      const newFov = initialPinchFov.current / scale;
      targetFov.current = Math.max(minFov, Math.min(effectiveMaxFov, newFov));

      // Update pinch center for camera orientation
      const center = getPinchCenter(e.touches);
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      pinchZoomOffset.current = {
        x: (center.x - screenCenterX) / screenCenterX,
        y: (center.y - screenCenterY) / screenCenterY,
      };
    },
    [enablePinchZoom, getDistance, getPinchCenter, minFov, effectiveMaxFov]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enablePinchZoom) return;
      if (e.touches.length < 2) {
        initialPinchDistance.current = null;
      }
    },
    [enablePinchZoom]
  );

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

  // Set up mobile zoom listeners
  useEffect(() => {
    if (!enablePinchZoom) return;

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enablePinchZoom, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Reset zoom and orientation when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      targetFov.current = fov;
      pinchZoomOffset.current = { x: 0, y: 0 };
      onZoomChange?.(1);
      lastReportedZoom.current = 1;
    }
  }, [resetTrigger, fov, onZoomChange]);

  // Update camera rotation and FOV directly via useFrame - no React re-renders!
  useFrame(() => {
    if (!cameraRef.current) return;

    // When disabled, smoothly reset to base rotation
    if (!enabled) {
      targetRotation.current = { x: 0, y: 0 };
    }

    const dx = targetRotation.current.x - currentRotation.current.x;
    const dy = targetRotation.current.y - currentRotation.current.y;

    // Only update if there's meaningful change
    if (Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001) {
      currentRotation.current.x += dx * smoothing;
      currentRotation.current.y += dy * smoothing;
    }

    // Calculate zoom-based rotation offset (look toward pinch point when zoomed)
    const zoomFactor = 1 - (currentFov.current - minFov) / (effectiveMaxFov - minFov);
    const zoomRotationX = pinchZoomOffset.current.y * zoomFactor * 0.15;
    const zoomRotationY = -pinchZoomOffset.current.x * zoomFactor * 0.15;

    // Apply rotation offset to base rotation (device orientation + zoom offset)
    cameraRef.current.rotation.x = baseRotation[0] + currentRotation.current.x + zoomRotationX;
    cameraRef.current.rotation.y = baseRotation[1] + currentRotation.current.y + zoomRotationY;

    // Smoothly interpolate FOV
    const dFov = targetFov.current - currentFov.current;
    if (Math.abs(dFov) > 0.01) {
      currentFov.current += dFov * smoothing * 2;
      cameraRef.current.fov = currentFov.current;
      cameraRef.current.updateProjectionMatrix();

      // Report zoom change (baseFov / currentFov gives zoom scale)
      const zoomScale = fov / currentFov.current;
      if (onZoomChange && Math.abs(zoomScale - lastReportedZoom.current) > 0.01) {
        lastReportedZoom.current = zoomScale;
        onZoomChange(zoomScale);
      }
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
