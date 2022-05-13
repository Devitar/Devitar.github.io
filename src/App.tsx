import { NewNavV } from "./components";
import './index.css'
import forest from "./assets/images/Forest.webp"

const App = () => (
  <div className="app">
    <div className="app_background_container">
      <img className="app_background" src={forest} alt="background_image" />
    </div>
    <NewNavV />
  </div>
);

export default App;
