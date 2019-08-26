import React from 'react';
import './App.css';

//components
import MainMenu from './components/mainMenu';

class App extends React.Component{
    abortController = new AbortController();
    
    render(){
        return(
          <div className="App">
            <MainMenu />
          </div>
        )
    }
}

export default App;