import React, { Component } from 'react';
import { Pixelizer, LineTool, RectangleTool, TwoPointRecorder, PointScalarRecorder, NPointRecorder, MultilineTool, BrowserInteractionAdapter } from 'pixelize';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  tempRef = React.createRef();

  constructor() {
    super();

    this.pixelizer = new Pixelizer(new BrowserInteractionAdapter());
    this.pixelizer.setStyle({
      lineWidth: 10,
      color: '#ff00ff',
    })
    this.pixelizer.setConfig({
      recorderCreator: (...args) => new PointScalarRecorder(...args),
      tool: new RectangleTool(),
    })
  }

  revert = () => {
    this.pixelizer.revertAction();
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
          <button onClick={this.revert}>
            Revert
          </button>
        </header>
      </div>
    );
  }
}

export default App;
