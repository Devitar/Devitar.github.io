import { Background, Navigation } from "~/components";
import { AppContextProvider } from "~/global/AppContext";

/** The root application component. */
const App = () => {
  return (
    <div className="app">
      <AppContextProvider>
        <div className="app_background_container">
          <Background />
        </div>
        <Navigation />
      </AppContextProvider>
    </div>
  );
};

/** Exports */

export default App;
