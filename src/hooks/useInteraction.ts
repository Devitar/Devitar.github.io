import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';

/**
 * Hook that manages interaction state based on app context.
 * Returns whether interactions should be disabled.
 */
export function useInteraction() {
  const {
    get: { isBookOpen },
  } = useContext(AppContext);

  return !!isBookOpen;
}

export default useInteraction;
