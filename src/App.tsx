import React from 'react';
import logo from './logo.svg';
import './App.css';

//components
import Navbar from 'react-bootstrap/Navbar';

class App extends React.Component{
    abortController = new AbortController();
    
    render(){
        return(
          <div className="App">
            <Navbar />
          </div>
        )
    }
}

export default App;