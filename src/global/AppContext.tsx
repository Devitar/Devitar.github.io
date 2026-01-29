import { createContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";

/** Types */
type AppContextType = {
  get: {
    isFireOn: boolean;
    isNightTime: boolean;
    isBookOpen: boolean;
    isFlashlightOn: boolean;
  };
  set: {
    setIsFireOn: Dispatch<SetStateAction<boolean>>;
    setIsNightTime: Dispatch<SetStateAction<boolean>>;
    setIsBookOpen: Dispatch<SetStateAction<boolean>>;
    setIsFlashlightOn: Dispatch<SetStateAction<boolean>>;
  };
};

type Props = {
  children: ReactNode;
};

/** App-wide Context with default values. */
export const AppContext = createContext<AppContextType>({
  get: {
    isFireOn: true,
    isNightTime: true,
    isBookOpen: false,
    isFlashlightOn: true,
  },
  set: {
    setIsFireOn: () => { },
    setIsNightTime: () => { },
    setIsBookOpen: () => { },
    setIsFlashlightOn: () => { },
  },
});

/** Provider component that manages app-wide state. */
export const AppContextProvider = ({ children }: Props) => {
  const [isFireOn, setIsFireOn] = useState<boolean>(true);
  const [isNightTime, setIsNightTime] = useState<boolean>(true);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{
      get: { isFireOn, isNightTime, isBookOpen, isFlashlightOn },
      set: { setIsFireOn, setIsNightTime, setIsBookOpen, setIsFlashlightOn }
    }}>
      {children}
    </AppContext.Provider>
  );
};
