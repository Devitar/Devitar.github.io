import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '~/constants';

/**
 * Hook that returns whether the current viewport is mobile-sized.
 * Responds to window resize events.
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < BREAKPOINTS.mobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
