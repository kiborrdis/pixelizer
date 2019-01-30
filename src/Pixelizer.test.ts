import {
  InteractionAdapter,
  InteractionEventType,
  InteractionEvent,
} from './InteractionAdapter';
import { Pixelizer } from './Pixelizer';
import { Tool } from './tools/Tool';
import { InteractionRecorder } from './recorders/InteractionRecorder';
import { InteractionRecord } from './recorders/InteractionRecord';

class MockTool extends Tool {
  public applyToContext = jest.fn();
  public addPoint = jest.fn();
}

class MockRecorder extends InteractionRecorder {
  public testPreview() {
    this.preview(new InteractionRecord());
  }

  public testFinish() {
    this.finishRecord(new InteractionRecord());
  }
}

class MockAdapter extends InteractionAdapter {
  public element: HTMLElement;

  public addInteractionListener = jest.fn(
    (type: InteractionEventType, callback: (e: InteractionEvent) => void) => {
      super.addInteractionListener(type, callback);
    },
  );

  public setInteractionElement(element: HTMLElement) {
    this.element = element;
  }
}

test('Pixelizer should succesfully be creared', () => {
  const adapter = new Pixelizer(new MockAdapter());
});

describe('Pixelizer', () => {
  let pixelizer: Pixelizer;
  let adapter: MockAdapter;
  let tool: MockTool;
  let recorder: MockRecorder;

  beforeEach(() => {
    adapter = new MockAdapter();
    pixelizer = new Pixelizer(adapter);
    tool = new MockTool();

    pixelizer.setConfig({
      recorderCreator: (...args) => {
        recorder = new MockRecorder(...args);

        return recorder;
      },
      tool,
    });
  });

  test('should succesfully mount canvas into element', () => {
    const element = document.createElement('div');

    pixelizer.mountCanvasInDOMElement(element);

    expect(element.children[0]).toBeDefined();
    expect(adapter.element).toBe(element.children[0]);
  });

  test('should listen for interaction events', () => {
    expect(adapter.addInteractionListener).toBeCalledTimes(Object.keys(InteractionEventType).length / 2);
  });

  test('should preview tool after preview request from recorder', () => {
    recorder.testPreview();

    expect(tool.applyToContext).toBeCalled();
  });

  test('should apply tool after finish record from recorder', () => {
    recorder.testFinish();

    expect(tool.applyToContext).toBeCalled();
  });

  test('should trigger new action callback when record has finished', () => {
    const newActionCallback = jest.fn();

    pixelizer.addNewActionListener(newActionCallback);

    recorder.testFinish();

    expect(newActionCallback).toBeCalled();
  });

  test('should apply tools on applyActions', () => {
    const actions = [
      { tool, record: new InteractionRecord() },
      { tool, record: new InteractionRecord() },
      { tool, record: new InteractionRecord() },
    ];

    pixelizer.applyActions(actions);

    expect(tool.applyToContext).toBeCalledTimes(actions.length);
  });
});
