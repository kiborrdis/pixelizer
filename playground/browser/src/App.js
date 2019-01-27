import React, { Component } from 'react';
import { Pixelizer, LineTool, RectangleTool, TwoPointRecorder, NPointRecorder, MultilineTool, BrowserInteractionAdapter } from 'pixelize';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  tempRef = React.createRef();

  constructor() {
    super();

    this.pixelizer = new Pixelizer(new BrowserInteractionAdapter());
    this.pixelizer.setConfig({
      recorderCreator: (...args) => new NPointRecorder(...args),
      tool: new MultilineTool(),
    })
  }

  componentDidMount() {
    this.pixelizer.mountCanvasInDOMElement(this.tempRef.current);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div ref={this.tempRef} style={{ width: '600px', height: '600px', backgroundColor: 'maroon' }}></div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
