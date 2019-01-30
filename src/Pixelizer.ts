import {
  InteractionAdapter,
  InteractionEvent,
  InteractionEventType,
} from './InteractionAdapter';
import { InteractionConnector } from './InteractionConnector';
import { InteractionRecorder } from './recorders/InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { Tool } from './tools/Tool';
import { Canvas } from './Canvas';
import { Style } from './interfaces/Style';
import { Action } from './interfaces/Action';
import { History } from './History';
import { Mutation } from './interfaces/Mutation';

interface PixelizerConfig {
  tool?: Tool;
  recorderCreator?: (
    preview: (record: InteractionRecord) => void,
    finish: (record: InteractionRecord) => void,
  ) => InteractionRecorder;
}

export class Pixelizer {
  private connector: InteractionConnector;
  private currentRecorder: InteractionRecorder;
  private currentTool: Tool;

  private adapter: InteractionAdapter;
  private canvas: Canvas;
  private newActionListener: (action: Action) => void;
  private style: Style;
  private history: History;

  constructor(adapter: InteractionAdapter) {
    this.adapter = adapter;
    this.connector = new InteractionConnector(this.adapter);
    this.canvas = new Canvas();
    this.history = new History(this.canvas.getImageData());
  }

  public mountCanvasInDOMElement(element: HTMLElement) {
    element.appendChild(this.canvas.element);

    this.canvas.setSize(this.canvas.element.scrollWidth, this.canvas.element.scrollHeight);
    this.history = new History(this.canvas.getImageData());

    this.adapter.setInteractionElement(this.canvas.element);
  }

  public setConfig(config: PixelizerConfig) {
    if (config.recorderCreator) {
      this.currentRecorder = config.recorderCreator(this.preview, this.finishAction);
      this.connector.setIteractionHandler(this.currentRecorder);
    }

    if (config.tool) {
      this.currentTool = config.tool;
    }
  }

  public setStyle(style: Style) {
    this.style = style;

    this.canvas.setStyle(style);
  }

  private preview = (record: InteractionRecord) => {
    if (this.currentTool) {
      this.canvas.previewAction({
        tool: this.currentTool,
        record,
        style: { ...this.style },
      });
    }
  }

  private finishAction = (record: InteractionRecord) => {
    if (this.currentTool) {
      const action = {
        tool: this.currentTool,
        record,
        style: { ...this.style },
      };
      const mutation = this.history.add(action);

      this.applyMutation(mutation);
      if (this.newActionListener) {
        this.newActionListener(action);
      }
    }
  }

  public applyActions(actions: Action[] = []) {
    actions.forEach((action) => {
      this.applyMutation(this.history.add(action));
    });
  }

  public addNewActionListener(listener: (action: Action) => void) {
    this.newActionListener = listener;
  }

  public revertAction() {
    const mutation = this.history.back();
    this.applyMutation(mutation);

  }

  private applyMutation(mutation: Mutation) {
    this.canvas.applyMutation(mutation);
  }
}
