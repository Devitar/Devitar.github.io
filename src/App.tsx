import Campground from '~/3dCampground/Campground';
import { AppContextProvider } from '~/global/AppContext';
import { ErrorBoundary } from './components';

/** The root application component. */
const App = () => {
  return (
    <div className='app'>
      <ErrorBoundary>
        <AppContextProvider>
          <div className='app_background_container'>
            <Campground />
          </div>
        </AppContextProvider>
      </ErrorBoundary>
    </div>
  );
};

/** Exports */

export default App;
