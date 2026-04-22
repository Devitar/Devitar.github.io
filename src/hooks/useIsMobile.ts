import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '~/constants';

const RESIZE_DEBOUNCE_MS = 150;

/**
 * Hook that returns whether the current viewport is mobile-sized.
 * Responds to window resize events.
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < BREAKPOINTS.mobile);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
