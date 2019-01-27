import { Canvas } from './Canvas';
import { InteractionRecord } from './InteractionRecord';
import { Point } from './Point';
import { Tool } from './Tool';

class MockTool extends Tool {
  public applyToContext = jest.fn();
}

describe('Canvas', () => {
  let canvas = new Canvas();
  let record: InteractionRecord;
  let tool: MockTool;

  beforeEach(() => {
    tool = new MockTool();
    canvas = new Canvas();
    record = new InteractionRecord();
  });

  test('should provide canvas html element with right styles', () => {
    expect(canvas.element.getContext).toBeDefined();
    expect(canvas.element.style.width).toBe('100%');
    expect(canvas.element.style.height).toBe('100%');
  });

  test('should provide canvas context', () => {
    expect(canvas.context).toBeDefined();
  });

  test('setSize should set size', () => {
    const prevImageData = canvas.getImageData();

    canvas.setSize(200, 300);

    expect(canvas.element.width).toBe(200);
    expect(canvas.element.height).toBe(300);
  });

  test('should apply tool to context when calling applyTool', () => {
    canvas.applyTool(tool, record);

    expect(tool.applyToContext).toBeCalled();
  });

  test('should return image data with proper data length', () => {
    canvas.setSize(1, 1);

    expect(canvas.getImageData().data.length).toBe(4);
  });

  test('should should put image data to context when applying image data', () => {
    canvas.applyImageData(canvas.getImageData());

    expect(canvas.context.putImageData).toBeCalled();
  });

  test('should access current image data and apply action to context on previewAction', () => {
    canvas.previewTool(tool, record);

    expect(tool.applyToContext).toBeCalled();
    expect(canvas.context.getImageData).toBeCalled();
  });

  test('should put image data on applyAction after previewAction', () => {
    canvas.previewTool(tool, record);
    canvas.applyTool(tool, record);

    expect(tool.applyToContext).toBeCalled();
    expect(canvas.context.putImageData).toBeCalled();
  });

  test('should put image data on previewAction after previewAction', () => {
    canvas.previewTool(tool, record);
    canvas.previewTool(tool, record);

    expect(tool.applyToContext).toBeCalled();
    expect(canvas.context.putImageData).toBeCalled();
  });

  test('should access image data only once on consequent previewAction', () => {
    canvas.previewTool(tool, record);
    canvas.previewTool(tool, record);

    expect(tool.applyToContext).toBeCalled();
    expect(canvas.context.getImageData).toBeCalledTimes(1);
  });

  test('should not put image data on second applyAction after previewAction', () => {
    canvas.previewTool(tool, record);
    canvas.applyTool(tool, record);
    canvas.applyTool(tool, record);

    expect(tool.applyToContext).toBeCalled();
    expect(canvas.context.putImageData).toBeCalledTimes(1);
  });

  test('should set stroke and fill style after set style', () => {
    canvas.setStyle({ color: '#ff00ff', lineWidth: 7 });

    canvas.previewTool(tool, record);

    const passedContext: CanvasRenderingContext2D = tool.applyToContext.mock.calls[0][0];

    expect(passedContext.strokeStyle).toBe('#ff00ff');
    expect(passedContext.fillStyle).toBe('#ff00ff');
    expect(passedContext.lineWidth).toBe(7);
  });
});
