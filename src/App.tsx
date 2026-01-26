import { Background, Navigation } from "~/components";

const App = () => (
  <div className="app">
    <div className="app_background_container">
      {/* <img className="app_background" src={forest} alt="background_image" /> */}
      <Background />
    </div>
    <Navigation />
  </div>
);

export default App;
