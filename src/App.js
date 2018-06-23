import React, { Component } from 'react';
import './App.css';
import Generator from './generator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Timeline Generator</h1>
        <Generator className="Generator" />
      </div>
    );
  }
}

export default App;
