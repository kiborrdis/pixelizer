import React, { useRef, useEffect } from "react";
import {
  Pixelizer,
  LineTool,
  RectangleTool,
  TwoPointRecorder,
  PointScalarRecorder,
  NPointRecorder,
  MultilineTool,
  BrowserInteractionAdapter,
} from "drawery";
import "./App.css";

const tools = {
  rectangle: {
    recorderCreator: (...args) => new PointScalarRecorder(...args),
    tool: new RectangleTool(),
  },
  line: {
    recorderCreator: (...args) => new TwoPointRecorder(...args),
    tool: new LineTool(),
  },
  brush: {
    recorderCreator: (...args) => new NPointRecorder(...args),
    tool: new MultilineTool(),
  },
};

const App = () => {
  const containerRef = useRef(null);
  const draweryRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    draweryRef.current = new Pixelizer(new BrowserInteractionAdapter());

    draweryRef.current.mountCanvasInDOMElement(containerRef.current);
    draweryRef.current.setStyle({
      lineWidth: 10,
      color: "#ff0000",
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div
          ref={containerRef}
          style={{ width: "600px", height: "600px", backgroundColor: "maroon" }}
        ></div>
        <div>
          {Object.keys(tools).map((key) => (
            <button
              onClick={() => {
                draweryRef.current.setConfig(tools[key]);
              }}
            >
              {key}
            </button>
          ))}
        </div>
        <button onClick={() => {
          if (!draweryRef.current) {
            return;
          }

          draweryRef.current.revertAction();
        }}>
          revert
        </button>
      </header>
    </div>
  );
};

export default App;
