import { LineTool, RectangleTool, MultilineTool, Tool } from './tools/index';
import { TwoPointRecord, NPointRecord } from './recorders/index';
import { InteractionRecord } from './InteractionRecord';
import { ActionSerializer } from './ActionSerializer';

class MockTool extends Tool {}

describe('ActionSerializer', () => {
  test('should serialize and deserialize action with TwoPointRecord and LineTool', () => {
    const record = new TwoPointRecord();
    record.startPoint = { x: 1, y: 2 };
    const tool = new LineTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with TwoPointRecord and RectangleTool', () => {
    const record = new TwoPointRecord();
    record.startPoint = { x: 1, y: 2 };
    const tool = new RectangleTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with TwoPointRecord and MultilineTool', () => {
    const record = new TwoPointRecord();
    record.startPoint = { x: 1, y: 2 };
    const tool = new MultilineTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with NPointRecord and MultilineTool', () => {
    const record = new NPointRecord();
    record.points = [{ x: 1, y: 2 }];
    const tool = new MultilineTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with NPointRecord, MultilineTool and style', () => {
    const record = new NPointRecord();
    record.points = [{ x: 1, y: 2 }];
    const tool = new MultilineTool();
    const style = { color: '#fff', lineWidth: 1 };

    const action = {
      record,
      tool,
      style,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });
});
