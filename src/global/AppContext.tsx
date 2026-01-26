import { createContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";

/** Types */
type AppContextType = {
  get: {
    isFireOn: boolean;
    isNightTime: boolean;
    isBookOpen: boolean;
  };
  set: {
    setIsFireOn: Dispatch<SetStateAction<boolean>>;
    setIsNightTime: Dispatch<SetStateAction<boolean>>;
    setIsBookOpen: Dispatch<SetStateAction<boolean>>;
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
    isBookOpen: true,
  },
  set: {
    setIsFireOn: () => { },
    setIsNightTime: () => { },
    setIsBookOpen: () => { },
  },
});

/** Provider component that manages app-wide state. */
export const AppContextProvider = ({ children }: Props) => {
  const [isFireOn, setIsFireOn] = useState<boolean>(true);
  const [isNightTime, setIsNightTime] = useState<boolean>(true);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{
      get: { isFireOn, isNightTime, isBookOpen },
      set: { setIsFireOn, setIsNightTime, setIsBookOpen }
    }}>
      {children}
    </AppContext.Provider>
  );
};
