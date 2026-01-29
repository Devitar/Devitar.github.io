import Campground from "~/3dCampground/Campground";
import { AppContextProvider } from "~/global/AppContext";

/** The root application component. */
const App = () => {
  return (
    <div className="app">
      <AppContextProvider>
        <div className="app_background_container">
          <Campground />
        </div>
      </AppContextProvider>
    </div>
  );
};

/** Exports */

export default App;
