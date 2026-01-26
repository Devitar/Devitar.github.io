import { Background, Navigation } from "~/components";
import { 
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react"

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

/** App-wide Context with default values */
export const AppContext = createContext<AppContextType>({
  get: {
    isFireOn: true,
    isNightTime: true,
    isBookOpen: true,
  },
  set: {
    setIsFireOn: () => {},
    setIsNightTime: () => {},
    setIsBookOpen: () => {},
  },
});

/** The root application component. */
const App = () => {
  const [isFireOn, setIsFireOn] = useState<boolean>(true);
  const [isNightTime, setIsNightTime] = useState<boolean>(true);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(true);

  return (
    <div className="app">
      <AppContext.Provider value={{ 
        get: { isFireOn, isNightTime, isBookOpen },
        set: { setIsFireOn, setIsNightTime, setIsBookOpen }
      }}>
        <div className="app_background_container">
          <Background />
        </div>
        <Navigation />
      </AppContext.Provider>
    </div>
  )
};

/** Exports */

export default App;
