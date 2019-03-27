import React, { Component } from 'react';
import GenerateNumbers from './GenerateNumbers';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h3>Generate Phone Numbers</h3>
        </div>
        <GenerateNumbers />
      </div>
    );
  }
}

export default App;
