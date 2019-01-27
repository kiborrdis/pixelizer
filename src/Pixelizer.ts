import {
  InteractionAdapter,
  InteractionEvent,
  InteractionEventType,
} from './InteractionAdapter';
import { InteractionConnector } from './InteractionConnector';
import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { Tool } from './Tool';
import { Canvas, Style } from './Canvas';

interface ActionRecord {
  tool: Tool;
  record: InteractionRecord;
}

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
  private actions: ActionRecord[];
  private newActionListener: (action: ActionRecord) => void;
  private style: Style;

  constructor(adapter: InteractionAdapter) {
    this.adapter = adapter;
    this.connector = new InteractionConnector(this.adapter);

    this.actions = [];

    this.canvas = new Canvas();
  }

  public mountCanvasInDOMElement(element: HTMLElement) {
    element.appendChild(this.canvas.element);

    this.canvas.setSize(this.canvas.element.scrollWidth, this.canvas.element.scrollHeight);

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
      this.canvas.previewTool(this.currentTool, record);
    }
  }

  private finishAction = (record: InteractionRecord) => {
    if (this.currentTool) {
      const action = {
        tool: this.currentTool,
        record,
        style: { ...this.style },
      };

      this.applyAction(action);
      this.actions.push(action);
      if (this.newActionListener) {
        this.newActionListener(action);
      }
    }
  }

  public applyActions(actions: ActionRecord[] = []) {
    actions.forEach((action) => {
      this.applyAction(action);
    });
  }

  public addNewActionListener(listener: (action: ActionRecord) => void) {
    this.newActionListener = listener;
  }

  private applyAction(action: ActionRecord) {
    this.canvas.applyTool(action.tool, action.record);
  }
}
