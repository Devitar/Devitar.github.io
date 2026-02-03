import {
  createContext,
  useContext,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from 'react';

/** Constants */

const STORAGE_KEY = 'app-preferences';

/** Types */

type AppPreferences = {
  isMuted: boolean;
};

type AppContextType = {
  get: {
    isFireOn: boolean;
    isNightTime: boolean;
    isBookOpen: boolean;
    isFlashlightOn: boolean;
    isMuted: boolean;
  };
  set: {
    setIsFireOn: Dispatch<SetStateAction<boolean>>;
    setIsNightTime: Dispatch<SetStateAction<boolean>>;
    setIsBookOpen: Dispatch<SetStateAction<boolean>>;
    setIsFlashlightOn: Dispatch<SetStateAction<boolean>>;
    setIsMuted: Dispatch<SetStateAction<boolean>>;
  };
};

type Props = {
  children: ReactNode;
};

/** Helpers */

const getStoredPreferences = (): Partial<AppPreferences> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return {};
};

const setStoredPreferences = (prefs: AppPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage errors
  }
};

/** App-wide Context with default values. */
export const AppContext = createContext<AppContextType>({
  get: {
    isFireOn: true,
    isNightTime: true,
    isBookOpen: false,
    isFlashlightOn: true,
    isMuted: false,
  },
  set: {
    setIsFireOn: () => {},
    setIsNightTime: () => {},
    setIsBookOpen: () => {},
    setIsFlashlightOn: () => {},
    setIsMuted: () => {},
  },
});

/** Provider component that manages app-wide state. */
export const AppContextProvider = ({ children }: Props) => {
  const [isFireOn, setIsFireOn] = useState(true);
  const [isNightTime, setIsNightTime] = useState(true);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(true);
  const [isMuted, setIsMuted] = useState(() => getStoredPreferences().isMuted ?? false);

  // Persist isMuted preference to localStorage
  useEffect(() => {
    setStoredPreferences({ isMuted });
  }, [isMuted]);

  return (
    <AppContext.Provider
      value={{
        get: { isFireOn, isNightTime, isBookOpen, isFlashlightOn, isMuted },
        set: { setIsFireOn, setIsNightTime, setIsBookOpen, setIsFlashlightOn, setIsMuted },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/**
 * Simplified hook for accessing a flattened app context.
 */
export const useAppContext = () => {
  const { get, set } = useContext(AppContext);
  return {
    ...get,
    ...set,
  };
};
