import { NavBar } from "./components";
import './index.css'
import forest from "./assets/images/Forest.jpeg"

const App = () => {


  return (
    <div className="app">
      <div className="app_background_container">
        <img className="app_background" src={forest} alt="background_image" />
      </div>
      <NavBar />
    </div>
  );
};

export default App;
